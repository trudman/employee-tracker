INSERT INTO department (name)
VALUES 
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Sales Manager', 125000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 160000, 3),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 200000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Cecil', 'Gardner', 1, NULL),
    ('Lori', 'Freeman', 2, NULL),
    ('Austin', 'Terry', 3, 2),
    ('Shelly', 'Tate', 4, NULL), 
    ('Julio', 'Owens', 5, 4), 
    ('Thomas', 'Gregory', 6, NULL),
    ('Dora', 'Hudson', 7, 6);

