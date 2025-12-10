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

const PantallaRecuperarPassword = ({ irALogin }) => {
  const [correo, setCorreo] = useState('');

  const manejarEnvio = () => {
    if (correo.length === 0) {
      Alert.alert("Error", "Por favor escribe tu correo electrónico.");
    } else {
      // SIMULACIÓN: Para la tarea, basta con mostrar que "se envió".
      // Configurar el envío real de correos toma mucho tiempo.
      Alert.alert(
        "Correo Enviado", 
        `Se han enviado las instrucciones de recuperación a ${correo}.`,
        [
            { text: "OK", onPress: irALogin } // Al dar OK, nos regresa al Login
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.cajaVerde}>
        <Text style={styles.titulo}>Recuperar Contraseña</Text>
        
        <Text style={styles.descripcion}>
          Ingresa el correo electrónico asociado a tu cuenta para restablecer tu contraseña.
        </Text>

        <TextInput 
          style={styles.input} 
          placeholder="Correo electrónico" 
          placeholderTextColor={COLORES.textoGris} 
          keyboardType="email-address"
          autoCapitalize="none"
          value={correo}
          onChangeText={setCorreo}
        />

        <TouchableOpacity style={styles.button} onPress={manejarEnvio}>
          <Text style={styles.buttonText}>Enviar Instrucciones</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.touchableLink} onPress={irALogin}>
          <Text style={styles.link}>Cancelar y volver</Text>
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
  cajaVerde: {
    width: '90%',
    borderColor: COLORES.verde,
    borderWidth: 2,
    padding: 20,
    alignItems: 'center',
    borderRadius: 10, // Le da un toque más suave
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  descripcion: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#555',
    fontSize: 14,
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
  touchableLink: {
    paddingVertical: 10,
  },
  link: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORES.azul,
    textDecorationLine: 'underline',
  },
});

export default PantallaRecuperarPassword;