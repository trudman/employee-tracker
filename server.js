const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "password1!Q",
    database: "employee_db",
  },
  console.log("Connected to the employee_db database.")
);

function startMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
          "Exit",
        ],
      },
    ])
    .then((answer) => {
      if (answer.choice === "View All Employees") {
        viewEmployees();
      }
      if (answer.choice === "Add Employee") {
        addEmployee();
      }
      if (answer.choice === "Update Employee Role") {
        updateEmployeeRole();
      }
      if (answer.choice === "View All Roles") {
        viewAllRoles();
      }
      if (answer.choice === "Add Role") {
        addRole();
      }
      if (answer.choice === "View All Departments") {
        viewAllDepartments();
      }
      if (answer.choice === "Add Department") {
        addDepartment();
      }
      if (answer.choice === "Exit") {
        console.log("Have a great day!");
        process.exit();
      }
    });
}

function viewEmployees() {
  const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, 
    CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON employee.manager_id = manager.id`;
  db.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    startMenu();
  });
}

function viewAllDepartments() {
  const sql = `SELECT * FROM department`;
  db.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    startMenu();
  });
}

function viewAllRoles() {
  const sql = `SELECT * FROM role`;
  db.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    startMenu();
  });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "Please enter the employee's first name",
      },
      {
        type: "input",
        name: "last_name",
        message: "Please enter the employee's last name",
      },
      {
        type: "input",
        name: "role_id",
        message: "Please enter the employee's role ID",
      },
      {
        type: "input",
        name: "manager_id",
        message: "Please enter the employee's manager ID",
      },
    ])
    .then((answer) => {
      const sql =
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)";
      const params = [answer.first_name, answer.last_name, answer.role_id, answer.manager_id];

      db.query(sql, params, (err, res) => {
        if (err) throw err;
        console.log("Employee added to the database.");
        startMenu();
      });
    });
}
function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "Please enter the new role",
      },
      {
        type: "input",
        name: "salary",
        message: "Please enter the salary for this role",
      },
      {
        type: "input",
        name: "department_id",
        message: "Please enter the department ID for this role",
      },
    ])
    .then((answer) => {
      const sql = "INSERT INTO role (title, salary, department_id) VALUES (?,?,?)";
      const params = [answer.title, answer.salary, answer.department_id];

      db.query(sql, params, (err, res) => {
        if (err) throw err;
        console.log("Role added to the database.");
        startMenu();
      });
    });
}
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Please enter the name of the new Department",
      },
    ])
    .then((answer) => {
      const sql = "INSERT INTO department (name) VALUES (?)";
      const params = [answer.name];

      db.query(sql, params, (err, res) => {
        if (err) throw err;
        console.log("Department added to the database.");
        startMenu();
      });
    });
}
function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "id",
        message: "Please enter the employee's ID that you would like to update",
      },
      {
        type: "input",
        name: "role_id",
        message: "Please enter the role ID of the employee's updated role",
      },
      {
        type: "input",
        name: "manager_id",
        message: "Please enter the manager ID for the employee's updated role",
      },
    ])
    .then((answer) => {
      const sql = "UPDATE employee SET role_id = ?, manager_id = ? WHERE id = ?";
      const params = [answer.role_id, answer.manager_id, answer.id];

      db.query(sql, params, (err, res) => {
        if (err) throw err;
        console.log("Successfully updated employee.");
        startMenu();
      });
    });
}

startMenu();
