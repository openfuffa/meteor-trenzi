Deps.autorun(function(){
  tweetsSub = Meteor.subscribe('stats');
  volumeListSub = Meteor.subscribe('volume-list');

  if (volumeListSub.ready()) {
    $('.loading').hide();
  } else {
    $('.loading').show();
  }
});