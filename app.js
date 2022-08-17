const express = require('express');
const chalk = require('chalk'); //adds colour to terminal
const debug = require('debug')('app'); // sets colours on messages to allow for grouping 
const morgan = require('morgan'); //prints things to console regarding web traffic
const path = require('path'); //helps to direct to html pages
const passport = require('passport'); //deals with maintaining your user object in session, and also deals by doing that with dropping in a cookie, pulling it out
//of a cookie, applying it to sessions, etc
const cookieParser = require('cookie-parser');
const session = require('express-session');

const PORT = process.env.PORT || 3000;
const app = express();
const sessionsRouter = require('./src/routers/sessionsRouter');
const adminRouter = require('./src/routers/adminRouter');
const authRouter = require('./src/routers/authRouter');

//middleware
app.use(morgan('tiny'));     //current place | public folder
app.use(express.static(path.join(__dirname, '/public/')));
app.use(express.json()); //replacement for bodyparser.json
//what this is gonna do is, we now have this object, this function
//and when a post request is sent through the req (request) pipeline
//the application now has a piece of middleware that's going to
//interrupt as it's running through, it's going to execute morgan,
//and then it's going to look for static files, and then after that,
//it's going to say, hey, if there's something on the body, pull it
//out using this express.json constructor, whatever that returns,
//and then drop that back on the request as req.body. 
app.use(express.urlencoded({extended:false})); //treat as boilerplate code
app.use(cookieParser());
app.use(session({secret: 'lurcherwins:)'}))//secret is used to encode the cookie

//passport.js is going to retun a function
//which is going to get executed right here
//and pass app in, so when we go and build this file,
//that's what it's going to have to look like
require('./src/config/passport.js')(app);

//setting a variable called views
//and telling express where the views are
app.set('views','./src/views');
//tell express what view engine to use
app.set('view engine', 'ejs');

//middleware
app.use('/sessions', sessionsRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

//app gonna execute this
app.get('/', (req,res) => {
   // res.send('hello from my app'); //old way
   res.render('index',{title: 'Madness!', data: ['a','b','c']}); //using ejs template
});

app.listen(PORT, () => {
    debug(`listening on port ${chalk.green(PORT)}`);
});