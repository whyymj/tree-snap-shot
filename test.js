const immutable = require('immutable')

const {
    similarity,
    diff,
    log
} = require('./dist/index')

let data1 = {
    id: 'data1-id',
    name: 'data1-name',
    data: {
        test: 1,
        id: 'data',

    },
    children: [
        [1, 2, 3, 4, 5, 6], {
            id: 'child1-id',
            name: 'child1-name',
            www: ''
        }, {
            id: 'child2-id',
            name: 'child2-name',
        }
    ]
}
let data2 = {
    id: 'data2-id',
    name: 'data2-name',
    data: {
        test: '2',
        newadd: 'uu'
    },
    children: [
        [1, 2, 3, 4, 5, 3], {
            id: 'child1-id',
            name: 'child1-1-name',
            www: ''
        }, {
            id: 'child2-id',
            name: 'child2-name',
        }, {
            id: 'child3-id',
            name: 'child2-name',
        }
    ]
}

console.log('@##########################@');
diff(data1, data2)
console.log(log.getLog().toString(), ';;;;;;;;;;;;;');

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
            "newadd": "uu"
        }
    }],
    ["del", ["data", "id"]],
    ["myers-diff", ["children"],
        [
            ["add", 3, {
                "id": "child3-id",
                "name": "child2-name"
            }]
        ]
    ]
]