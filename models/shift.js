const db = require('../util/database');

module.exports = class Shift {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    static fetchAll() {
        return db.execute(`SELECT * FROM shifts`);
    }
};