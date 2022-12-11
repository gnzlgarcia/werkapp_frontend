import useEmployees from "../hooks/useEmployees";
import Empleado from "./Empleado";

const ListaEmpleados = () => {

  const { employees } = useEmployees();

  


  return (
    <>
      {employees.length ? (
          <>
            <h2 className="mb-10 font-medium text-lg text-center">Lista de <span className="text-indigo-600 font-semibold">Empleados</span></h2>

            {employees.map( employee => (
              <Empleado 
              key={employee._id}
              employee={employee}
              />
            ))}
            
          </>
        ) :
        (
          <>
            <h2 className="font-medium text-lg text-center">No hay Empleados</h2>
            <p className="text-md text-center">
              Agrega Empleados y {''}
              <span className="text-indigo-600 font-semibold">empieza a Gestionarlos</span>
            </p>
          </>
        )}
    </>
  )
}

export default ListaEmpleados