var express = require('express');
var db = require('./db');
var path = require('path');
var swig = require('swig');
swig.setDefaults({ cache: false });

var app = express();
app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));

app.use(require('body-parser').urlencoded({extended: false }));
app.use(require('method-override')('_method'));

app.set('view engine', 'html');
app.engine('html', swig.renderFile);

app.use(function(req, res, next){
  res.locals.data = db.data;
  next();
});

app.get('/', function(req, res, next){
  res.render('index', { categoryNames: db.getCategoryNames()});
});

app.use('/categories', require('./routes/categories'));

var port = process.env.PORT || 3000;

app.listen(port, function(){
  console.log(`listening on port ${port}`);
});
