const mysql = require("mysql2");
const inquirer = require("inquirer");
// const conTable = require("console.table");

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
