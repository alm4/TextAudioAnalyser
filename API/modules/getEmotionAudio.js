var DeepAffects = require('deep-affects');
var defaultClient = DeepAffects.ApiClient.instance;

// Configure API key authorization: UserSecurity
var UserSecurity = defaultClient.authentications['UserSecurity'];
UserSecurity.apiKey = 'oJigW5ah4f4xQNBkjW4WQfPCthyWCZmR';

var apiInstance = new DeepAffects.EmotionApi();

// sync request
function syncRecogniseEmotion(path, callback) {
    let body = DeepAffects.Audio.fromFile(path); // {Audio} Audio object
    apiInstance.syncRecogniseEmotion(body, callback);
}

/* async request
webhook = "https://proxy.api.deepaffects.com/audio/generic/api/v1/async/recognise_emotion?apiKey=oJigW5ah4f4xQNBkjW4WQfPCthyWCZmR"
apiInstance.asyncRecogniseEmotion(body, webhook, callback);*/

module.exports.syncRecogniseEmotion = syncRecogniseEmotion;
