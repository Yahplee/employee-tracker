INSERT INTO department (department_name)
VALUES ("Engineering"),
       ("Sales"),
       ("Finance"),
       ("Legal"),
       ("Service");
  
INSERT INTO roles (title, salary, department_id)
VALUES ("Software Engineer", "150000", 1),
       ("Lead Engineer", "200000", 2),
       ("Sales Lead", "100000", 3),
       ("Salesperson", "80000", 4),
       ("Account Manager", "120000", 5),
       ("Accountant", "90000", 6),
       ("Legal Team Lead", "250000", 7),
       ("Lawyer", "180000", 8);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Andrew", "Lee", 1, 1),
       ("Dan", "Hong", 1, 2),
       ("Allen", "Qin", 2, 4),
       ("Brian", "Tseng", 3, 2),
       ("Diana", "Kim", 4, 2),
       ("Alex", "Choy", 5, 4),
       ("Jocelyn", "Kim", 6, 1),
       ("Olivia", "Yoon", 7, 9),
       ("David", "Ahn", 8, 4);