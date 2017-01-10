var express = require('express'); // server module
var path = require('path'); // module that provides utilities for working with file and directory paths.
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/notepad');// Connect to MongoDB
mongoose.Promise = global.Promise;

var db = mongoose.connection;

var routes = require('./routes/index');
var users = require('./routes/users');


// Init App
var app = express(); //


// Set Port
app.set('port', (process.env.PORT || 5000)); // Set port app to variable
app.listen(app.get('port'), function(){ // Let us use variable from environment
    console.log('Server started on port '+app.get('port'));
});


// View Engine
app.set('views', path.join(__dirname, 'views')); // Set directive ( folder ) when it will search files to show
app.engine('handlebars', exphbs({defaultLayout:'layout'})); // Set default layout to display
app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());


// Express Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
            , root    = namespace.shift()
            , formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg   : msg,
            value : value
        };
    }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});



app.use('/', routes);
app.use('/users', users);

