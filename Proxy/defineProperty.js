const data= {}
let name = 'zhangsan'

Object.defineProperty(data, 'name', {
    get: () => {
        console.log('get name')
        return name
    },
    set: (newVal)=> {
        console.log('set name with', newVal)
        name = newVal
    }
})

data['name']
data['name'] = 'lisi'

/* output
get name
set name with lisi
*/
