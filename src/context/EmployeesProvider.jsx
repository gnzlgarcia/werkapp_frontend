import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";

const EmployeesContext = createContext();

const EmployeesProvider = ({ children }) => {
    
    const [employees, setEmployees] = useState([]);
    const [employee, setEmployee] = useState({});
    const {auth} = useAuth();

    useEffect(() => {

        const getEmployees = async () => {

            try {
            const token = localStorage.getItem('token');

            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

                const { data } = await clienteAxios.get('/employees', config);
                setEmployees(data);
            } catch (error) {
                console.log(error.response.data.msg)
                
            }
        };

        getEmployees();

    }, [auth]);

    const saveEmployee = async (employee) => {
                const token = localStorage.getItem('token');
    
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

        if (employee.id) {
            try {
                const { data } = await clienteAxios.put(`/employees/${employee.id}`, employee, config);
    
                const employeeUpdated = employees.map(employeeState => employeeState._id === data._id ? data : employeeState);
                setEmployees(employeeUpdated);
            } catch (error) {
                console.log(error.response.data.msg);
            }
        } else {

            try {
                const { data } = await clienteAxios.post('/employees', employee, config);
    
                const { createdAt, updatedAt, __V, ...savedEmployee } = data;
    
                setEmployees([savedEmployee, ...employees])
            } catch (error) {
                console.log(error.response.data.msg);
            }
        }

    }

    const setEdicion = (employee) => {
        setEmployee(employee);
    }

    const dropEmployee = async id => {
        const confirmDrop = confirm('¿Seguro que quieres eliminarlo?');
        if (confirmDrop) {
            try {
                const token = localStorage.getItem('token');
    
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await clienteAxios.delete(`/employees/${id}`, config);
                const employeesUpdated = employees.filter(employeesState => employeesState._id !== id);
                setEmployees(employeesUpdated);
            } catch (error) {
                console.log(error);
            }
        }
    }


    return (
        <EmployeesContext.Provider value={{ employees, saveEmployee, setEdicion, employee, dropEmployee }}>
            {children}
        </EmployeesContext.Provider>
    );
};

export { EmployeesProvider };

export default EmployeesContext;
