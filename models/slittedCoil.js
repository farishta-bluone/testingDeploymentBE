const db = require('../util/database');

module.exports = class SlittedCoil {
    constructor(id, created_at, updated_at, parent_id, slitted_width, slitted_weight, status, is_avilable, slit_no, actual_width, actual_weight) {
        this.id = id;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.parent_id = parent_id;
        this.slitted_width = slitted_width;
        this.slitted_weight = slitted_weight;
        this.status = status;
        this.is_avilable = is_avilable;
        this.slit_no = slit_no;
        this.actual_width = actual_width
        this.actual_weight = actual_weight;
    }

    save() {
        return db.execute('INSERT INTO slittedCoils (created_at, updated_at, parent_id, slitted_width, slitted_weight,  status, is_avilable, slit_no, actual_width, actual_weight) VALUES (?,?,?,?,?,?,?,?,?,?)',
            [this.created_at, this.updated_at, this.parent_id,  this.slitted_width, this.slitted_weight,this.status, this.is_avilable, this.slit_no, this.actual_width, this.actual_weight]
        )
    }
    static fetchAll(query) {
        let whereQuery = 's.is_avilable = true'
        if(query.slit_date) whereQuery = `${whereQuery} and c.slit_date >= "${query.slit_date}" and c.slit_date < "${query.slit_date} 23:59:59"` 
        if(query.pickling_date) whereQuery = `${whereQuery} and s.pickling_date >= "${query.pickling_date}" and s.pickling_date < "${query.pickling_date} 23:59:59"`
        if(query.thickness) whereQuery = `${whereQuery} and c.thickness  = ${query.thickness}` 
        if(query.pickled_thickness) whereQuery = `${whereQuery} and s.pickled_thickness  = ${query.pickled_thickness}` 
        if(query.slit_shift) whereQuery = `${whereQuery} and c.slit_shift = ${query.slit_shift}`

        let statusQuery = ""
        if (query.status) {
            let tempStatus = (query.status).toString().split(",");
            if(tempStatus.length > 0) {
                for (let i = 0; i< tempStatus.length; i++) {
                    statusQuery = `${statusQuery} s.status = "${tempStatus[i]}"`
                    if(i != (tempStatus.length-1)) statusQuery = `${statusQuery} OR` 
                } 
            }
            else statusQuery = `s.status = "${query.status}"`
        }
        if(whereQuery && statusQuery) whereQuery = `${whereQuery} AND ${statusQuery}`
       
        
        return db.execute(`SELECT s.*, c.brand_no, c.company, c.thickness, c.weight, c.width, c.formulated_weight, c.date, c.slit_shift, c.slit_date 
        FROM slittedCoils s
        LEFT JOIN coils c
        ON s.parent_id = c.id WHERE ${whereQuery} ORDER BY s.updated_at desc`);
    }

    static getSingleSlit (id) {
        return db.execute(`SELECT s.*, c.brand_no, c.company, c.thickness, c.weight, c.width, c.formulated_weight, c.date, c.slit_shift, c.slit_date 
        FROM slittedCoils s
        LEFT JOIN coils c
        ON s.parent_id = c.id WHERE s.ID = ${id}`)
    }

    static update(data) {
        let query = "";
        if(data.updated_at) query = `updated_at = "${data.updated_at}",`
        if(data.slitted_weight) query = `${query} slitted_weight = ${data.slitted_weight},`
        if(data.slitted_width) query = `${query}  slitted_width = ${data.slitted_width},`
        if(data.actual_weight) query = `${query} actual_weight = ${data.actual_weight},`
        if(data.actual_width) query = `${query}  actual_width = ${data.actual_width},`
        if(data.slit_no) query = `${query}  slit_no = "${data.slit_no}",`
        if(data.pickled_width) query = `${query}  pickled_width = ${data.pickled_width},`
        if(data.pickled_weight) query = `${query} pickled_weight = ${data.pickled_weight},`
        if(data.pickled_thickness) query = `${query}  pickled_thickness = ${data.pickled_thickness},`
        if(data.pickling_date) query = `${query}  pickling_date = "${data.pickling_date}",`
        if(data.pickling_od) query = `${query}  pickling_od = ${data.pickling_od},`
        if(data.pickling_operator) query = `${query}  pickling_operator = "${data.pickling_operator}",`
        if(data.pickling_notes) query = `${query}  pickling_notes = "${data.pickling_notes}",`
        if(data.pickling_shift) query = `${query}  pickling_shift = ${data.pickling_shift},`
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