import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Header = () => {
    const {cerrarSesion} = useAuth();


  return (
    
        <header className="py-10 bg-indigo-600">
            <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
                <h1 className="font-medium text-indigo-200 text-2xl text-center">Gestión de {''}
                <span className="font-bold text-white">Empleados</span>
                </h1>
                <nav className="flex gap-4 flex-col items-center lg:flex-row mt-5 lg:mt-0">
                    <Link to="/admin" className="font-medium text-white text-xm">Empleados</Link>
                    <Link to="/admin/perfil" className="font-medium text-white text-xm">Perfil</Link>
                    <button type="button" className="font-medium text-white text-xm" onClick={cerrarSesion}>Cerrar Sesión</button>
                </nav>
            </div>
        </header>
    
  )
}

export default Header