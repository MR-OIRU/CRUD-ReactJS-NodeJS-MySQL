// import

const express = require('express')
const morgan = require('morgan')
const session = require('express-session')
const cookieParser = require('cookie-parser');
const cors = require('cors')
<<<<<<< HEAD
require('dotenv').config();
=======
>>>>>>> 1265728235b7b55d7fbbe275163e07175539d85f

const router = require('./router/myRouter')
const server = express()

// use
server.use(morgan('dev'))
server.use(express.json());
server.use(cookieParser()) 
server.use(session({
    secret: 'mySession',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));
<<<<<<< HEAD

const url = process.env.VITE_API_URL_CORS;
server.use(cors({
    origin: url , credentials: true
=======
server.use(cors({
    origin: 'http://localhost:5173', credentials: true
>>>>>>> 1265728235b7b55d7fbbe275163e07175539d85f
}))

server.use(router)


// Start Server
server.listen(3000, () => console.log('Start Server successfully'))