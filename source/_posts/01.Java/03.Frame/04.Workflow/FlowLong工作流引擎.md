---
title: FlowLong工作流引擎
order: 1
categories:
  - 1.Java
  - 3.Frame
  - 4.WorkFlow
tags:
  - Java
  - workflow
abbrlink: 132bcbc1
date: 2026-08-26 11:48:08
---
# 快速入门
飞龙流程引擎只有节点这么一个概念，节点分为条件节点、任务节点两种，其中任务节点包含审批任务、定时器任务、触发器任务、子流程任务等。要深入了解飞龙工作流，必须要清楚了解模型、实例、任务的区别，整个框架都在围绕这三个概念执行操作。

> 相关文档可以查看[官方 | 快速入门](https://doc.flowlong.com/docs/started)

## 模型
1. 流程图（Process Diagram）
2. 活动（Activity）
3. 参与者（Participant）

## 实例
1. 流程定义
2. 流程状态
3. 执行路径
4. 流程变量
5. 参与者信息

## 任务
1. 责任人指派
2. 执行条件
3. 执行结果
4. 任务流转
5. 任务通知和提醒

系统通常会提供任务通知和
## 环境配置
1. 初始化数据库，访问[flowlong官方gitee](https://gitee.com/aizuda/flowlong)，初始化执行 db/flowlong-mysql.sql 数据库脚本
2. 集成springboot
```xml
 <dependency>
    <groupId>com.aizuda</groupId>
    <artifactId>flowlong-spring-boot-starter</artifactId>
    <version>1.2.3</version>
</dependency>
```

## 分布式集成