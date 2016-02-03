/**
 * Created by hnybom on 2.2.2016.
 */
'use strict';

var Twitter = require('twitter');

var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});


exports.tweet = function(whatToSay) {
    client.post('statuses/update', {status: whatToSay},  function(error, tweet, response){
        if(error) console.log(error);
    });
}
