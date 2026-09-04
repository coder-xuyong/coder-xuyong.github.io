---
title: JDK17 新特性
order: 1
categories:
  - 1.Java
  - 1.JavaSE
  - 5.NewFeature
tags:
  - Java
  - JDK17
  - 新特性
date: 2026-09-03 10:08:31
---
## Java Stream 集合转 Map 

### Collectors.toMap 详解
场景：将 List<T> 列表转换为 Map<K, T> 映射表，常用于通过唯一键（ID/编号）实现 O(1) 级别的快速数据查找。
语法：
```java
import java.util.function.Function;
import java.util.stream.Collectors;

Map<String, DigitSiteEquip> equipMap = allDigitSiteEquips.stream()
    .collect(Collectors.toMap(
        DigitSiteEquip::getThirdNum,        // 参数1：Key 生成器（取什么做键）
        Function.identity(),                // 参数2：Value 生成器（取什么做值，identity表示对象本身）
        (oldValue, newValue) -> oldValue    // 参数3：冲突解决器（键重复时保留谁）
    ));
```