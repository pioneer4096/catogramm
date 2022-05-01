const md5 = require('md5');

class AuthConnector {
    constructor(db) {
        this.db = db
    }

    register(login, password) {
        // TODO login and password validation rules must be here
        return this.db.register(login, this.getPasswordHash(password))
    }

    login(login, password) {
        const account = this.db.findAccount(login)
        if(account) {
            if(account.password === this.getPasswordHash(password)) {
                return account
            }
            else {
                throw new Error('Incorrect password')
            }
        }
        else {
            throw new Error('Login not found')
        }
    }

    findUserById(id) {
        return this.db.findAccountById(id)
    }

    findUserByLogin(login) {
        return this.db.findAccount(login)
    }

    getPasswordHash(password) {
        const hash = md5(password)
        console.log(`password hash is ${hash}`)
        return hash
    }
}

module.exports = AuthConnector