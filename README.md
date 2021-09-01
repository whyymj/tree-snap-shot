# tree-snap-shot


## Installation

Using npm:
```shell
$ npm i --save tree-snap-shot
```

In Node.js:

```js
const snapshot = require('tree-snap-shot')
//compare array 
var arr1= ['a', 'b', 'c', 'd', 'e'];
var arr2= ['aa', 'b', 'c', '+', 'd', 'e', 'f']
snapshot.compare(arr1,arr2).getDiff(df => {
    console.log(JSON.stringify(df))//
})

//result
[["diff",[],[
    ["update",0,"aa"],
    ["add",3,"+"],
    ["add",5,"f"]
]]]
```
In Node.js:

```js
const snapshot = require('tree-snap-shot')
//compare object
let AA = {
    a: 'a',
    b: 'b',
    c: 'c',
    list: [
        ['a', 'b', 'c', 'd', 'e'], 1, 2
    ]
}
let BB = {
    a: 'a',
    e: 'b',
    cc: 'cc',
    list: [
        '0', ['b', 'c', 'dd', 'e'], 1, 2
    ]
}
snapshot.compare(AA,BB).getDiff(df => {
    console.log(JSON.stringify(df))
})

//result
[["add",{"e":"b","cc":"cc"}],
["del",{"b":null,"c":null}],
["diff",["list",0],[
    ["del",0],
    ["update",3,"dd"]
]],
["diff",["list"],[
    ["add",0,"0"]]
]]
```

In Node.js:

```js
const snapshot = require('tree-snap-shot')
class Test {
    data = 1;
    info = ''
    id = 1
    constructor(id, info, data) {
        this.id = id;
        this.data = data;
        this.info = info;
    }

    click() {
        console.log('id=' + this.id + ' : info=' + this.info + ' : data=' + this.data)
    }
    mounted() {
        console.log('id ' + this.id + ' mounted')
    }
}
let obj1 = new Test('child1', 'child1 Info', 'child1 Data');
let obj2 = new Test('child2', 'child2 Info', 'child2 Data');
let copyOj1 =new Test('child1', 'child1 Info', 'child1 Data');//Test { data: 'child1 Data', info: 'child1 Info', id: 'child1' }
let log;
//test reset 
snapshot.compare(obj1, obj2).exportLog(lg => {
    log = lg;//保存对比差异
}).replay(log, copyOj1);//根据对比差异，改造对象

console.log(copyOj1);//Test { data: 'child2 Data', info: 'child2 Info', id: 'child2' }

```