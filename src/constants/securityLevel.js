// Plyable has access to the admin pages.
// They can add, manage, and view the organizations.
// They can invite managers. 
const ADMIN_ROLE = 0;

// Managers are able to invite employees, take the survey, and view the anonymous graphs. 
const MANAGER_ROLE = 1;

// Employees can only register from a manager invite. 
// They can fill out the survey and view the anonymous graphs.
const EMPLOYEE_ROLE = 2;

export default {
  ADMIN_ROLE, 
  MANAGER_ROLE,
  EMPLOYEE_ROLE,
}