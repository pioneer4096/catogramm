class AuthConnector {
    constructor(db) {
        this.db = db
    }

    register(login, password) {
        return this.db.register(login, password)
    }

    login() {

    }
}

module.exports = AuthConnector