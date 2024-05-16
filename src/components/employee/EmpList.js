//import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setEmpObj, setEmpList } from "../../redux/EmpSlice";
import EmployeeService from "../../services/EmployeeService";
import { useSelector } from "react-redux";


const EmpList = () => {
  // const [empList, setEmpList] = useState([]);
  const empList = useSelector(store => store.emp.empList);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("useEffect");
    // axios.get("http://localhost:8081/emp/get-all-emps").then((resp) => {
    //   console.log(resp.data);
    //   setEmpList(resp.data);
    // });
    EmployeeService.getAllEmps()
      .then((response) => {
        console.log(response);
        dispatch(setEmpList(response));
      })
      .catch((error) => {
        console.error("Error getting list", error);
      });
  }, []);  

  const deleteEmps = (empObj) => {
    // axios
    //   .delete("http://localhost:8081/emp/delete-emp/" + empObj.employeeId)
    //   .then((resp) => {
    //     // console.log(resp.data);
    //     alert(`deleted successfully!`);
    //     setEmpList(
    //       empList.filter((emp) => emp.employeeId !== empObj.employeeId)
    //     );
    //   });
    EmployeeService.deleteEmp(empObj.employeeId)
    .then((response) => {
      console.log(response);
      alert(`deleted successfully!`);
      
      dispatch(setEmpList(empList.filter((emp) => emp.employeeId !== empObj.employeeId)));
    })
    .catch((error) => {
      console.error("Error getting list", error);
    });

  };

  return (
    <>
      <h1>Employee List</h1>
      <table>
        <thead>
          <th>Name</th> <th>Salary</th> <th>Email</th>
        </thead>
        <tbody>
          {empList &&
            empList.map((emp) => (
              <tr key={emp.id}>
                {/* <td >{emp.employeeId} </td> */}
                <td>{emp.firstName} </td>
                <td>{emp.salary} </td>
                <td>{emp.email} </td>
                <td>
                  <button onClick={() => dispatch(setEmpObj(emp))}>
                    <Link to={"/updateEmp"}>Update</Link>
                  </button>
                </td>
                <td>
                  <button onClick={() => deleteEmps(emp)}>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default EmpList;
