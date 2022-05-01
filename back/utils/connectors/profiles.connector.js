const demoProfiles = require('../../data/demo.profiles.js')

class ProfilesConnector {
    constructor(db) {
        this.db = db
    }

    getProfile(userId) {
        const profile = demoProfiles.find(profile => profile.id === userId)
        if(profile) {
            return profile
        }
        else {
            return null
        }
    }

    setInfo(data) {
        return {}
    }

    setAvatar(data) {
        return {}
    }
}

module.exports = ProfilesConnector