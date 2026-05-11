---
title: maven 使用记录
order: 1
categories:
  - 5.Tools
  - 2.maven
tags:
  - Java
  - maven
abbrlink: f9b3a702
date: 2026-05-11 14:09:25
---
# maven依赖查找官网
> https://mvnrepository.com/

## dependencyManagement

**`dependency` 真正引入依赖**，而 **`dependencyManagement` 只是声明依赖版本等信息，并不实际引入**。其中的`<type>pom</type>`和`<scope>import</scope>`引入的不是代码依赖，而是版本管理信息

## `<relativePath/>`
空标签等价于 <relativePath></relativePath>，它告诉 Maven：

> 不要尝试从相对路径查找父 POM，直接去本地仓库和远程仓库寻找。

这是一种显式声明“父 POM 必须从仓库获取” 的方式，可以避免 Maven 因在相对路径查找而浪费时间和产生误导