const SlittedCoil = require('../models/slittedCoil');

exports.getCoils = (req, res, next) => {
    SlittedCoil.fetchAll(req.query)
    .then(([rows]) => {
        SlittedCoil.getCount(req.query).then(([count]) => {
            res.send({rows: rows, count: count[0]['COUNT(*)'] })
        }).catch(err => console.log(err));
      
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

exports.getSlittedCoils = (req, res, next) => {
    SlittedCoil.fetchWithoutJoint(req.query).then(([rows]) => {
        SlittedCoil.getSlitsCount(req.query).then(([count]) => {
            res.send({rows: rows, count: count[0]['COUNT(*)'] })
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));
};

exports.getAnnealedCoils = (req, res, next) => {
    if(!req.query.status) req.query.status = "annealed"
    SlittedCoil.fetchAnnealedCoils(req.query).then(([rows]) => {
        SlittedCoil.getSlitsCount(req.query).then(([count]) => {
            res.send({rows: rows, count: count[0]['COUNT(*)'] })
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));
};

exports.addSlittedCoil = async (data) => {
    // add slitted Coil directly 
    const slitted_coil = new SlittedCoil(null, data.created_at, data.updated_at, data.parent_id, data.slitted_width, data.slitted_weight, data.status, data.is_avilable, data.slit_no, data.actual_width, data.actual_weight)
    await slitted_coil.save()
};