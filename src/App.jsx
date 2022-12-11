import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import RutaProtegida from './layouts/RutaProtegida';
import Login from './pages/Login';
import Registrar from './pages/Registrar';
import OlvidePass from './pages/OlvidePass';
import ConfirmarCuenta from './pages/ConfirmarCuenta';
import NuevoPassword from './pages/NuevoPassword';
import AdministrarEmpleados from './pages/AdministrarEmpleados';
import { AuthProvider } from './context/AuthProvider';
import { EmployeesProvider } from './context/EmployeesProvider';
import EditarPerfil from './pages/EditarPerfil';
import CambiarPassword from './pages/CambiarPassword';

function App() {


  return (
    <BrowserRouter>
      <AuthProvider>
        <EmployeesProvider>
        <Routes>
          
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="registrar" element={<Registrar />}></Route>
            <Route path="olvide-pass" element={<OlvidePass />}></Route>
            <Route path="olvide-pass/:token" element={<NuevoPassword />}></Route>
            <Route path="confirmar/:token" element={<ConfirmarCuenta />}></Route>
          </Route>

          <Route path="/admin" element={<RutaProtegida />}>
            <Route index element={<AdministrarEmpleados />} />
            <Route path="perfil" element={<EditarPerfil />} />
            <Route path="cambiar-password" element={<CambiarPassword />} />
            
          </Route>

        </Routes>
        </EmployeesProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
