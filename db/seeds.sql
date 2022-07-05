INSERT INTO department (department_name)
VALUES ("Engineering"),
       ("Sales"),
       ("Finance"),
       ("Legal");
  
INSERT INTO roles (title, salary, department_id)
VALUES ("Lead Engineer", 200000, 1),
       ("Software Engineer", 150000, 1),
       ("Sales Lead", 100000, 2),
       ("Salesperson", 80000, 2),
       ("Account Manager", 120000, 3),
       ("Accountant", 90000, 3),
       ("Legal Team Lead", 250000, 4),
       ("Lawyer", 180000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Allen", "Qin", 1, NULL),
       ("Andrew", "Lee", 2, 1),
       ("Dan", "Hong", 2, 1),
       ("Brian", "Tseng", 3, NULL),
       ("Diana", "Kim", 4, 4),
       ("Alex", "Choy", 5, NULL),
       ("Jocelyn", "Kim", 6, 6),
       ("Olivia", "Yoon", 7, NULL),
       ("David", "Ahn", 8, 8);