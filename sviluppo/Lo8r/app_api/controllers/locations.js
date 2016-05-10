var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

module.exports.locationsCreate = function(req, res){
  sendJsonResponse(res, 200, {"status" : "success"});
};

module.exports.locationsListByDistance = function(req, res){
  sendJsonResponse(res, 200, {"status" : "success"});
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
