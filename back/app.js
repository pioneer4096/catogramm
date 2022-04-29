
const express = require('express')
const AuthConnector = require('./utils/connectors/auth.connector.js')
const ProfilesConnector = require('./utils/connectors/profiles.connector.js')
const ContentConnector = require('./utils/connectors/content.connector.js')
const FriendsConnector = require('./utils/connectors/friends.connector.js')
const DataBase = require('./utils/db/DataBase.js')

const app = express()
const port = 3000

const dataBase = new DataBase()
const authConnector = new AuthConnector(dataBase)
const profilesConnector = new ProfilesConnector(dataBase)
const contentConnector = new ContentConnector(dataBase)
const friendsConnector = new FriendsConnector(dataBase)

const parseId = (paramId) => {
    const id = +paramId
    if(isNaN(id)) {
        throw new Error(`Incorrect user id "${id}"`)
    }
    else {
        return id
    }
}

app.get('/', (req, res) => {
    res.send('Root path')
})

app.get('/auth', (req, res) => {
    res.send('Auth user path')
})

app.get('/register', (req, res) => {
    const login = req.query.login
    const password = req.query.password
    console.log('data ', login, password)

    try {
        const id = authConnector.register(login, password)
        res.status(200).send({
            message: `Created user with id = ${id}`
        })
    }
    catch (e) {
        res.status(400).send({
            message: `CANT_REGISTER: ${e.message}`
        })
    }
})

app.get('/profile/get/:userId', (req, res) => {
    const userId = parseId(req.params.userId)
    const profile = profilesConnector.getProfile(userId)

    if(profile) {
        res.json(profile)
    }
    else {
        res.status(404).send({
            message: 'User not found'
        })
    }
})

app.get('/profile/setAvatar', (req, res) => {
    try {
        profilesConnector.setAvatar({data: ''})
        res.status(200)
    }
    catch (e) {
        res.status(400).send({
            message: 'CANT_SAVE_AVATAR'
        })
    }
})

app.get('/profile/setInfo', (req, res) => {
    try {
        profilesConnector.setInfo({data: ''})
        res.status(200)
    }
    catch (e) {
        res.status(400).send({
            message: 'CANT_SAVE_INFO'
        })
    }
})

app.get('/content/get/:userId', (req, res) => {
    try {
        const userId = parseId(req.params.userId)
        const data = contentConnector.get(userId)
        res.status(200).json({data})
    }
    catch (e) {
        res.status(400).send({
            message: 'CANT_GET_CONTENT'
        })
    }
})

app.get('/content/create', (req, res) => {
    try {
        contentConnector.create(req.params.contentData)
        res.status(200)
    }
    catch (e) {
        res.status(400).send({
            message: 'CANT_CREATE_CONTENT'
        })
    }
})

app.get('/content/like/:documentId', (req, res) => {
    try {
        contentConnector.like(req.params.documentId)
        res.status(200)
    }
    catch (e) {
        res.status(400).send({
            message: 'CANT_LIKE_CONTENT'
        })
    }
})

app.get('/friends/add/:userId', (req, res) => {
    try {
        const userId = parseId(req.params.userId)
        friendsConnector.add(userId)
        res.status(200)
    }
    catch (e) {
        res.status(400).send({
            message: 'CANT_ADD_FRIEND'
        })
    }
})

app.listen(port, () => {
    console.log(`App started at port ${port}`)
})
