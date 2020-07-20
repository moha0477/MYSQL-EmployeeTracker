const connection = require("./config/connection");
const inquirer = require("inquirer");
const consoleTable = require('console.table');
const orm = require("./config/orm");
const Department = require("./models/department");
const Role = require('./models/role');
const Employee = require('./models/employee');

function start(){
    inquirer.prompt ([{
        type: "list", 
        message: "What would you like to do?",
        name: "start",
        choices: [
        "View all Departments",
        "View all Roles",
        "View all Employees",
        "Add Department",
        "Add Roles",
        "Add Employee", 
        "Update Employee Role", 
        "Remove Employee",
        "Exit"
        ]}
    ])
    .then(function(res){
      switch (res.start){
  
        case "View all Departments":
        viewDepartment();
        break;

        case "View all Roles": 
        viewRoles(); 
        break;

        case "View all Employees":
        viewEmployees();
        break; 

        case "Add Department": 
        addDepartment(); 
        break;

        case "Add Roles": 
        addRole(); 
        break;
  
        case "Add Employee":
        addEmployee();
        break;

        case "Update Employee Role":
        updateEmployeeRole(); 
        break;
        
        case "Remove Employee": 
        removeEmployee(); 
        break;
  
        case "Exit":
        connection.end(); 
        break; 
      }
    })
}

function viewDepartment(){
   Department.selectAll()
    .then((results) => {
        console.table(results)
    })
    .then(start())
    .catch((err) => {
        console.log(err)
    })
}

function viewRoles(){
    Role.selectAll()
    .then((results) => {
        console.table(results)
    })
    .then(start())
    .catch((err) => {
        console.log(err)
    })
}

function viewEmployees(){
    Employee.selectAll()
    .then((results) => {
        console.table(results)
    })
    .then(start())
    .catch((err) => {
        console.log(err)
    })
}

function addDepartment(){
    inquirer.prompt([{
        type: "input",
        message: "What is the department name?",
        name: "deptName"
        }
    ]).then(function(data){
        Department.create(data)
        .then((results) => {
            console.table(results)
        })
        .then(start())
        .catch((err) => {
            console.log(err)
        })
    })
}

function addRole(){
    inquirer.prompt([
    {
        type: "input",
        message: "What is the Role?",
        name: "roleName"
    },
    {
        type: "input",
        message: "What is the salary for this position?",
        name: "roleSalary"
    },
    {
        type: "input",
        message: "What is the department ID number?",
        name: "deptID"
    }

    ]).then(function(data){
        Role.create(data)
        .then((results) => {
         console.table(results)
        })
        .then(start())
        .catch((err) => {
            console.log(err)
        })
    })
}

function addEmployee(){
    inquirer.prompt([
    {
        type: "input",
        message: "What is the employee's first name?",
        name: "firstName"
    },
    {
        type: "input",
        message: "What is the employee's last name?",
        name: "lastName"
    },
    {
        type: "input",
        message: "What is this employee's role ID?",
        name: "roleID"
    },
    {
        type: "list",
        message: "Does this employee have a manager?",
        name: "hasManager",
        choices: [
            "yes",
            "no"
        ]
    },
    {
        // when: input => {
        //     return input.hasManager === "yes"
        // },
        type: "input",
        message: "What is the manager's ID number?",
        name: "managerID"
    }

    ]).then(function(data,input){
        if (input.hasManager === "yes") {
            Employee.addManagerID(data,input)
            .then((results) => {
                console.table(results)
            })
            .then(start())
            .catch((err) => {
                console.log(err)
            })
        } else {
            Employee.create(data)
            .then((results) => {
                console.table(results)
            })
            .then(start())
            .catch((err) => {
                console.log(err)
            }) 
        }
    })
}
   
function updateEmployeeRole(){ 
    inquirer.prompt([
    {
        type: "input",
        message: "What is the ID of the employee whose role is being chamged?",
        name: "employeeID"
                
    },
    {
        type: "input",
        message: "What is the ID of their new role?",
        name: "newRoleID"
    }

    ]).then(function(data){
        Employee.update(data)
        .then((results) => {
            console.table(results)
        })
        .then(start())
        .catch((err) => {
            console.log(err)
        })
    })
}

function removeEmployee(){
    inquirer.prompt([
    {
        type: "input",
        message: 'What is the ID of the employee that is being removed?',
        name: 'employeeInfo'
    }
    ]).then(function(data){
        Employee.delete(data)
        .then((results) => {
            console.table(results)
        })
        .then(start())
        .catch((err) => {
            console.log(err)
        })
    })
}

start();
