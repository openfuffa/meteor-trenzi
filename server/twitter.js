Meteor.startup(function() {
  var Fiber, Twit, locStream, mallorca, stream;
  var Fiber = Npm.require('fibers');
  var locStream = new Meteor.Stream("loc");
  var Twit = new TwitMaker({
    consumer_key: Meteor.settings.twitter.consumer_key,
    consumer_secret: Meteor.settings.twitter.consumer_secret,
    access_token: Meteor.settings.twitter.access_token,
    access_token_secret: Meteor.settings.twitter.access_token_secret   
  });
  var stream = Twit.stream("statuses/filter", {
    track: "renzi"
  });

  // anybody can read the tweet stream
  locStream.permissions.read(function(eventName) {
    return true;
  });

  stream.on("tweet", function(tweet) {
    var img, img_url, text, time, userName, userTweet;

    var keywords = tweet.entities.hashtags;
    var urls = tweet.entities.urls;

    Fiber(function() {
      _.each(keywords, function(keyword) {
        counter.inc(Stats, { hashtag:keyword.text,
                      todayHour:todayHour() });
        // console.log('#'+keyword.text);
        // increment(keyword);
      });
      // console.log('inside fiderb' + keywords + " tot" + Keywords.find().fetch().length);
    
      _.each(urls, function(url) {
        counter.inc(Stats, { url:url.expanded_url,
                      todayHour:todayHour() });
      });

      counter.inc(Stats, { todayHour:todayHour() });
    }).run();

    // console.log(keywords);
    userName = tweet.user.screen_name;
    userTweet = tweet.text;
    time = tweet.created_at;
    text = tweet.text;
    img = tweet.user.profile_image_url;
    img_url = tweet.user.profile_image_url_https;
    // console.log(userName + " says: " + userTweet + "at ");
    // console.log(JSON.stringify(tweet.entities.hashtags));
    // console.log(JSON.stringify(tweet.entities.urls));

    locStream.emit("update", {
      user: userName,
      time: time,
      text: text,
      img: img,
      img_url: img_url
    });
  });
  
});
