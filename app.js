const express = require('express');
const app = express();
const router = require('./router');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const ConnectDB = require('./config/db.js');
require('dotenv').config();

// BODY-PARSER
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// EJS
app.set('view engine', 'ejs');

// SESSION
app.use(session({
    secret: 'wordKey',
    resave: false,
    saveUninitialized: false
}));

// FLASH MESSAGE
app.use(flash());

// MIDDLEWARE
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

// PUBLIC
app.use(express.static(path.join(__dirname, 'public')));

// CONNECTING DATABASE
ConnectDB();

// ROUTER
app.use('/', router);

app.listen(process.env.PORT, () => console.log('Server Started!'));