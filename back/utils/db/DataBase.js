const AutoIncrementUniqueCollection = require('../collections/AutoIncrementUniqueCollection.js')

class DataBase {
    constructor() {
        this.users = new AutoIncrementUniqueCollection()
        this.profiles = []
        this.content = []
        this.likes = []
        this.friends = []
    }

    register(login, password) {
        return this.users.push(login, {login, password})
    }
}

module.exports = DataBase