'use strict';

let http = require('http');
let express = require('express');
let path = require('path');

let app = express();
let port = process.env.port || 3000

const API = require('./API');

app.use(express.static(__dirname + '/web'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/get-analyse-text', function(req, res) {
    API.getAnalyseText('https://www.youtube.com/watch?v=hC4V7-CHHfs', function(data) {
        res.send(data);
    });
});

app.post('/get-analyse-audio', function(req, res) {
    API.getAnalyseAudio('https://www.youtube.com/watch?v=hC4V7-CHHfs', function(err, data, response) {
        if (err) {
            console.error(err);
        } else {
            res.send(response.text);
        }
    });
});

let server = app.listen(port, () => {
    console.log('App running on port ' + server.address().port + '!');
    console.log('Press Ctrl+C to quit');
});