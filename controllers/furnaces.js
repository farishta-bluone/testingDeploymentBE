const Furnace = require('../models/furnace');

exports.getFurnaces = (req, res, next) => {
    Furnace.fetchAll()
    .then(([rows]) => {
        res.send({rows: rows })
    })
    .catch(err => console.log(err));
};