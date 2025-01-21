import { db } from "./connection";
import { Tweet } from "./types";

export const insertTweet = (twitterUsername: string, tweet: Tweet): void => {
  const stmt = db.prepare(`
    INSERT INTO tweets (
      twitter_user_name, 
      input_tweet_id,
      input_tweet_created_at,
      input_tweet_text,
      input_tweet_user_id,
      new_tweet_id,
      prompt,
      new_tweet_text,
      in_reply_to_status_id,
      conversation_id
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run(
    twitterUsername,
    tweet.input_tweet_id,
    tweet.input_tweet_created_at,
    tweet.input_tweet_text,
    tweet.input_tweet_user_id,
    tweet.new_tweet_id,
    tweet.prompt,
    tweet.new_tweet_text,
    tweet.in_reply_to_status_id || null,
    tweet.conversation_id || null,
  );
};

export const getTweetByInputTweetId = (id: string): Tweet | undefined => {
  const stmt = db.prepare(`SELECT * FROM tweets WHERE input_tweet_id = ?`);
  return stmt.get(id) as Tweet | undefined;
};

export const getLastTweetByTwitterUserName = (
  twitterUsername: string,
): Tweet | undefined => {
  const stmt = db.prepare(
    `SELECT * FROM tweets WHERE twitter_user_name = ? ORDER BY created_at DESC LIMIT 1`,
  );
  return stmt.get(twitterUsername) as Tweet | undefined;
};
