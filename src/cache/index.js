
import Immutable from "immutable"
import Config from '../config/index.js'

class CacheResult {
    cache = {}
    throttle=null;
    set(a, b, c) {
        if (Immutable.isImmutable(a) && Immutable.isImmutable(b)) {
            this.cache[Immutable.hash(a) + '_' + Immutable.hash(b)] = c
        } else if (Immutable.isImmutable(a) && b !== undefined) {
            this.cache[Immutable.hash(a)] = b
        }
        
    }
    get(a, b) {
        if (Immutable.isImmutable(a) && Immutable.isImmutable(b)) {
            return this.cache[Immutable.hash(a) + '_' + Immutable.hash(b)]
        } else if (Immutable.isImmutable(a) && b === undefined) {
            return this.cache[Immutable.hash(a)]
        }
        return null;
    }
    size(){
        return Object.getOwnPropertyNames(this.cache).length;
    }
    clear() {
        this.cache = {}
    }
    start() {
        clearTimeout(this.throttle);
        this.throttle = setTimeout(()=>{
            this.clear()
        },Config.global.cacheSurvivalTime)
    }
}
export default new CacheResult()