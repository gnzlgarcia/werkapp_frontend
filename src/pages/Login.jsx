import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Alert from "../components/Alert";
import clienteAxios from "../config/axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({});

  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes("")) {
      setAlert({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    try {
      const { data } = await clienteAxios.post("/users/login", {
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      
      setAuth(data);
      navigate("/admin");
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
          Inicia Sesión y Administra tus{" "}
          <span className="text-black">Empleados</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alert alert={alert} />}

        <form onSubmit={handleSubmit}>
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
          <input
            className="bg-indigo-700 w-full py-3 px-9 mt-3 rounded-xl text-white uppercase font-bold hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
            type="submit"
            value="Iniciar Sesión"
          />
        </form>

        <nav className="mt-10 lg:flex lg:justify-between">
          <Link
            className="block text-center my-5 text-gray-500"
            to="/registrar"
          >
            ¿No tienes cuenta? Regístrate
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

export default Login;
