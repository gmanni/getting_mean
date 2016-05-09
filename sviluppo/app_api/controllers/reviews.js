module.exports.reviewsCreate = function(req, res){
  sendJsonResponse(res, 200, {"status" : "success"});
};

var sendJsonResponse = function(res, status, content){
  res.status(status);
  res.json(content);
};
