import React, { useState } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

// --- IMPORTACIONES LIMPIAS (Solo lo necesario) ---
import PantallaLogin from './src/Pantallas/Login';
import PantallaRegistro from './src/Pantallas/Registro';
import PantallaHome from './src/Pantallas/Home'; // Ahora funcionará como "Inicio/Explorar"
import PantallaSolicitar from './src/Pantallas/Solicitud';
import PantallaPerfil from './src/Pantallas/Perfil';
import PantallaTusSolicitudes from './src/Pantallas/TusSolicitudes'; 
import PantallaRecuperarPassword from './src/Pantallas/RecuperarPassword';
import PantallaTusAportaciones from './src/Pantallas/TusAportaciones';

export default function App() {
  const [pantallaActual, setPantallaActual] = useState('registro'); 
  const [pantallaAnterior, setPantallaAnterior] = useState('home'); 
  const [usuarioDatos, setUsuarioDatos] = useState(null);

  // --- NAVEGACIÓN BÁSICA ---
  const irARegistro = () => setPantallaActual('registro');
  const irALogin = () => setPantallaActual('login');
  const irARecuperar = () => setPantallaActual('recuperar');
  
  const irAHome = (datosDelUsuario) => {
    if (datosDelUsuario) {
      setUsuarioDatos(datosDelUsuario); 
    }
    setPantallaActual('home');
  };
  
  const irASolicitar = () => setPantallaActual('solicitar'); 
  
  // (Nota: Quitamos irADonar e irAApoyar porque esas pantallas ya no existen)

  // --- NAVEGACIÓN PERFIL Y MENÚ ---
  const irAPerfil = () => {
    setPantallaAnterior(pantallaActual);
    setPantallaActual('perfil');
  };
  
  const irATusSolicitudes = () => { setPantallaAnterior(pantallaActual); setPantallaActual('tusSolicitudes'); };
  const irATusAportaciones = () => { setPantallaAnterior(pantallaActual); setPantallaActual('tusAportaciones'); };
  
  const irAtras = () => {
    setPantallaActual(pantallaAnterior);
  };
  
  const cerrarSesion = () => {
    setUsuarioDatos(null);
    setPantallaActual('login');
  };

  // Menú simplificado (Solo lo esencial)
  const propsMenu = {
    irATusSolicitudes,
    irATusAportaciones
  };

  const renderizarPantalla = () => {
    switch (pantallaActual) {
      case 'login':
        return (
          <PantallaLogin 
            irARegistro={irARegistro} 
            irAHome={irAHome} 
            irARecuperar={irARecuperar}
          />
        );
      case 'registro':
        return <PantallaRegistro irALogin={irALogin} />;
      
      case 'recuperar':
        return <PantallaRecuperarPassword irALogin={irALogin} />;
      
      case 'perfil':
        return (
            <PantallaPerfil 
                irAtras={irAtras} 
                usuario={usuarioDatos} 
                cerrarSesion={cerrarSesion}
            />
        );

      // --- HISTORIALES ---
      case 'tusSolicitudes': return <PantallaTusSolicitudes irAtras={irAtras} />;
      case 'tusAportaciones': return <PantallaTusAportaciones irAtras={irAtras} />;

      // --- PANTALLAS PRINCIPALES ---
      case 'solicitar':
        return <PantallaSolicitar 
            irAHome={() => setPantallaActual('home')} 
            irASolicitar={irASolicitar} 
            irAPerfil={irAPerfil} 
            {...propsMenu} 
            usuario={usuarioDatos} 
        />;
      
      case 'home':
      default:
        // El Home ahora recibirá menos props porque quitamos los botones viejos
        return <PantallaHome 
            irAHome={() => setPantallaActual('home')} 
            irASolicitar={irASolicitar} 
            irAPerfil={irAPerfil} 
            {...propsMenu} 
        />;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <StatusBar barStyle="dark-content" />
      {renderizarPantalla()}
    </SafeAreaView>
  );
}