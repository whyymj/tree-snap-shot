'use strict';
const immutable = require('immutable')
const deepequal = require('deep-equal')
const differ = require('./dist/index')
let li1 = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
let li2 = ['one', 'two', 56, 'five', 'six', 'seven7', 'eight', 'ten', 'nine', 'ooo']
let fun =function fun(){}
let data1 = {
    id: 'data1-id',
    name: 'data1-name',
    data: {
        test: 'null',
        id: 'data',
        uuu: 1,
        aa: {
            id: 'aa'
        },
        bb: {
            id: 'aa'
        }
    },
    info: {
        info1: '',
    },
    fun,
    children: [
        li1,
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
        test: {

        },
        newadd: 'uu',
        ooo: 'ooo',
        opop: 123,
        aa: 9
    },
    field: ',,',
    fun: () => {},
    children: [
        li2,
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


console.log('@##########################@');
let record1 = []
let record2 = []
let tmp;
let test1 = {},
    test2 = {}
differ.compare(data1, data2).exportLog(record => {
    record1 = record
    console.log(record.toString())
}).replay(record1, test1)
console.log('data1 ::', deepequal(test1, data2))
differ.rollback(record1, test1)
console.log('data2 ::', deepequal(test1, data1))
console.log('@##########################@');
[
    ["init", {
        "id": "data1-id",
        "name": "data1-name",
        "data": {
            "test": "null",
            "id": "data",
            "uuu": 1,
            "aa": {
                "id": "aa"
            },
            "bb": {
                "id": "aa"
            }
        },
        "info": {
            "info1": ""
        },
        "children": [
            ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"],
            [{
                "id": "child1-id",
                "name": "child1-name",
                "www": "",
                "testdel": "del",
                "testadd": "add"
            }, {
                "id": "child2-id",
                "name": "child2-name",
                "testdel": "del",
                "testadd": "add"
            }]
        ]
    }],
    ["update", {
        "id": "data2-id",
        "name": "data2-name",
        "data": {
            "test": {},
            "aa": 9
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
        "field": ",,",
        "data": {
            "newadd": "uu",
            "ooo": "ooo",
            "opop": 123
        }
    }],
    ["del", {
        "data": ["id", "uuu", "bb"],
        "info": null,
        "children": {
            "1": {
                "1": "testdel"
            }
        }
    }],
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
    ],
    ["myers-diff", ["children"],
        [
            ["update", 0, ["one", "two", 56, "five", "six", "seven7", "eight", "ten", "nine", "ooo"]]
        ]
    ]
]
console.log('...',JSON.stringify({fun(){}}))