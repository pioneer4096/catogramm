const md5 = require('md5');

const demoUsers = [
    {
        login: 'admin',
        password: md5('admin')
    },
    {
        login: 'alice',
        password: md5('12345')
    },
    {
        login: 'simba',
        password: md5('12345')
    },
    {
        login: 'loki',
        password: md5('12345')
    },
    {
        login: 'charlie',
        password: md5('12345')
    },
]

module.exports = demoUsers