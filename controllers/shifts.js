const Shift = require('../models/shift');

exports.getShifts = (req, res, next) => {
    Shift.fetchAll()
    .then(([rows]) => {
        res.send({rows: rows })
    })
    .catch(err => console.log(err));
};