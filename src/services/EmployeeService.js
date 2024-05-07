import axios from 'axios';

const BASE_URL = 'http://localhost:8081/emp';

const EmployeeService = {

    addEmployee: async (userData) => {
        console.log(userData);
        try {
            const response = await axios.post(`${BASE_URL}/add-emp`, userData);
            console.log(response);
            return response.data;
        } catch (error) {
            console.log(error);
            // return error;
            throw new Error(error);
        }
    },

    getAllEmps: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/get-all-emps`);
            console.log(response);
            return response.data;
        } catch (error) {
            console.log(error);
            // return error;
            throw new Error(error);
        }
    },
    getEmpByName: async (empName) => {
        try {
            const response = await axios.get(`${BASE_URL}/get-emp-by-name/`+empName);
            console.log(response);
            return response.data;
        } catch (error) {
            console.log(error);
            // return error;
            throw new Error(error);
        }
    },

    deleteEmp: async (employeeId) => {
        try {
            const response = await axios.delete(`${BASE_URL}/delete-emp/`+employeeId);
            console.log(response);
            return response.data;
        } catch (error) {
            console.log(error);
            // return error;
            throw new Error(error);
        }
    },
    updateEmp:async(employeeId,emp)=> {
        try {
            const response = await axios.put(`${BASE_URL}/update-emp/`+employeeId,emp);
            console.log(response);
            return response.data;
        } catch (error) {
            console.log(error);
            // return error;
            throw new Error(error);
        }
    }



};

export default EmployeeService;