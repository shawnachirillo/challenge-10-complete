-- Departments
INSERT INTO department (name)
VALUES 
  ('Marketing'), 
  ('Sales'), 
  ('Finance');

-- Roles
INSERT INTO role (title, salary, department_id) 
VALUES
  ('Manager of Marketing', 247328, 1),
  ('Marketing Specialist', 123664, 1),
  ('Sales Manager', 234000, 2),
  ('Sales Associate', 100000, 2),
  ('Finance Manager', 200000, 3),
  ('Accountant', 80000, 3),
  -- New roles (IDs 7 and 8)
  ('HR Manager', 95000, 1),
  ('Customer Support Rep', 60000, 2);

-- Employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES
  ('John', 'Doe', 1, NULL),         -- Manager of Marketing
  ('Jim', 'Smith', 3, NULL),        -- Sales Manager
  ('Jack', 'Johnson', 5, NULL),     -- Finance Manager
  ('Jill', 'Smith', 4, 1),          -- Sales Associate, reports to John
  ('Jane', 'Doe', 2, 1),            -- Marketing Specialist, reports to John
  ('Jill', 'Johnson', 6, 3),        -- Accountant, reports to Jack
  ('Ron', 'Carter', 7, 1),          -- HR Manager, reports to John
  ('Lily', 'Nguyen', 8, 3);         -- Customer Support Rep, reports to Jack
