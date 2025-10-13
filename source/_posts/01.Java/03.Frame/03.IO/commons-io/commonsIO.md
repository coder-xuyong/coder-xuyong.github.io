---
title: commons-io 框架
categories:
  - 1.Java
  - 3.Frame
  - 3.IO
  - commons-io
tag:
  - file
abbrlink: fdded5ed
date: 2025-09-13 15:31:11
---

## IO框架
commons-io 框架
jar官网下载地址：https://commons.apache.org/proper/commons-io/download_io.cgi
其中doc的jar解压之后，就是api文档。
这是maven方式：
```xml
<dependency>
    <groupId>commons-io</groupId>
    <artifactId>commons-io</artifactId>
    <version>2.16.1</version>
</dependency>
```
该框架提供了相关工具类：
1. FileUtils
| 方法签名 | 说明 |
| :--- | :--- |
| `public static void copyFile(File srcFile, File destFile)` | 复制文件 |
| `public static void copyDirectory(File srcDir, File destDir)` | 复制文件夹 |
| `public static void deleteDirectory(File directory)` | 删除文件夹 |
| `public static String readFileToString(File file, String encoding)` | 读数据 |
| `public static void writeStringToFile(File file, String data, String charsetName, boolean append)` | 写数据 |

2. IOUtils
| 方法签名 | 说明 |
| :--- | :--- |
| `public static int copy(InputStream inputStream, OutputStream outputStream)` | 复制文件 |
| `public static int copy(Reader reader, Writer writer)` | 复制文件 |
| `public static void write(String data, OutputStream output, String charsetName)` | 写数据 |