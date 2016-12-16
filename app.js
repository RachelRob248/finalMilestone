var express = require('express');
var app = express();
var bp = require('body-parser');
var pgp = require('pg-promise')();
var db = pgp('postgres://postgres:Laughs248@localhost:5432/score');

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.set('views', __dirname+'/views');

app.use(bp.urlencoded({ extended: false }))

app.use(bp.json())

app.get('/', function(req,res,next){
  res.render('index');
});

app.get('/scores', function(req,res,next){
  db.any('SELECT * FROM score_table ORDER BY score DESC')
    .then(function(scores){
      return res.render('scores', {scores: scores});
    })
    .catch(function(err){
      return next(err);
    });
});

app.post('/', function(req,res,next){
  var score = 0;
  var user = req.body.user;
  if(req.body.question1 === 'correct') score++;
  if(req.body.question2 === 'correct') score++;
  if(req.body.question3 === 'correct') score++;
  if(req.body.question4 === 'correct') score++;
  if(req.body.question5 === 'correct') score++;
  if(req.body.question6 === 'correct') score++;
  if(req.body.question7 === 'correct') score++;
  if(req.body.question8 === 'correct') score++;
  if(req.body.question9 === 'correct') score++;
  if(req.body.question10 === 'correct') score++;
  if(req.body.question11 === 'correct') score++;
  if(req.body.question12 === 'correct') score++;
  if(req.body.question13 === 'correct') score++;
  if(req.body.question14 === 'correct') score++;
  if(req.body.question15 === 'correct') score++;
  if(!req.body.user) user = "No name";
  console.log(score);
  db.none('INSERT INTO score_table(name, score) VALUES ($1,$2)', [user, score])
    .then(function() {
      res.redirect('/scores');
    })
    .catch(function(err) {
      return next(err);
    });
});

app.listen(3000, function(){
  console.log('Application running on localhost on port 3000');
});
