# tree-snap-shot

Comparison function of simple objects (objects that can be successfully restored by JSON.stringify/parse);

## Installation

Using npm:

```shell
$ npm i --save tree-snap-shot
```

In Node.js:

The comparison of arrays refers to the diff algorithm of git;

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

compare object and array respectively

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
//'add' means the these fields are new added;
//'update' means the these fields' values have been updated;
//'del' means the these fields have been deleted;

//['diff',[path to the list],[operations]]

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

Here is a display of the relatively complete function


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
        0, //add
        {
            name: 'child1',
            cA: 'cA',
            cB: 'cB',
            add: 'add',//add
        }, {
            name: 'child2',
            cA: 'cA',
            cB: 'cB'
        }, {//changed
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
		//A parameter in children [0] is replaced, and the similarity is 0.75;

            "0": {
                "add": "add"//It is considered that we only add an attribute 'add' after the original object is shifted;
            }
        }
    }],
    ["diff", ["children"],
        [
            ["add", 0, 0],
            ["update", 2,
			 //For children [2], most attributes have been changed, we can say that the whole is replaced with a new one; Here, the default similarity of the two objects is 0.6, which is the dividing line of the replacement judgment
			{
                "name": "child3",
                "cAA": "cA",
                "cBB": "cB"
            }]
        ]
    ]
]

**Here is an example of the above similarity judgment**
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

In the array, if there is an attribute ID in two children objects, it will directly compare whether the two ID values are the same, instead of comparing the structural similarity. Please add ID for better performance;
```

In Node.js:

restore function

```js
const snapshot = require('tree-snap-shot')

let obj1 = () => ({
    key1: 'val-1',
    key2: 'val-2',
    key3: 'val-3',
    say() {}
})
let obj2 = {
    key1: 'val-11',
    key2: 'val-22',
    key3: 'val-33',
}

let log;
snapshot.compare(obj1(), obj2).exportLog(lg => {
    log = lg;
});

let copy1 = obj1()
snapshot.replay(log, copy1, oper => {
    if (oper[0] == 'update') {
        delete oper[1].key2;//modify operation content

    }
    if(oper[0] == 'del'){
        return false;//skip this step
    }
});
console.log(copy1);
//result
{ 
    key1: 'val-11', 
    key2: 'val-2', 
    key3: 'val-33', 
    say(){}
}

```


In Node.js:

step-wise restore(1.0.8)

```js
const snapshot = require('tree-snap-shot')

let obj1 ={
    key1: 'val-1',
    key2: 'val-2',
    key3: 'val-3',
}

snapshot.step(['add', {
    test: 1
}], obj1)


console.log(obj1);

//result
{
  key1: 'val-1',
  key2: 'val-2',
  key3: 'val-3',
  test: 1
}

```

filte tree1 with filter

```js
let tree1 = {
    1: [0, 1, 2, 3],
    2: 2,
    3: 3,
    list: [{
        id: 1
    }, {}]
}

let filter = {
    1: {
        2: null,//null means fuzzy matching
    },
    2: null,
    4: null,
    list: {
        0: null
    }
}



console.log(snapshot.difference(tree1, filter));//tree1 remove public parts

//result
{
  '1': [ 0, 1, undefined, 3 ],
  '3': 3,
  list: [ undefined , {} ]
}

console.log(snapshot.union(tree1, filter));//get public parts between tree1 and filter

//result
{ '1': [ undefined, undefined, 2 ], '2': 2, list: [ { id: 1 } ] }

```



All suggestions and opinions are welcome. 

QQ:454413790
Email: 454413790@qq.com
