const yaml = require('yaml')
const fs = require('fs')
const path = require('path');
const sshListFilePath = path.join(__dirname, 'ssh-list.yml');

// 如果配置文件不存在则创建
if (!fs.existsSync(sshListFilePath)){
    fs.writeFileSync(sshListFilePath, '', { encoding: 'utf-8' }, error => {
        if (error) throw error;
        console.log('ssh配置记录文件创建成功！');
    })
}

// ssh业务对象

module.exports = {
    get,
    all,
    add,
    remove
}

/**
 * 通过别名获取ssh信息对象
 * @param alias 别名
 * @returns ssh信息对象
 */
function get(alias) {
    return all()[alias]
}

/**
 * 获取所有的ssh信息对象
 * @returns 所有的ssh信息对象 可能为空
 */
function all() {
    let file = fs.readFileSync(sshListFilePath, { encoding: 'utf-8' })
    let allObj = yaml.parse(file)
    return allObj && allObj != null ? allObj : {}
}

/**
 * 添加ssh信息对象
 * @param alias 别名
 * @param obj ssh信息对象
 */
function add(alias, obj){
    // 信息校验
    if (!alias){
        throw new Error('别名 -a, --alias <alias> 不能为空')
    }
    let allObj = all()
    if (allObj[alias]){
        throw new Error(`添加失败:${alias} 已经存在`)
    }
    allObj[alias] = obj
    fs.writeFile(sshListFilePath, yaml.stringify(allObj), { encoding: 'utf-8' }, error => {
        if (error) throw error;
        console.log(`添加成功:${alias}`);
    })
}

/**
 * 删除ssh信息对象
 * @param alias 别名
 */
function remove(alias){
    let allObj = all()
    if (!allObj[alias]){
        throw new Error(`删除失败:${alias} 不存在`)
    }
    allObj[alias] = undefined
    fs.writeFile(sshListFilePath, yaml.stringify(allObj), { encoding: 'utf-8' }, error => {
        if (error) throw error;
        console.log(`删除成功:${alias}`);
    })
}