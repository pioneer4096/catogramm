const AutoIncrementUniqueCollection = require('../collections/AutoIncrementUniqueCollection.js')
const demoUsers = require('../../data/demo.users.js')
const demoProfiles = require('../../data/demo.profiles.js')

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

        demoProfiles.forEach(profile => {
            this.profiles.push(profile)
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

    findProfileById(id) {
        return this.profiles.find(profile => profile.id === id) || null
    }

    updateProfile(id, data) {
        console.log(`DB update profile id ${id} and data ${JSON.stringify(data)}`)
        const profile = this.findProfileById(id)
        if(profile) {
            Object.keys(data).forEach(key => {
                if(profile.hasOwnProperty(key)) {
                    profile[key] = data[key]
                }
            })

            return profile
        }
        else {
            throw new Error(`Profile with id = ${id} wasn't found!`)
        }
    }
}

module.exports = DataBase