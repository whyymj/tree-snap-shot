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


let li1=[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
let li2=[1, '12', '22', '32', 2, 4, 8, 9, 'oooo']
function resore(list, opers = []) {

    let point = 0;
    opers.forEach(item => {
        if (item[0] == 'add') {
            list.splice(item[1] + point, 0, ...item.slice(2))
            point += item.length - 2
        } else if (item[0] == 'del') {
            for (let i = 1; i < item.length; i++) {
                list.splice(item[i] + point, 1);
                point--
            }
        } else if (item[0] == 'update') {
            list[item.index + point] = item.value
        }
    })
    return list;
}
let opers = [{
    "path": [],
    "type": ["array"],
    "operation": "myers-diff",
    "steps": [
        ["del", 0],
        ["add", 2, "12", "22", "32"],
        ["del", 3, 5, 6, 7],
        ["add", 10, "oooo"]
    ]
}]
console.log('@##########################@');
// diff(li1, li2)
// console.log(log.getLog().toString(), ';;;;;;;;;;;;;')

console.log(immutable.is(immutable.fromJS(resore(li1, opers[0].steps)),immutable.fromJS(li2)))
console.log('@##########################@');