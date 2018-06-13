const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });
const cheerio = require('cheerio');
const htmlEntities = require('html-entities').AllHtmlEntities;

var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
var natural_language_understanding = new NaturalLanguageUnderstandingV1({
  'username': '7aef01db-a03c-4b75-9ccf-bc88dd993152',
  'password': '2WgBo3WgQgK6',
  'version': '2018-03-16'
});

nightmare    
    .goto('https://www.youtube.com/watch?v=hC4V7-CHHfs')    
    .wait('[aria-label="Mais ações"]')
    .click('[aria-label="Mais ações"]')
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
        elems.each(function (index, element) {
            transcript[$(element).html().trim()] = htmlEntities.decode($(element).next().children().html().trim());            
        });

        console.log(transcript);
        console.log("-----------------");

        let result = ``

        for (let prop in transcript) {
            if(transcript.hasOwnProperty(prop)) {
                if(transcript[prop] !== "")
                    if(result === ``)
                        result = `${transcript[prop]}`
                    else
                        result = `${result}, ${transcript[prop]}`
            }
        }

        var parameters = {
            'text': result,
            'features': {
              'emotion': {
              },
              'sentiment': {
              },
            }
          }
          
          natural_language_understanding.analyze(parameters, function(err, response) {
            if (err)
              console.log('error:', err);
            else
              console.log(JSON.stringify(response, null, 2));
          });

    })
    .catch(error => {
        console.error('Search failed:', error)
    });