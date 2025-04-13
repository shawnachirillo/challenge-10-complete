import inquirer from 'inquirer';
import {
  getDepartments,
  getRoles,
  getEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole
} from './queries.js';

async function mainMenu() {
  const answers = await inquirer.prompt({
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: [
      'View all departments',
      'View all roles',
      'View all employees',
      'Add a department',
      'Add a role',
      'Add an employee',
      'Update an employee role',
      'Exit'
    ]
  });

  switch (answers.action) {
    case 'View all departments':
      console.table(await getDepartments());
      break;

    case 'View all roles':
      console.table(await getRoles());
      break;

    case 'View all employees':
      console.table(await getEmployees());
      break;

    case 'Add a department':
      const dept = await inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'Department name:'
      });
      await addDepartment(dept.name);
      console.log('✅ Department added.');
      break;

    case 'Add a role':
      const role = await inquirer.prompt([
        { type: 'input', name: 'title', message: 'Role title:' },
        { type: 'number', name: 'salary', message: 'Salary:' },
        { type: 'number', name: 'departmentId', message: 'Department ID:' }
      ]);
      await addRole(role.title, role.salary, role.departmentId);
      console.log('✅ Role added.');
      break;

    case 'Add an employee':
      const emp = await inquirer.prompt([
        { type: 'input', name: 'firstName', message: 'First name:' },
        { type: 'input', name: 'lastName', message: 'Last name:' },
        {
          type: 'number',
          name: 'roleId',
          message: 'Role ID:',
          validate: input => !isNaN(input) || 'Please enter a valid number.'
        },
        {
          type: 'input',
          name: 'managerId',
          message: 'Manager ID (leave blank if none):',
          validate: input =>
            input === '' || !isNaN(Number(input)) || 'Enter a number or leave blank'
        }
      ]);
      const managerId = emp.managerId.trim() === '' ? null : Number(emp.managerId);
      await addEmployee(emp.firstName, emp.lastName, emp.roleId, managerId);
      console.log('✅ Employee added.');
      break;

    case 'Update an employee role':
      const update = await inquirer.prompt([
        { type: 'number', name: 'employeeId', message: 'Employee ID:' },
        { type: 'number', name: 'newRoleId', message: 'New Role ID:' }
      ]);
      await updateEmployeeRole(update.employeeId, update.newRoleId);
      console.log('✅ Employee role updated.');
      break;

    default:
      console.log('👋 Exiting...');
      process.exit();
  }

  mainMenu();
}

mainMenu();
