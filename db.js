var data = {

};

function getCategoryNames(){
  return Object.keys(data);
}

function createProduct(product, categoryName){
  data[categoryName] = data[categoryName] || [];
  product.id = data[categoryName].reduce(function(max, _product){
    if(_product.id > max){
      max = _product.id;
    }
    return max;
  }, 0) + 1;
  data[categoryName].push(product);
}

function deleteProduct(categoryName, id){
  data[categoryName] = data[categoryName] || [];
  data[categoryName] = data[categoryName].filter(function(product){
    return product.id !== id;
  });
}

function deleteCategory(name){
  delete data[name];
}

function createCategory(name){
  data[name] = [];
}

function updateProduct(product, categoryName){
  data[categoryName] = data[categoryName] || [];
  data[categoryName] = data[categoryName].map(function(_product){
    if(_product.id === product.id){
      return product;
    }
    return _product;
  });
}

function getProductsByCategory(name){
  return data[name];
}

module.exports = {
  getCategoryNames,
  getProductsByCategory,
  createProduct,
  deleteProduct,
  updateProduct,
  deleteCategory,
  createCategory
};

createProduct({ name: 'foo 1'}, 'Foo Category');
createProduct({ name: 'foo 2'}, 'Foo Category');
createProduct({ name: 'bar 1'}, 'Bar Category');
createProduct({ name: 'bar 2'}, 'Bar Category');
