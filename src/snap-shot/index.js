import Immutable from 'immutable'
class Logs {
    logs = [];
    push(log) { //增
        this.logs.push(log)
    }
    remove(callback) { //删
        this.logs = this.logs.filter(item => {
            if (item.operation == 'init') {
                return true
            }
            return callback(item) === false ? false : true;
        })
    }
    update(callback) { //改
        this.logs = this.logs.map(item => {
            return callback(item) || item
        })
    }
    check() { //查
        return this.logs.filter(item => {
            return item.operation != 'init';
        })
    }
    init(list = []) {
        if (Array.isArray(list)) {
            this.logs = list
        } else {
            throw new Error('请输入正确的log')
        }
    }
}

function mergeLog(data = {}, operations) {

    if (typeof data == 'object') {

        operations.forEach(oper => {
            let path = oper.path;
            let type = oper.type;
            let child = data;
            path.map((value, key) => {
                if (typeof child[value] != 'object') {
                    if (type.get(`${key+1}`) == 'array') {
                        child[value] = []
                    } else if (type.get(`${key+1}`) == 'object') {
                        child[value] = {}
                    }
                }
                child = child[value];
            })
            if (oper.operation == 'add') {
                child[path.get(path.size - 1)] = Immutable.isImmutable(oper.value.to) ? oper.value.to.toJS() : oper.value.to;

            } else if (oper.operation == 'update') {
                child[path.get(path.size - 1)] = Immutable.isImmutable(oper.value.to) ? oper.value.to.toJS() : oper.value.to;

            } else if (oper.operation == 'delete') {
                delete child[path.get(path.size - 1)];

            }
        })
    } else {
        throw new Error('请输入Object')
    }
    return data

}
const Log = new Logs();
class Logger {
    cache = {
        add: null,
        del: null,
        update: null,
    }
    constructor() {
        Log.init()
    }
    add(log) {
        // if (!this.cache.add) {
        //     if (log.path.type.get(0) == 'object') {
        //         this.cache.add = {}
        //     } else if (log.path.type.get(0) == 'array') {
        //         this.cache.add = []
        //     } else {
        //         throw new Error('未知的类型')
        //     }
        // }
        // if (log.operation == 'add') {

        //     log.path.map((value, key) => {
        //         log.path.type.get(`${key+1}`)
        //         if (log.path.type.get(0) == 'object') {
        //             this.cache.add = {}
        //         } else if (log.path.type.get(0) == 'array') {
        //             this.cache.add = []
        //         } else {
        //             throw new Error('未知的类型')
        //         }
        //     })

        // } else if (log.operation == 'del') {

        // } else if (log.operation == 'update') {

        // } else {

        // }
        Log.push(log);
    }
    init(data) {
        Log.init()
        Log.push({
            operation: 'init',
            value: data
        })
    }
    getDiffs() {
        let logs = Log.check()
        logs.toString = () => JSON.stringify(logs.map(item => {
            return Immutable.fromJS(item).toJS()
        }))
        return logs
    }
    setLogs(logs) {
        Log.init(logs);
    }
}
export default new Logger();