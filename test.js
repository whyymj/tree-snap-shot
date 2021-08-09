const similarity = require('./dist/index').like
const Immutable = require('immutable')
// let data1 = Immutable.fromJS({
//     data: {
//         id:1
//     }
// })
 
let data1 = {
    id: 'data1-id',
    name: 'data1-name',
    test:0,
    data: {
      test: 1
    },
    children: [{
      id: 'child1-id',
      name: 'child1-name',
    }, {
      id: 'child2-id',
      name: 'child2-name',
    }]
  }
  let data2 = {
    id: 'data1-id',
    name: 'data2-name',
    data: {
      test: '2'
    },
    children: [{
      id: 'child1-id',
      name: 'child1-1-name',
    }, {
      id: 'child2-id',
      name: 'child2-name',
    }, {
      id: 'child3-id',
      name: 'child2-name',
    }]
  }
console.log(JSON.stringify(similarity(data1,data2)))