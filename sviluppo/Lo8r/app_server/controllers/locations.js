var request = require('request');
var apiOptions = {
  server : "http://localhost:3000"
};

var renderHomepage = function(req, res, responseBody){
  console.log("renderHomepage");
  console.log(res);
  var message;
  
  if (!(responseBody instanceof Array)) {
    message = "API lookup error";
    responseBody = [];
  } else {
    if (!responseBody.length) {
      message = "No places found nearby";
    }
  }

  res.render('locations-list', {
    title: 'Loc8r - find a place to work with wifi',
    pageHeader: {
      title: 'Loc8r',
      strapline: 'Find places to work with wifi near you!'
    },
    sidebar: 'Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you are looking for.',
    locations: responseBody,
    message: message
  });
};

module.exports.homelist = function(req, res){
  var requestOptions, path;
  path = '/api/locations';
  requestOptions = {
    url : apiOptions.server + path,
    method : "GET",
    json : {},
    qs : {
      lng : -0.7992599,
      lat : 51.378091,
      maxDistance : 20
    }
  };
  request(requestOptions, function(err, response, body) {
    renderHomepage(req, res, body);
  });
};

module.exports.addReview = function(req, res){
  res.render('location-review-form', { title: 'Add review' });
};

module.exports.locationInfo = function(req, res){
res.render('location-info', { title: 'Location info' });
};
