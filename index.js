const dotenv = require("dotenv");
const inquirer = require("inquirer");
const express = require("express");

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

// Query database
let deletedRow = 2;

db.query(`DELETE FROM books WHERE id = ?`, [deletedRow], (err, result) => {
	if (err) {
		console.log(err);
	}
	console.log(result);
});

// Query database
db.query("SELECT * FROM books", function (err, results) {
	console.log(results);
});

// Default response for any other request (Not Found)
app.use((req, res) => {
	res.status(404).end();
});
