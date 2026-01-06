import React, { useEffect, useState } from "react";
import {
  createEmployee,
  getEmployee,
  updateEmployee,
} from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const { id } = useParams();

  const navigator = useNavigate();

  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then((response) => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
        })
        .catch((error) => {
          console.long(error);
        });
    }
  }, [id]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const saveOrUpdateEmployee = (e) => {
    e.preventDefault();

    let formErrors = {};

    if (!firstName.trim()) {
      formErrors.firstName = "Please enter first name";
    }

    if (!lastName.trim()) {
      formErrors.lastName = "Please enter last name";
    }

    if (!email.trim()) {
      formErrors.email = "Please enter email address";
    } else if (!validateEmail(email)) {
      formErrors.email = "Please enter a valid email address";
    }

    // Stop submission if errors exist
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const employee = { firstName, lastName, email };
    console.log(employee);

    if (id) {
      // 🔁 UPDATE
      updateEmployee(id, employee)
        .then((response) => {
          console.log(response.data);

          alert("Employee updated successfully!"); // ✅ success alert

          navigator("/employees"); // redirect to list
        })
        .catch((error) => {
          console.log(error);
          alert("Failed to update employee.");
        });
    } else {
      // ➕ CREATE
      createEmployee(employee)
        .then((response) => {
          console.log(response.data);

          alert("Employee saved successfully!"); // ✅ success alert

          navigator("/employees"); // redirect to list
        })
        .catch((error) => {
          console.log(error);
          alert("Failed to save employee.");
        });
    }

    // Clear form
    setFirstName("");
    setLastName("");
    setEmail("");
    setErrors({});
  };

  function pageTitle() {
    if (id) return <h2 className="text-center mb-4">Update Employee</h2>;
    else return <h2 className="text-center mb-4">Add Employee</h2>;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card bg-dark text-light shadow-lg border-0">
            <div className="card-body">
              {pageTitle()}

              <form>
                {/* First Name */}
                <div className="mb-3">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    placeholder="Enter first name"
                    className="form-control bg-dark text-light border-secondary"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      setErrors({ ...errors, firstName: "" });
                    }}
                  />
                  {errors.firstName && (
                    <small className="text-danger">{errors.firstName}</small>
                  )}
                </div>

                {/* Last Name */}
                <div className="mb-3">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    placeholder="Enter last name"
                    className="form-control bg-dark text-light border-secondary"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      setErrors({ ...errors, lastName: "" });
                    }}
                  />
                  {errors.lastName && (
                    <small className="text-danger">{errors.lastName}</small>
                  )}
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    placeholder="Enter email"
                    className="form-control bg-dark text-light border-secondary"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrors({ ...errors, email: "" });
                    }}
                  />
                  {errors.email && (
                    <small className="text-danger">{errors.email}</small>
                  )}
                </div>

                <div class="d-flex justify-content-between gap-3 mt-4">
                  <button
                    class="btn btn-outline-primary px-4"
                    onClick={saveOrUpdateEmployee}
                    type="button"
                  >
                    Submit
                  </button>
                  <button
                    class="btn btn-outline-primary px-4"
                    type="button"
                    onClick={() => navigator("/employees")}
                  >
                    View Employees
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponent;
