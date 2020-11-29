/* eslint-disable camelcase */
const fs = require('fs');
const { TwitterClient } = require('twitter-api-client');

require('dotenv').config();

const {
  TWITTER_API_KEY: apiKey,
  TWITTER_API_SECRET: apiSecret,
  TWITTER_ACCESS_TOKEN: accessToken,
  TWITTER_ACCESS_TOKEN_SECRET: accessTokenSecret,
} = process.env;

const MIN_TWEETS = 10000;

const twitterClient = new TwitterClient({
  apiKey,
  apiSecret,
  accessToken,
  accessTokenSecret,
});

let tweets = [];

async function getTweets(max_id) {
  const results = await twitterClient.tweets.search({
    q: '#blessed filter:safe min_faves:10',
    tweet_mode: 'extended',
    count: 100,
    lang: 'en',
    max_id,
  });

  console.log(results);
  tweets = tweets.concat(results.statuses.map((status) => status.full_text));
  console.log('Got', tweets.length, 'tweets!');
  if (results.statuses.length && tweets.length < MIN_TWEETS) {
    const params = new URLSearchParams(results.search_metadata.next_results);
    await getTweets(params.get('max_id'));
  } else {
    await fs.promises.writeFile(
      'tweets.json',
      JSON.stringify(tweets, null, 2),
      'utf-8',
    );
    await fs.promises.writeFile(
      'tweets.txt',
      tweets
        .map((tweet) => tweet
          .replace(/\n/g, ' ')
          .replace(/(https?:\/\/[^\s]+)/g, '')
          .replace(/#\w+/g, '')
          .replace(/[^a-zA-Z' ]/g, '')
          .trim())
        .join('\n'),
      'utf-8',
    );
    console.log('Done!');
  }
}

getTweets();
