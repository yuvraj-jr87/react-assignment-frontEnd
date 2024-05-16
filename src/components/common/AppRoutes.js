import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../user/Login";
import Parent from "../other/Parent";
import Employee from '../employee/Employee';
import Home from "./Home";
import Page404 from './Page404';
import Menubar from "./Menubar";
import Register from '../user/Register';
import Profile from "../user/Profile";
import Logout from '../user/Logout';
import { useSelector } from "react-redux";
import AddEmployee from "../employee/AddEmployee";
import EmpList from "../employee/EmpList";
import UpdateEmployee from "../employee/UpdateEmployee";

const AppRoutes = () => {

    const loginStatus = useSelector(store => store.user.loginStatus);

    if (loginStatus) {
        return (
            <>
                <BrowserRouter>
                    <Menubar />
                    <Routes>
                        <Route path="home" element={<Home />} />
                        <Route path="emp" element={<Employee />} />
                        <Route path="parent" element={<Parent />} />
                        <Route path="logout" element={<Logout />} />
                        <Route path="addEmp" element={<AddEmployee />} />
                        <Route path="updateEmp" element={<UpdateEmployee />} />
                        <Route path="getAll" element={<EmpList />} />
                        <Route path="profile" element={<Profile />} />
                        <Route exact path="/" element={<Home />} />
                        <Route path="*" element={<Page404 />} />
                    </Routes>
                </BrowserRouter>
            </>
        );
    }
    else {
        return (
            <>
                <BrowserRouter>
                    <Menubar />
                    <Routes>
                        <Route path="home" element={<Home />} />
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                        <Route exact path="/" element={<Home />} />
                        <Route path="*" element={<Page404 />} />
                    </Routes>
                </BrowserRouter>
            </>
        );
    }
};

export default AppRoutes;


