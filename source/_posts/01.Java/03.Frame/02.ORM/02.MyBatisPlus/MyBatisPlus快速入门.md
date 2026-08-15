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
### 定义Mapper
```java
public interface UserMapper extends BaseMapper<User> {}
```
后面使用UserMapper时，User类相关的增删改查就全部不用写了，直接调用就行了。



首先，在启动类上面配置@MapperScan("path/xx")，用于扫描持久层