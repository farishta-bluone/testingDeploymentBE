const Coil = require('../models/coil');

const SlittedCoil = require('../models/slittedCoil');

exports.getCoils = (req, res, next) => {
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
    data.updated_at = data.created_at // for newly added coil
    // res.send("success")
    const {created_at,updated_at, company, brand_no, status, weight, formulated_weight, thickness, width, date, is_avilable, od} = req.body
    const coil = new Coil(null, created_at, updated_at, company, brand_no, status, weight, formulated_weight, thickness, width, date, is_avilable, od)
    coil.save()
    .then(() => {
        res.send("successfuuly added")
    })
    .catch(err => console.log(err));
  };

  exports.updateCoil = (req, res, next) => {
    let data = req.body;
    data.id = parseInt(req.params.id)
    Coil.update(data)
    .then(() => {
        res.send("updated Successfully")
    })
    .catch(err => console.log(err));
  };

exports.deleteCoil = (req, res, next) => {
    console.log("req.body", req.body, req.query, req.params)
    Coil.delete(parseInt(req.params.id)).then(() => {
        res.send("successfully deleted")
    }).catch(err => console.log(err));
};

exports.getSlits = (req, res, next) => {
    console.log("req.body", req.body, req.query, req.params)
    Coil.previewSlits(parseInt(req.params.id)).then(([rows]) => {
        res.send({rows: rows})
    }).catch(err => console.log(err));
};

exports.postAddSlits = (req, res, next) => {
    let data = req.body;
    // let slittedCoils = data.slittedItems; 
    // res.send("heyy")
    console.log("data", req.body, req.query, req.params)



    let coilData = {slit_date: data.slit_date, status: "in-queue"};
    coilData.id = parseInt(req.params.id)
    Coil.update(coilData)
    .then(() => {
        for(let i=0; i<data.slittedItems.length; i++) {
            let coil = data.slittedItems[i]
            // coil.parent_id = coilData.id
            // console.log("coil checkk", coil)
            // const {created_at,updated_at, status, , formulated_weight, thickness, width, date, is_avilable, od} = req.body
        const slitted_coil = new SlittedCoil(null, coil.created_at, coil.updated_at, coil.parent_id, coil.slitted_width, coil.slitted_weight, coil.status, coil.is_avilable)
        slitted_coil.save()
        .then(() => {
            // res.send("successfuuly added")
        })
        .catch(err => console.log(err));
        }
        res.send("updated Successfully")
    })
    .catch(err => console.log(err));
    
    // data.updated_at = data.created_at // for newly added coil
    // res.send("success")
    // const {created_at,updated_at, company, brand_no, status, weight, formulated_weight, thickness, width, date, is_avilable, od} = req.body
    // const coil = new Coil(null, created_at, updated_at, company, brand_no, status, weight, formulated_weight, thickness, width, date, is_avilable, od)
    // coil.save()
    // .then(() => {
    //     res.send("successfuuly added")
    // })
    // .catch(err => console.log(err));
  };