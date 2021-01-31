const connection = require('./connection');
class DB {
    constructor(connection){
        this.connection = connection
    }
    getAllDepartments(){
        return this.connection.query('SELECT * FROM department')
    }
    createDepartment(name){
        return this.connection.query('INSERT INTO department SET Engineering',  name)
    }
}

module.exports = new DB(connection)