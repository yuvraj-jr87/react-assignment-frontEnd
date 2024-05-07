import { useState } from "react";
import EmployeeService from "../../services/EmployeeService";
import { setEmpObj } from "../../redux/EmpSlice";
import { useDispatch } from "react-redux";

const AddEmployee = () => {
  const [empData, setEmpData] = useState({
    firstName: "",
    salary: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const handleChange = (evt) => {
    setEmpData({ ...empData, [evt.target.name]: evt.target.value });
    setErrors({ ...errors, [evt.target.name]: "" });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!empData.firstName.trim()) {
      newErrors.firstName = "First name is required";
      isValid = false;
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(empData.email)) {
      newErrors.email = "Invalid email address";
      isValid = false;
    }

    if (empData.salary <= 0 || isNaN(empData.salary)) {
      newErrors.salary = "Salary must be a positive number";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    // if (validateForm()) {
    //     axios.post(backendUrl, empData)
    //         .then((resp) => {
    //             alert(`${resp.data.firstName} added successfully!`);
    //             setEmpData({ firstName: '', email: '', salary: '' });
    //         })
    //         .catch(error => {
    //             console.error("Error adding employee:", error);
    //         });
    // }
    if (validateForm()) {
      EmployeeService.addEmployee(empData)
        .then((response) => {
          console.log(response);
          dispatch(setEmpObj(response));
          alert(`${response.firstName} added successfully!`);
          setEmpData({ firstName: "", email: "", salary: "" });
        })
        .catch((error) => {
          console.error("Error adding employee:", error);
        });
    }
  };

  return (
    <>
      <h1>Add Employee Component</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={empData.firstName}
          onChange={handleChange}
          placeholder="Enter first name"
          required
          autoFocus
        />
        {errors.firstName && <span className="error">{errors.firstName}</span>}
        <br />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={empData.email}
          onChange={handleChange}
          placeholder="Enter email"
        />
        {errors.email && <span className="error">{errors.email}</span>}
        <br />
        <label htmlFor="salary">Salary:</label>
        <input
          type="number"
          id="salary"
          name="salary"
          value={empData.salary}
          onChange={handleChange}
          placeholder="Enter salary"
        />
        {errors.salary && <span className="error">{errors.salary}</span>}
        <br />
        <input type="submit" value="Add Employee" />
      </form>
    </>
  );
};

export default AddEmployee;
