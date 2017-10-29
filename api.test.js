var request = require('request');
request('http://127.0.0.1:3000/api/courses', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  
  var obj =  JSON.parse(body)
  var courses = obj.data.courses
  console.log('body:', courses); // Print the HTML for the Google homepage.
});