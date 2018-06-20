const getVoice = require('./modules/getMP3');
const getCaption = require('./modules/getCaption');
const emotionAudio = require('./modules/getEmotionAudio');

let urlVideo = ""

getVoice.convertVideo('https://www.youtube.com/watch?v=hC4V7-CHHfs');

getCaption.getEmotion('https://www.youtube.com/watch?v=uwf38MVMbc8');

emotionAudio.syncRecogniseEmotion("./data/reconstructed.wav");