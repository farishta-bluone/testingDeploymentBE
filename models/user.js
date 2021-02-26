const db = require('../util/database');

module.exports = class User {
    constructor(id, name, pwd, role, access) {
        this.id = id;
        this.name = name;
        this.pwd = pwd
        this.role = role
        this.access = access
    }

    save() {
        return db.execute('INSERT INTO users (name, pwd, role, access) VALUES (?,?,?,?)',
            [this.name, this.pwd, this.role, this.access]
        )
    }
    static fetchAll(query) {
        let whereQuery = 'is_avilable = true'
        if(query.id) whereQuery = `${whereQuery} and id = ${parseInt(query.id)}`
        if(query.email) whereQuery = `${whereQuery} and name = "${query.email}"`
        if(query.pwd) whereQuery = `${whereQuery} and pwd = "${query.pwd}"`
        return db.execute(`SELECT * FROM users where ${whereQuery}`);
    }
    static update(data) {
        let query = "";
        if(data.name) query = `${query} name = "${data.name}",`
        if(data.role) query = `${query} role = "${data.role}",`
        if(data.pwd) query = `${query} pwd = "${data.pwd}",`
        if(data.access) query = `${query} access = '${data.access}'`
        console.log("query", query)
        return db.execute(`UPDATE users SET ${query} WHERE id = ${data.id}`)
    }
    static delete(id) {
        return db.execute(`DELETE from users where id = ${id}`)
    }
};