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

let opers = [{
    "operation": "deep-merge-update",
    "value": {
        "id": "data2-id",
        "name": "data2-name",
        "data": {
            "test": "2"
        },
        "children": {
            "1": {
                "name": "child1-1-name"
            }
        }
    }
}, {
    "operation": "deep-merge-add",
    "value": {
        "data": {
            "newadd": "uu"
        }
    }
}, {
    "path": ["data", "id"],
    "operation": "delete",
    "type": ["object", "object", "string"],
    "value": {
        "from": "data"
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


console.log('@##########################@');
diff(data1, data2)
console.log(log.getLog().toString(), ';;;;;;;;;;;;;')

console.log('@##########################@');