const db = require('../util/database');

module.exports = class Thickness {
    constructor(id, value) {
        this.id = id;
        this.value = value;
    }

    save() {
        return db.execute('INSERT INTO thicknesses (value) VALUES (?)',
            [this.value]
        )
    }
    static fetchAll() {
        return db.execute(`SELECT * FROM thicknesses`);
    }
};