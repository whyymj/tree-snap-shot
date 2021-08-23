const immutable = require('immutable')
const {
    similarity,
    diff,
    log,
    deepmerge
} = require('./dist/index')
let data1 = {
    id: 'data1-id',
    name: 'data1-name',
    data: {
        test: 1,
        id: 'data',
        uuu: 1
    },
    children: [
        ['one', 'two', 'three', 'four', 'five', 'six'], {
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
        }
    ]
}
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
        ['two', 'three', 'four', 'five', 'three'], {
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
        }
    ]
}

data1=['one', 'two', 'three', 'four', 'five', 'six'];
data2=['two', 'three', 'four', 'five', 'three']
console.log('@##########################@');
diff(data1, data2);
console.log('>>>>>', log.getDiff().toString());
let res = log.reset()
console.log(res, immutable.is(immutable.fromJS(res), immutable.fromJS(data2)), ';;;;;;;;;;;;;',similarity(data1,data2));

console.log('@##########################@');
[
    ["update", {
        "id": "data2-id",
        "name": "data2-name",
        "data": {
            "test": "2"
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
        "data": ["id", "uuu"]
    }],
    ["myers-diff", ["children"],
        [
            ["add", 3, {
                "id": "child3-id",
                "name": "child3-name"
            }, {
                "id": "child4-id",
                "name": "child4-name"
            }]
        ]
    ]
]