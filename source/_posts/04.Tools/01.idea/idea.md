---
title: idea 使用方便记录
category:
  - 4.Tools
  - 1.idea
tag:
  - idea
abbrlink: 60fa03a6
date: 2024-12-21 00:00:00
---

记录 idea 使用过程中遇到的问题

<!-- more -->

## springboot的yml文件没有小叶子

下载 Spring Boot Helper 插件

## 好用的插件
| 名字       | 作用   |  操作  |官网|
| --------   | :-----  | :---- |:---- |
| translation |翻译帮助翻译英文文档|   Ctrl+Q查看注释，Ctrl+shift+y 翻译 ，或者打开自动翻译文档 |https://yiiguxing.gitee.io/translation-plugin/#/docs?id=usage|
| Spring Boot Helper |yml文件小叶子和其他|   下载就有小叶子   |不知道|



## 快捷键
```shell
格式化文档：Ctrl+Shift+Alt+L
文件内替换：Ctrl+R
进入方法体：Ctrl+B
提交git的commit：Ctrl+K
快速折叠if/else语句：Ctrl+Shift+。
try-catch-finally:Ctrl+Alt+T
```
## 使用过程中遇到的问题
### 启动报错 windows defender might impact performance
```shell
windows defender might impact performance

exclude IDE and project directories from antivirus scans:

*****

*****

Alternatively, add the IDE process as an exclusion

Exclude directories    Don't show again
```

windows defender可能会影响性能
从防病毒扫描中排除IDE和项目目录

解决方法：
**下面两个选项都可以点击，点击之后一路默认即可，或者直接×掉**

## IDEA启动项目报错Command line is too long. Shorten command line for XXXApplication

打开项目所在位置，找到你的项目下面的.idea\workspace.xml

搜索 `<component name="PropertiesComponent">` 标签，在其内部末尾位置添加以下配置：
```xml
<property name="dynamic.classpath" value="true" /> 
```
然后重启idea即可
## 运行 'XXXXXApplication' 时出错运行XXXXXApplication时出错。命令行过长。通过JAR清单或通过类路径文件缩短命令行，然后重新运行。
在 IDEA 顶部工具栏，点击运行下拉框（锤子图标旁边），选择 Edit Configurations...（编辑配置）。

在左侧找到你的启动类 wwdDigitApplication。

找到 Shorten command line（缩短命令行）选项（通常在 Build and run 区域下方，或 Environment 选项卡中）。

将下拉框从 <none> 改为 JAR manifest（推荐）或 classpath file。

点击 Apply -> OK，重新运行程序即可