const immutable = require('immutable')

const {
    similarity,
    diff,
} = require('./dist/index')

let opers = [{
    "path": ["id"],
    "type": ["object", "string"],
    "operation": "update",
    "value": {
        "from": "data1-id",
        "to": "data2-id"
    }
}, {
    "path": ["name"],
    "type": ["object", "string"],
    "operation": "update",
    "value": {
        "from": "data1-name",
        "to": "data2-name"
    }
}, {
    "path": ["data", "test"],
    "type": ["object", "object", "number"],
    "operation": "delete",
    "value": {
        "from": 1,
        "to": "2"
    }
}, {
    "path": ["children", 0],
    "type": ["object", "array", "array"],
    "operation": "myers-diff",
    "steps": [{
        "operation": "del",
        "value": 6,
        "index": [5, 5]
    }, {
        "operation": "add",
        "value": 3,
        "index": [6, 5]
    }]
}, {
    "path": ["children", 1, "name"],
    "type": ["object", "array", "object", "string"],
    "operation": "update",
    "value": {
        "from": "child1-name",
        "to": "child1-1-name"
    }
}, {
    "path": ["children"],
    "type": ["object", "array"],
    "operation": "myers-diff",
    "steps": [{
        "operation": "add",
        "value": {
            "id": "child3-id",
            "name": "child2-name"
        },
        "index": [3, 3]
    }]
}]

function mergeLog(data = {}, operations) {
    if (typeof data == 'object') {
        operations.forEach(oper => {
            if (oper.operation == 'add' || oper.operation == 'update') {
                let paths = oper.path;
                let types = oper.type;
                let child = data;
                for (let i = 1; i < types.length; i++) {
                    if (types[i] == 'object' || types[i] == 'array') {
                        if (!child[paths[i - 1]]) {
                            child[paths[i - 1]] = {}
                        }
                        child = child[paths[i - 1]]
                    } else {
                        child[paths[i - 1]] = oper.value.to;
                        break;
                    }
                }
            }

        })
    } else {
        throw new Error('请输入Object')
    }
    return data
}

function delLog(data = {}, operations) {
    if (typeof data == 'object') {
        operations.forEach(oper => {
            if (oper.operation == 'delete') {
                let paths = oper.path;
                let types = oper.type;
                let child = data;
                for (let i = 1; i < types.length; i++) {
                    if (types[i] == 'object' || types[i] == 'array') {
                        if (!child[paths[i - 1]]) {
                            child[paths[i - 1]] = {}
                        }
                        child = child[paths[i - 1]]
                    } else {
                        child[paths[i - 1]] = oper.value.to;
                        break;
                    }
                }
            }

        })
    } else {
        throw new Error('请输入Object')
    }
    return data
}

let data1 = {
    id: 'data1-id',
    name: 'data1-name',
    data: {
        test: 1
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
        test: '2'
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




console.log('@##########################@')
console.log(diff(data1, data2).getDiffs().toString(), ';;;;;;;;;;;;;')

// console.log(JSON.stringify(mergeLog({}, opers)));
// console.log('================')
// console.log(JSON.stringify(delLog({}, opers)));
console.log('@##########################@');

[{
    "path": ["id"],
    "type": ["object", "string"],
    "operation": "update",
    "value": {
        "from": "data1-id",
        "to": "data2-id"
    }
}, {
    "path": ["name"],
    "type": ["object", "string"],
    "operation": "update",
    "value": {
        "from": "data1-name",
        "to": "data2-name"
    }
}, {
    "path": ["data", "test"],
    "type": ["object", "object", "number"],
    "operation": "update",
    "value": {
        "from": 1,
        "to": "2"
    }
}, {
    "path": ["children", 0],
    "type": ["object", "array", "array"],
    "operation": "myers-diff",
    "steps": [{
        "operation": "update",
        "value": [6, 3],
        "index": [5, 5]
    }]
}, {
    "path": ["children", 1, "name"],
    "type": ["object", "array", "object", "string"],
    "operation": "update",
    "value": {
        "from": "child1-name",
        "to": "child1-1-name"
    }
}, {
    "path": ["children"],
    "type": ["object", "array"],
    "operation": "myers-diff",
    "steps": [{
        "operation": "add",
        "value": {
            "id": "child3-id",
            "name": "child2-name"
        },
        "index": [3, 3]
    }]
}]