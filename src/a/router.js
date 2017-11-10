const router = require('koa-router')()
const request = require('request')
const model = require('./model')


// Api
router.get('/api', function (ctx, next) {
  return new Promise(function (resolve, reject) {
    request('http://127.0.0.1:3000/api/a', function (error, response, body) {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

      var obj = JSON.parse(body)
      var a = obj.data.a
      console.log('body:', a); // Print the HTML for the Google homepage.
      resolve(a)
    });
  }).then(function (a) {
    ctx.body = {
      "total": a.length,
      "rows": a
    }
  })
})

router.post('/api', function (ctx, next) {
  return new Promise(function (resolve, reject) {
    request.post({ url: 'http://127.0.0.1:3000/api/a', form: req.body }, function (error, response, body) {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

      var a = JSON.parse(body)

      console.log(body)
      console.dir(a)
      resolve(a)
    });
  }).then(function (a) {
    ctx.body = a
  })
})

router.delete('/api/:id', function (ctx, next) {
  let id = ctx.params.id
  return new Promise(function (resolve, reject) {
    request.delete({ url: 'http://127.0.0.1:3000/api/a/' + id, form: {} }, function (error, response, body) {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

      var a = JSON.parse(body)

      console.log(body)
      console.dir(a)
      resolve(a)
    });
  }).then(function (a) {
    ctx.body = a
  })
})

// router.prefix('/a')

router.get('/', function (ctx, next) {
  ctx.render('src/a/index', {
    title: "2323"
  })
})

router.get('/new', function (ctx, next) {
  ctx.render('src/a/new', {
    title: "2323"
  })
})

router.get('/:id/edit', function (ctx, next) {
  ctx.render('src/a/edit', {
    title: "2323"
  })
})

router.get('/:id', function (ctx, next) {
  let id = ctx.params.id
  return new Promise(function (resolve, reject) {
    request('http://127.0.0.1:3000/api/a/' + id, function (error, response, body) {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

      var obj = JSON.parse(body)
      var course = obj.data.course
      console.log('body:', course); // Print the HTML for the Google homepage.
      resolve(course)
    });
  }).then(function (course) {
    ctx.render('src/a/show', {
      title: "2323",
      course: course
    })
  })
})



module.exports = router
