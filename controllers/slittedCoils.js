const SlittedCoil = require('../models/slittedCoil');

exports.getCoils = (req, res, next) => {
    SlittedCoil.fetchAll(req.query)
    .then(([rows]) => {
        // Coil.getCoilsCount(req.query).then(([count]) => {
            res.send({rows: rows })
        // }).catch(err => console.log(err));
      
    })
    .catch(err => console.log(err));
};