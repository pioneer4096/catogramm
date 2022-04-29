class ProfilesConnector {
    constructor(db) {
        this.db = db
    }

    getProfile(userIdStr) {
        const userId = isNaN(+userIdStr) ? +userIdStr : null
        const hasDataIds = [1, 2, 3, 4, 5]

        if(userId && hasDataIds.includes(userId)) {
            return {
                name: 'Иван Иванов',
                age: 27,

            }
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