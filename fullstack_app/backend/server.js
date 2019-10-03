const mongoose = require('mongoose');
const express = require('express');
const Session = require('express-session')
const fileStore = require('session-file-store')(Session)
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const API_PORT = 3001;
const userAPI = require('./userAPI.js');
const postAPI = require('./postAPI.js');
const topicAPI = require('./topicAPI.js');
const orgAPI = require('./OrgAPI.js');

const data = require('./data.js')
const Data = data.Data

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise

const app = express();
app.set('trust proxy', 1)

const secret = "test secret"
app.use(Session({
    store: new fileStore({ path: './session-store'}),
    name: 'session_name',
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
}))

var cookieParser = require('cookie-parser')
app.use(cookieParser(secret))


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

const router = express.Router();
router.get('/getData', (req, res) => {
  Data.find({message: "newvalue"}, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});
// this is our MongoDB database
//
const dbRoute = 'mongodb+srv://admin:Spooky12@cluster0-j7htk.mongodb.net/test?retryWrites=true&w=majority'

// connects our back end code with the database

mongoose.connect(dbRoute, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format

// append /api for our http requests
app.use('/api', router);
app.use('/api', userAPI);
app.use('/api', topicAPI);
app.use('/api', orgAPI);
app.use('/api', postAPI);
// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
