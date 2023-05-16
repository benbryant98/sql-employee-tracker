const inquirer = require("inquirer");
const mysql = require("mysql");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "root",
    database: "employees_db",
  },
  console.log("Connected to Employee Database.")
);

inquirer
  .prompt([
    {
      type: "list",
      name: "mainMenu",
      message: "What would you like to do?",
      choices: ["View Database", "Edit Database"],
    },
  ])
  .then((answers) => {
    if (answers.mainMenu === "View Database") {
      inquirer
        .prompt([
          {
            type: "list",
            name: "viewMenu",
            message: "What would you like to look at?",
            choices: ["Departments", "Roles", "Employees"],
          },
        ])
        .then((answers) => {
          switch (answers.viewMenu) {
            case "Departments":
              db.query("SELECT * FROM departments;", (err, result) =>
                console.table(result)
              );
              db.end();
              break;
            case "Roles":
              db.query(
                "SELECT roles.id, title, salary, departments.name AS department FROM roles JOIN departments ON departments.id = roles.department_id;",
                (err, result) => console.table(result)
              );
              db.end();
              break;
            case "Employees":
              db.query(
                "SELECT employees.id, first_name, last_name, roles.title, roles.salary, departments.name AS department, manager_id FROM employees JOIN roles ON roles.id = employees.role_id JOIN departments ON departments.id = roles.department_id;",
                (err, result) => console.table(result)
              );
              db.end();
          }
        });
    } else {
      inquirer
        .prompt([
          {
            type: "list",
            name: "editMenu",
            message: "What would you like to edit?",
            choices: ["Departments", "Roles", "Employees"],
          },
        ])
        .then((answers) => {
          switch (answers.editMenu) {
            case "Departments":
              inquirer
                .prompt([
                  {
                    type: "input",
                    name: "addDep",
                    message:
                      "Please type the name of the department you would like to add.",
                  },
                ])
                .then((answers) => {
                  db.query(
                    "INSERT INTO departments (name) VALUE (?);",
                    answers.addDep
                  );
                  db.end();
                  console.log(
                    `${answers.addDep} has been added to Departments.`
                  );
                });
              break;
            case "Roles":
              inquirer
                .prompt([
                  {
                    type: "input",
                    name: "roleName",
                    message:
                      "Please type the name of the role you would like to add.",
                  },
                  {
                    type: "input",
                    name: "roleSalary",
                    message: "Please enter the salary for this role.",
                  },
                  {
                    type: "input",
                    name: "roleDep",
                    message: "Enter the department ID for this role.",
                  },
                ])
                .then((answers) => {
                  db.query(
                    `INSERT INTO roles (title, salary, department_id) VALUES ('${answers.roleName}', ${answers.roleSalary}, ${answers.roleDep});`
                  );
                  db.end();
                  console.log(`${answers.roleName} has been added to Roles.`);
                });
              break;
            case "Employees":
              inquirer
                .prompt([
                  {
                    type: "input",
                    name: "firstName",
                    message: "What is the first name of the new employee?",
                  },
                  {
                    type: "input",
                    name: "lastName",
                    message: "What is the last name of the new employee?",
                  },
                  {
                    type: "input",
                    name: "empRole",
                    message: "What role will this employee be filling?",
                  },
                  {
                    type: "input",
                    name: "empMan",
                    message:
                      "Please enter the six-digit manager id for this employee.",
                  },
                ])
                .then((answers) => {
                  db.query(
                    `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${answers.firstName}', '${answers.lastName}', ${answers.empRole}, ${answers.empMan});`
                  );
                  db.end();
                  console.log(
                    `${answers.firstName} ${answers.lastName} has been added to Employees.`
                  );
                });
          }
        });
    }
  });
