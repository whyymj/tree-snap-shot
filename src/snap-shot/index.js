import Immutable from 'immutable'
class Logger {
    logs;
    repositories;
    constructor() {
        this.logs=Immutable.List([])
        this.repositories=Immutable.List([])
    }
    record(log) {
        this.logs.push(log)
    }
    init(data) {
        this.logs.length = 0;
        this.logs.push({
            operation: 'init',
            value: data
        })
    }
    commit(commit) {
        this.repositories.push({
            timestamp: new Date().getTime(),
            commit,
            reflogs:this.logs
        })
    }
    getLogs() {
        return Immutable.fromJS(this.logs).toJS()
    }
    clear() {
        this.logs.length = 0;
    }
}
export default new Logger();