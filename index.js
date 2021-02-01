const DB = require('./db/DB');
const inquirer = require('inquirer');
const mysql = require("mysql");

const all = 'View All Employees';
const allDp = 'View All Employees By Department';
const allMg = 'View All Employees By Manager';
const allRl = 'View All Employees By Role';
const addE = 'Add Employee';
const addR = 'Add Role';
const addD = 'Add Department';
const updateR = 'Update Employee Role';
const updateM = 'Update Employee Manager';
const deleteD = 'Delete Department';
const deleteR = 'Delete Role';
const deleteE = 'Delete Employees';

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employeeTracker_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log('Connected as id ' + connection.threadId)
    start();
});

async function start() {
    console.log('initializing');
    try {
        let answer = await inquirer.prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [all, allDp, allMg, allRl, addE, addR, addD, updateR, updateM, deleteD, deleteR, deleteE]
        });
        console.log(answer)
        switch (answer.action) {
            case all:
                return ViewAll();
            case allDp:
                return ViewAllDp();
            case allMg:
                return ViewAllMg();
            case allRl:
                return ViewAllRl();
            case addE:
                return addE();
            case addR:
                return addR();
            case addD:
                return addD();
            case updateR:
                return updateR();
            case updateM:
                return updateM();
            case deleteD:
                return deleteD();
            case deleteR:
                return deleteR();
            case deleteE:
                return deleteE();
        }
    } catch (error) {
        throw error;
        
    }
};

// View all employees
function ViewAll() {
    console.log("Selecting all employees...\n")
    connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        console.log(res);
    });
}

// View all employees by department
function ViewAllDp() {

}

// View all employees by manager
function ViewAllMg() {

}

// View all employees by role
function ViewAllRl() {

}













// function createDepartment() {
//     inquirer.prompt([{
//         type: "input",
//         message: "what is the department name?",
//         name: "departmentName",
//     }]).then(function(res){
//         DB.createDepartment(res.departmentName)
//     })
    


// }

// createDepartment();

