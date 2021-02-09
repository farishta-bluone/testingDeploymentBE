const db = require('../util/database');

module.exports = class SlittedCoil {
    constructor(id, created_at, updated_at, parent_id, slitted_width, slitted_weight, status, is_avilable) {
        this.id = id;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.parent_id = parent_id;
        this.slitted_width = slitted_width;
        this.slitted_weight = slitted_weight;
        this.status = status;
        this.is_avilable = is_avilable;
    }

    save() {
        console.log("Calllledddddd")
        return db.execute('INSERT INTO slittedCoils (created_at, updated_at, parent_id, slitted_width, slitted_weight,  status, is_avilable) VALUES (?,?,?,?,?,?,?)',
            [this.created_at, this.updated_at, this.parent_id,  this.slitted_width, this.slitted_weight,this.status, this.is_avilable]
        )
    }
    static fetchAll() {
        console.log("Calleddddd")
        return db.execute(`SELECT s.*, c.brand_no, c.company, c.thickness, c.date
        FROM VM.slittedCoils s
        LEFT JOIN VM.coils c
        ON s.parent_id = c.id`);
    }

    static update(data) {
        console.log("dataaaa", data)
        let query = "";
        if(data.updated_at) query = `updated_at = "${data.updated_at}",`
        if(data.slitted_weight) query = `${query} slitted_weight = ${data.slitted_weight},`
        if(data.slitted_width) query = `${query}  slitted_width = ${data.slitted_width},`
        if(data.status) query = `${query} status = "${data.status}"`
        console.log("query",query)
        return db.execute(`UPDATE slittedCoils SET ${query} WHERE id = ${data.id}`)
    }

    static delete(id) {
        return db.execute(`DELETE FROM slittedCoils WHERE id = ${id}`)
    }
};