const db = require('../util/database');

module.exports = class Coil {
    constructor(id, created_at, updated_at, company, brand_no, status, weight, formulated_weight, thickness, width, date, is_avilable, shift) {
        this.id = id;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.company = company;
        this.brand_no = brand_no;
        this.status = status;
        this.weight = weight;
        this.formulated_weight = formulated_weight;
        this.thickness = thickness;
        this.width = width;
        this.date = date;
        this.is_avilable = is_avilable;
        this.shift = shift;
    }

    save() {
        return db.execute('INSERT INTO coils (created_at, updated_at, company, brand_no, status, weight, formulated_weight, thickness, width, date, is_avilable, shift) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
            [this.created_at, this.updated_at, this.company, this.brand_no, this.status, this.weight, this.formulated_weight, this.thickness, this.width, this.date, this.is_avilable, this.shift]
        )
    }

    static delete(id) {
        return db.execute(`UPDATE coils SET is_avilable = false where id = ${id}`)
    }

    static getSingleCoil (id) {
        return db.execute(`SELECT * from coils where id = ${id}`)
    }

    static update(data) {
        console.log("dataaaa", data)
        let query = "";
        if(data.updated_at) query = `updated_at = "${data.updated_at}",`
        if(data.company) query = `${query} company = ${data.company},`
        if(data.brand_no) query = `${query} brand_no = "${data.brand_no}",`
        if(data.weight) query = `${query} weight = ${data.weight},`
        if(data.formulated_weight) query = `${query} formulated_weight = ${data.formulated_weight},`
        if(data.shift) query = `${query} shift = ${data.shift},`
        if(data.thickness) query = `${query}  thickness = ${data.thickness},`
        if(data.date) query = `${query} date = "${data.date}",`
        if(data.slit_date) query = `${query} slit_date = "${data.slit_date}",`
        if(data.slit_shift) query = `${query} slit_shift = ${data.slit_shift},`
        if(data.status) query = `${query} status = "${data.status}"`
        console.log("query",query)
        return db.execute(`UPDATE coils SET ${query} WHERE id = ${data.id}`)
    }

    static previewSlits(id) {
        console.log(id, "id", typeof(id))
        return db.execute(`SELECT s.*, c.brand_no, c.company, c.formulated_weight, c.slit_date, c.slit_shift, c.thickness, c.weight, c.width, c.date
        FROM slittedCoils s
        LEFT JOIN coils c
        ON s.parent_id = c.id where c.id = ${id}`)
    }

    static getCoilsCount(query) {
        let whereQuery = 'is_avilable = true'
        if(query.brand_no) whereQuery = `${whereQuery} and brand_no = "${query.brand_no}"`
        if(query.status) whereQuery = `${whereQuery} and status = "${query.status}"`
        if(query.company) whereQuery = `${whereQuery} and company = "${query.company}"`
        if(query.thickness) whereQuery = `${whereQuery} and thickness = ${query.thickness}`
        if(query.shift) whereQuery = `${whereQuery} and shift = ${query.shift}`
        if(query.date) whereQuery = `${whereQuery} and date >= "${query.date}" and date < "${query.date} 23:59:59"` 
        return db.execute(`SELECT COUNT(*) FROM coils WHERE ${whereQuery}`)
    }

    static fetchAll(query) {
        let whereQuery = 'is_avilable = true'
        if(query.brand_no) whereQuery = `${whereQuery} and brand_no = "${query.brand_no}"`
        if(query.status) whereQuery = `${whereQuery} and status = "${query.status}"`
        if(query.company) whereQuery = `${whereQuery} and company = "${query.company}"`
        if(query.thickness) whereQuery = `${whereQuery} and thickness = ${query.thickness}`
        if(query.shift) whereQuery = `${whereQuery} and shift = ${query.shift}`
        if(query.date) whereQuery = `${whereQuery} and date >= "${query.date}" and date < "${query.date} 23:59:59"` 
        
        let orderQuery = ''
        if(query.sortBy && query.orderBy) orderQuery = `ORDER BY ${query.sortBy} ${query.orderBy}`
        else orderQuery = `ORDER BY created_at desc`

        if(query.limit && query.page) orderQuery = `${orderQuery} LIMIT ${query.limit} OFFSET ${(parseInt(query.page) - 1) * parseInt(query.limit)}`
        else orderQuery = `${orderQuery} LIMIT 10`
        return db.execute(`SELECT * FROM coils WHERE ${whereQuery} ${orderQuery}`);
    }
};