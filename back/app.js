
const express = require('express')
const AuthConnector = require('./utils/connectors/auth.connector.js')
const ProfilesConnector = require('./utils/connectors/profiles.connector.js')
const ContentConnector = require('./utils/connectors/content.connector.js')
const DataBase = require('./utils/db/DataBase.js')
const jwt = require('jsonwebtoken')

const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"],
        allowedHeaders: ["socket-purpose-header"],
        credentials: true
    }
})
const host = 'localhost'
const port = 3000
let socketClients = []

const dataBase = new DataBase()
const authConnector = new AuthConnector(dataBase)
const profilesConnector = new ProfilesConnector(dataBase)
const contentConnector = new ContentConnector(dataBase)
// const friendsConnector = new FriendsConnector(dataBase)
const tokenKey = '2a6c-4d5e-6f7g-8k9i'

const parseId = (paramId) => {
    const id = +paramId
    if(isNaN(id)) {
        throw new Error(`Incorrect user id "${id}"`)
    }
    else {
        return id
    }
}

io.on('connection', (socket) => {
    console.log(`Client with id ${socket.id} connected`)
    socketClients.push(socket.id)

    socket.emit('message', "I'm server")

    socket.on('message', (message) =>
        console.log('Message: ', message)
    )

    socket.on('disconnect', () => {
        socketClients.splice(socketClients.indexOf(socket.id), 1)
        console.log(`Client with id ${socket.id} disconnected`)
    })
})


app.use(express.json())
app.use((req, res, next) => {
    console.log('req.headers = ', req.headers)
    if (req.headers.authorization) {
        jwt.verify(
            req.headers.authorization.split(' ')[1],
            tokenKey,
            (err, payload) => {
                if (err) {
                    console.log('verify jwt error = ', err)
                    next()
                }
                else if (payload) {
                    console.log('verify jwt success = ', payload)
                    const user = authConnector.findUserByLogin(payload.login)
                    if(user) {
                        req.user = user
                    }
                    next()
                }
            }
        )
    }

    next()
})


app.get('/', (req, res) => {
    res.send('Root path')
})

app.post('/auth', (req, res) => {
    const {login, password} = req.body
    console.log(`login = ${login}, password = ${password}`)

    try {
        const account = authConnector.login(login, password)
        return res.status(200).json({
            user: {
                id: account.id,
                login: account.login,
            },
            token: jwt.sign({ id: account.id, login: account.login }, tokenKey),
        })
    }
    catch (e) {
        res.status(400).send({
            message: `CANT_AUTH: ${e.message}`
        })
    }
})

app.post('/register', (req, res) => {
    const {login, password} = req.body

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
    let userId
    try {
        userId = parseId(req.params.userId)
    }
    catch (e) {
        res.status(400).send({
            message: 'Incorrect userId'
        })
    }

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

app.get('/profile/self', (req, res) => {
    if(req.user) {
        const profile = profilesConnector.getProfile(req.user.id)
        res.json({
            user: profile   // may be null value
        })
    }
    else {
        res.status(401).send({
            message: 'Not authorized yet'
        })
    }
})

/**
 * need auth
 * **/
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

/**
 * need auth
 * **/
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

/**
 * need auth
 * **/
app.get('/content/create', (req, res) => {
    /*try {
        contentConnector.create(req.params.contentData)
        res.status(200)
    }
    catch (e) {
        res.status(400).send({
            message: 'CANT_CREATE_CONTENT'
        })
    }*/

    console.log('req.user = ', req.user)
    if (req.user) return res.status(200).json(req.user)
    else {
        return res
            .status(401)
            .json({ message: 'Not authorized' })
    }
})

/**
 * need auth
 * **/
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

/**
 * need auth
 * **/
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

http.listen(port, () => {
    console.log(`App started at port ${port}`)
})
