const router = require('koa-router')()
const request = require('request')
// router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.render('src/users/index', {
    title: "用户管理"
  })
})


router.get('/login', function (ctx, next) {
  ctx.render('src/users/login', {
    title: "login"
  })
})

router.post('/login', function (ctx, next) {
  ctx.render('src/users/login', {
    title: "login"
  })
})

router.get('/register', function (ctx, next) {
  ctx.render('src/users/register', {
    title: "register"
  })
})

router.post('/register', function (ctx, next) {
  
  return new Promise(function (resolve, reject) {
    request.post({url:'http://127.0.0.1:3000/api/users/', form: ctx.request.body}, function(error, response, body){
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

      var obj = JSON.parse(body)
      // var courses = obj.data.courses
      console.log('body:', obj); // Print the HTML for the Google homepage.

      if (obj.status.code !== 0) {
        reject(obj)
      } else {
        resolve(obj)
      }
    });
  }).then(function (courses) {
    // show user detail
    ctx.body = {
      "total": courses.length,
      "rows": courses
    }
  }).catch(function(err){
    ctx.redirect('/users/register')
  })
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})


router.get('/api', function (ctx, next) {
  return new Promise(function (resolve, reject) {
    request('http://127.0.0.1:3000/api/users', function (error, response, body) {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

      var obj = JSON.parse(body)
      var users = obj.data.users
      console.log('body:', users); // Print the HTML for the Google homepage.
      resolve(users)
    });
  }).then(function (users) {
    ctx.body = {
      "total": users.length,
      "rows": users
    }
  })
})

router.delete('/api/:id', function (ctx, next) {
  let id = ctx.params.id
  return new Promise(function (resolve, reject) {
    request.delete({ url: 'http://127.0.0.1:3000/api/users/' + id, form: {} }, function (error, response, body) {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

      var courses = JSON.parse(body)

      console.log(body)
      console.dir(courses)
      resolve(courses)
    });
  }).then(function (courses) {
    ctx.body = courses
  })
})

module.exports = router
