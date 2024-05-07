import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EmployeeService from "../../services/EmployeeService";

const UpdateEmployee = () => {
  const [selectedEmp, setSelectedEmp] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const dataFromStore = useSelector((e) => e.emp.empObj);

  useEffect(() => {
    setSelectedEmp(dataFromStore);
  }, [dataFromStore]);

  const handleChange = (e) => {
    setSelectedEmp({ ...selectedEmp, [e.target.name]: e.target.value });
    console.log(selectedEmp);
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!selectedEmp.firstName.trim()) {
      newErrors.firstName = "First name is required";
      isValid = false;
    }

    if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(selectedEmp.email)
    ) {
      newErrors.email = "Invalid email address";
      isValid = false;
    }

    if (selectedEmp.salary <= 0 || isNaN(selectedEmp.salary)) {
      newErrors.salary = "Salary must be a positive number";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (validateForm()) {
      // axios.put(backendUrl+selectedEmp.employeeId, selectedEmp)
      //     .then((resp) => {
      //         alert(`${resp.data.firstName} updated successfully!`);
      //         navigate("/getAll")
      //         // setEmpData({ firstName: '', email: '', salary: '' });
      //     })
      //     .catch(error => {
      //         console.error("Error updating employee:", error);
      //     });
      EmployeeService.updateEmp(selectedEmp.employeeId, selectedEmp)
        .then((resp) => {
          alert(`${resp.firstName} updated successfully!`);
          navigate("/getAll");
        })
        .catch((error) => {
          console.error("Error updating employee:", error);
        });
    }
  };

  return (
    <>
      <h1>Update Employee Component</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={selectedEmp.firstName}
          placeholder="Enter first name"
          required
          autoFocus
          onChange={handleChange}
        />
        {errors.firstName && <span className="error">{errors.firstName}</span>}
        <br />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={selectedEmp.email}
          placeholder="Enter email"
          onChange={handleChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}
        <br />
        <label htmlFor="salary">Salary:</label>
        <input
          type="number"
          id="salary"
          name="salary"
          value={selectedEmp.salary}
          placeholder="Enter salary"
          onChange={handleChange}
        />
        {errors.salary && <span className="error">{errors.salary}</span>}
        <br />
        <input type="submit" value="Update Employee" />
      </form>
    </>
  );
};

export default UpdateEmployee;
