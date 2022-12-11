import { useState } from "react";
import { Link } from "react-router-dom";
import clienteAxios from "../config/axios";
import Alert from "../components/Alert";

const Registrar = () => {
  const [name, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");

  const [alert, setAlert] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([name, email, password, repetirPassword].includes("")) {
      setAlert({ msg: "Hay campos vacíos", error: true });
      return;
    }

    if (password !== repetirPassword) {
      setAlert({ msg: "Las contraseñas no coinciden", error: true });
      return;
    }

    if (password.length < 8) {
      setAlert({
        msg: "La contraseña debe tener un mínimo de 8 caracteres",
        error: true,
      });
      return;
    }

    setAlert({});

    //Crear el usuario en la API
    try {
      const respuesta = await clienteAxios.post("/users", {
        name,
        email,
        password,
      });
      console.log(respuesta);
      setAlert({
        msg: "Usuario creado correctamente, revisa tu email",
        error: false,
      });
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
          Crea tu Cuenta y Administra tus{" "}
          <span className="text-black">Empleados</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alert alert={alert} />}

        <form onSubmit={handleSubmit}>
          <div>
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Nombre
            </label>
            <input
              className="border w-full p-3 mt-3 mb-3 bg-gray-50 rounded-xl"
              type="text"
              placeholder="Tu Nombre"
              value={name}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div>
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Email
            </label>
            <input
              className="border w-full p-3 mt-3 mb-3 bg-gray-50 rounded-xl"
              type="email"
              placeholder="Tu Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Contraseña
            </label>
            <input
              className="border w-full p-3 mt-3 mb-3 bg-gray-50 rounded-xl"
              type="password"
              placeholder="Tu Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Repetir Contraseña
            </label>
            <input
              className="border w-full p-3 mt-3 mb-3 bg-gray-50 rounded-xl"
              type="password"
              placeholder="Repite tu Contraseña"
              value={repetirPassword}
              onChange={(e) => setRepetirPassword(e.target.value)}
            />
          </div>
          <input
            className="bg-indigo-700 w-full py-3 px-9 mt-3 rounded-xl
            text-white uppercase font-bold hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
            type="submit"
            value="Crear Cuenta"
          />
        </form>
        <nav className="mt-10 lg:flex lg:justify-between">
          <Link className="block text-center my-5 text-gray-500" to="/">
            ¿Ya tienes cuenta? Inicia Sesión
          </Link>
          <Link
            className="block text-center my-5 text-gray-500"
            to="/olvide-pass"
          >
            He olvidado mi contraseña
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Registrar;
