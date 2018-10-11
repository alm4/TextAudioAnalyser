'use strict';

let http = require('http');
let express = require('express');
let path = require('path');
let axios = require('axios');

//var cors = require('cors');

// use it before all route definitions
//app.use(cors({ origin: 'http://localhost:3000' }));

let app = express();

// Add headers
app.use(function(req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

let port = process.env.port || 3000

const API = require('./API');

app.use(express.static(__dirname + '/web'));
app.use(require('body-parser').json());

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/get-analyse-text', function(req, res) {
    API.getAnalyseText(req.body.url, function(data) {
        console.log(data.emotion.document.emotion);
        axios.post(`http://localhost:3000/get-analyse-audio`, { url: req.body.url })
            .then(response => {
                let infos = {
                    text: data.emotion.document.emotion,
                    audio: response.data
                }
                res.send(infos);
            })
            .catch(err => {});
    });
});

app.post('/get-analyse-audio', function(req, res) {
    API.getAnalyseAudio(req.body.url, function(err, data, response) {
        if (err) {
            console.error(err);
        } else {
            console.log('API called successfully: ', response.text);
            res.send(response.text);
        }
    });
});

let server = app.listen(port, () => {
    console.log('App running on port ' + server.address().port + '!');
    console.log('Press Ctrl+C to quit');
});