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
    data.status = data.status ? data.status : "available";
    data.updated_at = data.created_at // for newly added coil
    // res.send("success")
    const {created_at,updated_at, company, brand_no, status, weight, formulated_weight, thickness, width, date, is_avilable} = req.body
    const coil = new Coil(null, created_at, updated_at, company, brand_no, status, weight, formulated_weight, thickness, width, date, is_avilable)
    coil.save()
    .then(() => {
        Coil.fetchAll({brand_no:brand_no,thickness: thickness,date: date })
        .then(([rows]) => {
            if(status === "slitted") {
                let coilData = {slit_date: data.date, status: data.status};
                if(data.shift) coilData.slit_shift = data.shift;
                coilData.id = rows[0].id
                
                Coil.update(coilData).then(() => {
                    data.parent_id = rows[0].id
                    data.slitted_width = rows[0].width
                    data.slitted_weight = rows[0].weight
                    data.slit_no = rows[0].brand_no
                    data.actual_width = rows[0].width
                    data.actual_weight = rows[0].weight

                    const slitted_coil = new SlittedCoil(null, data.created_at, data.updated_at, data.parent_id, data.slitted_width, data.slitted_weight, data.status, data.is_avilable, data.slit_no, data.actual_width, data.actual_weight)
                    slitted_coil.save().then(() => {
                        res.send({coil: rows[0]})
                    })
                })
                
            } else res.send({coil: rows[0]})
            
        }).catch(err => console.log(err));
        // res.send("successfuuly added")
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
    Coil.delete(req.params.id).then(() => {
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
    if(!data.status) data.status = 'in-queue' 
    let coilData = {slit_date: data.slit_date, status: data.status, slit_shift: data.slit_shift, updated_at: data.slittedItems[0].updated_at};
    coilData.id = parseInt(req.params.id)
    if(data.notes) coilData.notes = data.notes
    await Coil.update(coilData)
    for(let i=0; i<data.slittedItems.length; i++) {
        let coil = data.slittedItems[i]
        if(!coil.slit_no) coil.slit_no = null
        if(!coil.actual_weight) coil.actual_weight = null
        if(!coil.actual_width) coil.actual_width = null
        const slitted_coil = new SlittedCoil(null, coil.created_at, coil.updated_at, coil.parent_id, coil.slitted_width, coil.slitted_weight, coil.status, coil.is_avilable, coil.slit_no, coil.actual_width, coil.actual_weight)
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
    if(data.notes) coilData.notes = data.notes

    // let coilData = {slit_date: data.slit_date, slit_shift: data.slit_shift, status: "in-queue", updated_at: data.slittedItems[0].updated_at};
    coilData.id = parseInt(req.params.id)
    await Coil.update(coilData)
    for(let i=0; i<data.slittedItems.length; i++) {
        let coil = data.slittedItems[i]
        let _data = {id: coil.ID}
        if(coil.slitted_width) _data.slitted_width = coil.slitted_width
        if(coil.slitted_weight) _data.slitted_weight = coil.slitted_weight
        if(coil.actual_width) _data.actual_width = coil.actual_width
        if(coil.actual_weight) _data.actual_weight = coil.actual_weight
        if(coil.status) _data.status = coil.status
        if(coil.slit_no) _data.slit_no = coil.slit_no
        if(coil.ID) {       //ID -> update slit
            await SlittedCoil.update(_data)
        }
        else { //create slit
            coil.is_avilable = true
            const slitted_coil = new SlittedCoil(null, coil.created_at, coil.updated_at, coil.parent_id, coil.slitted_width, coil.slitted_weight, coil.status, coil.is_avilable, coil.slit_no, coil.actual_width, coil.actual_weight)
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