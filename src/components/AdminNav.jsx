import { Link } from "react-router-dom"

const AdminNav = () => {
  return (
    <nav className="flex gap-4">
        <Link to="/admin/perfil" className="font-medium text-indigo-500">Perfil</Link>
        <Link to="/admin/cambiar-password" className="font-medium text-indigo-500">Cambiar Contraseña</Link>
    </nav>
  )
}

export default AdminNav