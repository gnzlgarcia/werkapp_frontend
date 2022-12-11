import { useState, useEffect } from "react";
import Alert from "./Alert";
import useEmployees from "../hooks/useEmployees";

const Formulario = () => {
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ dateOfBirth, setDateOfBirth ] = useState('');
    const [ contactNumber, setContactNumber ] = useState('');
    const [ department, setDepartment ] = useState('');
    const [ id, setId ] = useState(null);

    const [ alert, setAlert ] = useState({});

    const { saveEmployee, employee } = useEmployees();

    useEffect(() => {
     if (employee?.name) {
      setName(employee.name);
      setEmail(employee.email);
      setPassword(employee.password);
      setDateOfBirth(employee.dateOfBirth);
      setContactNumber(employee.contactNumber);
      setDepartment(employee.department);
      setId(employee._id);
     }
    }, [employee])

    const handleSubmit = async e => {
        e.preventDefault();
        //Validar formulario
        if ([name, email, dateOfBirth, contactNumber, department].includes("")) {
            setAlert({ msg: "Hay campos vacíos", error: true });
            return;
          }

          
          saveEmployee({name, email, password, dateOfBirth, contactNumber, department, id});
          setAlert({
            msg: 'Guardado Correctamente'
          })

      setName('');
      setEmail('');
      setPassword('');
      setDateOfBirth('');
      setContactNumber('');
      setDepartment('');
      setId(null);

    }

    const { msg } = alert;

  return (
    <>
      <p className="font-medium text-lg text-center mb-10">
        Añade tus Empleados y{" "}
        <span className="text-indigo-600 font-medium">Gestionalos</span>
      </p>

      {msg && <Alert alert={alert} />}

      <form
        className="bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md"
        onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="name" className="text-gray-600 font-medium">Nombre</label>
          <input
          id="name"
          type="text"
          placeholder="Nombre del Empleado"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={name}
          onChange={e => setName(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="text-gray-600 font-medium">Email</label>
          <input
          id="email"
          type="email"
          placeholder="Email del Empleado"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={email}
          onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="password" className="text-gray-600 font-medium">Password</label>
          <input
          id="password"
          type="text"
          placeholder="Password del Empleado"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={password}
          onChange={e => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="dateOfBirth" className="text-gray-600 font-medium">Fecha de Nacimiento</label>
          <input
          id="dateOfBirth"
          type="date"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={dateOfBirth}
          onChange={e => setDateOfBirth(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="contactNumber" className="text-gray-600 font-medium">Número de Contacto</label>
          <input
          id="contactNumber"
          type="text"
          placeholder="Número de Contacto"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={contactNumber}
          onChange={e => setContactNumber(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="department" className="text-gray-600 font-medium">Departamento</label>
          <input
          id="department"
          type="text"
          placeholder="Departamento"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={department}
          onChange={e => setDepartment(e.target.value)}
          />
        </div>

        <input 
        type="submit"
        className="bg-indigo-600 w-full p-3 text-white font-medium hover:bg-indigo-800 cursor-pointer transition-colors rounded-md mt-2"
        value={id ? "Guardar Cambios" : "Agregar Empleado"} />
      </form>
    </>
  );
};

export default Formulario;
