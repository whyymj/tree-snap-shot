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
// diff(data1, data2)
// console.log(log.getDiff().toString(), ';;;;;;;;;;;;;');

console.log('@##########################@');
let opers = [
    // ["update", {
    //     "id": "data2-id",
    //     "name": "data2-name",
    //     "data": {
    //         "test": "2"
    //     },
    //     "children": {
    //         "1": {
    //             "name": "child1-1-name"
    //         }
    //     }
    // }],
    // ["add", {
    //     "data": {
    //         "newadd": "uu"
    //     }
    // }],
    // ["del", ["data", "id"]],
    ["myers-diff", ["children", 0],
        [
            ["update", 5, 3]
        ]
    ],
    // ["myers-diff", ["children"],
    //     [
    //         ["add", 3, {
    //             "id": "child3-id",
    //             "name": "child2-name"
    //         }]
    //     ]
    // ]
]

function restoreMap(data, oper) {
    if (typeof data == 'object') {
        if (oper[0] == 'add' || oper[0] == 'update') {
            return deepmerge(data, oper[1])
        } else if (oper[0] == 'del') {
            oper.slice(1).map(paths => {
                let child = data;
                paths.map((val, key) => {
                    if (key < ((paths.length || paths.size) - 1)) {
                        child = child[val]
                    } else {

                        delete child[val]
                    }
                })
            })

        }
    } else {
        throw new Error('请输入Object')
    }
    return data;
}

function restoreList(data, opers = []) {
    let point = 0;
    let paths = opers[1]
    let list = data
    paths.map(path => {
        list = list[path]
    })
    opers[2].forEach(item => {
        console.log('Restoring', item, '>>>>>>>>', list)
        if (item[0] == 'add') {
            list.splice(item[1] + point, 0, ...item.slice(2))
            point += item.length - 2
        } else if (item[0] == 'del') {
            for (let i = 1; i < item.length; i++) {
                list.splice(item[i] + point, 1);
                point--
            }
        } else if (item[0] == 'update') {
            list[item[1] + point] = item[2]
        }
    })
}

function restore(data, opers) {
    opers.map(oper => {
        if (oper[0] == 'add' || oper[0] == 'del' || oper[0] == 'update') {
            restoreMap(data, oper)
        } else if (oper[0] == 'myers-diff') {
            restoreList(data, oper)
        }
    })
    return data
}
console.log(restore(data1, opers))