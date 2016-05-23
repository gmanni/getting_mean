var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

module.exports.reviewsCreate = function(req, res){
  var locationid = req.params.locationid;
  if (locationid) {
    Loc
    .findById(locationid)
    .select('reviews')
    .exec(
      function(err, location) {
        if (err) {
          sendJsonResponse(res, 400, err);
        } else {
          doAddReview(req, res, location);
        }
      }
    );
  } else {
    sendJsonResponse(res, 404, {"message": "Not found, locationid required"});
  }
  // sendJsonResponse(res, 200, {"status" : "success"});
};

var doAddReview = function(req, res, location) {
  if (!location) {
    sendJsonResponse(res, 404, "locationid not found");
  } else {
    location.reviews.push({
      author: req.body.author,
      rating: req.body.rating,
      reviewText: req.body.reviewText
    });
    location.save(function(err, location) {
      var thisReview;
      if (err) {
        sendJsonResponse(res, 400, err);
      } else {
        //updateAverageRating(location._id);
        thisReview = location.reviews[location.reviews.length - 1];
        sendJsonResponse(res, 201, thisReview);
      }
    });
  }
};

module.exports.reviewsReadOne = function(req, res){
  if (req.params && req.params.locationid && req.params.reviewid) {
    // esiste la locationid e la reviewid nella richiesta
    Loc
      .findById(req.params.locationid)
      .select('name reviews')
      .exec(
        function(err, location) {
          var response, review;
          if (!location) {
            // la locationid non è stata trovata
            sendJsonResponse(res, 404, {"message": "locationid not found"});
            return;
          } else if (err) {
            // si è verificato un errore e lo restituisco
            sendJsonResponse(res, 400, err);
            return;
          }
          if (location.reviews && location.reviews.length > 0) {
            // review esiste e c'è almeno un item, lo vado a puntare in base al reviewid
            review = location.reviews.id(req.params.reviewid);
            if (!review) {
              // il reviewid non esiste
              sendJsonResponse(res, 404, {"message": "reviewid not found"});
            } else {
              // il reviewid esiste, prelevo le info
              response = {
                location : {
                  name : location.name,
                  id : req.params.locationid
                },
                review : review
              };
              sendJsonResponse(res, 200, response);
            }
          } else {
            // review non esiste
            sendJsonResponse(res, 404, {"message": "No reviews found"});
          }
        });
  } else {
    // non esiste la locationid e il reviewid nella richiesta e lo restituisco
    sendJsonResponse(res, 404, {"message": "Not found, locationid and reviewid are both required"});
  }
};

module.exports.reviewsUpdateOne = function(req, res){
  sendJsonResponse(res, 200, {"status" : "success"});
};

module.exports.reviewsDeleteOne = function(req, res){
  sendJsonResponse(res, 200, {"status" : "success"});
};

var sendJsonResponse = function(res, status, content){
  res.status(status);
  res.json(content);
};
