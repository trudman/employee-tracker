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

startMenu();
