var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

module.exports.locationsCreate = function(req, res) {
  Loc.create({
    name: req.body.name,
    address: req.body.address,
    facilities: req.body.facilities.split(","),
    coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
    openingTimes: [{
      days: req.body.days1,
      opening: req.body.opening1,
      closing: req.body.closing1,
      closed: req.body.closed1,
    },
    {
      days: req.body.days2,
      opening: req.body.opening2,
      closing: req.body.closing2,
      closed: req.body.closed2,
    }]
  }, function(err, location) {
      if (err) {
        sendJsonResponse(res, 400, err);
      }else{
        sendJsonResponse(res, 201, location);
      }
    });
};

module.exports.locationsListByDistance = function(req, res){
  //sendJsonResponse(res, 200, {"status" : "success"});
  Loc
    .find()
    .exec(function(err, location){
      if(!location){
        console.log("404 - Locations not found");
        sendJsonResponse(res, 404, {"message": "locationid not found"});
        return;
      }else if (err){
        // si è verificato un errore e lo restituisco
        console.log("404 - " + err);
        sendJsonResponse(res, 404, err);
        return;
      }
      // restituisco il risultato del findById
      console.log("200 - " + location);
      sendJsonResponse(res, 200, location);
    });
};

module.exports.locationsReadOne = function(req, res){
  console.log("STO CERCANDO " + req.params.locationid);
  if(req.params && req.params.locationid){
    // esiste la locationid nella richiesta
    Loc
      .findById(req.params.locationid)
        .exec(function(err, location) {
          console.log(req.params.locationid);
          if(!location){
            // la locationid non è stata trovata
            console.log("404 - Locationid not found");
            sendJsonResponse(res, 404, {"message": "locationid not found"});
            return;
          }else if (err){
            // si è verificato un errore e lo restituisco
            console.log("404 - " + err);
            sendJsonResponse(res, 404, err);
            return;
          }
          // restituisco il risultato del findById
          console.log("200 - " + location);
          sendJsonResponse(res, 200, location);
        });
  }else{
    // non esiste la locationid nella richiesta e lo restituisco
    console.log("404 - No locationid in request");
    sendJsonResponse(res, 404, {"message": "No locationid in request"});
  }
};

module.exports.locationsUpdateOne = function(req, res){
  sendJsonResponse(res, 200, {"status" : "success"});
};

module.exports.locationsDeleteOne = function(req, res){
  sendJsonResponse(res, 200, {"status" : "success"});
};

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};
