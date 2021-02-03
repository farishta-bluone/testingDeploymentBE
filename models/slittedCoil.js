const db = require('../util/database');

module.exports = class SlittedCoil {
    constructor(id, created_at, updated_at, od, parent_id, slitted_weight, slitted_width, status, is_avilable) {
        this.id = id;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.od = od;
        this.parent_id = parent_id;
        this.slitted_weight = slitted_weight;
        this.slitted_width = slitted_width;
        this.status = status;
        this.is_avilable = is_avilable;
    }

    // save() {
    //     return db.execute('INSERT INTO coils (created_at, company, brand_no, status, weight, thickness, width, date, is_avilable) VALUES (?,?,?,?,?,?,?,?,?)',
    //         [this.created_at, this.company, this.brand_no, this.status, this.weight, this.thickness, this.width, this.date, this.is_avilable]
    //     )
    // }

    // static delete(id) {
    //     return db.execute(`UPDATE coils SET is_avilable = false where id = ${id}`)
    // }

    // static getCoilsCount(query) {
    //     let whereQuery = 'is_avilable = true'
    //     if(query.brand_no) whereQuery = `${whereQuery} and brand_no = "${query.brand_no}"`
    //     if(query.status) whereQuery = `${whereQuery} and status = "${query.status}"`
    //     if(query.company) whereQuery = `${whereQuery} and company = "${query.company}"`
    //     if(query.date) whereQuery = `${whereQuery} and date >= "${query.date}" and date < "${query.date} 23:59:59"` 
    //     return db.execute(`SELECT COUNT(*) FROM coils WHERE ${whereQuery}`)
    // }

    static fetchAll() {
        console.log("Calleddddd")
        // let whereQuery = 'is_avilable = true'
        // if(query.brand_no) whereQuery = `${whereQuery} and brand_no = "${query.brand_no}"`
        // if(query.status) whereQuery = `${whereQuery} and status = "${query.status}"`
        // if(query.company) whereQuery = `${whereQuery} and company = "${query.company}"`
        // if(query.date) whereQuery = `${whereQuery} and date >= "${query.date}" and date < "${query.date} 23:59:59"` 
        
        // let orderQuery = ''
        // if(query.sortBy && query.orderBy) orderQuery = `ORDER BY ${query.sortBy} ${query.orderBy}`
        // else orderQuery = `ORDER BY created_at desc`

        // if(query.limit && query.page) orderQuery = `${orderQuery} LIMIT ${query.limit} OFFSET ${(parseInt(query.page) - 1) * parseInt(query.limit)}`
        // else orderQuery = `${orderQuery} LIMIT 10`

        return db.execute(`SELECT s.*, c.brand_no, c.company, c.thickness, c.date
        FROM VM.slittedCoils s
        LEFT JOIN VM.coils c
        ON s.parent_id = c.id`);
    }
};