var express = require('express');
var app = express();
var request = require('request');
var router = express.Router();
var morgan = require('morgan');
var bodyParser = require('body-parser');
require('request-debug')(request);

var hasuraRouter = require('./hasuraExamples');

var server = require('http').Server(app);

router.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//app.use('/', hasuraRouter);
app.post(function(req,res){
  var hasura_id = req.body.hasura_id;
  console.log(hasura_id)
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

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
