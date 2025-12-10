import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  Modal, 
  TextInput, 
  Alert 
} from 'react-native';
import COLORES from '../constantes/colores';
import { API_URL } from '../api/constantes';

const InfoFila = ({ icono, texto, subtexto, onEdit }) => (
  <View style={styles.infoRow}>
    <View style={styles.iconContainer}>
      <Text style={styles.iconText}>{icono}</Text>
    </View>
    <View style={styles.infoTextContainer}>
      <Text style={styles.infoText}>{texto}</Text>
      {subtexto && <Text style={styles.infoSubText}>{subtexto}</Text>}
    </View>
    {onEdit && (
      <TouchableOpacity onPress={onEdit} style={styles.editButton}>
        <Text style={styles.editIcon}>✏️</Text>
      </TouchableOpacity>
    )}
  </View>
);

const PantallaPerfil = ({ irAtras, usuario, cerrarSesion }) => {
  const [datos, setDatos] = useState(usuario || {
    usuario_id: 0,
    alias: 'Invitado',
    nombre: 'Usuario',
    apellido: '',
    email: 'correo@ejemplo.com',
    direccion: 'Sin dirección',
    cuenta_bancaria: '',
    nombre_banco: '',
    telefono: 'Sin teléfono',
    contador_ayudas: 0
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [nuevaCuenta, setNuevaCuenta] = useState(datos.cuenta_bancaria || '');
  const [nuevoBanco, setNuevoBanco] = useState(datos.nombre_banco || '');

  // Contador visual formateado a 6 dígitos
  const numeroAyudas = (datos.contador_ayudas || 0).toString().padStart(6, '0');
  const digitos = numeroAyudas.split(''); 

  const guardarCuentaBancaria = async () => {
    try {
      const respuesta = await fetch(`${API_URL}/editar_perfil.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          usuario_id: datos.usuario_id,
          cuenta_bancaria: nuevaCuenta,
          nombre_banco: nuevoBanco
        })
      });
      const resultado = await respuesta.json();

      if (resultado.exito) {
        setDatos({ 
            ...datos, 
            cuenta_bancaria: nuevaCuenta, 
            nombre_banco: nuevoBanco 
        });
        setModalVisible(false);
        Alert.alert("¡Éxito!", "Datos bancarios guardados.");
      } else {
        Alert.alert("Error", resultado.mensaje);
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo conectar con el servidor.");
    }
  };

  return (
    <View style={styles.container}>
      
      {/* --- MODAL --- */}
      <Modal 
        transparent={true} 
        visible={modalVisible} 
        animationType="slide"
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Datos Bancarios</Text>
            
            <Text style={styles.labelInput}>Banco (Ej. BBVA)</Text>
            <TextInput
              style={styles.inputModal}
              onChangeText={setNuevoBanco}
              value={nuevoBanco}
              placeholder="Nombre del Banco"
            />

            <Text style={styles.labelInput}>Número de Tarjeta / CLABE</Text>
            <TextInput
              style={styles.inputModal}
              onChangeText={setNuevaCuenta}
              value={nuevaCuenta}
              placeholder="0000 0000 0000 0000"
              keyboardType="numeric"
            />

            <View style={styles.modalButtonsRow}>
              <TouchableOpacity 
                onPress={() => setModalVisible(false)} 
                style={[styles.buttonModal, styles.buttonClose]}
              >
                <Text style={styles.textStyle}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={guardarCuentaBancaria} 
                style={[styles.buttonModal, styles.buttonSave]}
              >
                <Text style={styles.textStyle}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* --- HEADER --- */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={irAtras}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Perfil</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* --- FOTO Y NOMBRE --- */}
        <View style={styles.profileSection}>
          <View style={styles.avatarRow}>
            <TouchableOpacity style={styles.changePhotoButton}>
              <Text style={styles.changePhotoText}>Cambiar Foto</Text>
            </TouchableOpacity>
            <View style={styles.avatarContainer}>
               <Text style={styles.avatarEmoji}>🧕</Text>
            </View>
          </View>
          <View style={styles.usernameBox}>
            <Text style={styles.usernameText}>
                {datos.alias || "Usuario"}
            </Text>
          </View>
        </View>

        {/* --- INFORMACIÓN --- */}
        <View style={styles.infoSection}>
          <InfoFila 
            icono="💵" 
            texto="Cuenta Bancaria" 
            subtexto={
                (datos.nombre_banco ? datos.nombre_banco + " - " : "") + 
                (datos.cuenta_bancaria || "No registrada")
            } 
            onEdit={() => setModalVisible(true)}
          />

          <InfoFila 
            icono="👤" 
            texto={datos.nombre + " " + datos.apellido} 
            subtexto={datos.email}
          />
          
          <TouchableOpacity style={styles.infoRow} onPress={cerrarSesion}>
            <View style={styles.iconContainer}>
              <Text style={styles.iconText}>🚪</Text>
            </View>
            <Text style={[styles.infoText, styles.textRed]}>
                Cerrar sesión
            </Text>
          </TouchableOpacity>
        </View>

        {/* --- CONTADOR --- */}
        <View style={styles.counterSection}>
          <Text style={styles.counterTitle}>Personas ayudadas</Text>
          <View style={styles.counterGrid}>
            {digitos.map((digito, index) => (
              <View key={index} style={styles.counterBox}>
                <Text style={styles.counterNumber}>{digito}</Text>
              </View>
            ))}
          </View>
        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORES.blanco,
    paddingTop: 40,
  },
  scrollContent: {
    paddingBottom: 20,
    alignItems: 'center',
    flexGrow: 1,
  },
  
  // --- HEADER ---
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
    width: '100%',
  },
  backButton: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    backgroundColor: COLORES.blanco,
  },
  backButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerTitleContainer: {
    flex: 1,
    backgroundColor: COLORES.verde,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 10,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },

  // --- SECCIÓN PERFIL ---
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
    width: '100%',
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    width: '100%',
  },
  changePhotoButton: {
    position: 'absolute',
    left: 20,
    borderWidth: 1,
    borderColor: '#000',
    paddingHorizontal: 5,
    paddingVertical: 2,
    backgroundColor: COLORES.blanco,
  },
  changePhotoText: {
    fontSize: 12,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E0E0E0',
    borderWidth: 3,
    borderColor: COLORES.verde,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarEmoji: {
    fontSize: 40,
  },
  usernameBox: {
    borderWidth: 1,
    borderColor: '#CCC',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
  },
  usernameText: {
    fontSize: 16,
    color: '#555',
  },

  // --- INFO FILAS ---
  infoSection: {
    width: '100%',
    paddingHorizontal: 30,
    marginBottom: 30,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    width: 40,
    alignItems: 'center',
    marginRight: 15,
  },
  iconText: {
    fontSize: 24,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
  },
  infoSubText: {
    fontSize: 12,
    color: '#555',
    fontWeight: 'bold',
  },
  editButton: {
    padding: 5,
  },
  editIcon: {
    fontSize: 18,
  },
  textRed: {
    color: 'red',
  },

  // --- CONTADOR ---
  counterSection: {
    width: '90%',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 'auto', // <--- CLAVE 2: Esto lo manda al fondo
    marginBottom: 30,  // Margen inferior para que no pegue con el borde
  },
  counterTitle: {
    fontSize: 14,
    marginBottom: 10,
    color: '#333',
  },
  counterGrid: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#000',
  },
  counterBox: {
    width: 40,
    height: 40,
    backgroundColor: COLORES.verde,
    borderRightWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  // --- MODAL ---
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '85%',
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: 'bold',
  },
  labelInput: {
    alignSelf: 'flex-start',
    marginLeft: 5,
    marginBottom: 5,
    fontSize: 12,
    color: '#333',
    fontWeight: 'bold',
  },
  inputModal: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  modalButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonModal: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: '45%',
    alignItems: 'center',
  },
  buttonClose: {
    backgroundColor: "#FF6347",
  },
  buttonSave: {
    backgroundColor: COLORES.verde,
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default PantallaPerfil;