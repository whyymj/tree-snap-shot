const immutable = require('immutable')
const deepequal = require('deep-equal')
const differ = require('./dist/index')
let data1 = {
    id: 'data1-id',
    name: 'data1-name',
    data: {
        test: 1,
        id: 'data',
        uuu: 1
    },
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
let y = {
    "id": "data1-id",
    "name": "data1-name",
    "data": {
        "test": 1,
        "id": "data",
        "uuu": 1
    },
    "children": [
        ["two", "three", "four", "five", "three"],
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
        }, {
            "id": "child3-id",
            "name": "child3-name"
        }, {
            "id": "child4-id",
            "name": "child4-name"
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


console.log('@##########################@');
let record1 = [],
    record2 = [];
let li1 = ['one', 'two', 'three', 'four', 'five', 'six'];
let li2 = ['two', 'three', 'four', 9, 'five', 'three']
differ.compare(data1, data2).exportLog(record => {
    record1 = record;
    console.log('record1::', record1.toString());
}).compare(li1, li2).exportLog(record => {
    record2 = record;
    // console.log('record2::', record)
}).replay(data => {
    console.log('data1 ::', deepequal(data, data2))
}, record1).replay(data => {
    console.log('data2 ::', deepequal(data, li2))
}, record2)


console.log('@##########################@');
[
    ["init", {
        "id": "data1-id",
        "name": "data1-name",
        "data": {
            "test": 1,
            "id": "data",
            "uuu": 1
        },
        "children": [
            ["one", "two", "three", "four", "five", "six"],
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
        "data": ["id", "uuu"],
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