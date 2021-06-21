const fs = require(`fs`);
var mysql = require("mysql");
var inq = require("inquirer");
var table = require("console.table");
var add = require("./lib/add");
var update = require("./lib/update");
var view = require("./lib/view");
const logo = require("asciiart-logo");
var image = fs.readFileSync('dwight.txt', {encoding:'utf8', flag:'r'});

displayLogo()

function displayLogo() {
    console.log(image,
        logo({
            name: 'Dwights  Employee  Management  System',
            lineChars: 99,
            padding: 0,
            margin: 3,
            borderColor: 'grey',
            logoColor: 'white',
            textColor: 'white',
        })
        .render()
    );
}

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root1234",
  database: "company_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("+++++Connected to Dwights Employee Management System+++++\n");
  exports.start();
});

exports.start = () => {
    inq.prompt([
        {
            type: "list",
            message: "*Please Make a Selection*",
            name: "choice",
            choices: [
                "View All Employees",
                "View All Departments",
                "View All Roles",
                "Update Employee Role",
                "Add Employee",
                "Add Role",
                "Add Department",
                "EXIT"                
            ]
        }
    ])
    .then(function(answer) {
      if(answer.choice === "View All Employees") {
        view.viewAllEmployees();
      }
      else if(answer.choice === "View All Departments") {
        view.viewAllDepartments();
      }
      else if(answer.choice === "View All Roles") {
        view.viewAllRoles();
      }
      else if(answer.choice === "Add Employee") {
        add.addEmployee();
      }      
      else if(answer.choice === "Update Employee Role") {
        update.updateRole();
      }
      else if(answer.choice === "Add Department") {
        add.addDepartment();
      }
      else if(answer.choice === "Add Role") {
        add.addRole();
      }
      else if(answer.choice === "EXIT") {
        connection.end();
        process.exit();
         }
    });
  };