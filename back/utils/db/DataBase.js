const md5 = require('md5');
const AutoIncrementUniqueCollection = require('../collections/AutoIncrementUniqueCollection.js')

const demoUsers = [
    {
        login: 'admin',
        password: md5('admin')
    },
    {
        login: 'alice',
        password: md5('12345')
    },
    {
        login: 'simba',
        password: md5('12345')
    },
    {
        login: 'loki',
        password: md5('12345')
    },
    {
        login: 'charlie',
        password: md5('12345')
    },
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