import { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import useAuth from "../hooks/useAuth";
import Alert from "../components/Alert";

const EditarPerfil = () => {
    const { auth, actualizarPerfil } = useAuth();
    const [perfil, setPerfil] = useState({});
    const [alert, setAlert] = useState({});

    useEffect(() => {
      setPerfil(auth);
    }, [auth])

    const handleSubmit = async e => {
        e.preventDefault();

        const {name, email} = perfil;
    
        if ([name, email].includes("")) {
          setAlert({
            msg: "Todos los campos son obligatorios",
            error: true,
          });
          return;
        }
        
        const resultado = await actualizarPerfil(perfil);
        setAlert(resultado);
        
      };
      
      const { msg } = alert;
    
  return (
    <>
        <AdminNav />
        <h2 className="font-medium text-lg text-center mt-10">Editar Perfil</h2>
        <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-md p-5">

        {msg && <Alert alert={alert} />}

            <form onSubmit={handleSubmit}>
                <div className="my-3">
                    <label className="font-medium text-gray-600" htmlFor="">Nombre</label>
                    <input 
                    type="text" 
                    className="border bg-gray-50 w-full p-2 mt-5 rounded"
                    name="name"
                    value={perfil.name || ''}
                    onChange={e => setPerfil({
                        ...perfil,
                        [e.target.name] : e.target.value
                    })}
                    />
                </div>

                <div className="my-3">
                    <label className="font-medium text-gray-600" htmlFor="">Email</label>
                    <input 
                    type="text" 
                    className="border bg-gray-50 w-full p-2 mt-5 rounded"
                    name="email"
                    value={perfil.email || ''}
                    onChange={e => setPerfil({
                        ...perfil,
                        [e.target.name] : e.target.value
                    })}
                    />
                </div>

                <input 
                type="submit"
                value="Guardar Cambios"
                className="bg-indigo-600 hover:bg-indigo-800 px-10 py-3 font-medium text-white rounded w-full mt-5" />
            </form>
        </div>
      </div>
    </>
  )
}

export default EditarPerfil