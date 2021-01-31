const DB = require('./db/DB');
const inquirer = require('inquirer');

function createDepartment() {
    inquirer.prompt([{
        type: "input",
        message: "what is the department name?",
        name: "departmentName",
    }]).then(function(res){
        DB.createDepartment(res.departmentName)
    })
    


}

createDepartment();