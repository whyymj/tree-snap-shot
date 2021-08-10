const similarity = require('./dist/index').similarity
const Immutable = require('immutable')
// let data1 = Immutable.fromJS({
//     data: {
//         id:1
//     }
// })

let data1 = {
  id: 'data1-id',
  name: 'data1-name',
  test: 0,
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
  name: 'data1-name',
  test: 0,
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

console.log(similarity({
  id: 1,
  test: 'test',
  children: [{
    ids: 'child1',
    name: 'child1',
  }],
  list: [0, 1, 2, [1, 2, 3, 8]]
}, {
  id: 1,
  name: 2,
  test: 'test',
  children: [{
    ids: 'child1',
    name: 'child1',
    ss: '123'
  }],
  list: [0, 1, 2, [1, 2, 3, 9], 6]
})) 