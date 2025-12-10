import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert 
} from 'react-native';
import COLORES from '../constantes/colores';
import { API_URL } from '../api/constantes';

const PantallaLogin = ({ irARegistro, irAHome, irARecuperar }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cargando, setCargando] = useState(false);

  // --- FUNCIÓN DE LOGIN REAL ---
  const iniciarSesion = async () => {
    // 1. Validaciones básicas
    if (email === '' || password === '') {
      Alert.alert("Error", "Por favor llena todos los campos.");
      return;
    }

    setCargando(true);

    try {
      // 2. PETICIÓN AL SERVIDOR (CAMBIA LA IP AQUÍ ABAJO) ↓↓↓
// El fetch quedará así automáticamente gracias a la variable:
// ESTO ESTÁ BIEN (Copia y pega)
        const response = await fetch(`${API_URL}/login.php`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      const datos = await response.json();

      // 3. RESPUESTA DEL SERVIDOR
      if (datos.exito === true) {
        // Login exitoso
        console.log("Usuario:", datos.usuario); 
        
        // AQUI ESTÁ EL CAMBIO: Pasamos los datos del usuario a la función irAHome
        irAHome(datos.usuario); 
      } else {
        // Error (Contraseña mal o usuario no existe)
        Alert.alert("Error de acceso", datos.mensaje);
      }

    } catch (error) {
      console.error(error);
      Alert.alert("Error de Conexión", "No se pudo conectar con el servidor");
    } finally {
      setCargando(false);
    }
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.profileIconContainer}>
        <Text style={styles.profileIconText}>j</Text>
      </View>
      
      <View style={styles.cajaVerde}>
        <TextInput 
          style={styles.input} 
          placeholder="Correo electrónico" 
          placeholderTextColor={COLORES.textoGris} 
          keyboardType="email-address"
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <TextInput 
          style={styles.input} 
          placeholder="Contraseña" 
          placeholderTextColor={COLORES.textoGris} 
          secureTextEntry={true}
          onChangeText={setPassword}
        />

        <TouchableOpacity 
          style={[styles.button, cargando && {opacity: 0.5}]} 
          onPress={iniciarSesion}
          disabled={cargando}
        >
          <Text style={styles.buttonText}>
            {cargando ? "Cargando..." : "Entrar"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.touchableLink} onPress={irARecuperar}>
          <Text style={styles.forgotPassText}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.touchableLink} onPress={irARegistro}>
          <Text style={styles.registerLink}>¿No tienes cuenta? Regístrate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORES.blanco,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    width: '100%',
  },
  profileIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORES.verde, 
    borderWidth: 1,
    borderColor: COLORES.gris,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  profileIconText: {
    fontSize: 30,
    color: '#333',
  },
  cajaVerde: {
    width: '90%',
    borderColor: COLORES.verde, 
    borderWidth: 2,
    padding: 20,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: COLORES.blanco,
    borderWidth: 1,
    borderColor: COLORES.gris,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    textAlign: 'center',
    color: COLORES.textoPrincipal,
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: COLORES.blanco,
    borderWidth: 1,
    borderColor: COLORES.gris,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORES.textoPrincipal,
  },
  forgotPassText: {
    fontSize: 12,
    color: COLORES.textoPrincipal,
    marginBottom: 5,
    textDecorationLine: 'underline',
  },
  touchableLink: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  registerLink: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORES.azul,
  },
});

export default PantallaLogin;