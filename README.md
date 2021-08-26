# tree-snap-shot v1.0.0


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
snapshot.compare(arr1,arr2).getDiff(df => {
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
