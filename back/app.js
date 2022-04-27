
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Root path')
})

app.get('/auth', (req, res) => {
    res.send('Auth user path')
})

app.get('/register', (req, res) => {
    res.send('Register user path')
})

app.get('/profile/get', (req, res) => {
    res.send('Get user profile path')
})

app.get('/profile/setAvatar', (req, res) => {
    res.send('Set user avatar path')
})

app.get('/profile/setInfo', (req, res) => {
    res.send('Set user personal info path')
})

app.get('/content', (req, res) => {
    res.send('Content path')
})

app.get('/content/create', (req, res) => {
    res.send('Content create path')
})

app.get('/content/like', (req, res) => {
    res.send('Content like path')
})

app.listen(port, () => {
    console.log(`App started at port ${port}`)
})
