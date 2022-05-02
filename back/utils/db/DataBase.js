const md5 = require('md5');
const AutoIncrementUniqueCollection = require('../collections/AutoIncrementUniqueCollection.js')

const demoUsers = [
    {
        login: 'admin',
        password: md5('admin')
    },
    {
        login: 'test',
        password: md5('test')
    }
]

class DataBase {
    constructor() {
        this.users = new AutoIncrementUniqueCollection()
        this.profiles = []
        this.content = []
        this.likes = []
        this.friends = []

        demoUsers.forEach(user => {
            this.users.push(user.login, user)
        })
    }

    register(login, password) {
        return this.users.push(login, {login, password})
    }

    findAccount(login) {
        return this.users.findByKey(login)
    }

    findAccountById(id) {
        return this.users.findById(id)
    }
}

module.exports = DataBase