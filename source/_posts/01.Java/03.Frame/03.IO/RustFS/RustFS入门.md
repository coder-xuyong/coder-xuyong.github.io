---
title: RustFS入门
categories:
  - 1.Java
  - 3.Frame
  - 3.IO
  - RustFS
tag:
  - io
abbrlink: 6c1ae883
date: 2026-05-27 15:43:59
---
# 了解S3协议
MinIO 中提到的 S3 协议，指的是 Amazon S3（Simple Storage Service，简单存储服务）的 API（应用程序编程接口）标准。可以把这个协议理解为一套通用的“命令”或“语言”

S3的核心概念有两个：
- **存储桶 (Bucket)：**就像是一个顶级的“存储空间”或“数据容器”。你可以为不同的项目或应用创建不同的存储桶，它们之间是相互隔离的。
- **对象 (Object)：**指的是你存储在存储桶里的具体文件。每个对象都由一个唯一的键（Key，即文件名）来标识。

## RustFS简介
它是基于Rust语言开发的高性能分布式对象存储软件，定位和minio高度相似。
根据官方同等硬件压测，RustFS 在小对象（4KB）场景下吞吐量约为 MinIO 的**2.3 倍**，大对象场景也高达**1.8~2.2 倍**

## 安装
参考：https://docs.rustfs.cn/installation/

运行成功后，访问 http://localhost:9001/ 进入管理后台。
- 用户名：rustfsadmin
- 密码：rustfsadmin
在管理后台可以：
- 创建和管理存储桶（Bucket）
- 查看文件列表
- 配置访问策略
- 生成 Access Key / Secret Key

需要自己本地创建存储桶并且添加访问密钥，然后修改 application.yml 中对应的配置。

## springboot 集成
添加依赖
```xml
<dependency>
    <groupId>software.amazon.awssdk</groupId>
    <artifactId>s3</artifactId>
    <version>2.44.10</version>
    <scope>compile</scope>
</dependency>
 <dependency>
    <groupId>com.belerweb</groupId>
    <artifactId>pinyin4j</artifactId>
    <version>2.5.1</version>
    <scope>compile</scope>
</dependency>
```
添加yml配置
```yml
# application.yml
app:
  storage:
    endpoint: http://localhost:9000    # RustFS 服务地址
    access-key: ${RUSTFS_ACCESS_KEY}   # 访问密钥（建议使用环境变量）
    secret-key: ${RUSTFS_SECRET_KEY}   # 私密密钥
    bucket: interview-guide            # 存储桶名称
    region: us-east-1                  # 区域（S3协议需要，可任意设置）
```
添加配置类：
StorageConfigProperties
```java
@Data
@Component
@ConfigurationProperties(prefix = "app.storage")
public class StorageConfigProperties {

    private String endpoint;
    private String accessKey;
    private String secretKey;
    private String bucket;
    private String region = "us-east-1";
}
```
S3Config
```java
@Configuration
@RequiredArgsConstructor
public class S3Config {

    private final StorageConfigProperties storageConfig;

    @Bean
    public S3Client s3Client() {
        AwsBasicCredentials credentials = AwsBasicCredentials.create( // 调用静态方法创建 AWS 基本凭证对象
                storageConfig.getAccessKey(),
                storageConfig.getSecretKey()
        );

        return S3Client.builder()
                .endpointOverride(URI.create(storageConfig.getEndpoint())) // 覆盖默认的 AWS S3 端点，将请求发送到自定义的 MinIO 或其他兼容 S3 的服务地址
                .region(Region.of(storageConfig.getRegion())) // S3 协议要求，本地部署可设为任意值。设置 S3 客户端使用的区域（Region），从配置对象中读取区域字符串并转换为 Region 对象
                .credentialsProvider(StaticCredentialsProvider.create(credentials)) // 设置静态凭证提供者，使用前面创建的基本凭证进行身份验证
                .forcePathStyle(true) // 关键配置：强制使用路径风格访问，即 `http://endpoint/bucket/object`，避免使用虚拟主机风格（`bucket.endpoint`）导致 DNS 解析失败
                .build();
    }
}
```

通用文件上传
```java
private String uploadFile(MultipartFile file, String prefix) {
    String originalFilename = file.getOriginalFilename();
    String fileKey = generateFileKey(originalFilename, prefix);

    try {
        PutObjectRequest putRequest = PutObjectRequest.builder()
                .bucket(storageConfig.getBucket())
                .key(fileKey)
                .contentType(file.getContentType())
                .contentLength(file.getSize())
                .build();

        s3Client.putObject(putRequest, RequestBody.fromInputStream(file.getInputStream(), file.getSize()));
        log.info("文件上传成功: {} -> {}", originalFilename, fileKey);
        return fileKey;
    } catch (IOException e) {
        log.error("读取上传文件失败: {}", e.getMessage(), e);
        throw new BusinessException(ErrorCode.STORAGE_UPLOAD_FAILED, "文件读取失败");
    } catch (S3Exception e) {
        log.error("上传文件到RustFS失败: {}", e.getMessage(), e);
        throw new BusinessException(ErrorCode.STORAGE_UPLOAD_FAILED, "文件存储失败: " + e.getMessage());
    }
}
/**
 * 生成文件键
 */
private String generateFileKey(String originalFilename, String prefix) {
    LocalDateTime now = LocalDateTime.now();
    String datePath = now.format(DATE_PATH_FORMAT);
    String uuid = UUID.randomUUID().toString().substring(0, 8);
    String safeName = sanitizeFilename(originalFilename);
    return String.format("%s/%s/%s_%s", prefix, datePath, uuid, safeName);
}
/**
 * 清理文件名，移除不安全的字符
 * <p>
 * 汉字转换为大驼峰拼音，保留字母、数字、点号、下划线和连字符，
 * 其他字符统一替换为下划线，防止 S3 存储出现问题。
 *
 * @param filename 原始文件名
 * @return 清理后的安全文件名
 */
private String sanitizeFilename(String filename) {
    if (filename == null || filename.isEmpty()) {
        return "unknown";
    }
    return convertToPinyin(filename);
}
```