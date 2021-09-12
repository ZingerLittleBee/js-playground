const data = {
    name: 'zhangsan',
    age: 20
}

const proxyData = new Proxy(data, {
    get(target, key, receiver) {

        // 只打印本身属性（非原型的属性）
        const ownKeys = Reflect.ownKeys(target)
        if (ownKeys.includes(key)) {
            console.log('get', key)
        }
        return Reflect.get(target, key, receiver)  // 返回结果
    },
    set(target, key, value, receiver) {
        // 重复的数据不处理
        if (target[key] === value) {
            return true
        }

        const result = Reflect.set(target, key, value, receiver)
        console.log('set', key, value)
        return result  // 是否设置成功
    },
    deleteProperty(target, key) {
        const result = Reflect.deleteProperty(target, key)
        console.log('delete property', key)
        return result  // 是否删除成功
    }
})

console.log(proxyData.name)
proxyData.age = 21
proxyData.skill = 'js'
delete proxyData.skill

/*
get name
zhangsan
set age 21
set skill js
*/