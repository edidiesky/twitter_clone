import mongoose, { Document } from "mongoose";

// a structure of the Chat
const UserTweetSchema = new mongoose.Schema(
  {
    tweet_user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    tweet_text: {
      type: String,
      // required: true,
    },
    tweet_image: {
      type: Array,
      // required: true,
      default: []
    },
    tweet_likes: {
      type: Array,
      default: []
    },
    retweets: {
      type: Array,
      default: []
    },
    retweet_tweet_id: {
      type: String,
    },
    retweet_count: { type: Number },
    favorite_count: { type: Number }
  },
  { timestamps: true }
);

export default mongoose.model("UserTweet", UserTweetSchema);
