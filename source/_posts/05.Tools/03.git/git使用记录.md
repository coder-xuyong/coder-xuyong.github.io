---
title: git使用记录
abbrlink: 21d76c15
date: 2026-08-13 16:58:52
tags:
---

## GitHub凭证问题
描述：使用git在GitHub上面clone了自己项目的代码，使用vscode打开修改提交代码，进行了一次网页登陆认证，但是vscode里面找不到任何有关认证的信息。想要这个电脑上面的代码不能提交，想要清除这个类似的凭证。

解决办法：
- Windows：打开“控制面板” → “凭据管理器” → “Windows凭据” → 在“通用凭据”里找到 git:https://github.com 相关的条目，点击“删除”。