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

exports.updateSlits = async (req, res, next) => {
    let data = req.body;
    for(let item of data) {
        item.id = parseInt(item.id)
        await SlittedCoil.update(item)
    }
    res.send("successfully updated");
    
};

exports.getSingleSlit = (req, res, next) => {
    SlittedCoil.getSingleSlit(parseInt(req.params.id)).then(([rows]) => {
        res.send({rows: rows})
    }).catch(err => console.log(err));
};