class AutoIncrementUniqueCollection {
    constructor() {
        this.counter = 1
        this.collection = []
    }

    push(uniqueKey, data) {
        const key = uniqueKey.toLowerCase()
        const element = this.collection.find(el => el.key === key)
        if(element) {
            throw new Error(`Key ${key} already exists`)
        }
        else {
            const id = this.counter++
            const collectionElement = {
                ...data,
                key: uniqueKey,
                id
            }
            this.collection.push(collectionElement)
            return id
        }
    }
}

module.exports = AutoIncrementUniqueCollection