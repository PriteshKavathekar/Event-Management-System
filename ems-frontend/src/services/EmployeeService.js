import axios from "axios";

const REST_API_BASE_URL = "http://localhost:9090/api/employees";
 
// get all employees
export const listEmployees = () => axios.get(REST_API_BASE_URL);

// create a new employee
export const createEmployee = (employee) => axios.post(REST_API_BASE_URL, employee);

// get a employee by id
export const getEmployee = (employeeId) => axios.get(REST_API_BASE_URL + '/' + employeeId);

// update a employee
export const updateEmployee = (employeeId, employee) => axios.put(REST_API_BASE_URL + '/' + employeeId, employee);

// delete a employee
export const deleteEmployee = (employeeId) => axios.delete(REST_API_BASE_URL + '/' + employeeId);
