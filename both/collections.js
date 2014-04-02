Stats = new Meteor.Collection('stats');

// tweets volume in the last 24h
volumeList = function() {
  return Stats.find({hashtag:{$exists:false},url:{$exists:false}},{sort:{todayHour:-1}, limit:24});
}