const {propertiesTranslations} = require('../../reference/profile.properties');
const demoProfiles = require('../../data/demo.profiles.js')

const rootProps = ['id', 'name', 'avatarLink', 'sex', 'status', 'homeTown']

function translateProp(propKey) {
    return propertiesTranslations.hasOwnProperty(propKey) ? propertiesTranslations[propKey] : `??? ${propKey}`
}

class ProfilesConnector {
    constructor(db) {
        this.db = db
    }

    getProfile(userId) {
        const rawProfile = demoProfiles.find(profile => profile.id === userId)
        if(rawProfile) {
            const profile = {}
            const personal = []
            Object.keys(rawProfile).forEach(key => {
                if(rootProps.includes(key)) {
                    profile[key] = rawProfile[key]
                }
                else {
                    const propTitle = translateProp(key)
                    personal.push({
                        title: propTitle,
                        value: rawProfile[key]
                    })
                }
            })
            if(personal.length) {
                profile.personal = personal
            }
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