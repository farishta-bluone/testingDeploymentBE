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
    data.status = "available"
    data.updated_at = data.created_at // for newly added coil
    // res.send("success")
    const {created_at,updated_at, company, brand_no, status, weight, formulated_weight, thickness, width, date, is_avilable, shift} = req.body
    const coil = new Coil(null, created_at, updated_at, company, brand_no, status, weight, formulated_weight, thickness, width, date, is_avilable, shift)
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

exports.postAddSlits = async (req, res, next) => {
    let data = req.body;
    let coilData = {slit_date: data.slit_date, status: "in-queue", slit_shift: data.slit_shift, updated_at: data.slittedItems[0].updated_at};
    coilData.id = parseInt(req.params.id)
    await Coil.update(coilData)
    for(let i=0; i<data.slittedItems.length; i++) {
        let coil = data.slittedItems[i]
        const slitted_coil = new SlittedCoil(null, coil.created_at, coil.updated_at, coil.parent_id, coil.slitted_width, coil.slitted_weight, coil.status, coil.is_avilable)
        await slitted_coil.save()
    }
    Coil.getSingleCoil(parseInt(req.params.id)).then(([data]) => {
        // console.log(result[0])
        res.send(data)
    }).catch(err => console.log(err));
  };

exports.updateSlits = async (req, res, next) => {
    let data = req.body;
    let coilData = {}
    if(data.updated_at) coilData.updated_at = data.updated_at
    else coilData.updated_at = data.slittedItems[0].updated_at

    if(data.slit_date) coilData.slit_date = data.slit_date;
    if(data.slit_shift) coilData.slit_shift = data.slit_shift;
    if(data.status) coilData.status = data.status;
    if(data.slit_date) coilData.slit_date = data.slit_date;
    if(data.slit_date) coilData.slit_date = data.slit_date;

    // let coilData = {slit_date: data.slit_date, slit_shift: data.slit_shift, status: "in-queue", updated_at: data.slittedItems[0].updated_at};
    coilData.id = parseInt(req.params.id)
    await Coil.update(coilData)
    for(let i=0; i<data.slittedItems.length; i++) {
        let coil = data.slittedItems[i]
        if(coil.ID) {       //ID -> update slit
            let _data = {id: coil.ID}
            if(coil.slitted_width) _data.slitted_width = coil.slitted_width
            if(coil.slitted_weight) _data.slitted_weight = coil.slitted_weight
            if(coil.status) _data.status = coil.status
            if(coil.slit_no) _data.slit_no = coil.slit_no
            await SlittedCoil.update(_data)
        }
        else { //create slit
            const slitted_coil = new SlittedCoil(null, coil.created_at, coil.updated_at, coil.parent_id, coil.slitted_width, coil.slitted_weight, coil.status, coil.is_avilable)
            await slitted_coil.save()
        }
    }
    if(data.deletedItems) {
        for(let i=0; i<data.deletedItems.length; i++) {
            let coil = data.deletedItems[i]
            console.log("coil", coil)
            await SlittedCoil.delete(coil.ID)
            
        }
    }
        return res.json({ success: true });
  };

  exports.deleteSlits = async (req, res, next) => {
    let coilData = {}
    let data = req.query;
    coilData.status = 'available';
    if(data.updated_at) coilData.updated_at = data.updated_at
    coilData.id = parseInt(req.params.id)
    await Coil.update(coilData)
    await SlittedCoil.deleteSlits(req.query.ids).then(() => {
        res.send("successfully deleted")
    }).catch(err => console.log(err));
};