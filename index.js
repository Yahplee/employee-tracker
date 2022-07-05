require("dotenv").config();

const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = require("console.table");

// Connect to database
const db = mysql.createConnection(
	{
		host: "localhost",
		// MySQL username,
		user: process.env.DB_USER,
		// MySQL password
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
	},
	console.log(`Connected to the employee_db database.`)
);

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

const viewDepartment = () => {
	db.query("SELECT * FROM department", function (err, results) {
		if (err) throw err;
		console.table(results);
		init();
	});
};

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

const addRoles = () => {};

const updateRoles = () => {};

// Query database
// let deletedRow = 2;

// db.query(`DELETE FROM books WHERE id = ?`, [deletedRow], (err, result) => {
// 	if (err) {
// 		console.log(err);
// 	}
// 	console.log(result);
// });

// // Query database
// db.query("SELECT * FROM books", function (err, results) {
// 	console.log(results);
// });

// initialization function
init();
