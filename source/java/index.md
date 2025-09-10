---
title: java
date: 2025-07-29 11:18:04
tags: 'java'
---
## github
{% note green 'fas fa-rocket' %}
{% post_link hexo/02.md语法 ' 🚀 markdown 语法可以查看' %}

{% endnote %}

## 成都(第一天)->康定汽车站->打车到酒店，问问师傅当地包车情况->酒店->包车(第二天)->野马海子—>康定酒店（第三天）->稻丁旅游客运站->坐车->稻丁酒店->稻城风景区（第四天）->稻城酒店->稻丁旅游客运站（第五天）->坐车->香格里拉站->酒店->香格里拉->纳帕海->回酒店->回成都。
野马海子：徒步，两步路
稻城：风景区
香格里拉：


## 社保缴纳
https://wenda.bendibao.com/live/2024115/186941.shtm
支付宝上搜索灵活就业

## zzqa
1. AMC：微信公总号推送报警
2. 数据对接：（sqlite、netty、mysql、modbus、sftp）
3. csv导出工具（QACS2000_EXport）
4. 诊断报告
5. 雷电流监测项目
6. 光纤监测项目
7. sqltool
8. flex 系统
9. cs2000_sqlite
10. s8000
11. 数据库崩溃处理
12. csp 企业微信Python
13. 蒙达SIM卡（https://blog.csdn.net/weixin_45121946/article/details/107187920、https://blog.csdn.net/weixin_43943548/article/details/109843533）
14. 公司官网
15. OA办公管理系统（时间戳问题）
16. 弗兰德i18n
17. CS2000
18. sqltool_minio
19. config (波形查看工具)
20. 北斗基准站、叶片反旋、雷电流、光纤、振动

## 欲学习内容标志
1. netty 有点难，后期在啃一下。



## 记录一个转正申请
尊敬的领导：

        我叫徐勇，于2022年12月05日进入公司，目前担任技术中心研发部软件组java开发一职，负责java开发等相关工作。本人工作认真、细心且具有较强的责任心和进取心，勤勉不懈，极富工作热情；性格开朗，乐于与他人沟通，具有良好和熟练的沟通技巧，有很强的团队协作能力。
        责任感强，按时完成领导交付的工作，和各部门同事之间能够通力合作，关系相处融洽而和睦，能配合各部门负责人成功地完成各项工作；积极学习新知识、技能，注重自身发展和进步。
        我自2022年工作以来，一直从事java开发相关工作，因此，我对java开发这个岗位的工作日渐成熟，并且我在短的时间内熟悉了CMC、HMI和其他相关工具以及有关工作的基本情况，马上进入工作。现将工作情况简要总结如下：

1、完成CSV导出工具功能新增和维护后期相关新增和修改功能。

2、 完成明阳诊断报告代码编写、测试、和bug修复等。

3、 完成波形导出的修复和新功能代码编写。

4、完成大唐望江平、凉水泉的开发部署和调试。

5、完成雷电流监测项目的代码编写、测试和bug修复。

6、AMC微信公众号bug修复和后期功能维护。

7、完成运达模板部分开发。

8、光纤监测项目开发中。

        在本部门的工作中，我勤奋工作，获得了本部门领导和同事的认同。当然，在工作中我也出现了一些小的差错和问题，部门领导也及时给我指出，促进了我工作的成熟性。这就好比一辆正在进行磨合的新车一样，一个好的司机会让新车的磨合期缩短，并且会很好的保护好新车，让它发挥出最好的性能。咱们公司就是一名优秀的司机，新员工就是需要渡过磨合期的新车，在公司的领导下，我会更加严格要求自己，在作好本职工作的同时，积极团结同事，搞好大家之间的关系。在工作中，要不断的学习与积累，不断的提出问题，解决问题，不断完善自我，使工作能够更快、更好的完成。我相信我一定会做好工作，成为优秀的中自庆安人中的一份子，不辜负领导对我的期望。

        总之，在这四个月的工作中，我深深体会到有一个和谐、共进的团队是非常重要的，有一个积极向上、大气磅礴的领导是员工前进的动力。
感谢中自庆安给了我这样一个发挥的舞台，我就要珍惜这次机会，为我们公司的发展竭尽全力。在此我提出转正申请，希望自己能成为中自庆安的正式员工，恳请领导予以批准。


申请人：徐勇

日期：2023年4月06日

## 📖 内容
餐前小点：根据菜鸟教程，把java基础知识，按自己的理解，整理一个基础笔记。后续的面试题，可以补充在这个上面。
**目标，先过八股文，再过java基础。对应面试题不懂的情况下，把对应的部分的知识点整理成笔记博客。**

java基础，可以过一遍：https://www.bilibili.com/video/BV1gb42177hm
java 八股文：https://www.bilibili.com/video/BV1yT411H7YK
collection
thread
jvm
redis
mysql
spring
cloud
rabbitMQ
kafka
技术场景


## csp

1、前置必须条件
自建应用略，可以参考之前的。
(1)企业ID：每个企业都拥有唯一的corpid，获取此信息可在管理后台“我的企业”－“企业信息”下查看“企业ID”（需要有管理员权限）
(2)AgentId：每个应用都有唯一的agentid。在管理后台->“应用管理”->“应用”，点进某个应用，即可看到agentid。
(3)Secret：secret是企业应用里面用于保障数据安全的“钥匙”，每一个应用都有一个独立的访问密钥，为了保证数据的安全，secret务必不能泄漏。secret查看方法：在管理后台->“应用管理”->“应用”->“自建”，点进某个应用，即可看到。
(4)access_token：access_token是企业后台去企业微信的后台获取信息时的重要票据，由corpid和secret产生。所有接口在通信时都需要携带此信息用于验证接口的访问权限
2、应用设置
(1)在应用的功能中的自定义菜单设置需要访问的菜单的网页链接。
(2)在应用的开发者接口-网页授权及JS-SDK中设置可信域名。此域名得是公司的域名的子域名，在域名网站（如阿里云）里配置。
(3)需要配置可信域名需完成域名归属认证，会下载一个txt文件，此文件放置在前端开发。或者说是域名访问的根目录下，完成认证。
(4)启用企业微信授权登录
(5)部署django的服务器的公网ip，需要加入企业微信后台的可信ip配置。
3、部署项目到测试服务器
构建vue项目和django项目的Dockerfile文件。如下：
①Vue的Dockerfile，放在代码根目录，此外根目录还必须要有server.js文件，此文件在代码根目录存在，此处尚不给出。然后执行打包命令 docker build -t my_vue_app .
②完成后运行：docker run -d -p 8080:8080 my_vue_app

1. 使用官方的 Node.js 镜像作为基础镜像
FROM node:14

2. 设置工作目录
WORKDIR /app

3. 复制 package.json 和 package-lock.json
COPY package*.json ./

4. 安装项目依赖
RUN npm config set registry https://registry.npmmirror.com/ && npm install

5. 复制所有源代码到工作目录
COPY . .

6. 构建 Vue 项目
RUN npm run build

7. 安装 Express
RUN npm config set registry https://registry.npmmirror.com/ && npm install express

8. 暴露端口
EXPOSE 8080

9. 启动 Node.js 服务器
CMD ["node", "server.js"]

③Django的Dockerfile文件上传至代码根目录。然后执行打包命令 docker build -t my_django_app .
④完成后运行：docker run -d -p 8000:8000 my_django_app

10. 使用官方的 Python 镜像作为基础镜像
FROM python:3.7.9 

11. 设置工作目录
WORKDIR /app

12. 复制项目文件到工作目录
COPY . /app

13. 安装系统依赖
RUN apt-get update \
    && apt-get install -y gcc 

14. 安装 Python 依赖
RUN pip install --no-cache-dir -r packet_look -i https://mirrors.aliyun.com/pypi/simple/

15. 暴露端口
EXPOSE 8000

16. 运行 Django 开发服务器
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

### 配置0.151公网Nginx的反向代理
添加类似如下配置，完成之后重启Nginx
	server {
		listen 80;
		server_name pms.windit.com.cn;
		
		location / {
			proxy_pass http://10.100.50.21:8080/;
			index index.html index.htm;
		}
		location /api {
                    proxy_pass http://10.100.50.21:8000;
                    index index.html index.htm;
		}
 }

### JavaSE

#### [Java 基础特性](01.JavaSE/01.基础特性)

- [Java 开发环境](01.JavaSE/01.基础特性/00.Java开发环境.md)
- [Java 基础语法特性](01.JavaSE/01.基础特性/01.Java基础语法.md)
- [Java 基本数据类型](01.JavaSE/01.基础特性/02.Java基本数据类型.md)
- [Java 面向对象](01.JavaSE/01.基础特性/03.Java面向对象.md)
- [Java 方法](01.JavaSE/01.基础特性/04.Java方法.md)
- [Java 数组](01.JavaSE/01.基础特性/05.Java数组.md)
- [Java 枚举](01.JavaSE/01.基础特性/06.Java枚举.md)
- [Java 控制语句](01.JavaSE/01.基础特性/07.Java控制语句.md)
- [Java 异常](01.JavaSE/01.基础特性/08.Java异常.md)
- [Java 泛型](01.JavaSE/01.基础特性/09.Java泛型.md)
- [Java 反射](01.JavaSE/01.基础特性/10.Java反射.md)
- [Java 注解](01.JavaSE/01.基础特性/11.Java注解.md)
- [Java String类型](01.JavaSE/01.基础特性/12.JavaString类型.md)
- [Java java日志](01.JavaSE/01.基础特性/13.java日志.md)
- [Java 常用工具类](01.JavaSE/01.基础特性/14.Java常用工具类.md)

#### [Java 高级特性](01.JavaSE/02.高级特性)

- [Java 正则从入门到精通](01.JavaSE/02.高级特性/01.Java正则.md) - 关键词：`Pattern`、`Matcher`、`捕获与非捕获`、`反向引用`、`零宽断言`、`贪婪与懒惰`、`元字符`、`DFA`、`NFA`
- [Java 编码和加密](01.JavaSE/02.高级特性/02.Java编码和加密.md) - 关键词：`Base64`、`消息摘要`、`数字签名`、`对称加密`、`非对称加密`、`MD5`、`SHA`、`HMAC`、`AES`、`DES`、`DESede`、`RSA`
- [Java 国际化](01.JavaSE/02.高级特性/03.Java国际化.md) - 关键词：`Locale`、`ResourceBundle`、`NumberFormat`、`DateFormat`、`MessageFormat`
- [Java JDK8](01.JavaSE/02.高级特性/04.JDK8.md) - 关键词：`Stream`、`lambda`、`Optional`、`@FunctionalInterface`
- [Java SPI](01.JavaSE/02.高级特性/05.JavaSPI.md) - 关键词：`SPI`、`ClassLoader`

#### [Java 容器](01.JavaSE/03.容器)


- [Java 容器简介](01.JavaSE/03.容器/01.Java容器简介.md) - 关键词：`Collection`、`泛型`、`Iterable`、`Iterator`、`Comparable`、`Comparator`、`Cloneable`、`fail-fast`
- [Java 容器之 List](01.JavaSE/03.容器/02.Java容器之List.md) - 关键词：`List`、`ArrayList`、`LinkedList`
- [Java 容器之 Map](01.JavaSE/03.容器/03.Java容器之Map.md) - 关键词：`Map`、`HashMap`、`TreeMap`、`LinkedHashMap`、`WeakHashMap`
- [Java 容器之 Set](01.JavaSE/03.容器/04.Java容器之Set.md) - 关键词：`Set`、`HashSet`、`TreeSet`、`LinkedHashSet`、`EmumSet`
- [Java 容器之 Queue](01.JavaSE/03.容器/05.Java容器之Queue.md) - 关键词：`Queue`、`Deque`、`ArrayDeque`、`LinkedList`、`PriorityQueue`
- [Java 容器之 Stream](01.JavaSE/03.容器/06.Java容器之Stream.md)

#### [Java IO](01.JavaSE/04.IO)


- [Java IO 模型](01.JavaSE/04.IO/01.JavaIO模型.md) - 关键词：`InputStream`、`OutputStream`、`Reader`、`Writer`、`阻塞`
- [Java NIO](01.JavaSE/04.IO/02.JavaNIO.md) - 关键词：`Channel`、`Buffer`、`Selector`、`非阻塞`、`多路复用`
- [Java 序列化](01.JavaSE/04.IO/03.Java序列化.md) - 关键词：`Serializable`、`serialVersionUID`、`transient`、`Externalizable`、`writeObject`、`readObject`
- [Java 网络编程](01.JavaSE/04.IO/04.Java网络编程.md) - 关键词：`Socket`、`ServerSocket`、`DatagramPacket`、`DatagramSocket`
- [Java IO 工具类](01.JavaSE/04.IO/05.JavaIO工具类.md) - 关键词：`File`、`RandomAccessFile`、`System`、`Scanner`

#### [Java 并发](01.JavaSE/05.并发)


- [Java 并发简介](01.JavaSE/05.并发/01.Java并发简介.md) - 关键词：`进程`、`线程`、`安全性`、`活跃性`、`性能`、`死锁`、`饥饿`、`上下文切换`
- [Java 线程基础](01.JavaSE/05.并发/02.Java线程基础.md) - 关键词：`Thread`、`Runnable`、`Callable`、`Future`、`wait`、`notify`、`notifyAll`、`join`、`sleep`、`yeild`、`线程状态`、`线程通信`
- [Java 并发核心机制](01.JavaSE/05.并发/03.Java并发核心机制.md) - 关键词：`synchronized`、`volatile`、`CAS`、`ThreadLocal`
- [Java 并发锁](01.JavaSE/05.并发/04.Java锁.md) - 关键词：`AQS`、`ReentrantLock`、`ReentrantReadWriteLock`、`Condition`
- [Java 原子类](01.JavaSE/05.并发/05.Java原子类.md) - 关键词：`CAS`、`Atomic`
- [Java 并发容器](01.JavaSE/05.并发/06.Java并发和容器.md) - 关键词：`ConcurrentHashMap`、`CopyOnWriteArrayList`
- [Java 线程池](01.JavaSE/05.并发/07.Java线程池.md) - 关键词：`Executor`、`ExecutorService`、`ThreadPoolExecutor`、`Executors`
- [Java 并发工具类](01.JavaSE/05.并发/08.Java并发工具类.md) - 关键词：`CountDownLatch`、`CyclicBarrier`、`Semaphore`
- [Java 内存模型](01.JavaSE/05.并发/09.Java内存模型.md) - 关键词：`JMM`、`volatile`、`synchronized`、`final`、`Happens-Before`、`内存屏障`
- [ForkJoin 框架](01.JavaSE/05.并发/10.ForkJoin框架.md)

#### [Java 虚拟机](01.JavaSE/06.JVM)


- [JVM 体系结构](01.JavaSE/06.JVM/01.JVM体系结构.md)
- [JVM 内存区域](01.JavaSE/06.JVM/02.JVM内存区域.md) - 关键词：`程序计数器`、`虚拟机栈`、`本地方法栈`、`堆`、`方法区`、`运行时常量池`、`直接内存`、`OutOfMemoryError`、`StackOverflowError`
- [JVM 垃圾收集](01.JavaSE/06.JVM/03.JVM垃圾收集.md) - 关键词：`GC Roots`、`Serial`、`Parallel`、`CMS`、`G1`、`Minor GC`、`Full GC`
- [JVM 类加载](01.JavaSE/06.JVM/04.JVM类加载.md) - 关键词：`ClassLoader`、`双亲委派`
- [JVM 字节码](01.JavaSE/06.JVM/05.JVM字节码.md) - 关键词：`bytecode`、`asm`、`javassist`
- [JVM 命令行工具](01.JavaSE/06.JVM/11.JVM命令行工具.md) - 关键词：`jps`、`jstat`、`jmap` 、`jstack`、`jhat`、`jinfo`
- [JVM GUI 工具](01.JavaSE/06.JVM/12.JVM_GUI工具.md) - 关键词：`jconsole`、`jvisualvm`、`MAT`、`JProfile`、`Arthas`
- [JVM 实战](01.JavaSE/06.JVM/21.JVM实战.md) - 关键词：`配置`、`调优`
- [Java 故障诊断](01.JavaSE/06.JVM/22.Java故障诊断.md) - 关键词：`CPU`、`内存`、`磁盘`、`网络`、`GC`

### JavaEE

#### JavaWeb

- [JavaWeb 面经](02.JavaEE/01.JavaWeb/99.JavaWeb面经.md)
- [JavaWeb 之 Servlet 指南](02.JavaEE/01.JavaWeb/01.JavaWeb之Servlet指南.md)
- [JavaWeb 之 Jsp 指南](02.JavaEE/01.JavaWeb/02.JavaWeb之Jsp指南.md)
- [JavaWeb 之 Filter 和 Listener](02.JavaEE/01.JavaWeb/03.JavaWeb之Filter和Listener.md)
- [JavaWeb 之 Cookie 和 Session](02.JavaEE/01.JavaWeb/04.JavaWeb之Cookie和Session.md)

#### Java 服务器

> Tomcat 和 Jetty 都是 Java 比较流行的轻量级服务器。
>
> Nginx 是目前最流行的反向代理服务器，也常用于负载均衡。

- [Tomcat 快速入门](02.JavaEE/02.服务器/01.Tomcat/01.Tomcat快速入门.md)
- [Tomcat 连接器](02.JavaEE/02.服务器/01.Tomcat/02.Tomcat连接器.md)
- [Tomcat 容器](02.JavaEE/02.服务器/01.Tomcat/03.Tomcat容器.md)
- [Tomcat 优化](02.JavaEE/02.服务器/01.Tomcat/04.Tomcat优化.md)
- [Tomcat 和 Jetty](02.JavaEE/02.服务器/01.Tomcat/05.Tomcat和Jetty.md)
- [Jetty](02.JavaEE/02.服务器/02.Jetty.md)

### Java 软件

#### Java 构建

> Java 项目需要通过 [**构建工具**](04.software/01.build) 来管理项目依赖，完成编译、打包、发布、生成 JavaDoc 等任务。
>
> - 目前最主流的构建工具是 Maven，它的功能非常强大。
> - Gradle 号称是要替代 Maven 等构件工具，它的版本管理确实简洁，但是需要学习 Groovy，学习成本比 Maven 高。
> - Ant 功能比 Maven 和 Gradle 要弱，现代 Java 项目基本不用了，但也有一些传统的 Java 项目还在使用。

- [Maven](04.software/01.build/01.Maven) 📚
  - [Maven 快速入门](04.software/01.build/01.Maven/01.Maven快速入门.md)
  - [Maven 教程之 pom.xml 详解](04.software/01.build/01.Maven/02.Maven教程之pom.xml详解.md)
  - [Maven 教程之 settings.xml 详解](04.software/01.build/01.Maven/03.Maven教程之settings.xml详解.md)
  - [Maven 实战问题和最佳实践](04.software/01.build/01.Maven/04.Maven实战问题和最佳实践.md)
  - [Maven 教程之发布 jar 到私服或中央仓库](04.software/01.build/01.Maven/05.Maven教程之发布jar到私服或中央仓库.md)
  - [Maven 插件之代码检查](04.software/01.build/01.Maven/06.Maven插件之代码检查.md)
- [Ant 简易教程](04.software/01.build/02.Ant.md)

#### Java IDE

> 自从有了 [**IDE**](04.software/02.IDE)，写代码从此就告别了刀耕火种的蛮荒时代。
>
> - [Eclipse](04.software/02.IDE/02.Eclipse.md) 是久负盛名的开源 Java IDE，我的学生时代一直使用它写 Java。
> - 曾经抗拒从转 [Intellij Idea](04.software/02.IDE/01.Intellij.md) ，但后来发现真香，不得不说，确实是目前最优秀的 Java IDE。
> - 你可以在 [vscode](04.software/02.IDE/03.VsCode.md) 中写各种语言，只要安装相应插件即可。如果你的项目中使用了很多种编程语言，又懒得在多个 IDE 之间切换，那么就用 vscode 来一网打尽吧。

- [Intellij Idea](04.software/02.IDE/01.Intellij.md)
- [Eclipse](04.software/02.IDE/02.Eclipse.md)
- [vscode](04.software/02.IDE/03.VsCode.md)

#### Java 监控诊断

> [监控/诊断](04.software/03.监控诊断) 工具主要用于 Java 应用的运维。通过采集、分析、存储、可视化应用的有效数据，帮助开发者、使用者快速定位问题，找到性能瓶颈。

- [监控工具对比](04.software/03.监控诊断/01.监控工具对比.md)
- [CAT](04.software/03.监控诊断/02.CAT.md)
- [Zipkin](04.software/03.监控诊断/03.Zipkin.md)
- [SkyWalking](04.software/03.监控诊断/04.Skywalking.md)
- [Arthas](04.software/03.监控诊断/05.Arthas.md)

### Java 工具

#### Java IO

- [JSON 序列化](12.工具/01.IO/01.JSON序列化.md) - [fastjson](https://github.com/alibaba/fastjson)、[Jackson](https://github.com/FasterXML/jackson)、[Gson](https://github.com/google/gson)
- [二进制序列化](12.工具/01.IO/02.二进制序列化.md) - [Protobuf](https://developers.google.com/protocol-buffers)、[Thrift](https://thrift.apache.org/)、[Hessian](http://hessian.caucho.com/)、[Kryo](https://github.com/EsotericSoftware/kryo)、[FST](https://github.com/RuedigerMoeller/fast-serialization)

#### JavaBean 工具

- [Lombok](12.工具/02.JavaBean/01.Lombok.md)
- [Dozer](12.工具/02.JavaBean/02.Dozer.md)

#### Java 模板引擎

- [Freemark](12.工具/03.模板引擎/01.Freemark.md)
- [Velocity](12.工具/03.模板引擎/02.Thymeleaf.md)
- [Thymeleaf](12.工具/03.模板引擎/03.Velocity.md)

#### Java 测试工具

- [Junit](12.工具/04.测试/01.Junit.md)
- [Mockito](12.工具/04.测试/02.Mockito.md)
- [Jmeter](12.工具/04.测试/03.Jmeter.md)
- [JMH](12.工具/04.测试/04.JMH.md)

#### 其他

- [Java 日志](12.工具/99.其他/01.Java日志.md)
- [Java 工具包](12.工具/99.其他/02.Java工具包.md)
- [Reflections](12.工具/99.其他/03.Reflections.md)
- [JavaMail](12.工具/99.其他/04.JavaMail.md)
- [Jsoup](12.工具/99.其他/05.Jsoup.md)
- [Thumbnailator](12.工具/99.其他/06.Thumbnailator.md)
- [Zxing](12.工具/99.其他/07.Zxing.md)

### Java 框架

#### Spring

##### 综合

- [Spring 概述](03.Frame/01.Spring/00.Spring综合/01.Spring概述.md)
- [SpringBoot 知识图谱](03.Frame/01.Spring/00.Spring综合/02.SpringBoot知识清单.md)
- [SpringBoot 基本原理](03.Frame/01.Spring/00.Spring综合/22.SpringBoot基本原理.md)
- [Spring 面试](03.Frame/01.Spring/00.Spring综合/99.Spring面试.md)

##### 核心

- [Spring Bean](03.Frame/01.Spring/01.Spring核心/01.SpringBean.md)
- [Spring IoC](03.Frame/01.Spring/01.Spring核心/02.SpringIoC.md)
- [Spring 依赖查找](03.Frame/01.Spring/01.Spring核心/03.Spring依赖查找.md)
- [Spring 依赖注入](03.Frame/01.Spring/01.Spring核心/04.Spring依赖注入.md)
- [Spring IoC 依赖来源](03.Frame/01.Spring/01.Spring核心/05.SpringIoC依赖来源.md)
- [Spring Bean 作用域](03.Frame/01.Spring/01.Spring核心/06.SpringBean作用域.md)
- [Spring Bean 生命周期](03.Frame/01.Spring/01.Spring核心/07.SpringBean生命周期.md)
- [Spring 配置元数据](03.Frame/01.Spring/01.Spring核心/08.Spring配置元数据.md)
- [Spring AOP](03.Frame/01.Spring/01.Spring核心/10.SpringAop.md)
- [Spring 资源管理](03.Frame/01.Spring/01.Spring核心/20.Spring资源管理.md)
- [Spring 校验](03.Frame/01.Spring/01.Spring核心/21.Spring校验.md)
- [Spring 数据绑定](03.Frame/01.Spring/01.Spring核心/22.Spring数据绑定.md)
- [Spring 类型转换](03.Frame/01.Spring/01.Spring核心/23.Spring类型转换.md)
- [Spring EL 表达式](03.Frame/01.Spring/01.Spring核心/24.SpringEL.md)
- [Spring 事件](03.Frame/01.Spring/01.Spring核心/25.Spring事件.md)
- [Spring 国际化](03.Frame/01.Spring/01.Spring核心/26.Spring国际化.md)
- [Spring 泛型处理](03.Frame/01.Spring/01.Spring核心/27.Spring泛型处理.md)
- [Spring 注解](03.Frame/01.Spring/01.Spring核心/28.Spring注解.md)
- [Spring Environment 抽象](03.Frame/01.Spring/01.Spring核心/29.SpringEnvironment抽象.md)
- [SpringBoot 教程之快速入门](03.Frame/01.Spring/01.Spring核心/31.SpringBoot之快速入门.md)
- [SpringBoot 之属性加载](03.Frame/01.Spring/01.Spring核心/32.SpringBoot之属性加载.md)
- [SpringBoot 之 Profile](03.Frame/01.Spring/01.Spring核心/33.SpringBoot之Profile.md)

##### 数据

- [Spring 之数据源](03.Frame/01.Spring/02.Spring数据/01.Spring之数据源.md)
- [Spring 之 JDBC](03.Frame/01.Spring/02.Spring数据/02.Spring之JDBC.md)
- [Spring 之事务](03.Frame/01.Spring/02.Spring数据/03.Spring之事务.md)
- [Spring 之 JPA](03.Frame/01.Spring/02.Spring数据/04.Spring之JPA.md)
- [Spring 集成 Mybatis](03.Frame/01.Spring/02.Spring数据/10.Spring集成Mybatis.md)
- [Spring 访问 Redis](03.Frame/01.Spring/02.Spring数据/21.Spring访问Redis.md)
- [Spring 访问 MongoDB](03.Frame/01.Spring/02.Spring数据/22.Spring访问MongoDB.md)
- [Spring 访问 Elasticsearch](03.Frame/01.Spring/02.Spring数据/23.Spring访问Elasticsearch.md)

##### Web

- [SpringWeb 综述](03.Frame/01.Spring/03.SpringWeb/01.SpringWeb综述.md)
- [SpringWeb 应用](03.Frame/01.Spring/03.SpringWeb/02.SpringWeb应用.md)
- [DispatcherServlet](03.Frame/01.Spring/03.SpringWeb/03.DispatcherServlet.md)
- [Spring 过滤器](03.Frame/01.Spring/03.SpringWeb/04.Spring过滤器.md)
- [Spring 跨域](03.Frame/01.Spring/03.SpringWeb/05.Spring跨域.md)
- [Spring 视图](03.Frame/01.Spring/03.SpringWeb/06.Spring视图.md)
- [SpringBoot 之应用 EasyUI](03.Frame/01.Spring/03.SpringWeb/21.SpringBoot之应用EasyUI.md)

##### IO

- [SpringBoot 之异步请求](03.Frame/01.Spring/04.SpringIO/01.SpringBoot之异步请求.md)
- [SpringBoot 之 Json](03.Frame/01.Spring/04.SpringIO/02.SpringBoot之Json.md)
- [SpringBoot 之邮件](03.Frame/01.Spring/04.SpringIO/03.SpringBoot之邮件.md)

##### 集成

- [Spring 集成缓存中间件](03.Frame/01.Spring/05.Spring集成/01.Spring集成缓存.md)
- [Spring 集成定时任务中间件](03.Frame/01.Spring/05.Spring集成/02.Spring集成调度器.md)
- [Spring 集成 Dubbo](03.Frame/01.Spring/05.Spring集成/03.Spring集成Dubbo.md)

##### 其他

- [Spring4 升级](03.Frame/01.Spring/99.Spring其他/01.Spring4升级.md)
- [SpringBoot 之 banner](03.Frame/01.Spring/99.Spring其他/21.SpringBoot之banner.md)
- [SpringBoot 之 Actuator](03.Frame/01.Spring/99.Spring其他/22.SpringBoot之Actuator.md)

#### ORM

- [Mybatis 快速入门](03.Frame/11.ORM/01.Mybatis快速入门.md)
- [Mybatis 原理](03.Frame/11.ORM/02.Mybatis原理.md)

#### 安全

> Java 领域比较流行的安全框架就是 shiro 和 spring-security。
>
> shiro 更为简单、轻便，容易理解，能满足大多数基本安全场景下的需要。
>
> spring-security 功能更丰富，也比 shiro 更复杂。值得一提的是由于 spring-security 是 spring 团队开发，所以集成 spring 和 spring-boot 框架更容易。

- [Shiro](03.Frame/12.安全/01.Shiro.md)
- [SpringSecurity](03.Frame/12.安全/02.SpringSecurity.md)

#### IO

- [Shiro](03.Frame/13.IO/netty/Netty01-nio.md)

### Java 中间件

#### 缓存

> 缓存可以说是优化系统性能的第一手段，在各种技术中都会有缓存的应用。
>
> 如果想深入学习缓存，建议先了解一下 [缓存基本原理](https://dunwu.github.io/design/distributed/分布式缓存.html)，有助于理解缓存的特性、原理，使用缓存常见的问题及解决方案。

- [Java 缓存中间件](14.中间件/02.缓存/02.Java缓存中间件.md)
- [Ehcache 快速入门](14.中间件/02.缓存/04.Ehcache.md)
- [Java 进程内缓存](14.中间件/02.缓存/05.Java进程内缓存.md)
- [Http 缓存](14.中间件/02.缓存/06.Http缓存.md)

#### 流量控制

- [Hystrix](14.中间件/03.流量控制/01.Hystrix.md)

### [大数据](https://dunwu.github.io/bigdata-tutorial)

> 大数据技术点以归档在：[bigdata-tutorial](https://dunwu.github.io/bigdata-tutorial)

- [Hdfs](https://dunwu.github.io/bigdata-tutorial/hdfs) 📚
- [Hbase](https://dunwu.github.io/bigdata-tutorial/hbase) 📚
- [Hive](https://dunwu.github.io/bigdata-tutorial/hive) 📚
- [MapReduce](https://dunwu.github.io/bigdata-tutorial/mapreduce)
- [Yarn](https://dunwu.github.io/bigdata-tutorial/yarn)
- [ZooKeeper](https://dunwu.github.io/bigdata-tutorial/zookeeper) 📚
- [Kafka](https://dunwu.github.io/bigdata-tutorial/kafka) 📚
- Spark
- Storm
- [Flink](https://dunwu.github.io/bigdata-tutorial/tree/master/docs/flink)

## 📚 资料

- Java 经典书籍
  - [《Effective Java 中文版》](https://item.jd.com/12507084.html) - 本书介绍了在 Java 编程中 78 条极具实用价值的经验规则，这些经验规则涵盖了大多数开发人员每天所面临的问题的解决方案。同推荐《重构 : 改善既有代码的设计》、《代码整洁之道》、《代码大全》，有一定的内容重叠。
  - [《Java 并发编程实战》](https://item.jd.com/10922250.html) - 本书深入浅出地介绍了 Java 线程和并发，是一本完美的 Java 并发参考手册。
  - [《深入理解 Java 虚拟机》](https://item.jd.com/11252778.html) - 不去了解 JVM 的工程师，和咸鱼有什么区
  - [《Maven 实战》](https://item.jd.com/10476794.html) - 国内最权威的 Maven 专家的力作，唯一一本哦！
- 其他领域书籍
  - [《Redis 设计与实现》](https://item.jd.com/11486101.html) - 系统而全面地描述了 Redis 内部运行机制。图示丰富，描述清晰，并给出大量参考信息，是 NoSQL 数据库开发人员案头必备。
  - [《鸟哥的 Linux 私房菜 （基础学习篇）》](https://item.jd.com/12443890.html) - 本书是最具知名度的 Linux 入门书《鸟哥的 Linux 私房菜基础学习篇》的最新版，全面而详细地介绍了 Linux 操作系统。内容非常全面，建议挑选和自己实际工作相关度较高的，其他部分有需要再阅读。
  - [《Head First 设计模式》](https://item.jd.com/10100236.html) - 《Head First 设计模式》(中文版)共有 14 章，每章都介绍了几个设计模式，完整地涵盖了四人组版本全部 23 个设计模式。
  - [《HTTP 权威指南》](https://item.jd.com/11056556.html) - 本书尝试着将 HTTP 中一些互相关联且常被误解的规则梳理清楚，并编写了一系列基于各种主题的章节，对 HTTP 各方面的特性进行了介绍。纵观全书，对 HTTP“为什么”这样做进行了详细的解释，而不仅仅停留在它是“怎么做”的。
  - [《TCP/IP 详解 系列》](https://item.jd.com/11966296.html) - 完整而详细的 TCP/IP 协议指南。针对任何希望理解 TCP/IP 协议是如何实现的读者设计。
  - [《剑指 Offer：名企面试官精讲典型编程题》](https://item.jd.com/12163054.html) - 剖析了 80 个典型的编程面试题，系统整理基础知识、代码质量、解题思路、优化效率和综合能力这 5 个面试要点。

## 🚪 传送

◾ 💧 [钝悟的 IT 知识图谱](https://dunwu.github.io/waterdrop/) ◾
