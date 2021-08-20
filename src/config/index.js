import deepmerge from 'deepmerge'
class Config {
    unImmutableData = { //非常规对象的处理函数，Map,Set等immutable.js无法转化的类型
        equal(a, b) {
            return a === b;
        },
        copy(data) {
            return data
        },
        merge(data1,data2) {
            deepmerge(data1,data2)
        }
    }

    list = {
        key: '_id',
        mapSimilarityForDiff: 0.6
    }
    set(options) {

    }
}
export default new Config()