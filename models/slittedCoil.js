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
        if(query.rolling_date) whereQuery = `${whereQuery} and s.rolling_date >= "${query.rolling_date}" and s.rolling_date < "${query.rolling_date} 23:59:59"` 
        if(query.rolling_thickness) whereQuery = `${whereQuery} and s.rolling_thickness  = ${query.rolling_thickness}` 
        if(query.slit_date) whereQuery = `${whereQuery} and c.slit_date >= "${query.slit_date}" and c.slit_date < "${query.slit_date} 23:59:59"` 
        if(query.pickling_date) whereQuery = `${whereQuery} and s.pickling_date >= "${query.pickling_date}" and s.pickling_date < "${query.pickling_date} 23:59:59"`
        if(query.thickness) whereQuery = `${whereQuery} and c.thickness  = ${query.thickness}` 
        if(query.pickled_thickness) whereQuery = `${whereQuery} and s.pickled_thickness  = ${query.pickled_thickness}` 
        if(query.slit_shift) whereQuery = `${whereQuery} and c.slit_shift = ${query.slit_shift}`
        
        let statusQuery = ""
        if (query.status) {
            let tempStatus = (query.status).toString().split(",");
            if(tempStatus.length > 1) {
                for (let i = 0; i< tempStatus.length; i++) {
                    statusQuery = `${statusQuery} s.status = "${tempStatus[i]}"`
                    if(i != (tempStatus.length-1)) statusQuery = `${statusQuery} OR` 
                } 
            }
            else statusQuery = `s.status = "${query.status}"`
        }
        if(whereQuery && statusQuery) whereQuery = `${whereQuery} AND (${statusQuery})`
       
        let orderQuery = 'ORDER BY s.updated_at desc'
        // if(query.sortBy && query.orderBy) orderQuery = `ORDER BY ${query.sortBy} ${query.orderBy}`
        // else orderQuery = `ORDER BY s.updated_at desc`

        if(query.limit && query.page) orderQuery = `${orderQuery} LIMIT ${query.limit} OFFSET ${(parseInt(query.page) - 1) * parseInt(query.limit)}`
        // else orderQuery = `${orderQuery} LIMIT 10`  //will add this later

        return db.execute(`SELECT s.*, c.brand_no, c.company, c.thickness, c.weight, c.width, c.formulated_weight, c.date, c.slit_shift, c.slit_date 
        FROM slittedCoils s
        LEFT JOIN coils c
        ON s.parent_id = c.id WHERE ${whereQuery} ${orderQuery}`);
    }

    static getCount(query) {
        let whereQuery = 's.is_avilable = true'
        if(query.rolling_date) whereQuery = `${whereQuery} and s.rolling_date >= "${query.rolling_date}" and s.rolling_date < "${query.rolling_date} 23:59:59"` 
        if(query.rolling_thickness) whereQuery = `${whereQuery} and s.rolling_thickness  = ${query.rolling_thickness}` 
        if(query.slit_date) whereQuery = `${whereQuery} and c.slit_date >= "${query.slit_date}" and c.slit_date < "${query.slit_date} 23:59:59"` 
        if(query.pickling_date) whereQuery = `${whereQuery} and s.pickling_date >= "${query.pickling_date}" and s.pickling_date < "${query.pickling_date} 23:59:59"`
        if(query.thickness) whereQuery = `${whereQuery} and c.thickness  = ${query.thickness}` 
        if(query.pickled_thickness) whereQuery = `${whereQuery} and s.pickled_thickness  = ${query.pickled_thickness}` 
        if(query.slit_shift) whereQuery = `${whereQuery} and c.slit_shift = ${query.slit_shift}`
        
        let statusQuery = ""
        if (query.status) {
            let tempStatus = (query.status).toString().split(",");
            if(tempStatus.length > 1) {
                for (let i = 0; i< tempStatus.length; i++) {
                    statusQuery = `${statusQuery} s.status = "${tempStatus[i]}"`
                    if(i != (tempStatus.length-1)) statusQuery = `${statusQuery} OR` 
                } 
            }
            else statusQuery = `s.status = "${query.status}"`
        }
        if(whereQuery && statusQuery) whereQuery = `${whereQuery} AND (${statusQuery})`
       
        return db.execute(`SELECT COUNT(*)
        FROM slittedCoils s
        LEFT JOIN coils c
        ON s.parent_id = c.id WHERE ${whereQuery}`);
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

        if(data.parent_thickness) query = `${query} parent_thickness = ${data.parent_thickness},`
        if(data.slit_notes) query = `${query} slit_notes = "${data.slit_notes}",`
        if(data.slit_date) query = `${query} slit_date = "${data.slit_date}",`
        if(data.slit_shift) query = `${query}  slit_shift = ${data.slit_shift},`

        if(data.parent_info) query = `${query} parent_info = '${data.parent_info}',`
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

        if(data.rolling_date) query = `${query} rolling_date = "${data.rolling_date}",`
        if(data.rolling_shift) query = `${query}  rolling_shift = ${data.rolling_shift},`
        if(data.rolling_thickness) query = `${query}  rolling_thickness = ${data.rolling_thickness},`
        if(data.rolling_passes) query = `${query}  rolling_passes = ${data.rolling_passes},`
        if(data.feedback_mode) query = `${query} feedback_mode = ${data.feedback_mode},`
        if(data.massflow_mode) query = `${query}  massflow_mode = ${data.massflow_mode},`
        if(data.rewinding) query = `${query}  rewinding = ${data.rewinding},`
        if(data.rolled_weight) query = `${query}  rolled_weight = ${data.rolled_weight},`
        if(data.leader_end) query = `${query}  leader_end = "${data.leader_end}",`
        if(data.gauge_control) query = `${query}  gauge_control = "${data.gauge_control}",`
        if(data.surface_wavy) query = `${query}  surface_wavy = ${data.surface_wavy},`
        if(data.rolling_operator) query = `${query} rolling_operator = "${data.rolling_operator}",`
        if(data.rolling_notes) query = `${query} rolling_notes = "${data.rolling_notes}",`
        if(data.batch_no) query = `${query} batch_no = ${data.batch_no},`
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

    static fetchWithoutJoint(query) {
        if(!query) query = {}
        let whereQuery = 'is_avilable = true'
        if(query.parent_thickness) whereQuery = `${whereQuery} and parent_thickness = ${query.parent_thickness}`
        if(query.slit_shift) whereQuery = `${whereQuery} and slit_shift = ${query.slit_shift}`
        if(query.slit_date) whereQuery = `${whereQuery} and slit_date >= "${query.slit_date}" and slit_date < "${query.slit_date} 23:59:59"` 
        let orderQuery = ''
        if(query.sortBy && query.orderBy) orderQuery = `ORDER BY ${query.sortBy} ${query.orderBy}`
        else orderQuery = `ORDER BY updated_at desc`

        if(query.limit && !query.page) query.page = 1;
        if(!query.limit && query.page) query.limit = 10;
        if(query.limit && query.page) orderQuery = `${orderQuery} LIMIT ${query.limit} OFFSET ${(parseInt(query.page) - 1) * parseInt(query.limit)}`
        else orderQuery = `${orderQuery} LIMIT 10`

        let statusQuery = ""
        if (query.status) {
            let tempStatus = (query.status).toString().split(",");
            if(tempStatus.length > 0) {
                for (let i = 0; i< tempStatus.length; i++) {
                    statusQuery = `${statusQuery} status = "${tempStatus[i]}"`
                    if(i != (tempStatus.length-1)) statusQuery = `${statusQuery} OR` 
                } 
            }
            else statusQuery = `(status = "${query.status}")`
        }
        if(whereQuery && statusQuery) whereQuery = `${whereQuery} AND ${statusQuery}`
    
        return db.execute(`SELECT *
        FROM slittedCoils
        WHERE ${whereQuery} ${orderQuery}`);
    }

    static getSlitsCount(query) {
        if(!query) query = {}
        let whereQuery = 'is_avilable = true'
        if(query.parent_thickness) whereQuery = `${whereQuery} and parent_thickness = ${query.parent_thickness}`
        if(query.slit_shift) whereQuery = `${whereQuery} and slit_shift = ${query.slit_shift}`
        if(query.slit_date) whereQuery = `${whereQuery} and slit_date >= "${query.slit_date}" and slit_date < "${query.slit_date} 23:59:59"` 

        let statusQuery = ""
        if (query.status) {
            let tempStatus = (query.status).toString().split(",");
            if(tempStatus.length > 0) {
                for (let i = 0; i< tempStatus.length; i++) {
                    statusQuery = `${statusQuery} status = "${tempStatus[i]}"`
                    if(i != (tempStatus.length-1)) statusQuery = `${statusQuery} OR` 
                } 
            }
            else statusQuery = `(status = "${query.status}")`
        }
        if(whereQuery && statusQuery) whereQuery = `${whereQuery} AND ${statusQuery}`

        return db.execute(`SELECT COUNT(*) FROM slittedCoils WHERE ${whereQuery}`)
    }

    static fetchAnnealedCoils(query) {
        let whereQuery = 's.is_avilable = true AND s.status = "annealed"'
        if(query.date) whereQuery = `${whereQuery} and a.date >= "${query.date}" and a.date < "${query.date} 23:59:59"` 
        let orderQuery = 'ORDER BY s.updated_at desc'
        if(query.sortBy && query.orderBy) orderQuery = `ORDER BY ${query.sortBy} ${query.orderBy}`
        else orderQuery = `ORDER BY s.updated_at desc`

        if(query.limit && query.page) orderQuery = `${orderQuery} LIMIT ${query.limit} OFFSET ${(parseInt(query.page) - 1) * parseInt(query.limit)}`
        return db.execute(`SELECT s.ID, s.slit_no, s.pickling_od, s.rolling_thickness, s.rolled_weight, s.pickled_width, a.date, a.shift, a.charge_no, a.status 
        FROM slittedCoils s
        LEFT JOIN annealing a
        ON s.batch_no = a.id WHERE ${whereQuery} ${orderQuery}`);
    }
};