if (Meteor.settings.twitter) {
  // console.log('Settings loaded');
} else {
  console.error("!! Missing `Meteor.settings` see: README.md !!");
}

Meteor.startup(function () {

});