class ContentConnector {
    constructor(db) {
        this.db = db
    }

    getFeed(ownerId) {
        return this.db.getPostsById(ownerId)
    }

    create(data) {
        return true
    }

    like(documentId) {
        return true
    }
}

module.exports = ContentConnector