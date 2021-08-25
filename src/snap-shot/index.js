import Immutable from 'immutable'
import deepmerge from '../util/merge'
import {
    shape,
    reset
} from './log-shaper'
import {
    isImmutableStructure
} from '../util/index'
import {
    compare
} from '../diff/index.js'
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

function replay(log, proto) {
    if (Array.isArray(log)) {
        Log.init(log)
    } else {
        throw new Error('请输入快照')
    }

    let childLogs;
    let datas = [];
    let tmp;
    for (let i = 0; i < log.length; i++) {
        tmp = log[i];
        if (tmp[0] == 'init') {
            childLogs = []
            datas.push(childLogs);
            tmp = Immutable.fromJS(tmp).toJS()
            if (isImmutableStructure(proto)) {
                deepmerge(proto, tmp[1]);
            } else {
                proto = tmp[1]
            }
            tmp[1] = proto;
        }
        if (Array.isArray(childLogs)) {
            childLogs.push(tmp);
        }
    }
    datas.map(lg => {
        if (typeof lg[0][1] == 'object') {
            let data = lg[0][1];
            if (Immutable.isImmutable(data)) {
                data = data.toJS();
            }
            reset(data, Immutable.fromJS(lg).toJS())
        }
    })

    return proto
}
class Logger {
    proto = null;
    constructor() {
        Log.init()
    }
    replay(log, proto) { //根据记录前进
        this.proto = replay(log, proto);
        return this
    }
    rollback(log, endProto) { //根据记录回退
        this.reverseLog(log, endProto).exportLog(reverLog => {
            this.replay(reverLog, endProto);
        })
        return this;
    }
    reverseLog(log, endProto) { //反转log
        if (Array.isArray(log)) {
            Log.init(log)
        } else {
            throw new Error('请输入快照')
        }
        if (isImmutableStructure(endProto)) {
            deepmerge(endProto, replay(log))
        } else {
            endProto = replay(log);
        }
        let startProto;
        let tmp;
        for (let i = 0; i < log.length; i++) {
            tmp = log[i];
            if (tmp[0] == 'init') {
                startProto = tmp[1];
                break;
            }
        }
        compare(endProto, startProto)
        return this;
    }
    exportLog(callback) { //导出记录
        let tmp = Log.exportLog();
        Object.getPrototypeOf(tmp).toString = toString;
        typeof callback == 'function' && callback(tmp)
        return this;
    }
}
Logger.prototype.getDiff = function (callback) { //供人查看，用不太到
    let log = Log.getDiff();
    Object.getPrototypeOf(log).toString = toString;
    typeof callback == 'function' && callback(Immutable.fromJS(log).toJS())
    return this;
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