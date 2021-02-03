const Coil = require('../models/coil');

exports.getCoils = (req, res, next) => {
  Coil.fetchAll(req.query)
    .then(([rows]) => {
        Coil.getCoilsCount(req.query).then(([count]) => {
            res.send({rows: rows, count: count[0]['COUNT(*)'] })
        }).catch(err => console.log(err));
      
    })
    .catch(err => console.log(err));
};

exports.postAddCoil = (req, res, next) => {
    let data = req.body;
    data.is_avilable = true;
    data.status = "avilable"
    data.updated_at = data.created_at // for newly added coil
    // res.send("success")
    const {created_at,updated_at, company, brand_no, status, weight, formulated_weight, thickness, width, date, is_avilable, od} = req.body
    const coil = new Coil(null, created_at, updated_at, company, brand_no, status, weight, formulated_weight, thickness, width, date, is_avilable, od)
    coil.save()
    .then(() => {
        res.send("successfuuly added")
    })
    .catch(err => console.log(err));
  };

  exports.updateCoil = (req, res, next) => {
    let data = req.body;
    data.id = parseInt(req.params.id)
    Coil.update(data)
    .then(() => {
        res.send("updated Successfully")
    })
    .catch(err => console.log(err));
  };

exports.deleteCoil = (req, res, next) => {
    console.log("req.body", req.body, req.query, req.params)
    Coil.delete(parseInt(req.params.id)).then(() => {
        res.send("successfully deleted")
    }).catch(err => console.log(err));
};

exports.getSlits = (req, res, next) => {
    console.log("req.body", req.body, req.query, req.params)
    Coil.previewSlits(parseInt(req.params.id)).then(([rows]) => {
        res.send({rows: rows})
    }).catch(err => console.log(err));
};

// exports.getIndex = (req, res, next) => {
//   Product.fetchAll()
//     .then(([rows, fieldData]) => {
//       res.render('shop/index', {
//         prods: rows,
//         pageTitle: 'Shop',
//         path: '/'
//       });
//     })
//     .catch(err => console.log(err));
// };

// exports.getCart = (req, res, next) => {
//   Cart.getCart(cart => {
//     Product.fetchAll(products => {
//       const cartProducts = [];
//       for (product of products) {
//         const cartProductData = cart.products.find(
//           prod => prod.id === product.id
//         );
//         if (cartProductData) {
//           cartProducts.push({ productData: product, qty: cartProductData.qty });
//         }
//       }
//       res.render('shop/cart', {
//         path: '/cart',
//         pageTitle: 'Your Cart',
//         products: cartProducts
//       });
//     });
//   });
// };

// exports.postCartDeleteProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   Product.findById(prodId, product => {
//     Cart.deleteProduct(prodId, product.price);
//     res.redirect('/cart');
//   });
// };

// exports.getOrders = (req, res, next) => {
//   res.render('shop/orders', {
//     path: '/orders',
//     pageTitle: 'Your Orders'
//   });
// };

// exports.getCheckout = (req, res, next) => {
//   res.render('shop/checkout', {
//     path: '/checkout',
//     pageTitle: 'Checkout'
//   });
// };