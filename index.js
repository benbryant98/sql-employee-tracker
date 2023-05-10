const inquirer = require("inquirer");

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
              // TODO Add sql query for viewing department
              console.log("Departments");
              break;
            case "Roles":
              // TODO Add sql query for viewing roles
              console.log("Roles");
              break;
            case "Employees":
              //TODO Add sql query for viewing employees
              console.log("Employees");
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
                  //TODO Add sql query for adding departments
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
                    message: "What department should this role be assigned to?",
                  },
                ])
                .then((answers) => {
                  //TODO Add sql query for adding roles
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
                  //TODO Add sql query for adding departments
                  console.log(
                    `${answers.firstName} ${answers.lastName} has been added to Employees.`
                  );
                });
          }
        });
    }
  });
