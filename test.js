const immutable = require('immutable')

const {
    similarity,
    diff,
} = require('./dist/index')


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

function mergeLog(data = {}, operations) {

    if (typeof data == 'object') {
        operations.forEach(oper => {
            let path = oper.path;
            let type = oper.type;
            let child = data;
            path.map((value, key) => {
                if (type.get(`${key+1}`) == 'array') {
                    if (typeof child[value] != 'object') {
                        child[value] = []
                        child = child[value];
                    }
                } else if (type.get(`${key+1}`) == 'object') {
                    if (typeof child[value] != 'object') {
                        child[value] = {}
                        child = child[value];
                    }
                }
            })
            if (oper.operation == 'add') {
                child[path.get(path.size - 1)] = immutable.isImmutable(oper.value.to) ? oper.value.to.toJS() : oper.value.to;

            } else if (oper.operation == 'update') {
                child[path.get(path.size - 1)] = immutable.isImmutable(oper.value.to) ? oper.value.to.toJS() : oper.value.to;

            } else if (oper.operation == 'delete') {
                delete child[path.get(path.size - 1)];
            }
        })
    } else {
        throw new Error('请输入Object')
    }
    return data

}



console.log('@##########################@')
// console.log(diff(data1, data2).getDiffs().toString(), ';;;;;;;;;;;;;')

console.log(JSON.stringify(mergeLog({}, diff(data1, data2).getDiffs())));

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