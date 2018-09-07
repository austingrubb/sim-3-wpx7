const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const massive = require('massive');
const bcrypt = require('bcrypt');
const saltRounds = 12

require('dotenv').config();
const app = express()
massive(process.env.CONNECTION_STRING).then(db => app.set('db', db))

app.use(bodyParser.json())
app.use(session({
    secret: "app secret",
    saveUninitialized: false,
    resave: false,
}))

app.use(express.static(`${__dirname}/../build`))

app.post('/signup', (req, res) => {
    const db = app.get('db')
    const {username, password} = req.body
    bcrypt.hash(password, saltRounds).then(hashedPassword => {
        db.create_client([username, hashedPassword]).then(() => {
            req.session.client = {username}
            res.json({client: req.session.client})
        }).catch(error => {
            console.log('error', error);
            res.status(500).json({ message: 'Something bad happened! '})
          });
    })
})

app.post('/login', (req, res) => {
    const db = app.get('db');
    const { username, password } = req.body;
    db.find_client([username]).then(clients => {
      if (clients.length) {
        bcrypt.compare(password, clients[0].password).then(passwordsMatched => {
          if (passwordsMatched) {
            req.session.client = { username: clients[0].username };
            res.json({ client: req.session.client });
          } else {
            res.status(403).json({ message: 'Wrong password' })
          }
        })
      } else {
        res.status(403).json({ message: "That client is not registered" })
      }
    });
  });

app.post('/logout', (req, res) => {
    req.session.destroy();
    res.status(200).send();
  });

function checkIfLoggedIn(req, res, next){
    if(req.session.client){
        next()
    }else{
        res.status(403).json({message: 'You are not authorized'})
    }
}

app.get('/data', checkIfLoggedIn, (req, res) => {
    res.json({ data: "congrats you logged in" });
})

const PORT = 8800;
app.listen(PORT, () => {console.log('Server is kicking on ' + PORT);});