## Getting MP3 audio and transcript from Youtube video and does text and audio analysis

1. Running
    * Just run: `node index.js`
    * This run the entire project

2. MP3 through Youtube
    * We are using many extensions, npm install working for all
    * brew install ffmpeg
    * ytmp3.js -> add video URL, as param play function, to get audio on line 8.

3. Caption through Youtube
    * npm install or yarn (nightmare, cheerio, htmlEntities)
    * getCaption.js -> add video URL to get transcript on line 7 (according to the language of PC change 'More actions' to 'Mais ações', to Portuguese/Brazil).

4. Text Emotion Analysis
    * npm install (watson-developer-cloud)
    * Using IBM Watson API (natural_language_understanding)

5. Audio Emotion Analysis
    * npm instal (deep-affects)
    * You need to generate an API key on the site (www.developers.deepaffects.com)
    * For while, we only do emotion analysis