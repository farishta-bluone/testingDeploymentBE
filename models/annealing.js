const db = require('../util/database');

module.exports = class Annealing {
    constructor(id, created_at, updated_at, coils, base, furnace, date, shift, charge_no, priority, notes, status ) {
        this.id = id;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.coils = coils;
        this.base = base;
        this.furnace = furnace;
        this.date = date;
        this.shift = shift;
        this.charge_no = charge_no;
        this.priority = priority;
        this.notes = notes;
        this.status = status;
    }

    save() {
        return db.execute('INSERT INTO annealing (created_at, updated_at, coils, base, furnace, date, shift, charge_no, priority, notes, status) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
            [this.created_at, this.updated_at, this.coils, this.base, this.furnace, this.date, this.shift, this.charge_no, this.priority, this.notes, this.status]
        )
    }

    static getBatchID (data) {
        let query = "";
        if(data.updated_at) query = `updated_at = "${data.updated_at}",`
        if(data.created_at) query = `created_at = "${data.created_at}",`
        if(data.charge_no) query = `charge_no = "${data.charge_no}"`
        return db.execute(`SELECT id from annealing where ${query}`)
    }

    static fetchAll(query) {
        let whereQuery = ""
        let statusQuery = ""
        if (query.status) {
            let tempStatus = (query.status).toString().split(",");
            if(tempStatus.length > 1) {
                for (let i = 0; i< tempStatus.length; i++) {
                    statusQuery = `${statusQuery} status = "${tempStatus[i]}"`
                    if(i != (tempStatus.length-1)) statusQuery = `${statusQuery} OR` 
                } 
            }
            else statusQuery = `status = "${query.status}"`
        }
        if(statusQuery) whereQuery = `(${statusQuery})`

        if(query.date) whereQuery = `${whereQuery} and date >= "${query.date}" and date < "${query.date} 23:59:59"` 
        let orderQuery = ''
        if(query.sortBy && query.orderBy) orderQuery = `ORDER BY ${query.sortBy} ${query.orderBy}`
        else orderQuery = `ORDER BY updated_at desc`

        if(query.limit && query.page) orderQuery = `${orderQuery} LIMIT ${query.limit} OFFSET ${(parseInt(query.page) - 1) * parseInt(query.limit)}`
        else orderQuery = `${orderQuery} LIMIT 10`

        if(whereQuery) orderQuery = `WHERE ${whereQuery} ${orderQuery}`
        return db.execute(`SELECT * FROM annealing ${orderQuery}`);
    }

    static update(data) {
        let query = "";
        if(data.updated_at) query = `updated_at = "${data.updated_at}",`
        if(data.charge_no) query = `charge_no = "${data.charge_no}",`
        if(data.priority) query = `${query} priority = "${data.priority}",`
        if(data.base) query = `${query} base = ${data.base},`
        if(data.furnace) query = `${query} furnace = ${data.furnace},`
        if(data.shift) query = `${query} shift = ${data.shift},`
        if(data.date) query = `${query} date = "${data.date}",`
        if(data.notes) query = `${query} notes = "${data.notes}",`
        if(data.temperature) query = `${query} temperature = ${data.temperature},`
        if(data.status) query = `${query} status = "${data.status}"`
        return db.execute(`UPDATE annealing SET ${query} WHERE id = ${data.id}`)
    }

    static updateReport(data) {
        let query = "";
        query = `SET temperature = ${data.temperature ? data.temperature : null}`
        return db.execute(`UPDATE annealing ${query} WHERE id = ${data.id}`)
    }
};