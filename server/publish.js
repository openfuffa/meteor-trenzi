Meteor.publish("stats", function (opts) {
  // var opts = opts || {todayhour:todayHour()};
  return Stats.find( {todayHour:{$gt:todayHour(-3)}, counter:{$gt:3} } );
});

Meteor.publish('volume-list', function() {
  return volumeList();
});