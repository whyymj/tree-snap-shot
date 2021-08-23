import Immutable from 'immutable'
import {
    shape,
    reset
} from './log-shaper'
class Logs {
    mergeLog = {}
    log = [];
    cache = [];
    push(log) { //增
        switch (log.operation) {
            case 'add':
            case 'update':
            case 'del':
                this.mergeLog[log.operation] = shape(this.mergeLog[log.operation], log, [log.operation]); //['add/update', deep-merge-value]
                return;
            case 'myers-diff':
                this.log.push([log.operation, log.path, log.steps]);
                return;
            case 'init':
                this.log.push([log.operation, log.value]);
                return;
        }
    }
    remove(callback) { //删
        for (let k in this.mergeLog) {
            if (callback(['' + k, this.mergeLog[k]]) === false) {
                delete this.mergeLog[k];
            }
        }
        this.log = this.log.filter(item => {
            return callback(item) === false ? false : true;
        })
    }
    update(callback) { //改
        for (let k in this.mergeLog) {
            if (callback(this.mergeLog[k]) === false) {
                delete this.mergeLog[k];
            }
        }
        this.log = this.log.map(item => {
            return callback(item) || item
        })
    }
    getDiff() { //查
        return this.exportLog().filter(item => {
            return item[0] != 'init';
        });
    }
    exportLog() {
        if (this.cache.length) {
            return this.cache
        }
        let result = this.log.filter(item => item[0] != 'init');
        if (this.mergeLog.del) {
            result.unshift(['del', this.mergeLog.del])
        }
        if (this.mergeLog.add) {
            result.unshift(['add', this.mergeLog.add])
        }
        if (this.mergeLog.update) {
            result.unshift(['update', this.mergeLog.update])
        }
        result.unshift(this.log[0])
        this.cache = result;
        return result;
    }

    init(list = []) {
        this.mergeLog = {}
        this.cache = []
        this.log = []
        if (Array.isArray(list)) {
            this.log = list
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
    replay(callback, log) {
        if (Array.isArray(log)) {
            Log.init(log)
        } else {
            log = Log.exportLog();
        }

        if (!log[0]) {
            throw new Error('初始化出错了！请输入有效snap-shot')
        }

        if (log[0][0] == 'init' && typeof log[0][1] == 'object') {
            let data = log[0][1];
            if (Immutable.isImmutable(data)) {
                data = data.toJS();
            }
            let res = reset(data, Immutable.fromJS(log).toJS())
            typeof callback == 'function' && callback(res)
        } else {
            let err = log[0][0]
            try {
                throw new Error('初始化出错了！log[0]=' + JSON.stringify(err))
            } catch (e) {
                throw new Error('初始化出错了！log[0]=', err)
            }
        }
        return this
    }
    getDiff(callback) {//供人查看
        let log = Log.getDiff();
        Object.getPrototypeOf(log).toString = toString;
        typeof callback == 'function' && callback(Immutable.fromJS(log).toJS())
        return this;
    }
    exportLog(callback) {//导出记录
        let tmp = Log.exportLog();
        Object.getPrototypeOf(tmp).toString = toString;
        typeof callback == 'function' && callback(tmp)
        return this;
    }
}
Logger.prototype.init = (data) => {
    Log.init()
    Log.push({
        operation: 'init',
        value: data
    })
}
Logger.prototype.add = (log) => {
    Log.push(log);
}
export default new Logger();