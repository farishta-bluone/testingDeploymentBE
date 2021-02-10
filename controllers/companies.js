const Company = require('../models/company');
const Coil = require('../models/coil');

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

exports.deleteCompany = async (req, res, next) => {
    let result = await Coil.fetchAll({company: parseInt(req.params.id)})
    console.log(result[0].length, "result")
    if(result[0].length > 0) {
        res.status(403).send("Can't delete the company, as it is involed in HR stock");
    }  
    else {
        Company.delete(parseInt(req.params.id)).then(() => {
            res.send("successfully deleted")
        }).catch(err => console.log(err));
    }
    
};

exports.updateCompany = (req, res, next) => {
    let data = req.body;
    data.id = parseInt(req.params.id)
    Company.update(data)
    .then(() => {
        res.send("updated Successfully")
    })
    .catch(err => console.log(err));
  };