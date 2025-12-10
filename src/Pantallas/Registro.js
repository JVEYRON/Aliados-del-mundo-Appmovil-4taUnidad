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

const PantallaRegistro = ({ irALogin }) => {
  // 1. ESTADOS PARA GUARDAR LOS DATOS DEL FORMULARIO
  const [alias, setAlias] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [cargando, setCargando] = useState(false);

  // 2. FUNCIÓN PARA REGISTRARSE
  const registrarUsuario = async () => {
    // Validaciones
    if (alias === '' || nombre === '' || email === '' || password === '') {
      Alert.alert("Campos vacíos", "Por favor llena todos los datos.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }

    setCargando(true);

    try {
      // 3. PETICIÓN AL PHP (¡CAMBIA LA IP AQUÍ!)
      
 

      // El fetch quedará así automáticamente gracias a la variable:
      // ESTO ESTÁ BIEN (Copia y pega)
        const response = await fetch(`${API_URL}/registro.php`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          alias: alias,
          nombre: nombre,
          apellido: apellido,
          email: email,
          password: password
        })
      });

      const datos = await response.json();

      if (datos.exito === true) {
        Alert.alert("¡Éxito!", "Usuario creado correctamente.", [
          { text: "Ir al Login", onPress: irALogin }
        ]);
      } else {
        Alert.alert("Error", datos.mensaje);
      }

    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo conectar con el servidor.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileIconContainer}>
        <Text style={styles.profileIconText}>J</Text>
      </View>
      
      <View style={styles.cajaVerde}>
        <TextInput 
          style={styles.input} 
          placeholder="Alias" 
          placeholderTextColor={COLORES.textoGris}
          onChangeText={setAlias}
        />
        <TextInput 
          style={styles.input} 
          placeholder="Nombre" 
          placeholderTextColor={COLORES.textoGris}
          onChangeText={setNombre}
        />
        <TextInput 
          style={styles.input} 
          placeholder="Apellido" 
          placeholderTextColor={COLORES.textoGris}
          onChangeText={setApellido}
        />
        <TextInput 
          style={styles.input} 
          placeholder="Correo electrónico" 
          placeholderTextColor={COLORES.textoGris} 
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={setEmail}
        />
        <TextInput 
          style={styles.input} 
          placeholder="Contraseña" 
          placeholderTextColor={COLORES.textoGris} 
          secureTextEntry={true}
          onChangeText={setPassword}
        />
        <TextInput 
          style={styles.input} 
          placeholder="Confirmar Contraseña" 
          placeholderTextColor={COLORES.textoGris} 
          secureTextEntry={true}
          onChangeText={setConfirmPassword}
        />
        
        <TouchableOpacity 
          style={[styles.button, cargando && {opacity: 0.5}]} 
          onPress={registrarUsuario}
          disabled={cargando}
        >
          <Text style={styles.buttonText}>
            {cargando ? "Registrando..." : "Entrar"}
          </Text>
        </TouchableOpacity>

        <Text style={styles.termsText}>Términos y condiciones</Text>

        <TouchableOpacity style={styles.touchableLink} onPress={irALogin}>
          <Text style={styles.loginLink}>Iniciar sesión</Text>
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
    fontWeight: 'normal',
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
    fontSize: 14,
    marginBottom: 10,
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
    marginTop: 20,
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORES.textoPrincipal,
  },
  termsText: {
    fontSize: 12,
    color: COLORES.textoPrincipal,
    marginBottom: 5,
  },
  touchableLink: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  loginLink: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORES.azul,
  },
});

export default PantallaRegistro;