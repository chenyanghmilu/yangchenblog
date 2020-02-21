// Main starting point of the application
require('dotenv').config();

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./routes/router');


require('./config/database');


// App Setup (morgan and body-parser are middleware in Express)
app.use(morgan('dev'));  // middleware for logging
app.use(bodyParser.json({ type: '*/*' }));  // middleware for helping parse incoming HTTP requests
app.use(express.json());


app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

// Router Setup
router(app);

app.get('/*', function(req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});



// Server Setup
const port = process.env.PORT || 3001;

app.listen(port, function() {
	console.log(`Express app running on port ${port}`)
});