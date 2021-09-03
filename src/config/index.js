class Config {
    constructor() {
        let that=this;
        this.unImmutableData = { //非常规对象的处理函数，Map,Set等immutable.js无法转化的类型
            equal(a, b) {
                if (typeof that.global.equal == 'function') {
                    return that.global.equal(a, b)
                }
                return a === b;
            },
            copy(data) {
                if (typeof that.global.copy == 'function') {
                    return that.global.copy(data)
                }
                return data
            },
        }
    }
    global = {
        maxDepth: 20, //最大递归深度
        ignore: null, //RegExp,Function,'',null,undefined
        copyIfDiff: null, //FUnction(path,data),Boolean
        listKey: 'id',
        listItemSimiliarity: 0.6, //[0.1,1.0]
    }
    set(options) {
        this.global.maxDepth = (options.maxDepth ? parseInt(options.maxDepth) : 20) || 20;
        this.global.listKey = options.listKey || '_id';
        this.global.listItemSimiliarity = Math.max(options.listItemSimiliarity, 0.1) || 0.6;
        this.global.copyAllIfDiff = options.copyAllIfDiff;
        this.global.ignore = options.ignore;
        this.global.copy = options.copy;
        this.global.equal = options.equal;
    }
}
export default new Config()