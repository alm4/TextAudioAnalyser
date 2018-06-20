//const getVoice = require('./modules/getMP3');
const getVoice = require('./modules/ytmp3');
const getCaption = require('./modules/getCaption');
const emotionAudio = require('./modules/getEmotionAudio');

let urlVideo = ""

getVoice.play('https://www.youtube.com/watch?v=hC4V7-CHHfs')
    .then(data => emotionAudio.syncRecogniseEmotion('./a.raw'))
    .catch(err => console.log(err));

getCaption.getEmotion('https://www.youtube.com/watch?v=hC4V7-CHHfs');