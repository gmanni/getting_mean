var mongoose = require( 'mongoose' );

// var dbURI = 'mongodb://localhost:27017/Loc8r';
var dbURI = 'mongodb://localhost:27017/Loc8r';
mongoose.connect(dbURI);

// CONNECTION EVENTS
mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error',function (err) {
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});


require('./locations');
