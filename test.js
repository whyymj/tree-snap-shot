const {
  similarity,
  diff
} = require('./dist/index')
const Immutable = require('immutable')

function reader(list) {
  return JSON.stringify(Immutable.fromJS(list).toJS())
}
let data1 = [1, 2, {
  name: 'child1',
  children: [
    [1],
    [{
      name: 'child1-1',
      text: '111',
      uuu: '123'
    }, {
      name: 'child1-2',
      text: '222',
      uuu: '555'
    }]
  ]
}]
let data2 = [1, 2, {
  name: 'child1',
  children: [
    [{
      name: 'child1-1',
      text: '111',
      uuu: '123'
    }, {
      name: 'child1-2',
      text: '222',
      uuu: '555'
    }]
  ]
}]

console.log('+++++++++++++++++++++++++++++++')
console.log(reader(similarity([
  1,
  [{
    name: 'child1-1',
    text: '111',
    uuu: '123'
  }, {
    name: 'child1-2',
    text: '222',
    uuu: '555'
  }]
], [
  [{
    name: 'child1-1',
    text: '111',
    uuu: '123'
  }, {
    name: 'child1-2',
    text: '222',
    uuu: '555'
  }]
])));



[{
  "path": [],
  "type": [],
  "operation": "myers-diff",
  "steps": [{
    "operation": "del",
    "value": {
      "name": "child1",
      "children": [
        [1],
        [{
          "name": "child1-1",
          "text": "111",
          "uuu": "123"
        }, {
          "name": "child1-2",
          "text": "222",
          "uuu": "555"
        }]
      ]
    },
    "index": [2, 2]
  }, {
    "operation": "add",
    "value": {
      "name": "child1",
      "children": [
        [{
          "name": "child1-1",
          "text": "111",
          "uuu": "123"
        }, {
          "name": "child1-2",
          "text": "222",
          "uuu": "555"
        }]
      ]
    },
    "index": [3, 2]
  }]
}]