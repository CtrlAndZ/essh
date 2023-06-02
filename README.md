<p align="center">
<img src="https://cdn.staticaly.com/gh/CtrlAndZ/imgded@main/blog/_9120e850-32c9-432d-9c6e-4cffefeb73e7.png" style="width:25%;" />
</p>

## 一款轻量级的命令行ssh管理工具
只是负责管理命令的ssh连接信息，提供通过别名的方式快速访问对应的服务器，而不需要繁琐的输入用户名、host和密码

## 使用

### 通过别名访问ssh服务器
```shell
essh <alias>
```

### 查看所有的ssh列表
```shell
essh list | essh ls
```

### 添加ssh记录
```shell
essh add -a <alias> -h <host> -p <port> -u <username> -s <password>
```
Options:
```shell
  -a, --alias <alias>        别名
  -h, --host <host>          服务器地址
  -p, --port <port>          端口
  -u, --username <username>  用户名
  -s, --password <password>  密码
```

### 删除ssh记录
```shell
essh <alias>
```

## 安装

### npm方式（推荐）
```shell
npm install -g essh
```

### windows平台
即将上线...
### macos平台
即将上线...
### linux平台
即将上线...
