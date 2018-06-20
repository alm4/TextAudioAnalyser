const winston = require('winston');
const auth = require('./auth.json');

const fs = require('fs');

const ytdl = require('ytdl-core');
const request = require('request');
const getYoutubeID = require('get-youtube-id');
const fetchVideoInfo = require('youtube-info');

const yt_api_key = auth.yt_api;

// Configura logger settings
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log` 
    // - Write all logs error (and below) to `error.log`.
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
logger.add(new winston.transports.Console({
    format: winston.format.simple()
}));

function playMusic(nome, id) {
    let yt_link = 'https://www.youtube.com/watch?v=' + id;
    let stream = ytdl(yt_link,
		      {
			  filter: 'audioonly',
			  retries: 10
		      }).pipe(fs.createWriteStream(nome + '.mp3'));
    stream.on('error', error => {
	logger.error('erro na stream:\n', error);
    });
    stream.on('end', () => logger.info('terminou de baixar'));
    logger.info('comecei: ' + nome + ' com id: ' + id);
}

function getID(str, callback) {
    if (isYoutube(str)) {
	callback(getYoutubeID(str));
    } else {
	searchVideo(str, id => callback(id));
    }
}

function searchVideo(query, callback) {
    request("https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=" +
	    encodeURIComponent(query) + "&key=" + yt_api_key,
	    function(error, reponse, body) {
		if (error) {
		    logger.error(error);
		    return;
		}
		let json = JSON.parse(body);
		let vid = json.items[0];
		if (!vid) callback(null);
		else callback(vid.id.videoId);
	    }
	   );
}

function isYoutube(str) {
    return str.indexOf('youtube.com') !== -1;
}

function play(searchStr) {
    getID(searchStr, id => {
	if (!id) {
	    logger.error('Não encontrei nenhum vídeo, eu acho.');
	    return;
	}
	fetchVideoInfo(id, (err, videoInfo) => {
	    if (err) {
		logger.error(err);//throw new Error(err);
		return;
	    }
	    let yt_link = videoInfo.url;
	    let duration = prettyTime(videoInfo.duration);
	    let nome = videoInfo.title + ' (' + duration + ')';
	    playMusic(nome, id);
	});
    });
}

function prettyTime(duration, format) {
    if (format === 'ms') duration = duration/1000;
    let hours = Math.floor(duration / 3600);
    duration = duration - hours * 3600;
    let minutes = Math.floor(duration / 60);
    let seconds = Math.floor(duration - minutes * 60);
    duration = '';
    if (hours > 0) {
	duration += hours + 'h';
    }
    if (minutes > 0) {
	duration += minutes + 'm';
    }
    return duration + seconds + 's';
}

module.exports.play = play;
