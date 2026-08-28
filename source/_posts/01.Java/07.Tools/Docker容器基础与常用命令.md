---
title: Docker容器基础与常用命令
date: 2026-08-27 09:35:41
categories:
  - 1.Java
  - 7.Tools
---
## 更新部署程序
工作中用到的，后面在研究
```bash
cd /opt/work/source/jwwdflow/jwwdflow
# 更新代码
git pull
# 停止测试环境
docker-compose -f docker-compose-test.yml down

# 部署测试环境
docker-compose -f docker-compose-test.yml up -d
```