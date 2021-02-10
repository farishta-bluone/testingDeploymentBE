const db = require('../util/database');

module.exports = class Company {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    save() {
        return db.execute('INSERT INTO companies (name) VALUES (?)',
            [this.name]
        )
    }
    static fetchAll() {
        return db.execute(`SELECT * FROM companies`);
    }
    static update(data) {
        let query = "";
        if(data.name) query = `${query} name = "${data.name}"`
        return db.execute(`UPDATE companies SET ${query} WHERE id = ${data.id}`)
    }
    static delete(id) {
        return db.execute(`DELETE from companies where id = ${id}`)
    }
};