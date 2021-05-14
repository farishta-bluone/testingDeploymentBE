const Base = require('../models/base');

exports.getBases = (req, res, next) => {
    Base.fetchAll()
    .then(([rows]) => {
        res.send({rows: rows })
    })
    .catch(err => console.log(err));
};