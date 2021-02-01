USE employeeTracker_db;

INSERT INTO department (dp_name) 
VALUES ('Accounting'), ('Sales'), ('Marketing'), ('Engineering');

INSERT INTO emp_role (title, salary, department_id)
VALUES ('Senior', 70000, 1), ('Staff', 50000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ('Jane', 'Doe', 1, 2)