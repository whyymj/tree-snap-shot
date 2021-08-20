import Immutable from 'immutable'
import config from '../config/index.js'


function mergeLog(data = {}, operations, opers = ['add', 'update']) {
    if (typeof data == 'object') {
        if (!Array.isArray(operations)) {
            operations = [operations]
        }
        operations.map(oper => {
            if (opers.includes(oper.operation)) {
                let paths = oper.path;
                let types = oper.type;
                let child = data;
                paths.map((val, key) => {
                    let type = Immutable.isImmutable(types) ? types.get(key + 1) : types[key + 1]
                    if (type == 'object' || type == 'array') {
                        if (!child[val]) {
                            child[val] = {}
                        }
                        child = child[val]
                    } else {
                        child[val] = Immutable.isImmutable(oper.value.to) ? oper.value.to.toJS() : oper.value.to;
                    }
                })

            }

        })
    } else {
        throw new Error('请输入Object')
    }
    return data
}

function restoreMap(data, operations) {
    if (typeof data == 'object') {
        if (!Array.isArray(operations)) {
            operations = [operations]
        }
        operations.map(oper => {
            if (oper[0] == 'add' || oper[0] == 'update') {
                config.unImmutableData.merge(data, oper[1])
            } else if (oper[0] == 'del') {
                oper.slice(1).map(paths => {
                    let child = data;
                    paths.map((val, key) => {
                        if (key < ((paths.length || paths.size) - 1)) {
                            child = child[val]
                        } else {
                            delete child[val]
                        }
                    })
                })

            }


        })
    } else {
        throw new Error('请输入Object')
    }
    return data;
}

function restoreList(data, opers = []) {
    let point = 0;
    let paths = opers[1]
    let list = data
    paths.map(path => {
        list = list[path]
    })
    opers[2].forEach(item => {
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
}

function restore(data, opers) {
    opers.map(oper => {
        if (oper[0] == 'add' || oper[0] == 'del' || oper[0] == 'update') {
            restoreMap(data)
        } else if (oper[0] == 'myers-diff') {
            restoreList(data)
        }
    })
}
class Logs {
    mergeLog = {
        delete: [],
    }
    logs = [];
    push(log) { //增
        switch (log.operation) {
            case 'add':
                this.mergeLog.add = mergeLog(this.mergeLog.add, log, ['add']);
                return;
            case 'update':
                this.mergeLog.update = mergeLog(this.mergeLog.update, log, ['update']);
                return;
            case 'delete':
                this.mergeLog.delete.push(log.path);
                return;
            case 'myers-diff':
                this.logs.push([log.operation, log.path, log.steps]);
                return;
            case 'init':
                this.logs.push([log.operation, log.steps]);
                return;
        }
    }
    remove(callback) { //删
        this.logs = this.logs.filter(item => {
            return callback(item) === false ? false : true;
        })
    }
    update(callback) { //改
        this.logs = this.logs.map(item => {
            return callback(item) || item
        })
    }
    getDiff() { //查
        return this.getLogs().filter(item => {
            return item[0] != 'init';
        });
    }
    getLogs() {
        let result = this.logs;
        if (this.mergeLog.delete.length) {
            result.unshift(['del', ...this.mergeLog.delete])
        }
        if (this.mergeLog.add) {
            result.unshift(['add', this.mergeLog.add])
        }
        if (this.mergeLog.update) {
            result.unshift(['update', this.mergeLog.update])
        }
        return result;
    }

    init(list = []) {
        if (Array.isArray(list)) {
            this.logs = list
        } else {
            throw new Error('请输入正确的log')
        }
    }
}


const Log = new Logs();

function toString() {
    return JSON.stringify(this.map(item => {
        return Immutable.fromJS(item).toJS()
    }))
}
class Logger {
    constructor() {
        Log.init()
    }
    reset(data = {}, operations) {
        return mergeLog(data, operations)
    }
    add(log) {
        Log.push(log);
    }
    init(data) {
        Log.init()
        Log.push({
            operation: 'init',
            value: data
        })
    }
    getDiff() {
        let logs = Log.getDiff();
        logs.toString = toString;
        return logs
    }
    setLogs(logs) {
        Log.init(logs);
    }
}
export default new Logger();