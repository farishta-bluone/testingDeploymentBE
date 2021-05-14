const Annealing = require('../models/annealing');

const SlittedCoil = require('../models/slittedCoil');

exports.getBatches = (req, res, next) => {
    Annealing.fetchAll(req.query)
    .then(([rows]) => {
        res.send({rows: rows })
    })
    .catch(err => console.log(err));
};


exports.postAddBatch = async (req, res, next) => {
    let data = req.body;
    data.status = data.status ? data.status : "in-queue for annealing";
    data.updated_at = data.created_at // for newly added coil
    const {created_at, updated_at, coils, base, furnace, date, shift, charge_no, priority, notes, status} = req.body
    const batch = new Annealing(null, created_at, updated_at, coils, base, furnace, date, shift, charge_no, priority, notes, status)
    await batch.save();
    const promise = await Annealing.getBatchID({created_at, updated_at, charge_no});
    let batch_no = parseInt(promise[0][0].id);
    let _coils = coils.split(",");
    for(let item of _coils) {
        let _data = {id: parseInt(item), status: status, updated_at: updated_at, batch_no: batch_no}
        await SlittedCoil.update(_data);
    }
    res.send("successfuuly added")
};

exports.updateBatch = async (req, res, next) => {
    let data = req.body;
    if(req.params.id == "report") { //for report updation
        if(data.length > 0) {
            for(let item of data) {
                let _data = {id: parseInt(item.id), temperature: item.temp ? parseFloat(item.temp) : null}
                await Annealing.updateReport(_data);
            }
            res.send("successfuuly annealed")
        }
        else res.send("successfuuly updated")
    }
    else {
        data.status = data.status ? data.status : "in-queue for annealing";
        data.updated_at = data.updated_at // for newly added coil
        data.id = parseInt(req.params.id)
        await Annealing.update(data)
        
        let _coils = data.coils ? data.coils.split(",") : [];
        if(data.status === "annealed" && _coils.length > 0) {
            for(let item of _coils) {
                let _data = {id: parseInt(item), status: data.status, updated_at: data.updated_at}
                await SlittedCoil.update(_data);
            }
            res.send("successfuuly annealed")
        }
        else res.send("successfuuly updated")
    }
    
    
};

exports.updateReport = async (req, res, next) => {
    let data = req.body;
    if(data.length > 0) {
        for(let item of data) {
            let _data = {id: parseInt(item.id), temperature: item.temp}
            await Annealing.updateReport(_data);
        }
        res.send("successfuuly annealed")
    }
    else res.send("successfuuly updated")
};