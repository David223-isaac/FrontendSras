import React from 'react';
import { HashRouter, Routes, Route} from "react-router-dom";
import RegistrarAjustador from './Pages/Ajuster/RegistrarAjustador'
import RegistroSiniestroForm from './Pages/Ajuster/RegistrarSiniestro';
import ListarAjustadores from './Pages/Administrator/VerAjustadores';
import ActualizarImagen from './Pages/Ajuster/ActualizarImagen';
import Login from './Pages/Login';
import PrincipalAdmin from './Pages/Administrator/PrincipalAdmin';
import Home from './Pages/Home';
import TiposDeSiniestro from './Pages/Ajuster/TiposDeSiniestros';
import PrincipalAjustador from './Pages/Ajuster/PrincipalAjustador';
import PrivateRoute from './Pages/Resources/PrivateRoute';
import AdministracionDeCuenta from './Pages/Ajuster/AdministracionDeCuenta';
import RegistrarPoliza from './Pages/Ajuster/RegistrarPoliza';

const Router = () => {
return(
    <HashRouter>
        <Routes>
            {/* Aqui van las rutas publicas */}
            <Route path="/" element={<Home/>}/> 
            <Route path="/Login" element= {<Login/>}/>
            <Route path="/RegistrarAjustador" element={<RegistrarAjustador/>}/>

            {/* Aqui van las rutas privadas */}
            {/*Rutas del ajustador */}
            <Route path="/PrincipalAjustador" element={<PrivateRoute element={PrincipalAjustador} />} />
            <Route path="/ActualizarImagen" element={<PrivateRoute element={ActualizarImagen} />} />
            <Route path="/AdministrarCuenta" element={<PrivateRoute element={AdministracionDeCuenta}/>}/>

            {/* empiezan rutas de registor de siniestros */}
            <Route path="/TiposDeSiniestro" element={<PrivateRoute element={TiposDeSiniestro}/>}/>
            <Route path="/RegistrarSiniestro" element={<PrivateRoute element={RegistroSiniestroForm} />} />
            <Route path="/RegistrarPoliza" element={<PrivateRoute element={RegistrarPoliza} />} />

           
            {/*Rutas del administrador*/}
            <Route path="/PrincipalAdmin" element={<PrivateRoute element={PrincipalAdmin} />} />
            <Route path="/VerAjustadores" element={<PrivateRoute element={ListarAjustadores} />} />
            <Route path="/ActualizarImagen" element={<ActualizarImagen/>}/>
        </Routes>
    </HashRouter>
);
};
export default Router;


