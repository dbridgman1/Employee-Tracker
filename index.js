const inquirer = require('inquirer');
const mysql = require("mysql");
const table = require("console.table")

const all = 'View All Employees';
const allDp = 'View All Departments';
const allRl = 'View All Roles';
const addE = 'Add Employee(s)';
const addR = 'Add Role(s)';
const addD = 'Add Department(s)';
const updateR = 'Update Employee Role';
const deleteD = 'Delete Department(s)';
const deleteR = 'Delete Role(s)';
const deleteE = 'Delete Employee(s)';

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

// Init function for starting the app
async function start() {
    console.log('initializing');
    try {
        let answer = await inquirer.prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            pageSize: 20,
            choices: [all, allDp, allRl, addE, addD, addR, updateR, deleteE, deleteD, deleteR]
        });
        console.log(answer)
        switch (answer.action) {
            case all:
                return ViewAll();
            case allDp:
                return ViewAllDp();
            case allRl:
                return ViewAllRl();
            case addE:
                return addEm();
            case addD:
                return addDp();
            case addR:
                return addRl();
            case updateR:
                return updateRl();
            case deleteE:
                return deleteEm();
            case deleteD:
                return deleteDp();
            case deleteR:
                return deleteRl();
        }
    } catch (error) {
        throw error;
        
    }
};

// View all employees
function ViewAll() {
  console.log("Selecting all employees...\n")
  connection.query(
    `SELECT employee.id AS "ID", employee.first_name AS "First Name", employee.last_name AS "Last Name", role.title AS "Title", department.name AS "Department", role.salary AS "Salary", CONCAT(e.first_name, " ", e.last_name) AS "Manager"
    FROM employee
    INNER JOIN role ON employee.role_id = role.id
    INNER JOIN department ON role.department_id = department.id
    LEFT JOIN employee AS e ON employee.manager_id = e.id
    ORDER BY employee.id`,
    function(err, res) {
      if (err) throw err;
      console.table(res);
      start();
    }
  )
};

// View all departments
function ViewAllDp() {
  console.log("Selecting all departments...\n")
  connection.query(
    `SELECT department.id AS "ID", department.name AS "Department"
    FROM department`,
    function(err,res) {
      if(err) throw err;
      console.table(res);
      start();
    }
  )
};

// View all roles
function ViewAllRl() {
  console.log("Selecting all departments...\n")
  connection.query(
    `SELECT role.id AS "ID", role.title AS "Title", role.salary AS "Salary"
    FROM role`,
    function(err,res) {
      if(err) throw err;
      console.table(res);
      start();
    }
  )
};

// Add new employee
function addEm() {
  console.log("Adding new employee...\n");
  inquirer
    .prompt([
      {
        name: "first",
        type: "input",
        message: "What is the first name of the employee?"
      },
      {
        name: "last",
        type: "input",
        message: "What is the last name of the employee?"
      },
      {
        name: "roleid",
        type: "input",
        message: "What is the role ID of the employee?"
      },
      {
        name: "managerid",
        type: "input",
        message: "What is the manager ID of the employee?"
      }
    ])
  .then(function(answer) {
    console.log(answer);
    connection.query(
    "INSERT INTO employee SET ?",
      {
        first_name: answer.first,
        last_name: answer.last,
        role_id: answer.roleid,
        manager_id: answer.managerid
      },
      function(err) {
        if (err) throw err;
        console.log('Your new employee has been added successfully!\n')
        start();
      }
    )
  })
};

// Add new department
function addDp() {
  console.log("Adding new department...\n");
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "What is the name of the new department?"
      }
    ])
  .then(function(answer) {
    console.log(answer);
    connection.query(
    "INSERT INTO department SET ?",
      {
        name: answer.name,
      },
      function(err) {
        if (err) throw err;
        console.log('Your new department has been added successfully!\n')
        start();
      }
    )
  })
};

// Add new role
function addRl() {
  console.log("Adding new role...\n");
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "What is the title of the new role?"
      },
      {
        name: "salary",
        type: "input",
        message: "What will the salary be for this new role?"
      },
      {
        name: "departmentid",
        type: "input",
        message: "What is the Department ID of this new role?"
      }
    ])
  .then(function(answer) {
    console.log(answer);
    connection.query(
      "INSERT INTO role SET ?",
      {
        title: answer.title,
        salary: answer.salary,
        department_id: answer.departmentid
      },
      function(err) {
        if (err) throw err;
          console.log('Your new role has been added successfully!\n')
          start();
      }
    )
  })
};

// Update employee role
function updateRl() {
  console.log("Adding new department...\n");
  inquirer
    .prompt([
      {
        name: "role",
        type: "input",
        message: "What is the last name of the employee you would like to update?"
      },
      {
        name: "roleID",
        type: "input",
        message: "What is the new role ID for this employee?"
      }
    ])
  .then(function(answer) {
    console.log("Updating all Rocky Road quantities...\n");
    var query = connection.query(
      "UPDATE employee SET ? WHERE ?",
      [
        {
          role_id: answer.roleID
        },
        {
          last_name: answer.role
        }
      ],
      function(err, res) {
        if (err) throw err;
        console.log('The employee role has been updated');
        start();
      }
    );
  })
}

// Delete employee
function deleteEm() {
  console.log("Deleting employee...\n");
  inquirer
    .prompt([
      {
        name: "lastName",
        type: "input",
        message: "What is the last name of the employee you would like to remove from database?"
      },
    ])
  .then(function(answer) {
    console.log(answer);
    connection.query(
    "DELETE FROM employee WHERE ?",
      {
        last_name: answer.lastName,
      },
      function(err) {
        if (err) throw err;
        console.log('The employee has been deleted!\n')
        start();
      }
    )
  })
};

// Delete employee
function deleteDp() {
  console.log("Deleting department...\n");
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "Which department would you like to delete?"
      },
    ])
  .then(function(answer) {
    console.log(answer);
    connection.query(
    "DELETE FROM department WHERE ?",
      {
        name: answer.name,
      },
      function(err) {
        if (err) throw err;
        console.log('The department has been deleted!\n')
        start();
      }
    )
  })
};

// Delete employee
function deleteRl() {
  console.log("Deleting role...\n");
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "Which role would you like to delete?"
      },
    ])
  .then(function(answer) {
    console.log(answer);
    connection.query(
    "DELETE FROM role WHERE ?",
      {
        title: answer.title,
      },
      function(err) {
        if (err) throw err;
        console.log('The role has been deleted!\n')
        start();
      }
    )
  })
};