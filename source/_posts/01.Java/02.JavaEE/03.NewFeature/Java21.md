---
title: Java21 新特性
categories:
  - 1.Java
  - 2.JavaEE
  - 3.NewFeature
tags:
  - Java
abbrlink: dbf5ad5b
date: 2026-05-27 15:14:59
---

## JEP 444: Virtual Threads（虚拟线程）
虚拟线程是由 Java 21 版本中实现的一种轻量级线程。它由 JVM 进行创建以及管理。虚拟线程和传统线程（我们称之为平台线程）之间的主要区别在于，我们可以轻松地在一个 Java 程序中运行大量、甚至数百万个虚拟线程。

用一个比喻来讲，平台线程就像家里墙上的插座，虚拟线程就像是家里的插线板。

由于虚拟线程是 java.lang.Thread 的实现，并且遵守相同规则，因此开发人员无需学习新概念即可使用它们。

```java
// 平台线程
Thread.ofPlatform().start(()->{System.out.println(Thread.currentThread());
});
// 虚拟线程
Thread vt = Thread.ofVirtual().start(() -> {
    System.out.println(Thread.currentThread());
});
//等待虚拟线程打印完毕再退出主程序
vt.join();
```

### 适用场景
- 虚拟线程适用于执行阻塞式任务，在阻塞期间，可以将CPU资源让渡给其他任务
- 虚拟线程不适合CPU密集计算或非阻塞任务，虚拟线程并不会运行的更快，而是增加了规模
- 虚拟线程是轻量级资源，用完即抛，不需要池化
- 通常我们不需要直接使用虚拟线程，像Tomcat、Jetty、Netty、Spring boot等都已支持虚拟线程

## 参考
> https://www.bilibili.com/video/BV1au4y1P73x
> https://www.cnblogs.com/waynaqua/p/17935918.html