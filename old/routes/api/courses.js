var express = require('express');
var router = express.Router();
var request = require('request');
  
/* GET home page. */
router.get('/', function (req, res, next) {
  request('http://127.0.0.1:3000/api/courses', function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  
    var obj =  JSON.parse(body)
    var courses = obj.data.courses
    console.log('body:', courses); // Print the HTML for the Google homepage.
    res.json({
        "total": courses.length,
        "rows": courses
    })
  });
});

router.post('/', function (req, res, next) {
  console.log(req.body)
  request.post({url:'http://127.0.0.1:3000/api/courses', form: req.body}, function(error,response,body){ 
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  
    var obj =  JSON.parse(body)
    
    console.log(body)
    console.dir(obj)
    // var courses = obj.data.courses
    // console.log('body:', courses); // Print the HTML for the Google homepage.
    res.json(obj)
  });
});


router.delete('/:id', function (req, res, next) {
  // console.log(req.body)
  request.delete({url:'http://127.0.0.1:3000/api/courses/' + req.params.id, form: {}}, function(error,response,body){ 
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  
    var obj =  JSON.parse(body)
    
    console.log(body)
    console.dir(obj)
    // var courses = obj.data.courses
    // console.log('body:', courses); // Print the HTML for the Google homepage.
    res.json(obj)
  });
});

module.exports = router;
