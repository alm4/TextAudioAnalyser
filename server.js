'use strict';

let http = require('http');
let express = require('express');

let app = express();
let port = process.env.port || 3000;

const API = require('./API');

app.get('/', function(req, res) {
    res.send({dale: 'test'});
});

app.post('/get-analyse-text', function(req, res) {
    API.getAnalyseText('https://www.youtube.com/watch?v=hC4V7-CHHfs', function(data) {
        console.log("Daleee: ", data.emotion.document.emotion);
        res.send(data);
    });
});

app.post('/get-analyse-audio', function(req, res) {
    API.getAnalyseAudio('https://www.youtube.com/watch?v=hC4V7-CHHfs', function(err, data, response) {
        if (err) {
            console.error(err);
        } else {
            console.log('API called successfully.');
            console.log(response.text);
            res.send(response.text);
        }
    });
});

let server = app.listen(port, () => {
    console.log('App running on port ' + server.address().port + '!');
    console.log('Press Ctrl+C to quit');
});