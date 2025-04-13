import dotenv from 'dotenv';
dotenv.config();

import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT)
});

// =====================

export const getDepartments = async () => {
  const res = await pool.query('SELECT * FROM department');
  return res.rows;
};

export const getRoles = async () => {
  const res = await pool.query(`
    SELECT role.id, role.title, department.name AS department, role.salary
    FROM role
    JOIN department ON role.department_id = department.id
  `);
  return res.rows;
};

export const getEmployees = async () => {
  const res = await pool.query(`
    SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department,
           r.salary, m.first_name AS manager_first, m.last_name AS manager_last
    FROM employee e
    LEFT JOIN role r ON e.role_id = r.id
    LEFT JOIN department d ON r.department_id = d.id
    LEFT JOIN employee m ON e.manager_id = m.id
  `);
  return res.rows;
};

export const addDepartment = async (name: string) => {
  await pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
};

export const addRole = async (title: string, salary: number, departmentId: number) => {
  await pool.query(
    'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)',
    [title, salary, departmentId]
  );
};

export const addEmployee = async (
  first: string,
  last: string,
  roleId: number,
  managerId: number | null
) => {
  await pool.query(
    'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
    [first, last, roleId, managerId]
  );
};

export const updateEmployeeRole = async (id: number, newRoleId: number) => {
  await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [newRoleId, id]);
};
