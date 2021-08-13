const {
  similarity,
  diff,
  reader
} = require('./dist/index')
const Immutable = require('immutable')


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


console.log('@##########################@')
// reader(similarity([{
//   list: [{
//     name: 'child1-1',
//     text: '111',
//     uuu: '123',
//     oo: '00'
//   }, {
//     name: 'child1-2',
//     text: '222',
//     uuu: '555'
//   }]
// }], [1, {
//   list: [{
//     name: 'child1-1',
//     text: '111',
//     uuu: '123'
//   }, {
//     name: 'child1-2',
//     text: '222',
//     uuu: '555'
//   }]
// }]), ';;;;;;;;;;;;;')
reader(similarity([{
  name: 'child1-1',
  text: '111',
  uuu: '123',
  oo: '00'
}, {
  name: 'child1-2',
  text: '222',
  uuu: '555'
}], [{
  name: 'child1-1',
  text: '111',
  uuu: '123'
}, {
  name: 'child1-2',
  text: '222',
  uuu: '555'
}]), ';;;;;;;;;;;;;')
console.log('@##########################@');
