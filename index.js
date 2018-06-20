//const getVoice = require('./modules/getMP3');
const getCaption = require('./modules/getCaption');
const emotionAudio = require('./modules/getEmotionAudio');
const getVoice = require('./modules/ytmp3');

let urlVideo = ""

getVoice.play('https://www.youtube.com/watch?v=hC4V7-CHHfs');

//getCaption.getEmotion('https://www.youtube.com/watch?v=uwf38MVMbc8');

//emotionAudio.syncRecogniseEmotion("./data/reconstructed.wav");