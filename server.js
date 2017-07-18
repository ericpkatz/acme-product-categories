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

app.get('/', function(req, res, next){
  res.render('index', { categoryNames: db.getCategoryNames()});
});

app.get('/categories/:name/products', function(req, res, next){
  res.render('products', { products: db.getProductsByCategory(req.params.name), categoryNames: db.getCategoryNames(), selected: req.params.name });
});

app.post('/categories/', function(req, res, next){
  db.createCategory(req.body.name);
  res.redirect(`/categories/${req.body.name}/products`);
});

app.delete('/categories/:name', function(req, res, next){
  db.deleteCategory(req.params.name);
  res.redirect(`/`);
});

app.post('/categories/:name/products', function(req, res, next){
  db.createProduct(req.body, req.params.name);
  res.redirect(`/categories/${req.params.name}/products`);
});

app.delete('/categories/:name/products/:id', function(req, res, next){
  db.deleteProduct(req.params.name, req.params.id*1);
  res.redirect(`/categories/${req.params.name}/products`);
});


var port = process.env.PORT || 3000;

app.listen(port, function(){
  console.log(`listening on port ${port}`);
});
