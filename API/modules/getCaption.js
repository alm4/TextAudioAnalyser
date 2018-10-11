const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: false });
const cheerio = require('cheerio');
const htmlEntities = require('html-entities').AllHtmlEntities;

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

    console.log("I am here");
    nightmare
        .goto(url)
        .wait('.dropdown-trigger.style-scope.ytd-menu-renderer > button.style-scope.yt-icon-button') //.wait('[aria-label="Mais ações"]')
        .click('.dropdown-trigger.style-scope.ytd-menu-renderer > button.style-scope.yt-icon-button') //.click('[aria-label="Mais ações"]')
        .wait('ytd-menu-service-item-renderer')
        .click('ytd-menu-service-item-renderer')
        .wait('#transcript > ytd-transcript-renderer #body ytd-transcript-body-renderer')
        .evaluate(() => {
            // const elements = document.querySelector('#transcript > ytd-transcript-renderer #body ytd-transcript-body-renderer').innerHTML;
            return document.querySelector('#transcript > ytd-transcript-renderer #body ytd-transcript-body-renderer')
                .innerHTML;
        })
        .end()
        .then(content => {
            const $ = cheerio.load(content);

            const elems = $('.cue-group-start-offset');
            const transcript = {};
            elems.each(function(index, element) {
                transcript[$(element).html().trim()] = htmlEntities.decode($(element).next().children().html().trim());
            });

            console.log(transcript);
            console.log("-----------------");

            console.log("Correting text input");

            let result = ``

            for (let prop in transcript) {
                if (transcript.hasOwnProperty(prop)) {
                    if (transcript[prop] !== "")
                        if (result === ``)
                            result = `${transcript[prop]}`
                        else
                            result = `${result}, ${transcript[prop]}`
                }
            }

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

            //googleTranslate.translate(result, 'en', function(err, translation) {
            //  console.log(translation.translatedText);
            //  result = translation.translatedText;
            //});

        })
        .catch(error => {
            console.error('Search failed:', error)
        });
}

module.exports.getEmotion = getEmotion;