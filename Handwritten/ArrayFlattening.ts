const arr = [1, [2, [3, [4, 5]]], 6];
// => [1, 2, 3, 4, 5, 6]

const arrayFlattening1 = (array: any[]) => {
    return array.toString().split(',').map(Number)
}

const arrayFlattening2 = (array: any[]) => {
    return array.flat(3)
}

const arrayFlattening3: any = (array: any[]) => {
    return array.reduce((pre, cur) => {
        return pre.concat(Array.isArray(cur) ? arrayFlattening3(cur) : cur)
    }, [])
}

const newArr: any = []
const arrayFlattening4: any = (array: any[]) => {
    array.forEach(a => {
        Array.isArray(a) ? arrayFlattening4(a) : arr.push(a)
    })
    return newArr
}

console.log(arrayFlattening1(arr))

console.log(arrayFlattening2(arr))

console.log(arrayFlattening3(arr))

console.log(arrayFlattening4(arr))