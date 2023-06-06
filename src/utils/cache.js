class MemoryStorage {
    constructor() {
        this.data = {}
    }
    set(name, value) {
        this.data[name] = value
    }
    get(name) {
        return this.data[name]
    }
    remove(name) {
        delete this.data[name]
    }
    contains(name) {
        return name in this.data
    }
    clear() {
        this.data.clear()
    }
}


let localStorage, sessionStorage
try {
    localStorage = window.localStorage
    sessionStorage = window.sessionStorage
} catch {
    localStorage = new MemoryStorage() // 不支持localStorage时回退到内存存储
    sessionStorage = new MemoryStorage()
}
