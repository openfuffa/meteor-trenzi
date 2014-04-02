Meteor.startup(function () {
  GAnalytics.pageview();
  Session.setDefault('maxCounter',10);
});

Template.box.topTweetsList = function () {
  return Stats.find({ todayHour:todayHour(-1), hashtag:{$exists:true}  }, {sort:{counter:-1}, limit:10} );
}

Template.box.counterDays = function () {
  var msg = daysFrom(new Date('2018-01-01'));
  return msg;
}

Template.box.counterTweets = function () {
  return counter.get(Stats, {todayHour:todayHour()});
}

Template.box.counterTweetsSec = function () {
  var secs = (new Date()).getMinutes()*60;
  return Math.round(Template.box.counterTweets()/secs*100)/100;
}

Template.box.volumeList = function() {
  return volumeList();
}

Template.box.helpers({
  'urlTrim': function () {
    var max = 49;
    return (this.url.length > max) ? this.url.slice(7,max-2)+'..' : this.url.slice(7,-1);
  },
  'hourSlot': function () {
    return (new Date()).getHours()+":00";
  },
  'recentLinkList': function() {
    return Stats.find({ todayHour:todayHour(0), url:{$exists:true}  }, {sort:{counter:-1}, limit:7} );
  },
  'recentHashtagList': function() {
    return Stats.find({ todayHour:todayHour(0), hashtag:{$exists:true}  }, {sort:{todayHour:-1}, limit:10} );
  },

  'isLunch':function () {
    return _.contains([12,0], this.todayHour.getHours() );
  },
  'counterScaled': function () {
    if (this.counter > Session.get('maxCounter')) {
      Session.set('maxCounter', this.counter*1.5);
    }
    return this.counter*100/Session.get('maxCounter');
  },
  'getHour': function () {
    return this.todayHour.getHours();
  },
  'color': function () {
    var currentCounter = this.counter; // counter past hour (-1)
    var pastCounter = counter.get(Stats, {hashtag:this.hashtag, todayHour:todayHour(-2)});


    if (pastCounter === 0) {
      return 'color:orange;'; //'trend-new'
    } else if (currentCounter > pastCounter) {
      return 'color:green;'; // 'trend-up'
    } else if (currentCounter === pastCounter) {
      return '' //'trend-equal';
    } else {
      return 'color:red;'; //'trend-down'
    }
  },
  // up, down, new
  'trend': function () {
    var currentCounter = this.counter; // counter past hour (-1)
    var pastCounter = counter.get(Stats, {hashtag:this.hashtag, todayHour:todayHour(-2)});


    if (pastCounter === 0) {
      return 'glyphicon-certificate'; //'trend-new'
    } else if (currentCounter > pastCounter) {
      return 'glyphicon glyphicon-chevron-up'; // 'trend-up'
    } else if (currentCounter === pastCounter) {
      return 'glyphicon-pause'; //'trend-equal';
    } else {
      return 'glyphicon glyphicon-chevron-down'; //'trend-down'
    }
  }
});