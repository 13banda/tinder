var express = require('express');
var app = express();
var request = require('request');
var router = express.Router();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var config = require('./config');

require('request-debug')(request);

var hasuraRouter = require('./hasuraExamples');

var server = require('http').Server(app);

router.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/', hasuraRouter);

app.post("/delete",function(req,res){
  //var hasura_id = req.body.hasura_id;
  console.log(req.headers);
  const hasura_id = req.headers['x-hasura-user-id'];
  const hasura_role = req.headers['x-hasura-role'];
  const hasura_allowed_role = req.headers['x-hasura-allowed-roles'];

  if( hasura_id > 1){
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
              "hasura_id": Number(hasura_id) 
          })
        }
        request(deleteOptions, function(error, response, body) {
          console.log("response 1:-"+response)
          if (error) {
              console.log('Error from delete-user request: ');
              console.log(error)
              res.status(500).json({
                'error': error,
              'message': 'delete-user request failed'
            });
        }
        else
        {
            var deleteOptions = {
                url: config.projectConfig.url.data,
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'X-Hasura-User-Id': hasura_id,
                  'X-Hasura-Role': hasura_role,
                  "X-Hasura-Allowed-Roles": hasura_allowed_role
                },
                body: JSON.stringify({
                                      "type": "bulk",
                                      "args": [
                                          {
                                              "type": "delete",
                                              "args": {
                                                  "table": "match",
                                                  "where": {
                                                      "$or": [
                                                          {
                                                              "hasura_id": {
                                                                  "$eq": hasura_id
                                                              }
                                                          },
                                                          {
                                                              "like_user_id": {
                                                                  "$eq": hasura_id
                                                              }
                                                          }
                                                      ]
                                                  }
                                              }
                                          },
                                          {
                                              "type": "delete",
                                              "args": {
                                                  "table": "userinfo",
                                                  "where": {
                                                      "hasura_id": {
                                                          "$eq": hasura_id
                                                      }
                                                  }
                                              }
                                          }
                                      ]
                                    })
            }
            request(deleteOptions, function(error, response, body) {
              console.log("response 1:-"+response)
              if (error) {
                  console.log(error)
                  res.status(500).json({
                    'error': error,
                    'message': 'delete-user request failed'
                  });
              }
              res.json(JSON.parse(body))
            })
        }
        //res.json(JSON.parse(body)) this line not execute anywhere
      })
    }
    else{
      res.status(500).json({
        'message': 'delete-user request failed'
      });
    }
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
