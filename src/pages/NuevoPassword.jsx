import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import clienteAxios from "../config/axios";
import Alert from "../components/Alert";

const NuevoPassword = () => {
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({});

  const [tokenValido, setTokenValido] = useState("");
  const [passwordModificado, setPasswordModificado] = useState("");

  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/users/olvide-password/${token}`);
        setAlert({
          msg: "Crea tu Nueva Contraseña",
        });

        setTokenValido(true);
      } catch (error) {
        setAlert({
          msg: "Hubo un error con el enlace",
          error: true,
        });
      }
    };
    comprobarToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      setAlert({
        msg: "El password debe tener un mínimo de 8 caracteres",
        error: true,
      });
      return;
    }

    //
    try {
      const url = `/users/olvide-password/${token}`;
      const { data } = await clienteAxios.post(url, { password });

      setAlert({
        msg: data.msg,
      });

      setPasswordModificado(true);
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alert;

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Reestablece tu contraseña y no pierdas Acceso a tus{" "}
          <span className="text-black">Empleados</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alert alert={alert} />}
        {tokenValido && (
          <>
            <form onSubmit={handleSubmit}>
              <div>
                <label className="uppercase text-gray-600 block text-xl font-bold">
                  Nueva Contraseña
                </label>
                <input
                  className="border w-full p-3 mt-3 mb-3 bg-gray-50 rounded-xl"
                  type="password"
                  placeholder="Tu Nueva Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <input
                className="bg-indigo-700 w-full py-3 px-9 mt-3 rounded-xl
            text-white uppercase font-bold hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
                type="submit"
                value="Reestablecer Contraseña"
              />
            </form>

            {passwordModificado && (
              <Link className="block text-center my-5 text-gray-500" to="/">
                Iniciar Sesión
              </Link>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default NuevoPassword;
