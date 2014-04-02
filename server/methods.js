Meteor.methods({
  // add random seed data when called.
  fillData: function () {
    if (Meteor.settings.dev !== true) return;

    console.log(">> fillData"+ todayHour(-1) );
    var now = new Date();

    _.times(100, function(n) {
      var randHashtag = "htag"+_.random(10);
      counter.inc(Stats, { hashtag:randHashtag,
                            todayHour:todayHour(0-_.random(5) ) });
    });


    _.times(100, function(n) {
      counter.inc(Stats, { todayHour:todayHour(-n) });
      console.log(todayHour(-n));
    });

    _.times(100, function(n) {
      counter.inc(Stats, { todayHour:todayHour(0-_.random(26)) });
    });

    console.log('DB seed in '+(new Date() - now)/1000+'s') ;
  },

  // Keep last `hour` data and purge the rest
  keep: function (hour) {
    var hour = hour || 24;
    console.log('>> purge: '+ hour);
    return Stats.remove({todayHour:{$lt:todayHour(-hour)} });
  },

  // Reset the db 
  resetData: function () {
    if (Meteor.settings.dev !== true) return;

    console.log('REMOVE ALL Stats');
    return Stats.remove({});
  }
});