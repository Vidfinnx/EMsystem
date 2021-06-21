INSERT INTO department (dept_name) VALUES ('Warehouse'), ('Office'), ('Management');
INSERT INTO company_role (title, salary, dept_id) VALUES
('Regional Manager', 90000.00, 3), 
('Salesman', 60000.00, 2),
('Warehouseman', 50000.00, 1),
('Receptionist', 40000.00, 1 );             


INSERT INTO employees (first_name, last_name, emp_role_id, manager_id) VALUES
('Michael', 'Scott', 1, null),
('Jim', 'Halpert', 2, 1),
('Darryl', 'Philbin', 3, null),
('Pam', 'Beesly', 4, 1);