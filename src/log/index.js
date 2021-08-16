import Immutable from 'immutable'
class Logger {
    logs = []
    add(log) {
        this.logs.push(log)
    }
    getLogs() {
        return Immutable.fromJS(this.logs).toJS()
    }
    clear() {
        this.logs.length = 0;
    }
}
export default new Logger();