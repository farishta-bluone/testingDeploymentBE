const Company = require('../models/Company');

exports.getCompanies = (req, res, next) => {
    Company.fetchAll()
    .then(([rows]) => {
        res.send({rows: rows })
    })
    .catch(err => console.log(err));
};

exports.postAddCompany = (req, res, next) => {
    let data = req.body;
    const company = new Company(null, data.name)
    company.save()
    .then(() => {
        res.send("successfuuly added")
    })
    .catch(err => console.log(err));
};