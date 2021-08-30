// BUILD YOUR SERVER HERE
const express = require('express')
const User = require('./users/model')

const server = express()

server.use(express.json())

server.get('/', (req, res) => {
    res.status(200).json({ message: 'hello world'})
})

server.post('/api/users', (req, res) => {
    const newUser = req.body
    // console.log(newUser)
    if(!newUser.name || !newUser.bio) {
        res.status(400).json({ message: "Please provide name and bio for the user" })
    } else {
        User.insert(newUser)
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ message: "There was an error while saving the user to the database" })
            })
    }
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
            res.status(500).json({ message: "The users information could not be retrieved" })
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

// server.delete('api/users/:id', async (req, res) => {
//     try {
//         const possibleUser = await User.findById(req.params.id)
//     if (!possibleUser) {
//         res.status(404).json({ message: "The user with the specified ID does not exist" })
//     } else {
//         const deletedUser = await User.remove(possibleUser.id)
//         res.json(deletedUser)
//     }
//     } catch (err) {
//         res.status(500).json({
//             message: "The user could not be removed"
//         })
//     }
// })

server.delete('/api/users/:id', (req, res) => {
    User.remove(req.params.id)
        .then(user => {
            if (user) {
                res.json(user)
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist" })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "The user could not be removed" })
        })
    // res.json({ message: 'delete user of this id' })
})

// server.put('/api/users/:id', async )
server.put('/api/users/:id', async (req, res) => {
    try {
        const possibleUser = await User.findById(req.params.id)
        if (!possibleUser) {
            res.status(404).json({
                message: "The user with the specified ID does not exist"
            })
        } else {
            if (!req.body.name || !req.body.bio) {
                res.status(400).json({ message: "Please provide name and bio for the user" })
            } else {
                const userUpdate = await User.update(req.params.id, req.body)
                res.status(200).json(userUpdate)
            }
        }
    } catch (err) {
        res.status(500).json({
            message: "The user information could not be modified"
        })
    }
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
