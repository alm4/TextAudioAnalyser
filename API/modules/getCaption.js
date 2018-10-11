const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });
const cheerio = require('cheerio');
const htmlEntities = require('html-entities').AllHtmlEntities;

const getYoutubeSubtitles = require('@joegesualdo/get-youtube-subtitles-node');

// Imports the Google Cloud client library
const { Translate } = require('@google-cloud/translate');

// Your Google Cloud Platform project ID
const projectId = 'f4712f42ef2d4ed7cf0a6508dfda3dbe5cca603a';

// Instantiates a client
const translate = new Translate({
    projectId: projectId,
    keyFilename: './Translate-Analyzer-f4712f42ef2d.json'
});

//var googleTranslate = require('google-translate')('AIzaSyCwiDzro_Ac_fro7ml8m8pNGNTUiaPYJdk');

var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
var natural_language_understanding = new NaturalLanguageUnderstandingV1({
    'username': '7aef01db-a03c-4b75-9ccf-bc88dd993152',
    'password': '2WgBo3WgQgK6',
    'version': '2018-03-16'
});

function getEmotion(url, callback) {


    let videoId = url.substring(url.indexOf("v=") + 2);

    getYoutubeSubtitles(videoId)
        .then(subtitles => {

            console.log(subtitles)

            result = subtitles;

            console.log("-----------------");
            console.log(result);
            console.log("-----------------");

            /**
             * TODO(developer): Uncomment the following lines before running the sample.
             */

            const text = result;
            const target = 'en';

            // Translates the text into the target language. "text" can be a string for
            // translating a single piece of text, or an array of strings for translating
            // multiple texts.

            translate
                .translate(text, target)
                .then(results => {
                    const translation = results[0];

                    //console.log("");
                    //console.log(`Text: ${text}`);
                    //console.log("");
                    //console.log(`Translation: ${translation}`);
                    //console.log("");

                    //return translation;

                    console.log("-----------------");

                    console.log("Translated text input");
                    console.log("-----------------");
                    console.log(translation);
                    console.log("-----------------");

                    console.log("WATSOM SAID  : ");

                    var parameters = {
                        'text': translation,
                        'features': {
                            'emotion': {},
                            'sentiment': {},
                            'categories': {
                                'limit': 2,
                            },
                            'concepts': {
                                'limit': 2,
                            }
                        }
                    }

                    natural_language_understanding.analyze(parameters, function(err, response) {
                        if (err) {
                            console.log('error:', err);
                        } else {
                            //console.log(JSON.stringify(response, null, 2));
                            callback(response);
                        }
                    });

                })
                .catch(err => {
                    console.error('ERROR:', err);
                });

        })
        .catch(err => {
            console.log(err)
        })

}

module.exports.getEmotion = getEmotion;