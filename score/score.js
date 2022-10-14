const express = require('express')
const app = express()
const port = process.env.PORT || 4500
const os = require("os");
const { createHash } = require('crypto');

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
    res.send(username)
  })

// Register user information
app.get('/userRegistration/', (req, res) => {
    var username = req.query.username
    var password = req.query.password
    userRegistration(username, password)
    initializeUser(username)
    res.send()
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

// Check if user exists for login
app.get('/checkUser/', (req, res) => {
    var username = req.query.username
    var password = req.query.password
    var userBoolean = checkUser(username, password)
    res.send(userBoolean)
  })


app.listen(port, () => {
    console.log(`Score API listening on port ${port}`)
  })
  



function getUser(username) {
    const file = readFileSync('data/score.txt', 'utf-8');
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

    fs.appendFile('data/score.txt', `\n${username};0;0;${currentDate};false`, function (err) {
        if (err) {
            // append failed
        } else {
            // done
        }
    })
}


function userRegistration(username, password) {
    const safe_password = hashPassword(password)
    fs.appendFileSync('data/users.txt', `\n${username};${safe_password}`, function(err){
        if (err){
            //alert
        } else{
            //done
        }
    })
}


function updateUser(username, score, avg, date, boolean) {
    const file = readFileSync('data/score.txt', 'utf-8');
    const users = file.split(/\r?\n/);

    for (user of users) {
        var username_db = user.split(';')[0];
        if (username_db == username) {
            var index = users.indexOf(user)
            users[index] = `${username};${score};${avg};${date};${boolean}`
        } 
    }

    var usersString = users.join('\n')
    fs.writeFile('data/score.txt', usersString, function (err) {
        if (err) {
            // append failed
        } else {
            // done
        }
    })
}

function checkUser(username, password) {
    const file = readFileSync('data/users.txt', 'utf-8');
    const users = file.split(/\r?\n/);
  
    const safe_password = hashPassword(password)
    
    if (users == ['']) {
        return false
    } else {
        for (user of users) {
            var username_db = user.split(';')[0];
            var password_db = user.split(';')[1];
            if (username_db == username && password_db == safe_password) {
                return 'user can login'
            } else if (username_db == username){
              return 'user already exists'
            }
        }
    }
    return false
  }
  

function hashPassword(password) {
return createHash('sha256').update(password).digest('hex');
}


