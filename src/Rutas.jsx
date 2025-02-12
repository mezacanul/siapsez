import { useAuthContext } from "@asgardeo/auth-react"; //Hook de autenticacion con el WSO2
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from "react-router-dom";
import Inicio from "./components/Inicio";
import Layout from "./components/Layout";
import Login from "./components/Modules/Login/Login";
import PlazasCatalogos from "./components/Modules/administracion-plazas/PlazasCatalogos";
import PlazasDashboard from "./components/Modules/administracion-plazas/PlazasDashboard";
import CentrosDeTrabajo from "./components/Modules/administracion-plazas/centros-de-trabajo/CentrosDeTrabajo";
import TiposCentrosDeTrabajo from "./components/Modules/administracion-plazas/centros-de-trabajo/TiposCentrosDeTrabajo";
import ControlDePlazasPresupuestales from "./components/Modules/administracion-plazas/control-de-plazas-presupuestales/ControlDePlazasPresupuestales";
import { Filiacion } from "./components/Modules/administracion-plazas/filiacion/Filiacion";
import Dashboard from "./components/Modules/administracion-sistema/Dashboard";
// import GestionDeUsuarios from "./components/Modules/administracion-sistema/gestionDeUsuarios/gestionDeUsuarios";
import Organigrama from "./components/Modules/administracion-sistema/organigrama/Organigrama";
import NotFound from "./components/NotFound";
import Loader from "./components/utilities/Loader/Loader";
import useAuth from "./hooks/useAuth"; //Hook de autenticacion para datos de usuario con api
import ProyeccionDeEscenariosDeNomina from "./components/Modules/administracion-plazas/proyeccion-de-escenarios-de-nomina/ProyeccionDeEscenariosDeNomina";
import FormatoUnicoDePersonalEstatal from "./components/Modules/administracion-plazas/formato-unico-de-personal-estatal/FormatoUnicoDePersonalEstatal";
import ReporteDeInventarioDePlazas from "./components/Modules/administracion-plazas/reporte-de-inventario-de-plazas/ReporteDeInventarioDePlazas";
import Perfil from "./components/Modules/Perfil/index";
import AdministracionDePersonal from "./components/Modules/Administracion/Personal";
import TramiteAlta from "./components/Modules/Administracion/Personal/Movimientos/TramiteAlta"
import Movimientos from "./components/Modules/Administracion/Personal/Movimientos";
import Nomina from "./components/Modules/Administracion/Nomina";

import TiposPercepcion from "./components/Modules/administracion-nomina/tipos-percepcion/TiposPercepcion";
import TiposDeduccion from "./components/Modules/administracion-nomina/tipos-deduccion/TiposDeduccion";
import ClaveInternaPercepcion from "./components/Modules/administracion-nomina/clave-interna-percepcion/ClaveInternaPercepcion";
import ClaveInternaDeduccion from "./components/Modules/administracion-nomina/clave-interna-deduccion/ClaveInternaDeduccion";
import ConceptoPercepciones from "./components/Modules/administracion-nomina/concepto-percepcion/ConceptoPercepcion";
import ConceptoDeducciones from "./components/Modules/administracion-nomina/concepto-deduccion/ConceptoDeduccion";
import TiposNomina from "./components/Modules/administracion-nomina/tipos-nomina/TiposNomina";
import PortalEmpleado from "./components/Modules/PortalEmpleado";
import LicenciasPermisos from "./components/Modules/administracion-empleado/LicenciasPermisos";
import PortalControlAsistencia from "./components/Modules/ControlAsistencia";
import SincronizarMovimientos from "./components/Modules/ControlAsistencia/SincronizarMovimientos";
import LogsSincronizacion from "./components/Modules/ControlAsistencia/LogsSincronizacion";
import HistorialLaboral from "./components/Modules/PortalEmpleado/HistorialLaboral";


const Rutas = () => {
  const { state } = useAuthContext();

  const loading = useAuth(); // Obtiene el estado de carga

  // Ejecuta el hook para verificar el estado de autenticación y cargar datos del usuario
  useAuth();

  // Obtener la información del usuario desde Redux con memoización.
  const userInfo = useSelector((state) => state.user.info);

  // Memorizar roles para evitar nuevas referencias en cada render.
  const roles = useMemo(() => userInfo?.roles || [], [userInfo]);

  // Función para verificar si un usuario tiene un rol específico.
  const tieneRol = (rol) => roles.includes(rol);

  if (loading) {
    return (<Loader/>) // O puedes retornar un componente de carga
  }
  

  return (
    <Routes>

      {state.isAuthenticated ? (
        <>
          <Route path="/login/oauth2/code/wso2" element={<Navigate to="/" replace />} />
          <Route path="/" element={<Layout />} >
            <Route index element={<Inicio />} />
            <Route path="/perfil" element={<Perfil />} />
            
            <Route path="/administracion-de-personal" element={<AdministracionDePersonal />}/>
            <Route path="/administracion-de-personal/movimientos" element={<Movimientos/>}/>

            <Route path="/portal-empleado" element={<PortalEmpleado />}/>
            <Route path="/portal-empleado/licencias-permisos" element={<LicenciasPermisos />} />
            <Route path="/portal-empleado/historial-laboral" element={<HistorialLaboral />} />

            <Route path="/nomina" element={<Nomina />}/>
            <Route path="/nomina/tipos-de-nomina" element={<TiposNomina />} />
            <Route path="/nomina/tipos-de-percepcion" element={<TiposPercepcion />} />
            <Route path="/nomina/tipos-de-deduccion" element={<TiposDeduccion />} />
            <Route path="/nomina/clave-interna-percepcion" element={<ClaveInternaPercepcion />} />
            <Route path="/nomina/clave-interna-deduccion" element={<ClaveInternaDeduccion />} />
            <Route path="/nomina/concepto-percepciones" element={<ConceptoPercepciones />} />
            <Route path="/nomina/concepto-deducciones" element={<ConceptoDeducciones />} />

            {/* <Route path="/gestion-de-usuarios" element={<GestionDeUsuarios />} /> */}
            <Route path="/filiacion" element={<Filiacion />} />
            <Route path="/formato-unico-de-personal-estatal" element={<FormatoUnicoDePersonalEstatal />} />
            
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/organigrama" element={<Organigrama />} />
            <Route path="/plazas-estatales" element={<PlazasDashboard />} />
            <Route path="/centros-de-trabajo" element={<CentrosDeTrabajo />} />
            <Route path="/tipos-centros-de-trabajo" element={<TiposCentrosDeTrabajo />} />
            <Route path="/filiacion" element={<Filiacion />} />
            <Route path="/ControlDePlazasPresupuestales" element={<ReporteDeInventarioDePlazas />} />
            <Route path="/inventarioDePlazas" element={<ControlDePlazasPresupuestales />} />
            <Route path="/ProyeccionDeEscenariosDeNomina" element={<ProyeccionDeEscenariosDeNomina />} />
            <Route path="/portal-control-asistencias" element={<PortalControlAsistencia />}/>
            <Route path="/portal-control-asistencias/sincronizar" element={<SincronizarMovimientos />} />
            <Route path="/portal-control-asistencias/logs" element={<LogsSincronizacion />} />

            {tieneRol('admin') && (
              <>
                <Route path="/plazas-catalogos" element={<PlazasCatalogos />} />
              </>
            )}
            
          </Route>
        </>
      ) : (
        <>
          <Route index path="/" element={<Login />} />
        </>
      )}
      {/* DEV: Add new layout for 404 Page  */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Rutas;