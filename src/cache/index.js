
import Immutable from "immutable"
class CacheResult {
    cache = {}
    set(a, b, res) {
        if (Immutable.isImmutable(a) && Immutable.isImmutable(b)) {
            this.cache[Immutable.hash(a) + '_' + Immutable.hash(b)] = res
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
    clear() {
        this.cache = {}
    }
}
export default new CacheResult()