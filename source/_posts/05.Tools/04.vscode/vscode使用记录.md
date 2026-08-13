---
title: vscode使用记录
category:
  - 5.Tools
  - 4.vscode
tag:
  - vscode
abbrlink: 604ee773
date: 2026-08-13 16:57:00
---

## 此系统上禁止运行脚本
```text
>npm i
npm : 无法加载文件 E:\Program Files\nodejs\npm.ps1，因为在此系统上禁止运行脚本。有关详细信息，请参阅 https:/go.microsoft.com/fwlink/?LinkID=135170 中的 about_Execution_Policie
s。
所在位置 行:1 字符: 1
+ npm i
+ ~~~
    + CategoryInfo          : SecurityError: (:) []，PSSecurityException
    + FullyQualifiedErrorId : UnauthorizedAccess
```
### 解决
修改 PowerShell 执行策略

1.  **以管理员身份打开 PowerShell**：点击“开始”菜单，搜索 “PowerShell”，在搜索结果中右键点击 “Windows PowerShell”，选择“**以管理员身份运行**”。
2.  **执行修改命令**：在打开的 PowerShell 窗口中，复制并粘贴以下命令，然后按回车：
    ```powershell
    Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
    ```
    *   `-Scope CurrentUser`：这个参数很关键，表示**只修改当前用户的策略**，不需要管理员权限即可生效，也更安全。
    *   `-ExecutionPolicy RemoteSigned`：允许运行本地脚本，而从网络下载的脚本则必须由受信任的发布者签名，这是一个兼顾便利与安全的设置。
3.  **确认修改**：根据提示，输入 `Y` 并按回车确认。
4.  **重启终端并重试**：**关闭你当前的 VS Code 终端**，然后重新打开一个新的终端。再次运行 `npm i` 命令，问题应该就解决了。
