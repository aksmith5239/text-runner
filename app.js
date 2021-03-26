const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const twilio = require('twilio');

//init to express
const app = express();

app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

//public folder
app.use(express.static(__dirname + '/public'));

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//index route
app.get('/', (req, res) => {
    res.render('index');
})
//port definition
const port = 3000;

const server = app.listen(port, () => console.log(`Server started on port ${port}`));