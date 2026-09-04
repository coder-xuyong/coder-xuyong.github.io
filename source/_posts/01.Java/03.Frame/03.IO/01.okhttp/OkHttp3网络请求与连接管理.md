---
title: OkHttp3网络请求与连接管理
date: 2026-09-04 10:43:45
categories:
  - 1.Java
  - 3.Frame
  - 3.IO
tags:
  - Java
  - OkHttp
  - HTTP
  - 网络请求
---

## 一、为什么选择 OkHttp3？

| 特性 | 说明 |
|------|------|
| **连接池复用** | 避免频繁 TCP 握手，高并发下性能优异 |
| **HTTP/2 支持** | 多路复用，单连接承载多个请求 |
| **超时控制精细** | 连接超时、读取超时、写入超时可独立配置 |
| **拦截器机制** | 统一处理日志、重试、加解密等横切逻辑 |
| **Dispatcher** | 控制并发请求数，防止资源耗尽 |

---

## 二、核心概念

### 2.1 一次请求的完整链路

```
OkHttpClient → Request → Call → (拦截器链) → Response
```

- **OkHttpClient**：客户端工厂，管理连接池、超时、拦截器等全局配置（应全局单例）
- **Request**：描述一次 HTTP 请求（URL、Method、Header、Body）
- **Call**：Request 的可执行对象，`.execute()` 同步执行，`.enqueue()` 异步执行
- **Response**：服务器返回的响应（状态码、Header、Body）

### 2.2 关键组件

| 组件 | 作用 | 默认值 |
|------|------|--------|
| `ConnectionPool` | 连接复用池，空闲连接保持存活 | 5个空闲连接，存活5分钟 |
| `Dispatcher` | 调度器，控制并发请求上限 | 最大64请求，单个Host最大5请求 |
| `Interceptor` | 拦截器链，可自定义处理逻辑 | 重试、重定向、缓存等内置拦截器 |

---

## 三、实战案例一：GET 请求（JiLianDaApi 模式）

### 3.1 完整代码（带注释）

```java
import com.alibaba.fastjson.JSONObject;
import lombok.extern.slf4j.Slf4j;
import okhttp3.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Slf4j
public class ThirdPartyApi {

    // ==================== 常量定义 ====================

    // 接口地址（GET 请求参数拼接在 URL 上）
    private static final String BASE_URL = "https://api.example.com/data/list";

    // Header 认证密钥（从配置中心或环境变量读取更安全）
    private static final String API_KEY = "your-api-key";

    // ==================== OkHttpClient 单例 ====================

    /**
     * 全局唯一的 OkHttpClient 实例。
     * 为什么用 static final？
     *   - OkHttpClient 内部维护了连接池和线程池，重复创建会造成资源浪费。
     *   - 全局单例可以最大化连接复用率。
     * 为什么不放在方法里每次 new？
     *   - 每次 new 意味着每次请求都要重新建立 TCP 连接（三次握手），
     *     高并发场景下性能极差。
     */
    private static final OkHttpClient HTTP_CLIENT = new OkHttpClient.Builder()
            // ---- 超时配置 ----
            .connectTimeout(10, TimeUnit.SECONDS)   // TCP 连接超时：10秒
            .readTimeout(30, TimeUnit.SECONDS)       // 读取响应超时：30秒（数据量大时可调大）
            .writeTimeout(30, TimeUnit.SECONDS)      // 写入请求超时：30秒

            // ---- 连接池配置 ----
            // 参数：最大空闲连接数、空闲连接存活时间、时间单位
            .connectionPool(new ConnectionPool(32, 5, TimeUnit.MINUTES))

            // ---- 重试策略 ----
            .retryOnConnectionFailure(false)  // false：连接失败不自动重试（由业务层控制）

            .build();

    // ==================== 业务方法 ====================

    /**
     * GET 请求示例：查询数据列表
     *
     * 请求方式：GET
     * 参数传递：URL Query String（?key1=value1&key2=value2）
     * 认证方式：Header 中携带 API Key
     *
     * @param pageNum  页码
     * @param pageSize 每页条数
     * @return 数据列表
     */
    public static List<DataVo> fetchDataList(int pageNum, int pageSize) {
        List<DataVo> result = new ArrayList<>();

        // ---- 1. 构建请求头 ----
        // Headers 是不变对象，用 Builder 模式构建
        Headers headers = new Headers.Builder()
                .add("xApiKey", API_KEY)          // 自定义认证头
                .add("Accept", "application/json") // 期望响应格式
                .build();

        // ---- 2. 拼接 URL 参数 ----
        // 简单拼接，生产环境建议用 HttpUrl.Builder 处理特殊字符编码
        String fullUrl = BASE_URL + "?pageNum=" + pageNum + "&pageSize=" + pageSize;

        try {
            // ---- 3. 构建请求 ----
            Request request = new Request.Builder()
                    .url(fullUrl)       // 设置 URL
                    .get()              // 设置为 GET 请求
                    .headers(headers)   // 添加请求头
                    // .cacheControl(CacheControl.FORCE_NETWORK)  // 可选：强制走网络
                    .build();

            // ---- 4. 执行请求（同步阻塞） ----
            // execute() 是同步的，会阻塞当前线程直到响应返回
            // 异步方式：enqueue(Callback)，在回调中处理结果
            Response response = HTTP_CLIENT.newCall(request).execute();

            // ---- 5. 处理响应 ----
            if (response.isSuccessful() && response.body() != null) {
                // response.body().string() 只能调用一次！
                // 因为响应体是流式读取，读完就没了
                String responseBody = response.body().string();

                JSONObject jsonMsg = JSONObject.parseObject(responseBody);
                if (jsonMsg.getBoolean("success")) {
                    // 解析 JSON 数组为对象列表
                    result = JSONObject.parseArray(
                            jsonMsg.getJSONArray("data").toJSONString(),
                            DataVo.class
                    );
                    log.info("查询成功, 共 {} 条", result.size());
                } else {
                    log.warn("接口返回失败, code: {}", jsonMsg.getInteger("code"));
                }
            } else {
                log.warn("HTTP 请求失败, 状态码: {}", response.code());
            }
        } catch (IOException e) {
            // 网络异常：DNS 解析失败、连接超时、服务器断开等
            log.error("请求异常", e);
        }

        return result;
    }
}
```

---

## 四、实战案例二：GET 请求 + 坐标转换（AnzhilianOpenApi 模式）

### 4.1 完整代码（带注释）

```java
import com.alibaba.fastjson.JSONObject;
import lombok.extern.slf4j.Slf4j;
import okhttp3.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Slf4j
public class GpsApi {

    // 接口地址（查询参数直接写在 URL 中）
    private static final String URL = "https://api.example.com/gps/query?gpsType=0";

    // JWT Token（Bearer 认证）
    private static final String TOKEN = "your-jwt-token";

    // 额外的认证 Key
    private static final String API_KEY = "your-api-key";

    // ==================== OkHttpClient 单例 ====================

    /**
     * 带 Dispatcher 自定义的 OkHttpClient。
     * 当需要控制并发请求数量时，显式配置 Dispatcher。
     */
    private static final OkHttpClient HTTP_CLIENT;

    static {
        // 连接池：最大空闲连接数 32，空闲存活 5 分钟
        ConnectionPool pool = new ConnectionPool(32, 5, TimeUnit.MINUTES);

        // 调度器：控制并发请求上限
        Dispatcher dispatcher = new Dispatcher();
        dispatcher.setMaxRequests(64);              // 全局最大并发请求数
        dispatcher.setMaxRequestsPerHost(16);       // 单个 Host 最大并发请求数

        HTTP_CLIENT = new OkHttpClient.Builder()
                .connectTimeout(10, TimeUnit.SECONDS)
                .readTimeout(30, TimeUnit.SECONDS)
                .writeTimeout(0, TimeUnit.SECONDS)  // 0 表示无限制（GET 请求无 Body）
                .connectionPool(pool)
                .dispatcher(dispatcher)
                .retryOnConnectionFailure(false)    // 不自动重试
                .build();
    }

    /**
     * GET 请求 + 多 Header 认证
     *
     * 认证方式：Authorization（JWT）+ 自定义 Key
     * 响应处理：解析 JSON → 坐标系转换
     */
    public static List<GpsVo> fetchGpsData() {
        List<GpsVo> gpsList = new ArrayList<>();

        // ---- 构建多 Header 认证 ----
        Headers headers = new Headers.Builder()
                .add("Authorization", TOKEN)     // JWT Token 认证
                .add("apiKey", API_KEY)           // 平台自定义 Key
                .add("Version", "3.0.0")          // API 版本号
                .build();

        try {
            Request request = new Request.Builder()
                    .url(URL)
                    .get()
                    .headers(headers)
                    .build();

            Response response = HTTP_CLIENT.newCall(request).execute();

            if (response.isSuccessful() && response.body() != null) {
                JSONObject jsonMsg = JSONObject.parseObject(response.body().string());

                // 判断业务状态码（与 HTTP 状态码 200 不同，这里是业务层错误码）
                if (jsonMsg != null && jsonMsg.getInteger("errorCode") == 0) {
                    // 解析数据
                    String results = jsonMsg.getString("results");
                    gpsList = JSONObject.parseArray(results, GpsVo.class);

                    // ---- 后处理：坐标系转换 ----
                    gpsList.forEach(gps -> {
                        // 保存原始 WGS84 坐标
                        gps.setWgs84Lat(gps.getLat());
                        gps.setWgs84Lng(gps.getLng());

                        // WGS84 → GCJ02（高德坐标系）转换
                        double[] converted = CoordTransformUtil.wgs84ToGcj02(
                                gps.getLng(), gps.getLat());
                        gps.setLng(converted[0]);
                        gps.setLat(converted[1]);
                    });
                }
            }
        } catch (IOException e) {
            log.error("GPS 数据查询失败", e);
        }

        return gpsList;
    }
}
```

---

## 五、POST 请求模式（附加）

### 5.1 POST JSON Body

```java
public static void postJsonExample() {
    // 定义 JSON 媒体类型（常量，避免重复创建）
    MediaType JSON = MediaType.parse("application/json; charset=utf-8");

    // 构建 JSON 请求体
    JSONObject bodyJson = new JSONObject();
    bodyJson.put("name", "张三");
    bodyJson.put("age", 25);

    // 封装为 RequestBody
    RequestBody requestBody = RequestBody.create(bodyJson.toJSONString(), JSON);

    Request request = new Request.Builder()
            .url("https://api.example.com/user/create")
            .post(requestBody)      // POST 请求
            .header("Content-Type", "application/json")  // 单个 Header 可直接用 .header()
            .build();

    try (Response response = HTTP_CLIENT.newCall(request).execute()) {
        // try-with-resources 自动关闭 Response（释放连接）
        if (response.isSuccessful()) {
            log.info("响应: {}", response.body().string());
        }
    } catch (IOException e) {
        log.error("请求失败", e);
    }
}
```

### 5.2 POST 表单提交

```java
public static void postFormExample() {
    // application/x-www-form-urlencoded 格式
    FormBody formBody = new FormBody.Builder()
            .add("username", "admin")
            .add("password", "123456")
            .build();

    Request request = new Request.Builder()
            .url("https://api.example.com/login")
            .post(formBody)
            .build();

    try (Response response = HTTP_CLIENT.newCall(request).execute()) {
        log.info("登录结果: {}", response.body().string());
    } catch (IOException e) {
        log.error("请求失败", e);
    }
}
```

---

## 六、最佳实践总结

### 6.1 必须做

| 实践 | 原因 |
|------|------|
| **OkHttpClient 全局单例** | 连接池复用，避免重复创建 TCP 连接 |
| **`response.body().string()` 只读一次** | 响应体是流，读完即关闭 |
| **`try-catch IOException`** | 网络请求必须处理异常 |
| **日志记录** | 成功打印数据量，失败打印错误信息，便于排查 |

### 6.2 推荐做

| 实践 | 说明 |
|------|------|
| **敏感信息外部化** | Token/Key 放配置中心，不要硬编码 |
| **超时按场景调整** | 大数据接口加大 `readTimeout`，实时接口减小 |
| **使用 `try-with-resources`** | 自动关闭 Response，归还连接到池中 |
| **异步场景用 `enqueue()`** | 避免阻塞主线程 |

### 6.3 避免做

| 反模式 | 问题 |
|------|------|
| 每次请求 `new OkHttpClient()` | 连接池无效，性能极差 |
| 不做空判断直接 `response.body().string()` | 可能 NPE |
| 忽略 `IOException` | 问题无法追踪 |
| 在生产代码中硬编码 Token | 安全风险 |

---

## 七、配置速查表

```java
new OkHttpClient.Builder()
    .connectTimeout(10, TimeUnit.SECONDS)   // 建连超时，建议 5-10s
    .readTimeout(30, TimeUnit.SECONDS)       // 读超时，建议 30-60s
    .writeTimeout(30, TimeUnit.SECONDS)      // 写超时，GET 请求可设为 0
    .connectionPool(new ConnectionPool(      // 连接池
        32,           // 最大空闲连接数
        5,            // 空闲存活时间
        TimeUnit.MINUTES
    ))
    .retryOnConnectionFailure(false)         // 自动重试（默认 true）
    .addInterceptor(chain -> {               // 自定义拦截器（日志、加解密等）
        Request request = chain.request();
        log.info("请求: {} {}", request.method(), request.url());
        return chain.proceed(request);
    })
    .build();
```

---

> 📅 整理日期：2026-09-04
> 📝 案例来源：项目 `AnzhilianOpenApi` / `JiLianDaApi`
```

---

这份笔记覆盖了以下内容：

1. **OkHttp 核心概念** — Client、Request、Call、Response 的关系
2. **两种 GET 实战案例** — 带详细中文注释，分别对应你的 `JiLianDaApi`（简单 GET）和 `AnzhilianOpenApi`（多 Header + 坐标转换）
3. **POST 补充** — JSON Body 和表单提交两种方式
4. **最佳实践总结** — 什么该做、什么不该做
5. **配置速查表** — 快速查阅常用参数

所有 Token、Key 等敏感信息已替换为 `"your-xxx"` 占位符。你可以直接保存为 `.md` 文件。
