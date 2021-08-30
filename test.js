'use strict';
const immutable = require('immutable')
const deepequal = require('deep-equal')
const snapshot = require('./dist/index')

let AA = {
    // a: 'a',
    // b: 'b',
    // c: 'c',
    // child: {
    //     id: 'child',
    //     name: 'child',
    //     child1: {
    //         id: 'child1',
    //         name: 'child1',
    //         child2: {
    //             name: 'child2',
    //             id: 'child2',
    //         }
    //     }
    // },
    list: [
        ['a', 'b', 'c', 'd', 'e'], 1, 2, {
            arr: [{
                child: 1,
                name: 1,
                id: 1
            }, 1, 2, 3, 5, 6],
            oo: 0,
            // aa: [1, 2, 3, 4, 5, 6, null]
        }
    ]
}
let BB = {
    // a: 'a',
    // e: 'b',
    // cc: 'cc',
    // child: {
    //     id: 'child',
    //     name: 'child',
    //     child1: {
    //         id: 'child1',
    //         name: 'child-1',
    //         child2: {
    //             name: 'child2',
    //             id: 'child1-2',
    //         }
    //     }
    // },
    list: [
        ['a', 'b', 'c', 'd', 'e'], 1, 2, {
            arr: [{
                child: 1,
                name: 2,
                id: 1
            }, 0, 2, 3, 5, 6],
            // aa: [1, 2, 3, 4, 5, 66, [0, 1, 2, 3, 45, 5]]
        }
    ]
}
let diffs = '';
snapshot.compare(AA, BB, {
    maxDepth: 2,
    ignore(path, type) {
        // console.log('>>>>>>>>', path, type)
    }
}).exportLog(df => {
    diffs = df
    console.log(JSON.stringify(df))
})
// .replay(diffs, AA).compare(AA, BB).getDiff(df => {
//     // console.log(JSON.stringify(df))
// });


console.log('>>>>', deepequal(AA, BB), AA == BB);
[
    ["update", {
        "list": {
            "3": {
                "arr": [{
                    "child": 1,
                    "name": 2,
                    "id": 1
                }, 0, 2, 3, 5, 6]
            }
        }
    }]
]