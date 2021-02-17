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
        // this.slit_no = slit_no;
    }

    save() {
        return db.execute('INSERT INTO slittedCoils (created_at, updated_at, parent_id, slitted_width, slitted_weight,  status, is_avilable) VALUES (?,?,?,?,?,?,?)',
            [this.created_at, this.updated_at, this.parent_id,  this.slitted_width, this.slitted_weight,this.status, this.is_avilable]
        )
    }
    static fetchAll(query) {
        let whereQuery = 's.status = "in-queue"'
        if(query.slit_date) whereQuery = `${whereQuery} and c.slit_date >= "${query.slit_date}" and c.slit_date < "${query.slit_date} 23:59:59"` 
        // if(query.slit_date) whereQuery = `${whereQuery} and slit_date >= "${query.slit_date}" and slit_date < "${query.slit_date} 23:59:59"` 
        if(query.slit_shift) whereQuery = `${whereQuery} and c.slit_shift = ${query.slit_shift}`
        return db.execute(`SELECT s.*, c.brand_no, c.company, c.thickness, c.weight, c.width, c.formulated_weight, c.date, c.slit_shift, c.slit_date 
        FROM slittedCoils s
        LEFT JOIN coils c
        ON s.parent_id = c.id WHERE ${whereQuery}`);
    }

    static update(data) {
        let query = "";
        if(data.updated_at) query = `updated_at = "${data.updated_at}",`
        if(data.slitted_weight) query = `${query} slitted_weight = ${data.slitted_weight},`
        if(data.slitted_width) query = `${query}  slitted_width = ${data.slitted_width},`
        if(data.slit_no) query = `${query}  slit_no = "${data.slit_no}",`
        if(data.status) query = `${query} status = "${data.status}"`
        return db.execute(`UPDATE slittedCoils SET ${query} WHERE id = ${data.id}`)
    }

    static delete(id) {
        return db.execute(`DELETE FROM slittedCoils WHERE id = ${id}`)
    }

    static deleteSlits(ids) {
        console.log("ids ", ids, typeof(ids))
        return db.execute(`DELETE FROM slittedCoils WHERE id IN (${ids})`)
    }
};