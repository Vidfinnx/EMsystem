var inq = require("inquirer");
var mysql = require("mysql");
var app = require("../app");
var view = require("./view");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root1234",
    database: "company_db"
});

exports.addRole = () => {
    view.getAllRoles(function(rollResults) {
       var roles = [];
       var depts = [];
       for(var i = 0; i < rollResults.length; i++) {
           roles.push(rollResults[i].title);
       }
       connection.query(`SELECT CONCAT(dept_id,": ",dept_name) AS 'depts' FROM department`,
       (err, res) => {
           if (err) throw err;
           res.forEach((dep) => {
               depts.push(dep.depts);
           });
         var options = [
         {
             type: "input",
             message: "New Role Name",
             name: "title"
             
         },
         {
             type: "number",
             message:"New Role Salary",
             name: "salary"
         },
         {
            type: "list",
            message: "Please Choose A Department",
            name: "deptId",
            choices: depts
         },
        ];
 
         inq.prompt(options)
         .then((answers) => {
             deptId = answers.deptId.split(":")
             console.log(deptId);
             connection.query("INSERT INTO company_role SET ?",
                 {
                     title: answers.title,
                     salary:answers.salary,
                     dept_id:answers.deptId[0]
                 },
             function(err,results) {
                 if(err) throw err;
                 console.log("\nSuccessfully added " + answers.title + " Role \n");
                 app.start();
               });
         });
     });
    });

exports.addDepartment = () => {
    view.getAllDepartments(function(deptResults) {
       var departments = [];
       for(var i = 0; i < deptResults.length; i++) {
           departments.push(deptResults[i].title);
       }
        var options = [
         {
             type: "input",
             message: "New Department Name",
             name: "deptName"
             
         },
         ];

         inq.prompt(options)
         .then((answers) => {
             connection.query("INSERT INTO department SET ?",
                 {
                     dept_name: answers.deptName,
                 },
             function(err,results) {
                 if(err) throw err;
                 console.log("\nSuccessfully added " + answers.deptName + " Department\n");
                 app.start();
                 
             });
         });
     });
};

              

exports.addEmployee = () => {
   view.getAllRoles(function(rolesResults) {
      var roles = [];
      for(var i = 0; i < rolesResults.length; i++) {
          roles.push(rolesResults[i].title);
      }
       var options = [
        {
            type: "input",
            message: "Employee First Name",
            name: "firstName",
            
        },
        {
            type: "input",
            message: "Employee Last Name",
            name: "lastName",
            
        },
        {
            type: "list",
            message: "Employee Role",
            name: "role",
            choices: roles
        }
        ];

        inq.prompt(options)
        .then((answers) => {
            var roleId = null;
            for(var i= 0; i < rolesResults.length; i++) {
                if(rolesResults[i].title === answers.role) {
                    roleId = rolesResults[i].role_id
                }
            }
            connection.query("INSERT INTO employees SET ?",
                {
                    first_name: answers.firstName,
                    last_name: answers.lastName,
                    emp_role_id: roleId
                },
            function(err,results) {
                if(err) throw err;
                console.log("\nSuccessfully added " + answers.firstName + " " + answers.lastName + "\n" );
                app.start();
               
            });
        });
    });
}};