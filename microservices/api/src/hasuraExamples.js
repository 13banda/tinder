var express = require('express');
var router = express.Router();
var config = require('./config');
var request = require('request');

router.route("/").get(function (req, res) {
  res.send("Hello-React")
})
router.route("/delete-user").post(function(req,res){
  let hasura_id = req.body.hasura_id;
  console.log(hasura_id+" yeah i am here")
  var deleteOptions = {
    url: config.projectConfig.url.auth.delete_user,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Hasura-User-Id': 1,
      'X-Hasura-Role': 'admin',
      "X-Hasura-Allowed-Roles": "user,admin"
    },
    body: JSON.stringify({
        "hasura_id": hasura_id
    })
  }
  request(deleteOptions, function(error, response, body) {
    if (error) {
        console.log('Error from delete-user request: ');
        console.log(error)
        res.status(500).json({
          'error': error,
          'message': 'delete-user request failed'
        });
    }
    res.json(JSON.parse(body))
  })

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
