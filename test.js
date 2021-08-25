'use strict';
const immutable = require('immutable')
const deepequal = require('deep-equal')
const differ = require('./dist/index')
let data1 = {
    id: 'data1-id',
    name: 'data1-name',
    data: {
        test: 1,
        id: 'data',
        uuu: 1,
        aa: {
            id: 'aa'
        },
        bb: {
            id: 'aa'
        }
    },
    info: {},
    children: [
        ['one', 'two', 'three', 'four', 'five', 'six'],
        [{
            id: 'child1-id',
            name: 'child1-name',
            www: '',
            testdel: 'del',
            testadd: 'add',
        }, {
            id: 'child2-id',
            name: 'child2-name',
            testdel: 'del',
            testadd: 'add',
        }]
    ]
};

let data2 = {
    id: 'data2-id',
    name: 'data2-name',
    data: {
        test: '2',
        newadd: 'uu',
        ooo: 'ooo',
        opop: 123
    },
    children: [
        ['two', 'three', 'four', 'five', 'three'],
        [{
            id: 'child1-id',
            name: 'child1-1-name',
            www: '',
            testdel: 'del',
            testadd: 'add',
        }, {
            id: 'child2-id',
            name: 'child2-name',
            testadd: 'add',
        }, {
            id: 'child3-id',
            name: 'child3-name',
        }, {
            id: 'child4-id',
            name: 'child4-name',
        }]
    ]
}

// function createObject(deep, breadth, end = 'end') {
//     var tmp;
//     var result = tmp = {};
//     for (var i = 0; i < deep; i++) {
//         tmp = tmp['data'] = {};
//         for (var j = 0; j < breadth; j++) {
//             tmp[j] = j
//         }
//     }
//     tmp['end'] = end
//     return result;
// }
// data1 = createObject(100, 30, 'data1')
// data2 = createObject(100, 30, 'data2')
console.log('@##########################@');
let records = []
let li1 = ['one', 'two', 'three', 'four', 'five', 'six'];
let li2 = ['two', 'three', 'four', 9, 'five', 'three']
differ.compare(data1, data2).exportLog(record => {
    records = record;
}).compare(li1, li2).exportLog(record => {
    records.push(...record);
}).replay(data => {
    console.log('data1 ::', deepequal(data, data2))
    console.log('data2 ::', JSON.stringify(data))
}, records).getDiff()
// console.log('data::',  differ.similarity(data1, data2))

console.log('@##########################@');
[
    ["update", {
        "id": "data2-id",
        "name": "data2-name",
        "data": {
            "test": "2"
        },
        "children": {
            "1": {
                "0": {
                    "name": "child1-1-name"
                }
            }
        }
    }],
    ["add", {
        "data": {
            "newadd": "uu",
            "ooo": "ooo",
            "opop": 123
        }
    }],
    ["del", {
        "data": ["id", "uuu", "aa", "bb"],
        "info": {},
        "children": {
            "1": {
                "1": "testdel"
            }
        }
    }],
    ["myers-diff", ["children", 0],
        [
            ["del", 0],
            ["update", 5, "three"]
        ]
    ],
    ["myers-diff", ["children", 1],
        [
            ["add", 2, {
                "id": "child3-id",
                "name": "child3-name"
            }, {
                "id": "child4-id",
                "name": "child4-name"
            }]
        ]
    ]
]