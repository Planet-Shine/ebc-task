import lc from 'local-storage';

class StorageList {
    namespace = null;
    constructor (namespace) {
        this.namespace = namespace || null;
    }
    incrementCount () {
        var count = this.getCount();
        lc(`${this.namespace}#count`, count + 1);
    }
    getCount() {
        return lc(`${this.namespace}#count`) || 0;
    }
    getNextId () {
        return this.getCount()
    }
    setItem(...args) {
        var id,
            item;
        if (args.length === 1) {
            item = args[0];
            id   = this.getNextId();
        } else {
            id   = args[0];
            item = args[1]
        }
        lc(`${this.namespace}#${id}`, item);
        this.incrementCount();
    }
    deleteItem(id) {
        return lc.remove(`${this.namespace}#${id}`);
    }
    getAll() {
        var count  = this.getCount(),
            result = [];
        for (let i = 0; i < count; i++) {
            result.push(lc(`${this.namespace}#${i}`));
        }
        result = result.filter((item) => item);
        return result;
    }


}
export default StorageList;
