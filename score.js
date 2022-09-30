const express = require('express')
const app = express()
const port = process.env.PORT || 4500
const os = require("os");

const {readFileSync, promises: fsPromises} = require('fs');
var fs = require('fs')


// Main endpoint
app.get('/', (req, res) => {
})


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

// Check if user exists
app.get('/checkUser/', (req, res) => {
    var username = req.query.username
    var userBoolean = checkUser(username)
    res.send(userBoolean)
  })

// Get user data
app.get('/getUser/', (req, res) => {
    var username = req.query.username
    var user = getUser(username)
    res.send(user)
  })

// Get user data
app.get('/initializeUser/', (req, res) => {
    var username = req.query.username
    var user = initializeUser(username)
    res.send(user)
  })

// Update user data
app.get('/updateUser/', (req, res) => {
    var username = req.query.username
    var score = req.query.score
    var avg = req.query.avg
    var date = req.query.date
    var boolean = req.query.boolean
    
    updateUser(username, score, avg, date, boolean)
    res.send()
  })


app.listen(port, () => {
    console.log(`Score API listening on port ${port}`)
  })
  

function checkUser(username) {
    const file = readFileSync('data/users.txt', 'utf-8');
    const users = file.split(/\r?\n/);

    console.log(users)

    if (users == ['']) {
        return false
    } else {
        for (user of users) {
            var username_db = user.split(';')[0];
            console.log(username_db)
            if (username_db == username) {
                return true
            }
        }
    }
    return false
}

function getUser(username) {
    const file = readFileSync('data/users.txt', 'utf-8');
    const users = file.split(/\r?\n/);

    for (user of users) {
        var username_db = user.split(';')[0];
        if (username_db == username) {
            return user
        } 
    }
}

function initializeUser(username) {
    let currentDate = new Date()
    currentDate = currentDate.toISOString().split('T')[0]

    fs.appendFile('data/users.txt', `\n${username};0;0;${currentDate};false`, function (err) {
        if (err) {
            // append failed
        } else {
            // done
        }
    })
}

function updateUser(username, score, avg, date, boolean) {
    const file = readFileSync('data/users.txt', 'utf-8');
    const users = file.split(/\r?\n/);

    for (user of users) {
        var username_db = user.split(';')[0];
        if (username_db == username) {
            var index = users.indexOf(user)
            users[index] = `${username};${score};${avg};${date};${boolean}`
        } 
    }

    var usersString = users.join('\n')
    fs.writeFile('data/users.txt', usersString, function (err) {
        if (err) {
            // append failed
        } else {
            // done
        }
    })
}