let src = "https://code.angularjs.org/1.3.8/angular.min.js"
let url = "http://with-emotion.cin.ufpe.br:3000/"

let emotionMatch = {
    "sad": "sadness",
    "angry": "anger",
    "happy": "joy",
    "fear": "fear",
    "disgust": "disgust",
};

var mainMod = angular.module('MainApp', []);
mainMod.controller('MainCtrl', function($scope) {
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
            plotGraph(result);
        })
        .catch(err => {
            console.log(err);
        });

}

function plotGraph(data) {

    let marksCanvas = document.getElementById("marksChart");

    let marksData = {
        labels: data.labels,
        datasets: [{
                label: "Audio",
                backgroundColor: "rgba(200, 010, 000, 0.7)",


                data: data.audio
            },
            {
                label: "Text",
                backgroundColor: "rgba(000, 255, 000, 0.4)",

                data: data.text
            },
        ]
    };

    let radarChart = new Chart(marksCanvas, {
        type: 'radar',
        data: marksData
    });
}

function manipulationOfDatas(data) {
    let text = data.text;
    let audio = data.audio;

    let dataSets = {
        labels: [],
        audio: [],
        text: [],
    };

    for (let i = 0; i < audio.length; i++) {
        let emotion = audio[i].emotion;
        if (match = emotionMatch[emotion]) {
            dataSets.labels.push(emotionMatch[emotion]);
            dataSets.text.push(text[match]);
            dataSets.audio.push(audio[i].score);
        }
    }

    return dataSets;
}