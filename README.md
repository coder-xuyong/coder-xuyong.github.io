# hexo 和 butterfly 搭建 blog
访问地址1：https://coder-xuyong.github.io/

访问地址2（gitalk 无法使用）：https://coder-xuyong.netlify.app/
## 认识 hexo
简单来说，就是一个博客框架。社区很活跃，里面有很懂框架可以直接使用和自定义。
更多详情，直接查看官网： https://hexo.io/zh-cn/docs/index.html

## 本地搭建 hexo 记录
1.git 安装：略
2.node.js 安装：版本 22，详情略
3.启动终端安装框架:`npm install -g hexo-cli`
4.初始化 hexo 
```shell
hexo init <folder>
cd <folder>
npm install
```
5.在 hexo 根目录终端输入： `hexo server`，启动程序，访问 http://localhost:4000/ 不报错即成功。

## 常用命令
1.在终端输入 `hexo new page 导航栏名字`,如：`hexo new page about`

## 配置 github pages

**注意：** 创建github 仓库的时候，必须要一个 README.md，不然会失败。

详情查看：https://hexo.io/zh-cn/docs/github-pages

## 使用 theme

详情参考：https://butterfly.js.org/

## 配置评论系统

详情参考：https://zhuanlan.zhihu.com/p/603658639

giscus 无法使用最新评论外挂模块，转 gitalk，具体详情参考：https://www.cnblogs.com/qisi007/p/13731562.html
https://www.summer889.com/2024/11/12/%E6%9C%89%E7%9A%84%E6%B2%A1%E7%9A%84/hexo%E5%8D%9A%E5%AE%A2%E8%AF%84%E8%AE%BA%E5%8A%9F%E8%83%BD/

## 遇见的问题

### md 文档中图片相对路径失效

网上攻略多数都是，hexo的图片默认不支持相对路径。需要配置 post_asset_folder 选项，设置从false改成true之后支持。**但是要求图片目录必须和文件名相同**。
如：
```shell
.
├── _posts
|   ├── test.md
|   └── test
```
极其不方便，然后发现有人专门写了插件，可以看原文：https://www.cnblogs.com/mlzrq/p/16099460.html

亲测可行

这个插件可以把图片可以为hexo的_posts目录下的任意目录下的资源图片，文章内可以使用相对路径引用，在模板渲染时，插件会将相对路径的图片转为inline模式，以base64编码直接在html内引用。这样就不会出现目录问题。

使用方式
1. 安装插件：

安装命令如下
```shell
npm i hexo-filter-inline-image
```
2. 配置hexo启用插件

_config.yml 增加以下配置
```yml
inline_image:  
    enabled: true
    compress: false
    remote: false
    limit: 2048
```
compress 是否启用图片压缩
remote 是否转换http和https图片,默认关闭
limit 限制图片大小（kb）在此以内才会进行转换

注意：
> 由于本身Hexo带有缓存会导致插件第一次使用可能会出现无效果，请使用hexo clean清除缓存后即可正常使用

### 未找到相关的 Issues 进行评论 请联系 @coder-xuyong 初始化创建

本地尝试登陆评论失败

上传到github 后，使用 https://coder-xuyong.github.io 登陆评论，成功！


## 参考
- https://www.cnblogs.com/mlzrq/p/16099460.html
- https://arcsin2.cloud/2023/02/23/Hexo-%E5%8D%9A%E5%AE%A2%E6%97%A0%E6%B3%95%E6%98%BE%E7%A4%BA%E5%9B%BE%E7%89%87%E8%A7%A3%E5%86%B3%E6%96%B9%E6%B3%95/