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
};