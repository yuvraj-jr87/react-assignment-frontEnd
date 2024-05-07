import { Link } from "react-router-dom";
import AddEmployee from "./AddEmployee";
import EmpList from "./EmpList";
import { useEffect, useState } from "react";
import axios from "axios";
import EmployeeService from "../../services/EmployeeService";
import { setEmpList } from "../../redux/EmpSlice";
import { useDispatch, useSelector } from "react-redux";

const Employee = () => {
  const [empName, setEmpName] = useState("");
  const dispatch = useDispatch();
  const [afterSearch, setAfterSearch] = useState("");

  let searchData = useSelector((store) => store.emp.empList);
  // const [searchData, setSearchData] = useState([]);

  const handleEmpName = (evt) => {
    console.log(empName);
    setEmpName(evt.target.value);
  };

  useEffect(() => {
    if (!empName) {
      searchData = [];
    }
  }, [empName]);

  const handleSearch = (evt) => {
    evt.preventDefault();
    // axios
    //   .get("http://localhost:8081/emp/get-emp-by-name/" + empName)
    //   .then((resp) => {
    //     console.log(resp.data);
    //     setAfterSearch(`Employee found`);
    //     setSearchData(resp.data);
    //   })
    //   .catch((error) => {
    //     // console.log(error);
    //     setAfterSearch(`Invalid Name`);
    //     alert("Invalid name")
    //   });
    EmployeeService.getEmpByName(empName)
      .then((resp) => {
        console.log(resp);
        setAfterSearch(`Employee found`);
        // setSearchData(resp);
        dispatch(setEmpList(resp))
      })
      .catch((error) => {
        // console.log(error);
        setAfterSearch(`Invalid Name`);
        alert("Invalid name");
      });
  };

  return (
    <div className="container">
      <h1>Employee Component</h1>
      <div className="border col-4 mx-3 my-3 px-2 py-3">
        {/* <p className="lead">Create these functionalties: </p>
                
                <p>Find Employee by Name</p>
               
                <p>Update Employee</p>
                <p>Delete Employee</p>
                <p>(Modify springboot code, if needed)</p> */}

        <button>
          <Link to={"/getAll"}>All Employees</Link>
        </button>
      </div>
      <div className="border col-4 mx-3 my-3 px-2 py-3">
        <button>
          <Link to={"/addEmp"}>Add Employee</Link>
        </button>
      </div>
      <div className="border col-4 mx-3 my-3 px-2 py-3">
        <form className="  d-flex" role="search">
          <input
            className="  form-control me-2"
            name="empName"
            type="search"
            placeholder="Search"
            onChange={handleEmpName}
          />
          <button
            className="  btn btn-outline-success"
            type="submit"
            onClick={handleSearch}
          >
            Search
          </button>
        </form>
      </div>

      {searchData.length != 0 && (
        <>
          {afterSearch && <p className="lead">{afterSearch}</p>}
          <table>
            <thead>
              <th>Name</th> <th>Salary</th> <th>Email</th>
            </thead>
            <tbody>
              {searchData.length != 0 &&
                searchData.map((emp) => (
                  <tr key={searchData.id}>
                    {/* <td >{emp.employeeId} </td> */}
                    <td>{emp.firstName} </td>
                    <td>{emp.salary} </td>
                    <td>{emp.email} </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Employee;

