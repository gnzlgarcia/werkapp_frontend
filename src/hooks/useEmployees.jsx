import { useContext } from "react";
import EmployeesContext from "../context/EmployeesProvider";

const useEmployees = () => {
  return useContext(EmployeesContext);
};

export default useEmployees;