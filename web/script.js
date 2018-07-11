let src = "https://code.angularjs.org/1.3.8/angular.min.js"
let url = "http://localhost:3000/"

let emotionMatch = {
        "sad" : "sadness",
        "angry" : "anger",
        "happy" : "joy",
        "fear" : "fear",
        "disgust" : "disgust",
    };

var mainMod = angular.module('MainApp', []);
            mainMod.controller('MainCtrl', function ($scope) {
                $scope.text = '';
            });

function sendToBack() {

    let urlVideo = document.getElementById("hello").value;
    
    let data = {
        url: urlVideo
    }

    axios.post(`${url}get-analyse-text`, data)
    .then(res => {
        let result = manipulationOfDatas(res.data);
        console.log(result);
    })
    .catch(err => {
        console.log(err);
    });
    
}

function manipulationOfDatas(data) {
    let text = data.text;
    let audio = data.audio;

    let dataSets = {
        audio: [],
        text: [],
    };

    for(let i = 0; i < audio.length; i++) {
        let emotion = audio[i].emotion;
        if(match = emotionMatch[emotion]) {
            dataSets.text.push(text[match]);
            dataSets.audio.push(audio[i].score);
        }
    }

    return dataSets;
}