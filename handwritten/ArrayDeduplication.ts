const arr = [1, 1, () => {}, () => {}, [], [], null, null, undefined, undefined, '1', 17, true, true, false, false, 'true', 'a', {}, {}];
// => [1, '1', 17, true, false, 'true', 'a', {}, {}]

const compare = (newArr: any[], arrIndex: any[], fn: (i: any, j: any) => boolean) => {
    let toDeleteIndex = []
    for (let i = 0; i < arrIndex.length; i++) {
        for (let j = 0; j < arrIndex.length; j++) {
            fn(newArr[arrIndex[i]], newArr[arrIndex[j]]) ? toDeleteIndex.push(arrIndex[j]) : null
        }
    }
    console.log('toDeleteIndex', toDeleteIndex)
}
const arrayDeduplication1 = (array: any[]) => {
    // Set 可以去除 Number, String, null, undefined 类型的重复
    // Set 处理完, 还需要处理函数、数组、对象
    let newArr = Array.from(new Set(array))

    // 提取数组、对象、方法的 index
    let arrIndex: any[] = []
    let objIndex: any[] = []
    let funcIndex: any[] = []
    newArr.forEach((n, index) => {
        switch (typeof n) {
            case 'function':
                funcIndex.push(index)
                break
            case 'object':
                Array.isArray(n) ? arrIndex.push(index) : (n !== null ? objIndex.push(index) : null)
                break
        }
    })

    compare(newArr, arrIndex, (i, j) => {
        if (i.length !== j.length) return false
        let flag = true
        i.forEach((value: any, index: number) => {
            if (value != j[index]) {
                flag = false
            }
        })
        return flag
    })

    compare(newArr, objIndex, (i, j) => {
        let keyArr = Object.keys(i)
        let flag = true
        if (Object.keys(i).length !== Object.keys(j).length) return false
        keyArr.forEach((k: any) => {
            if (i[k] !== j[k]) {
                flag = false
            }
        })
        return false
    })

    compare(newArr, funcIndex, (i, j) => {
        return i.toString() === j.toString()
    })
    return newArr
}

console.log(arrayDeduplication1(arr))