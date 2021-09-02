'use strict';
const immutable = require('immutable')
const deepequal = require('deep-equal')
const snapshot = require('./dist/index')

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
    children: [0, {
        name: 'child1',
        cA: 'cA',
        cB: 'cB',
        add: 'add'
    }, {
        name: 'child2',
        cA: 'cA',
        cB: 'cB'
    }, {
        name: 'child3',
        cAA: 'cAA',
        cBB: 'cBB'
    }]
}
snapshot.compare(obj1, obj2).getDiff(df => {
    console.log(JSON.stringify(df.toJS()))
});

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

[
    ["update", {
        "name": "obj2"
    }],
    ["add", {
        "children": { //children[0]中的一个参数被替换了,但是前后改动不大，相似度similarity:0.75;
            "0": {
                "add": "add"//认为他只是原对象移位后添加了一个属性值add；
            }
        }
    }],
    ["diff", ["children"],
        [
            ["add", 0, 0],
            ["update", 2, { //对于children[2]来说改动了大部分的属性，不如当做整体被替换了；这里默认前后两个对象相似程度0.6为替换判断的分界线
                "name": "child3",
                "cAA": "cA",
                "cBB": "cB"
            }]
        ]
    ]
]
console.log('over');