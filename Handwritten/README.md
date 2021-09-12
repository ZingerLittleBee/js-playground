# 手写各种函数

## 数组扁平化 ArrayFlattening

### method1: 利用 Array.prototype.toSting（） 
- 利用 Array.toString() 将数组转换字符串
- 使用 String.split(',') 将 string 以 "," 分割为数组
- 最后使用 map 方法将数组中的字符串转换成 Number
```javascript
const arrayFlattening1 = (array: any[]) => {
    return array.toString().split(',').map(Number)
}
```


### method2: 使用 Array.prototype.flat()
> [MDN: Array.prototype.flat()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)
```javascript
const arrayFlattening2 = (array: any[]) => {
    return array.flat(3)
}
```


### method3: 使用 Array.prototype.reduce
> [MDN Array.prototype.reduce](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)
```javascript
const arrayFlattening3: any = (array: any[]) => {
    return array.reduce((pre, cur) => {
        return pre.concat(Array.isArray(cur) ? arrayFlattening3(cur) : cur)
    }, [])
}
```

### method4: 函数递归
```javascript
const arr: any = []
const arrayFlattening4: any = (array: any[]) => {
    array.forEach(a => {
        Array.isArray(a) ? arrayFlattening4(a) : arr.push(a)
    })
    return arr
}
```

## 数组去重 ArrayDeduplication
- 函数比较
- 对象比较
- 数组比较
- null 比较
- undefined 比较