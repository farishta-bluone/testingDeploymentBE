const db = require('../util/database');

module.exports = class Coil {
    constructor(id, created_at, company, brand_no, status, weight, thickness, width, date, is_avilable) {
        this.id = id;
        this.created_at = created_at;
        this.company = company;
        this.brand_no = brand_no;
        this.status = status;
        this.weight = weight;
        this.thickness = thickness;
        this.width = width;
        this.date = date;
        this.is_avilable = is_avilable;
    }

    save() {
        return db.execute('INSERT INTO coils (created_at, company, brand_no, status, weight, thickness, width, date, is_avilable) VALUES (?,?,?,?,?,?,?,?,?)',
            [this.created_at, this.company, this.brand_no, this.status, this.weight, this.thickness, this.width, this.date, this.is_avilable]
        )
    }

    static getCoilsCount(query) {
        let whereQuery = 'is_avilable = true'
        if(query.brand_no) whereQuery = `${whereQuery} and brand_no = "${query.brand_no}"`
        if(query.status) whereQuery = `${whereQuery} and status = "${query.status}"`
        if(query.company) whereQuery = `${whereQuery} and company = "${query.company}"`
        if(query.date) whereQuery = `${whereQuery} and date >= "${query.date}"` 
        return db.execute(`SELECT COUNT(*) FROM coils WHERE ${whereQuery}`)
    }

    static fetchAll(query) {
        let whereQuery = 'is_avilable = true'
        if(query.brand_no) whereQuery = `${whereQuery} and brand_no = "${query.brand_no}"`
        if(query.status) whereQuery = `${whereQuery} and status = "${query.status}"`
        if(query.company) whereQuery = `${whereQuery} and company = "${query.company}"`
        if(query.date) whereQuery = `${whereQuery} and date >= "${query.date}"` 
        
        let orderQuery = ''
        if(query.sortBy && query.orderBy) orderQuery = `ORDER BY ${query.sortBy} ${query.orderBy}`
        else orderQuery = `ORDER BY created_at desc`

        if(query.limit && query.page) orderQuery = `${orderQuery} LIMIT ${query.limit} OFFSET ${(parseInt(query.page) - 1) * parseInt(query.limit)}`
        else orderQuery = `${orderQuery} LIMIT 10`

        return db.execute(`SELECT * FROM coils WHERE ${whereQuery} ${orderQuery}`);
    }
};