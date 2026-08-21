---
title: Sentinel流量控制与熔断降级
date: 2026-08-21 13:31:09
order: 3
categories:
  - 1.Java
  - 4.分布式
  - 0.分布式应用
tags:
  - 分布式
  - sentinel
---

## 环境搭建
可以查看文档：[官网 | 快速开始](https://sentinelguard.io/zh-cn/docs/quick-start.html)
1. 官方提供了[UI控制台](https://github.com/alibaba/Sentinel/releases)，以方便我们对系统做限流设置。
2. 下载好后，放在任意非中文目录下，在cmd中执行`java -jar sentinel-dashboard-1.8.1.jar`，就可以启动了。
3. 访问http://localhost:8080页面，就可以看到sentinel的控制台了：需要输入账号和密码，默认都是：sentinel

## 基础使用
1. 引入依赖：
```xml
<!--sentinel-->
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
</dependency>
```
2. yaml配置文件
修改application.yaml文件，添加下面内容：
```yaml
server:
  port: 8088 #微服务地址
spring:
  cloud: 
    sentinel:
      eager: true  # 开启主动初始化
      transport:
        dashboard: localhost:8080 #sentinel控制台访问地址
```
3. 访问任意接口
打开浏览器，访问任意接口 如：http://localhost:8088/order/101，这样才能触发sentinel的监控。然后再访问sentinel的控制台，查看效果。

## FeignClient整合Sentinel
> 整合后编写失败降级逻辑：就是请求失败后不是直接返回一个异常而是返回一个空对象（保证用户体验）
1. 修改配置文件:
```yaml
feign:
  sentinel:
    enabled: true # 开启feign对sentinel的支持，也就熔断
```
> 保证已经有了Feign和sentinel依赖

2.  编写请求失败降级逻辑：
```java
@FeignClient(value = "service-product", fallback = ProductFeignClientFallback.class)
public interface ProductFeignClient {
    @GetMapping(value = "/productId/{id}")
    public Product getProductById(@PathVariable("id") Long productId);
}
// ======================================================================================

@Component
public class ProductFeignClientFallback implements ProductFeignClient {
    @Override
    public Product getProductById(Long productId) {
        System.out.println("兜底回调....");
        Product product = new Product();
        product.setId(productId);
        product.setPrice(new BigDecimal("0"));
        product.setProductName("未知商品");
        product.setNum(0);
 
        return product;
    }
}
```
3. 测试，要注意关掉Retryer的重试

> 簇点链路中的链路来自于几种资源：
> - 主流框架自动适配（例如：web请求）
> - 声明式：@SentinelResource
> - 声明式 Sphu API(不常用)

## 异常处理
```bash
异常处理（Sentinel）
│
├── 异常抛出（BlockException）
│   ├── 触发场景
│   │   ├── Web 接口（由 SentinelWebInterceptor 拦截）
│   │   ├── @SentinelResource（由 SentinelResourceAspect 切面拦截）
│   │   ├── OpenFeign 调用（由 SentinelFeign.Builder 增强）
│   │   └── SphU 硬编码（手动调用）
│   └── 抛出类型：BlockException（流控、降级、系统保护等异常）
│
└── 异常处理策略（捕获 & 回调）
    ├── 原生捕获
    │   └── try-catch 手动捕获 BlockException
    │
    ├── 全局统一处理
    │   ├── 默认 BlockExceptionHandler（Sentinel 提供）
    │   ├── 自定义 BlockExceptionHandler（自定义 BEH）
    │   └── Spring Boot 全局异常处理（@ControllerAdvice）
    │
    └── 注解/回调机制
        ├── @SentinelResource 的 blockHandler（针对 BlockException）
        ├── @SentinelResource 的 fallback（业务异常或 BlockException 的兜底）
        ├── OpenFeign 的 fallback（集成 Sentinel 时的服务降级）
        └── 兜底回调（泛指 fallback 机制）
```
### web接口异常
实现BlockExceptionHandler接口，写一个BlockExceptionHandler的实现类：
```java
@Component
public class MyBlockExceptionHandler implements BlockExceptionHandler {
    private ObjectMapper objectMapper = new ObjectMapper();
    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response,
                       String resourceName, BlockException e) throws Exception {
        response.setStatus(429); //too many requests
        response.setContentType("application/json;charset=utf-8");
        PrintWriter writer = response.getWriter();
        R error = R.error(500, resourceName + " 被Sentinel限制了，原因：" + e.getClass());
        String json = objectMapper.writeValueAsString(error);
        writer.write(json);
        writer.flush();
        writer.close();
    }
}
```
然后再UI控制台中配置流控规则，比如select接口的QPS设置每秒只允许1个请求，然后1s内多次访问就会触发MyBlockExceptionHandler。
### @SentinelResource出现异常
在目标方法加@SentinelResource注解，编写blockHandler方法或者fallback方法处理异常，和feign整合sentinel一样的。
## 规则-流量控制
在application-feign.yml中加配置`sentinel.web-context-unify: false`，其意思是在sentinel中不共用同一个上下文

**新增流控规则**中的专有名词：

- 阈值类型：
	- QPS：统计每秒请求数
	- 并发线程数：统计并发线程数
- 集群
	- 集群和流控模式是相背离的，二选一
- 流控模式：
	- 直接策略：只对一个资源进行控制，之前的测试一直用这个
	- 关联策略：情况有两种;有接口read和write类型的，单独多少次都可以成功。但是当write并发过大，突然访问read，就会走自定义的BlockExceptionHandler的实现类。
	- 链路策略：两个请求A和B访问一个资源（随便选一个资源C，即加了@SentinelResource的资源），但只限制配置了入口资源这个请求
- 流控效果：
	- 快速失败：处理不了的请求直接丢弃。交给Web接口异常处理MyBlockExceptionHandler。
	- Warm Up：慢慢将每秒的请求达到峰值，有个预热机制
	- 排队等待：超过阈值，放入队列，以固定间隔匀速处理

> 注意:只有快速失败支持流控模式(直接、关联、链路)的设置
## 参考
> https://www.cnblogs.com/sexintercourse/p/18646562