var app = require('express').Router();
var db = require('../db');

module.exports = app;


app.get('/:name/products', function(req, res, next){
  res.render('products', { products: db.getProductsByCategory(req.params.name), categoryNames: db.getCategoryNames(), selected: req.params.name });
});

app.post('/', function(req, res, next){
  db.createCategory(req.body.name);
  res.redirect(`/categories/${req.body.name}/products`);
});

app.delete('/:name', function(req, res, next){
  db.deleteCategory(req.params.name);
  res.redirect('/');
});

app.post('/:name/products', function(req, res, next){
  db.createProduct(req.body, req.params.name);
  res.redirect(`/categories/${req.params.name}/products`);
});

app.delete('/:name/products/:id', function(req, res, next){
  db.deleteProduct(req.params.name, req.params.id*1);
  res.redirect(`/categories/${req.params.name}/products`);
});
