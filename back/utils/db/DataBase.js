const AutoIncrementUniqueCollection = require('../collections/AutoIncrementUniqueCollection.js')
const demoUsers = require('../../data/demo.users.js')
const demoProfiles = require('../../data/demo.profiles.js')
const demoContent = require('../../data/demo.content.js')

const friendsEdgeExample = {
    key: '1-2__2-1',
    from: 1,    // user id who send request
    to: 2,  // user id whom send request
    created: '2022-05-01 19:53:14',
    confirmed: '2022-05-05 08:51:33',
    status: 3   //
}

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

        demoContent.forEach(post => {
            this.content.push(post)
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

    addFriend(edge) {
        switch (edge.status) {
            case 0: // delete edge


            case 1: // add friend request
                const key = `${edge.from}-${edge.to}__${edge.to}-${edge.from}`
                const newEdge = {
                    ...edge,
                    key
                }
                this.friends.push(newEdge)
                return newEdge

            case 2: // apply friend

        }
    }

    updateFriendship(edge) {
        const index = this.friends.findIndex(e => e.key === edge.key)
        if(index !== -1) {
            this.friends[index] = {
                ...edge
            }
            return edge
        }
        return null
    }

    addNewFriendship(edge) {
        const key = `${edge.from}-${edge.to}__${edge.to}-${edge.from}`
        const newEdge = {
            ...edge,
            key
        }
        this.friends.push(newEdge)
        return newEdge
    }

    getFriendEdge(id1, id2) {
        const subkey = `${id1}-${id2}`
        const edge = this.friends.find(e => e.key.includes(subkey))
        if(edge) {
            return edge
        }
        else {
            return null
        }
    }

    getPostsById(ownerId) {
        return this.content.filter(content => content.ownerId === ownerId)
    }
}

module.exports = DataBase