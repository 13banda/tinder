var express = require('express');
var router = express.Router();
var config = require('./config');
var request = require('request');

router.route("/").get(function (req, res) {
  console.log("loges")
  res.send("Hello-React")
})
router.route("/").post(function (req, res) {
  console.log(req.body.hasura_id+" this is here don't worry")
  res.send(req.body.hasura_id)
})

router.route("/signup").post(function(req,res){
   // post to auth end get result
    let username=req.body.username;
    let password=req.body.password;

    var signupOptions = {
      url: config.projectConfig.url.auth,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Hasura-User-Id': 0,
        'X-Hasura-Role': 'anonymous'
      },
      body: JSON.stringify({
        "provider": "username",
        "data": {
            "username": username,
            "password": password
        },
      })
    }
    request(signupOptions, function(error, response, body) {
      if (error) {
          console.log('Error from signup request: ');
          console.log(error)
          res.status(500).json({
            'error': error,
            'message': 'signup request failed'
          });
      }
      res.json(JSON.parse(body))
    })
})
router.route("/get_articles").get(function (req, res) {
  //Fetch all rows from table - articles
  var selectOptions = {
    url: config.projectConfig.url.data,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Hasura-User-Id': 0,
      'X-Hasura-Role': 'anonymous'
    },
    body: JSON.stringify({
      'type': 'select',
      'args': {
        'table': 'article',
        'columns': [
          '*'
        ]
      }
    })
  }
  request(selectOptions, function(error, response, body) {
    if (error) {
        console.log('Error from select request: ');
        console.log(error)
        res.status(500).json({
          'error': error,
          'message': 'Select request failed'
        });
    }
    res.json(JSON.parse(body))
  })
})

module.exports = router;
