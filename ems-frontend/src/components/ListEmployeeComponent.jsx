import React, { useEffect, useState } from "react";
import { deleteEmployee, listEmployees } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";

const ListEmployeeComponent = () => {
  const [employees, setEmployees] = useState([]);

  const navigator = useNavigate();

  useEffect(() => {
    getAllEmployees();
  }, []);

  function getAllEmployees() {
    listEmployees()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function addNewEmployee() {
    navigator("/add-employee");
  }

  function updateEmployee(id) {
    navigator(`/edit-employee/${id}`);
  }

  function removeEmployee(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) {
      return; // stop if user clicks Cancel
    }

    deleteEmployee(id)
      .then((response) => {
        getAllEmployees();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      {/* Design-only styles */}
      <style>
        {`
          body {
            background: linear-gradient(135deg, #020617, #0f172a);
          }

          .page-wrapper {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .modern-card {
            background: rgba(15, 23, 42, 0.8);
            backdrop-filter: blur(14px);
            border-radius: 14px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            animation: fadeIn 0.6s ease-in-out;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          table {
            margin-bottom: 0;
          }

          thead th {
            font-size: 0.85rem;
            letter-spacing: 0.08em;
            text-transform: uppercase;
          }

          tbody tr {
            transition: background-color 0.25s ease;
          }

          tbody tr:hover {
            background-color: rgba(99, 102, 241, 0.12);
          }
        `}
      </style>

      <div className="container-fluid page-wrapper text-light">
        <div className="col-12 col-lg-10">
          <div className="modern-card shadow-lg p-4">
            <h2 className="text-center fw-semibold mb-4">List of Employees</h2>

            <button
              className="btn btn-outline-primary mb-4"
              onClick={addNewEmployee}
            >
              Add Employee
            </button>

            <div className="table-responsive">
              <table className="table table-dark table-borderless align-middle text-center">
                <thead className="border-bottom border-secondary">
                  <tr>
                    <th>Employee Id</th>
                    <th>Employee First Name</th>
                    <th>Employee Last Name</th>
                    <th>Employee Email Id</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee.id}>
                      <td>{employee.id}</td>
                      <td>{employee.firstName}</td>
                      <td>{employee.lastName}</td>
                      <td className="text-info">{employee.email}</td>
                      <td>
                        <div className="d-flex justify-content-center gap-4">
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => updateEmployee(employee.id)}
                          >
                            Update
                          </button>

                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => removeEmployee(employee.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListEmployeeComponent;
