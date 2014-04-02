// Local only tweets stream
var locStream = new Meteor.Stream("loc");
Tweets = new Meteor.Collection(null);

locStream.on("update", function(message) {
  Tweets.insert({
    user: message.user,
    lat: message.lat,
    lon: message.lon,
    time: message.time,
    text: message.text,
    img: message.img,
    img_url: message.img_url
  });
});

Template.tweetList.helpers({
  tweets: function() {
    return Tweets.find({}, { sort: {time: -1} });
   },
   'formatTime': function (time) {
    return (new Date(time)).toLocaleTimeString();
  }
});
