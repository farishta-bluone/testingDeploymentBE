const Coil = require('../models/Coil');

exports.getCoils = (req, res, next) => {
    console.log(req.body, req.params, req.query)
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
    // res.send("success")
    const {created_at, company, brand_no, status, weight, thickness, width, date, is_avilable} = req.body
    const coil = new Coil(null, created_at, company, brand_no, status, weight, thickness, width, date, is_avilable)
    coil.save()
    .then(() => {
        res.send("successfuuly added")
    })
    .catch(err => console.log(err));
  };

// exports.getProduct = (req, res, next) => {
//   const prodId = req.params.productId;
//   Product.findById(prodId, product => {
//     res.render('shop/product-detail', {
//       product: product,
//       pageTitle: product.title,
//       path: '/products'
//     });
//   });
// };

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




// const db = require("../util/database");

// exports.getCoils = (req, res, next) => {
//     console.log("check thisss");
//     db.execute('SELECT * FROM coils')
//     .then(result => {
//         res.send({rows: result[0]});
//         console.log("result", result[0])
//     })
//     .catch(err => {
//         console.log(err);
//     });
    
// }