const dotenv = require("dotenv");
const inquirer = require("inquirer");
const express = require("express");
const mysql = require("mysql2");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
	{
		host: "localhost",
		// MySQL username,
		user: DB_USER,
		// MySQL password
		password: DB_PASSWORD,
		database: DB_NAME,
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
				],
			},
		])
		.then((answer) => {
			switch (answer.choices) {
				case "View All Departments":
					viewDepartment();
					break;
				case "View All Roles":
					viewRoles();
					break;
				case "View All Employees":
					viewEmployees();
					break;
				case "Add a Departments":
					addDepartment();
					break;
				case "Add a Role":
					addRoles();
					break;
				case "Add an Employees":
					addemployee();
					break;
				case "Update an Employee Role":
					updateRoles();
					break;
			}
		});
};

const viewDepartment = () => {};

const viewRoles = () => {};

const viewEmployees = () => {};

const addDepartment = () => {
	inquirer
		.prompt([
			{
				type: "input",
				name: "addDepartmentName",
				message: "What department would you like to add?",
			},
		])
		.then();
};

const addRoles = () => {
	inquirer.prompt([
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
			name: "addDepartment",
			message: "Which department does the role belong to?",
			choices:
				"SOMETHING HERE THAT LISTS OUT THE DEPARTMENT LIST FROM DATABASE",
		},
	]);
};

const addemployee = () => {
	inquirer.prompt([
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
			choices: "SOMETHING HERE THAT LISTS OUT THE ROLES LIST FROM DATABASE",
		},
		{
			type: "list",
			name: "addManager",
			message: "Who is the employee's manager?",
			choices: "SOMETHING HERE THAT LISTS OUT THE MANAGER LIST FROM DATABASE",
		},
	]);
};

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

// Default response for any other request (Not Found)
app.use((req, res) => {
	res.status(404).end();
});

// initialization function
init();
