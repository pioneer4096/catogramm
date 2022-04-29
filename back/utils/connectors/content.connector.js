class ContentConnector {
    constructor(db) {
        this.db = db
    }

    get() {
        return []
    }

    create(data) {
        return true
    }

    like(documentId) {
        return true
    }
}

module.exports = ContentConnector