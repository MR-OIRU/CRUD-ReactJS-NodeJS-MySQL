// import

const express = require('express')
const morgan = require('morgan')
const session = require('express-session')
const cookieParser = require('cookie-parser');
const cors = require('cors')
require('dotenv').config();

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

const url = process.env.VITE_API_URL_CORS;
server.use(cors({
    origin: url , credentials: true
}))

server.use(router)


// Start Server
server.listen(3000, () => console.log('Start Server successfully'))