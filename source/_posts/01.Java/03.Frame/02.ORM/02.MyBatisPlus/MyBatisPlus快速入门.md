---
title: MyBatisPlus快速入门
categories:
  - 1.Java
  - 3.Frame
  - 2.ORM
  - 2.MyBatisPlus
tags:
  - Java
  - 框架
  - ORM
  - MyBatisPlus
abbrlink: '8086094'
date: 2026-08-14 10:29:33
---

## 入门案例
### 引入依赖
```xml
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-boot-starter</artifactId>
    <version>3.5.3.1</version>
</dependency>
```

### 日志相关配置
```yml
logging:
  level:
    com.itheima: debug   # 设置项目包 com.itheima 及其子包的日志级别为 DEBUG（输出详细信息）
  pattern:
    dateformat: HH:mm:ss # 日志时间格式仅显示小时:分钟:秒（不显示毫秒和日期）
```

### 定义Mapper
首先，在启动类上面配置@MapperScan("path/xx")，用于扫描持久层。
```java
public interface UserMapper extends BaseMapper<User> {}
```
后面使用UserMapper时，User类相关的增删改查就无需自己实现单表CRUD了，直接调用就行了。





参考：
> https://my.feishu.cn/wiki/PsyawI04ei2FQykqfcPcmd7Dnsc