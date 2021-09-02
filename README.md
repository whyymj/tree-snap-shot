# tree-snap-shot
简单对象（JSON.stringify/parse能够顺利还原的对象）的对比功能；

## Installation

Using npm:
```shell
$ npm i --save tree-snap-shot
```

In Node.js:

数组的对比参考了git的diff算法；

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

对象的对比是object与array分别对比；

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

这里只是一个 **不恰当** 的例子，目前插件只支持普通对象（能够JSON.stringify/.parse的对象，Immutable.js能够处理的对象）；对于new Class创建的对象以及对象内包含 **循环引用** 的暂不支持；

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


In Node.js:

这里是一个比较完整的功能展示

```js
const snapshot = require('tree-snap-shot')

let obj1 = {
    name: 'obj1',
    pA: 'pA',
    children: [{
        name: 'child1',
        cA: 'cA',
        cB: 'cB'
    }, {
        name: 'child2',
        cA: 'cA',
        cB: 'cB'
    }, {
        name: 'child3',
        cA: 'cA',
        cB: 'cB'
    }, ]
}

let obj2 = {
    name: 'obj2',
    pA: 'pA',
    children: [
        0, //添加了一项
        {
            name: 'child1',
            cA: 'cA',
            cB: 'cB',
            add: 'add',//添加了一个属性
        }, {
            name: 'child2',
            cA: 'cA',
            cB: 'cB'
        }, {//修改了两个属性
            name: 'child3',
            cAA: 'cAA',
            cBB: 'cBB'
    }]
}
snapshot.compare(obj1, obj2).getDiff(df => {
    console.log(JSON.stringify(df.toJS()))
});

//result
[
    ["update", {
        "name": "obj2"
    }],
    ["add", {
        "children": { 
		//children[0]中的一个参数被替换了,但是前后改动不大，相似度similarity:0.75;
            "0": {
                "add": "add"//认为他只是原对象移位后添加了一个属性值add；
            }
        }
    }],
    ["diff", ["children"],
        [
            ["add", 0, 0],
            ["update", 2,
			 //对于children[2]来说改动了大部分的属性，不如当做整体被替换了；这里默认前后两个对象相似程度0.6为替换判断的分界线
			{
                "name": "child3",
                "cAA": "cA",
                "cBB": "cB"
            }]
        ]
    ]
]

**这里是上面相似度判断的一个例子**
//snapshot.similarity(obj1.children[0] , obj2.children[1])
let similarity = snapshot.similarity({
    name: 'child1',
    cA: 'cA',
    cB: 'cB'
}, {
    name: 'child1',
    cA: 'cA',
    cB: 'cB',
    add: 'add'
});
console.log(similarity); //{ unchanged: 3, add: 1, del: 0, update: 0, similarity: 0.75 }

数组中，如果两个children对象中有属性id，则会直接比较两者id值是否相同，而不再比较结构相似度，为了性能请添加id;
```
