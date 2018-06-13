## Getting MP3 audio and transcript from Youtube video


1. MP3 through Youtube
    * npm install (horizon-youtube-mp3)
    * brew install ffmpeg
    * getMP3.js -> add video URL to get audio on line 8.
    * Getting MP3 audio: `node getMP3.js > example.txt`

2. Caption desde Youtube
    * npm install or yarn (nightmare, cheerio, htmlEntities)
    * getCaption.js -> add video URL to get transcript on line 7 (according to the language of PC change 'More actions' to 'Mais ações', to Portuguese/Brazil).
    * Getting transcript: `node getCaption.js`
  