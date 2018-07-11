//const getVoice = require('./modules/getMP3');
const getVoice = require('./modules/ytmp3');
const getCaption = require('./modules/getCaption');
const emotionAudio = require('./modules/getEmotionAudio');

function getAnalyseText(urlVideo, callback) {
    
    getCaption.getEmotion(urlVideo, function(data) {
        callback(data);
    });
}

function getAnalyseAudio(urlVideo, callback) {

    getVoice.play(urlVideo)
        .then(data => {
            emotionAudio.syncRecogniseEmotion('./a.raw', callback);
        })
        .catch(err => console.log(err));
}

module.exports.getAnalyseText = getAnalyseText;
module.exports.getAnalyseAudio = getAnalyseAudio;