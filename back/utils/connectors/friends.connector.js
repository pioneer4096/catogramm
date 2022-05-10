const friendStatus = {
    NOT_CONNECTED: 0,
    REQUEST_SEND: 1,
    FRIENDS: 2
}

class FriendsConnector {
    constructor(db) {
        this.db = db
    }

    addFriend(from, to) {
        const edge = this.db.getFriendEdge(from, to)
        if(edge) {
            if(edge.from === from && edge.to === to) {  //  it couldn't be the same request again
                throw new Error(`Incorrect from to add friend values: already have edge with from = ${from} and to = ${to}`)
            }
            return this.db.updateFriendship({
                ...edge,
                confirmed: Date.now(),
                status: friendStatus.FRIENDS
            })
        }
        else {
            return this.db.addNewFriendship({
                from,
                to,
                created: Date.now(),
                confirmed: null,
                status: friendStatus.REQUEST_SEND
            })
        }
    }

    getStatus(id1, id2) {
        const edge = this.db.getFriendEdge(id1, id2)
        return edge
            ? edge.status
            : 0
    }
}

module.exports = FriendsConnector