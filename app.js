require('dotenv').config();
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
// const socketio = require('socket.io');
const http = require('http');
const MessagingResponse =require('twilio').twiml.MessagingResponse;

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);


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
//post -  form submit
app.post('/', (req, res) => {
    const number = req.body.number;
    const text = req.body.text;
    
    client.messages.create({
        to: number, 
        from: '+15052078535', 
        body: text
       })
       .then((message) => console.log(message.sid))
});

app.post('/sms', (req, res) => {
    const twiml = new MessagingResponse();

    twiml.message('We got it.');

    res.writeHead(200, {'ContentType': 'text/xml'});
    res.end(twiml.toString());
});


//port definition
// const port = 1337;

// const server = app.listen(port, () => console.log(`🌎 Server started on port ${port}`));

http.createServer(app).listen(1337, () => {
    console.log(`Server listening` );
})
// const io = socketio(server);
// io.on('connection', (socket) => {
//     console.log('Connected');
//     io.on('disconnect', () => {
//         console.log('Disconnected');
//     })
// })
