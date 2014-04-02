// Increments the counter of a structure
counter = {
  get: function get(collection, data) {
    // if (data.hashtag === undefined) {
    //   data.hashtag = {$exists: false};
    // }
    // console.log(data);

    var idk = collection.findOne(data);
    // console.log(idk);
    
    if (typeof idk === 'undefined') {
      return 0;
    } else {
      return idk.counter;
    }
  },

  // Increments the counter of a structure
  inc: function inc(collection, data) {
    // if (data.hashtag === undefined) {
    //   data.hashtag = {$exists: false};
    // }

    var idk = collection.findOne(data);
    // console.log(idk);

    if (typeof idk === 'undefined') {
      data.counter = 1;
      if (typeof data.hashtag === 'object') {
        delete(data.hashtag); // clean $exists
      }
      // console.log("C"+data);

      collection.insert( data );
    } else {
      // console.log("U"+data);

      collection.update({_id:idk._id},{$inc : {counter:1}});
      // collection.update({_id:idk._id},{ $inc:{ counter:1 } });
      // collection.update({_id:idk._id}, {counter:idk.counter+1});
    }
  }
  
}

todayHour = function todayHour(relativeHour) {
  var relativeHour = relativeHour || 0;
  var now = new Date(new Date().getTime()+relativeHour*3600*1000)
  var dateString = now.toISOString().slice(0,14)+'00:00.000Z'
  return new Date(dateString);
}

daysFrom = function (endDate, startDate) {
  var startDate = startDate || new Date();
  var days = (endDate - startDate)/(1000*3600*24)
  return (days < 1.0) ? 'Ci siamo..' : Math.round(days);
}
