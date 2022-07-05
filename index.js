// to hide MYSQL info
require("dotenv").config();

// dependencies
const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = require("console.table");
const figlet = require("figlet");

// ascii text art
console.log(
	figlet.textSync("Employee Tracker", {
		font: "Standard",
		horizontalLayout: "fitted",
		verticalLayout: "fitted",
		width: 80,
		whitespaceBreak: true,
	})
);

// Connect to database
const db = mysql.createConnection(
	{
		host: "localhost",
		// MySQL username
		user: process.env.DB_USER,
		// MySQL password
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
	},
	console.log(`Connected to the employee_db database.`)
);

// init function for the main menu
const init = () => {
	inquirer
		.prompt([
			{
				type: "list",
				name: "role",
				message: "What would you like to do?",
				choices: [
					"View All Departments",
					"View All Roles",
					"View All Employees",
					"Add a Department",
					"Add a Role",
					"Add an Employee",
					"Update an Employee Role",
					"Quit",
				],
			},
		])
		// runs each function depending on choices from the init prompt
		.then((answer) => {
			switch (answer.role) {
				case "View All Departments":
					viewDepartment();
					break;
				case "View All Roles":
					viewRoles();
					break;
				case "View All Employees":
					viewEmployees();
					break;
				case "Add a Department":
					addDepartment();
					break;
				case "Add a Role":
					addRoles();
					break;
				case "Add an Employee":
					addemployee();
					break;
				case "Update an Employee Role":
					updateRoles();
					break;
				case "Quit":
					process.exit();
			}
		});
};

// function for viewing department list with the query selecting from the department table
const viewDepartment = () => {
	db.query("SELECT * FROM department", function (err, results) {
		if (err) throw err;
		console.table(results);
		init();
	});
};

// function for viewing roles list with the query selecting from the roles table
const viewRoles = () => {
	db.query(
		`SELECT roles.id, roles.title, roles.salary, department.department_name
		 FROM roles
		 JOIN department ON roles.department_id=department.id`,
		(err, results) => {
			if (err) throw err;
			console.table(results);
			init();
		}
	);
};

// function for viewing employee list with the query selecting from the employee table
const viewEmployees = () => {
	db.query(
		`SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.department_name AS department, roles.salary, CONCAT(manager.first_name," ", manager.last_name) AS manager
		 FROM employee 
		 LEFT JOIN roles ON employee.role_id=roles.id
		 LEFT JOIN department ON roles.department_id=department.id
		 LEFT JOIN employee manager on employee.manager_id=manager.id`,
		(err, results) => {
			if (err) throw err;
			console.table(results);
			init();
		}
	);
};

// function for adding department with the query inserting into the department table
const addDepartment = () => {
	inquirer
		.prompt([
			{
				type: "input",
				name: "addDepartmentName",
				message: "What department would you like to add?",
			},
		])
		.then(({ addDepartmentName }) => {
			console.log(addDepartmentName);
			db.query(
				`INSERT INTO department (department_name)
				 VALUE("${addDepartmentName}")`,
				(err) => {
					if (err) throw err;
					console.log(`Added ${addDepartmentName} to the database`);
					init();
				}
			);
		});
};

// function for adding roles with the query inserting a new role into the roles table
const addRoles = () => {
	db.query("SELECT * FROM department", function (err, results) {
		if (err) throw err;
		inquirer
			.prompt([
				{
					type: "input",
					name: "addRoleName",
					message: "What is the name of the role?",
				},
				{
					type: "input",
					name: "addSalary",
					message: "What is the salary of the role?",
				},
				{
					type: "list",
					name: "addExistDepartment",
					message: "Which department does the role belong to?",
					// will need to dynamically render the list of department names
					// will need to refernce to the department list
					choices: function () {
						const departmentName = [];
						for (department of results) {
							departmentName.push(department.department_name);
						}
						return departmentName;
					},
				},
			])
			// need to set the entered department equal to the department id
			.then(({ addRoleName, addSalary, addExistDepartment }) => {
				let department_id;
				for (department of results) {
					if (department.department_name === addExistDepartment) {
						department_id = department.id;
					}
				}
				// will need to insert the department name and render it in the roles table
				db.query(
					`INSERT INTO roles (title, salary, department_id)
					 VALUE("${addRoleName}", "${addSalary}", ${department_id})`,
					(err) => {
						if (err) throw err;
						console.log(`Added ${addRoleName} to the database`);
						init();
					}
				);
			});
	});
};

// function for adding an employee with the query inserting a new employee with first and last name, role, and manager
const addemployee = () => {
	db.query("SELECT * FROM employee", function (err, employeeResults) {
		if (err) throw err;
		db.query("SELECT * FROM roles", function (err, rolesResults) {
			if (err) throw err;
			inquirer
				.prompt([
					{
						type: "input",
						name: "addFirstName",
						message: "What is the employee's first name?",
					},
					{
						type: "input",
						name: "addLastName",
						message: "What is the employee's last name?",
					},
					{
						type: "list",
						name: "addRole",
						message: "What is the employee's role?",
						choices: function () {
							const roleName = [];
							for (role of rolesResults) {
								roleName.push(role.title);
							}
							return roleName;
						},
					},
					{
						type: "list",
						name: "addManager",
						message: "Who is the employee's manager?",
						choices: function () {
							const managerName = [];
							for (manager of employeeResults) {
								managerName.push(manager.first_name + " " + manager.last_name);
							}
							return managerName;
						},
					},
				])
				.then(({ addFirstName, addLastName, addRole, addManager }) => {
					let roles_id;
					let managers_id;
					for (role of rolesResults) {
						if (role.title === addRole) {
							roles_id = role.id;
						}
					}
					for (employee of employeeResults) {
						if (employee.first_name + " " + employee.last_name === addManager) {
							managers_id = employee.id;
						}
					}
					db.query(
						`INSERT INTO employee (first_name, last_name, role_id, manager_id)
						 VALUE("${addFirstName}", "${addLastName}", ${roles_id}, ${managers_id})`,
						(err) => {
							if (err) throw err;
							console.log(
								`Added ${addFirstName} ${addLastName} to the database`
							);
							init();
						}
					);
				});
		});
	});
};

// function for updating and employee's role with the query targeting the employee table's role id
const updateRoles = () => {
	db.query("SELECT * FROM employee", function (err, employeeResults) {
		if (err) throw err;
		db.query("SELECT * FROM roles", function (err, rolesResults) {
			if (err) throw err;
			inquirer
				.prompt([
					{
						type: "list",
						name: "chooseEmployeeName",
						message: "Which employee's role would you want to update?",
						choices: function () {
							const employeeName = [];
							for (employee of employeeResults) {
								employeeName.push(
									employee.first_name + " " + employee.last_name
								);
							}
							return employeeName;
						},
					},
					{
						type: "list",
						name: "updateEmployeeRole",
						message: "What is the selected employee's new role?",
						choices: function () {
							const employeeRole = [];
							for (updateRole of rolesResults) {
								employeeRole.push(updateRole.title);
							}
							return employeeRole;
						},
					},
				])
				.then(({ chooseEmployeeName, updateEmployeeRole }) => {
					let employee_id;
					let roles_id;
					for (employee of employeeResults) {
						if (
							employee.first_name + " " + employee.last_name ===
							chooseEmployeeName
						) {
							employee_id = employee.id;
						}
					}
					for (updatedRole of rolesResults) {
						if (updatedRole.title === updateEmployeeRole) {
							roles_id = updatedRole.id;
						}
					}
					db.query(
						`UPDATE employee
						 SET role_id = "${roles_id}"
						 WHERE id = ${employee_id}`,
						(err) => {
							if (err) throw err;
							console.log("Updated employee's role");
							init();
						}
					);
				});
		});
	});
};

// initialization function
init();
