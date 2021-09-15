function Foo(){}
var foo = new Foo()
console.log(foo.__proto__ === Foo.prototype) // true
console.log(Foo.prototype.__proto__ === Object.prototype) // true
