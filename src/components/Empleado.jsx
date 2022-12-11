import useEmployees from "../hooks/useEmployees";


const Empleado = ({ employee }) => {
    const {setEdicion, dropEmployee} = useEmployees();


  const { name, email, password, dateOfBirth, contactNumber, department, _id } = employee;

  const formatearFecha = (dateOfBirth) => { 
    const nuevaFecha = new Date(dateOfBirth);
    return new Intl.DateTimeFormat('es-ES', {dataStyle: 'long'}).format(nuevaFecha); 
}

  return (
    <div className="mx-5 my-5 bg-white shadow-md px-5 py-10 rounded-md">
      <p className="font-medium text-indigo-600">
        Nombre: {""}
        <span className="font-normal text-black">{name}</span>
      </p>
      <p className="font-medium text-indigo-600">
        Email: {""}
        <span className="font-normal text-black">{email}</span>
      </p>
      <p className="font-medium text-indigo-600">
        Contraseña: {""}
        <span className="font-normal text-black">{password}</span>
      </p>
      <p className="font-medium text-indigo-600">
      Fecha de Nacimiento: {""}
        <span className="font-normal text-black">{formatearFecha(dateOfBirth)}</span>
      </p>
      <p className="font-medium text-indigo-600">
        Número de Contacto: {""}
        <span className="font-normal text-black">{contactNumber}</span>
      </p>
      <p className="font-medium text-indigo-600">
        Departamento: {""}
        <span className="font-normal text-black">{department}</span>
      </p>

        <div className="flex justify-between my-5">
            <button
            type="button"
            className="py-2 px-10 bg-indigo-600 hover:bg-indigo-800 text-white rounded"
            onClick={() => setEdicion(employee)}
            >Editar</button>

            <button
            type="button"
            className="py-2 px-10 bg-red-600 hover:bg-red-800 text-white rounded"
            onClick={() => dropEmployee(_id)}
            >Eliminar</button>

        </div>

    </div>
  );
};

export default Empleado;
