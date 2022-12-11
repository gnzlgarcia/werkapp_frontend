import { useState } from "react";
import AdminNav from "../components/AdminNav";
import Alert from "../components/Alert";
import useAuth from "../hooks/useAuth";

const CambiarPassword = () => {

    const {guardarPassword} = useAuth()
    const [alert, setAlert] = useState({});
    const [password, setPassword] = useState({
        pwd_actual: '',
        pwd_nuevo: ''
    });

    const handleSubmit = async e => {
        e.preventDefault();

        if (Object.values(password).some(campo => campo === '')) {
            setAlert({
                msg: "Todos los campos son obligatorios",
                error: true,
              });
              return
        }

        if (password.pwd_nuevo.length < 8) {
            setAlert({
                msg: "La contraseña debe tener al menos 8 caracteres",
                error: true,
              });
              return
        }

       const respuesta = await guardarPassword(password);
       setAlert(respuesta);

      };

      const { msg } = alert;

  return (
    <>
      <AdminNav />
      <h2 className="font-medium text-lg text-center mt-10">Cambiar Contraseña</h2>

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-md p-5">

        {msg && <Alert alert={alert} />}

            <form onSubmit={handleSubmit}>
                <div className="my-3">
                    <label className="font-medium text-gray-600" htmlFor="">Contraseña Actual</label>
                    <input 
                    type="password" 
                    className="border bg-gray-50 w-full p-2 mt-5 rounded"
                    name="pwd_actual"
                    placeholder="Escribe tu contraseña actual"
                    onChange={e => setPassword({
                        ...password,
                        [e.target.name] : e.target.value
                    })}
                    
                    />
                </div>

                <div className="my-3">
                    <label className="font-medium text-gray-600" htmlFor="">Nueva Contraseña</label>
                    <input 
                    type="password" 
                    className="border bg-gray-50 w-full p-2 mt-5 rounded"
                    name="pwd_nuevo"
                    placeholder="Escribe tu nueva contraseña"
                    onChange={e => setPassword({
                        ...password,
                        [e.target.name] : e.target.value
                    })}
                    
                    />
                </div>

                <input 
                type="submit"
                value="Actualizar"
                className="bg-indigo-600 hover:bg-indigo-800 px-10 py-3 font-medium text-white rounded w-full mt-5" />

            </form>
        </div>
      </div>
      
    </>
  );
};

export default CambiarPassword;
