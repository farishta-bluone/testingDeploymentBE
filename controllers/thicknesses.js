const Thickness = require('../models/thickness');

exports.getThicknesses = (req, res, next) => {
    Thickness.fetchAll()
    .then(([rows]) => {
        res.send({rows: rows })
    })
    .catch(err => console.log(err));
};

exports.postAddThickness = (req, res, next) => {
    let data = req.body;
    const thickness = new Thickness(null, data.value)
    thickness.save()
    .then(() => {
        res.send("successfuuly added")
    })
    .catch(err => console.log(err));
};