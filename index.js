#!/usr/bin/env node
const program = require('commander')
const ssh = require('ssh2-client')
const sshService = require('./bin/ssh-service')

program.version('1.0.0')
program.command('add')
    .option('-a, --alias <alias>', '别名')
    .option('-h, --host <host>', '服务器地址')
    .option('-p, --port <port>', '端口')
    .option('-u, --username <username>', '用户名')
    .option('-s, --password <password>', '密码')
    .description('添加ssh记录')
    .action(opt => {
        try{
            let alias = opt.alias
            let sshObj = {
                port: opt['port'],
                host: opt['host'],
                username: opt['username'],
                password: opt['password']
            }
            sshService.add(alias, sshObj)
        }catch (e){
            console.error(e.message)
        }
    })
program.command('rm <alias>')
    .description('删除ssh记录')
    .action(alias => {
        try{
            sshService.remove(alias)
        }catch (e){
            console.error(e.message)
        }
    })
program.command('list')
    .alias('ls')
    .description('ssh列表')
    .action(() => {
        let sshObjList = sshService.all()
        for (let alias in sshObjList){
            console.log(alias + '\t' + sshObjList[alias].username + '@' + sshObjList[alias].host)
        }
    })
program.argument('<alias>')
    .description('通过别名访问服务器')
    .action(alias => {
        if (!alias){
            program.showHelp()
        }
        // 第一步，通过别名找到对应的服务器信息
        //     1.读取服务器列表配置文件
        let sshObj = sshService.get(alias)
        if (!sshObj){
            console.error(`服务器${alias}未找到!`)
            return;
        }
        // 第二步，如果信息存在则进行连接，否则输出信息未找到异常
        console.log(`connect: ${alias} ...`)
        let opts = {
            encoding : 'utf8',
            stdio: 'inherit'
        }
        ssh
            .shell(sshObj.host, {
                username: sshObj.username,
                password: sshObj.password,
                port: sshObj.port,
                promptPassword : true
            })
            .catch(function onError(err) {
                if (err.message) {
                    process.stderr.write(err.message);
                    process.stderr.write(err.stack);
                } else {
                    process.stderr.write(err);
                }
            })
    })

// 如果没有传递任何参数，显示帮助信息
if (!process.argv.slice(2).length) {
    program.help()
}else {
    program.parse(process.argv)
}
