// BUILD YOUR SERVER HERE
const express = require('express')
const User = require('./users/model')

const server = express()

server.use(express.json())

server.get('/', (req, res) => {
    res.status(200).json({ message: 'hello world'})
})

server.get('/api/users', (req, res) => {
    User.find()
        .then(users => {
            if(users) {
                res.json(users)
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "The users information could not be retrieved"})
        })
})

server.get('/api/users/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            if(user) {
                res.json(user)
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist" })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "The user information could not be retrieved" })
        })
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
