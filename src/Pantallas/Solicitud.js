import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  Modal, 
  Alert,
  ActivityIndicator,
  LayoutAnimation,
  Platform,
  UIManager
} from 'react-native';
import COLORES from '../constantes/colores';
import { API_URL } from '../api/constantes';
import TarjetaSolicitud from '../componentes/TarjetaSolicitud';

// Configuración de animación para Android
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const PantallaSolicitar = ({
  irAHome, irASolicitar, irAPerfil,
  irATusSolicitudes, irATusAportaciones,
  usuario 
}) => {
  
  // --- ESTADO DEL MENÚ FLOTANTE ---
  const [listaVisible, setListaVisible] = useState(false);

  const toggleLista = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setListaVisible(!listaVisible);
  };

  const [modalCrearVisible, setModalCrearVisible] = useState(false);
  const [listaSolicitudes, setListaSolicitudes] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Estados Formulario
  const [tipoSeleccionado, setTipoSeleccionado] = useState('fisico');
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [monto, setMonto] = useState('');
  const [evidencia, setEvidencia] = useState('');

  // --- CARGAR DATOS ---
  const obtenerSolicitudes = async () => {
    try {
      const response = await fetch(`${API_URL}/obtener_solicitudes.php`);
      const data = await response.json();
      setListaSolicitudes(data);
      setCargando(false);
    } catch (error) {
      console.error(error);
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerSolicitudes();
  }, []);

  // --- CREAR SOLICITUD ---
  const crearSolicitud = async () => {
    if (!usuario) {
        Alert.alert("Atención", "Necesitas iniciar sesión para publicar.");
        return;
    }
    
    try {
      const respuesta = await fetch(`${API_URL}/crear_solicitud.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuario_id: usuario.usuario_id,
          titulo: titulo,
          descripcion: descripcion,
          monto: monto,
          tipo: tipoSeleccionado,
          evidencia: evidencia
        })
      });
      const resultado = await respuesta.json();

      if (resultado.exito) {
        Alert.alert("¡Éxito!", "Solicitud publicada.");
        setModalCrearVisible(false);
        obtenerSolicitudes(); 
        setTitulo(''); setDescripcion(''); setMonto('');
      } else {
        Alert.alert("Error", resultado.mensaje);
      }
    } catch (error) {
      Alert.alert("Error", "Fallo de conexión");
    }
  };

  const verMotivo = (textoMotivo) => {
    Alert.alert("Motivo de la petición", textoMotivo);
  };

  return (
    <View style={styles.container}>
      
      {/* --- MODAL DE CREACIÓN --- */}
      <Modal visible={modalCrearVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.plantillaContainer}>
            <Text style={styles.plantillaTitulo}>Nueva Solicitud</Text>
            
            <View style={styles.infoBanco}>
                <Text style={styles.infoBancoLabel}>Donativos a tu cuenta:</Text>
                <Text style={styles.infoBancoText}>
                    {usuario?.nombre_banco || "Banco"} - {usuario?.cuenta_bancaria || "---"}
                </Text>
            </View>

            <View style={styles.toggleContainer}>
                <TouchableOpacity style={[styles.toggleBtn, tipoSeleccionado === 'fisico' && styles.toggleActive]} onPress={() => setTipoSeleccionado('fisico')}>
                    <Text style={tipoSeleccionado === 'fisico' ? styles.textActive : styles.textInactive}>📦 Físico</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.toggleBtn, tipoSeleccionado === 'digital' && styles.toggleActive]} onPress={() => setTipoSeleccionado('digital')}>
                    <Text style={tipoSeleccionado === 'digital' ? styles.textActive : styles.textInactive}>🔗 Digital</Text>
                </TouchableOpacity>
            </View>

            <TextInput style={styles.input} placeholder="#Titulo breve" onChangeText={setTitulo} value={titulo}/>
            
            <View style={styles.evidenciaBox}>
                {tipoSeleccionado === 'fisico' ? (
                    <TouchableOpacity style={styles.btnAddImage}>
                        <Text style={styles.plusIconLarge}>+</Text>
                        <Text style={styles.addImageText}>Añadir imágenes</Text>
                    </TouchableOpacity>
                ) : (
                    <TextInput style={styles.inputUrl} placeholder="URL del producto..." multiline onChangeText={setEvidencia}/>
                )}
            </View>

            <TextInput style={styles.input} placeholder="#Motivo detallado" multiline numberOfLines={3} onChangeText={setDescripcion} value={descripcion}/>
            <TextInput style={styles.input} placeholder="#Monto ($)" keyboardType="numeric" onChangeText={setMonto} value={monto}/>

            <View style={styles.rowButtons}>
                <TouchableOpacity onPress={() => setModalCrearVisible(false)} style={[styles.btnAction, styles.btnCancel]}>
                    <Text>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={crearSolicitud} style={[styles.btnAction, styles.btnPublish]}>
                    <Text style={styles.btnPublishText}>PUBLICAR</Text>
                </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* --- HEADER --- */}
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerIconCircle} onPress={irAPerfil}>
            <Text style={styles.headerIconText}>👤</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Aliados del Mundo</Text>
        </View>
      </View>

      {/* --- SECCIÓN BUSCADOR Y MENÚ FLOTANTE --- */}
      <View style={styles.searchSection}>
        <View style={styles.searchRow}>
          
          {/* MENU WRAPPER */}
          <View style={styles.menuWrapper}>
            <TouchableOpacity onPress={toggleLista} style={styles.botonMenuAccion}>
              <Text style={styles.menuIcon}>{listaVisible ? '✕' : '≡'}</Text>
            </TouchableOpacity>

            {/* LISTA FLOTANTE */}
            {listaVisible && (
              <View style={styles.listaFlotante}>
                <TouchableOpacity style={styles.botonLista} onPress={irATusSolicitudes}>
                  <Text style={styles.textoLista}> Tus Peticiones</Text>
                </TouchableOpacity>
                
                <View style={styles.separador} />

                <TouchableOpacity style={styles.botonLista} onPress={irATusAportaciones}>
                  <Text style={styles.textoLista}> Tus Aportaciones</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* BARRA DE BÚSQUEDA */}
          <View style={styles.searchBar}>
            <TextInput style={styles.searchInput} placeholder="Buscar" placeholderTextColor="#555"/>
            <Text style={styles.searchIcon}>🔍</Text>
          </View>

        </View>
      </View>

      {/* --- TABS --- */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity style={styles.tab} onPress={irAHome}>
            <Text style={styles.tabText}>Peticiones ▶</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={irASolicitar}>
            <Text style={styles.tabText}>Solicitar ▶</Text>
        </TouchableOpacity>
      </View>

      {/* --- SUBHEADER (SOLO TEXTO AHORA) --- */}
      <View style={styles.subHeader}>
        <Text style={styles.subHeaderText}>Crea una solicitud a la comunidad</Text>
      </View>

      {/* --- BOTÓN DE AGREGAR (NUEVO LUGAR) --- */}
      <View style={styles.contenedorBotonAgregar}>
         <TouchableOpacity style={styles.botonAgregar} onPress={() => setModalCrearVisible(true)}>
            <Text style={styles.textoBotonAgregar}>+ Nueva Solicitud</Text>
         </TouchableOpacity>
      </View>

      {/* --- LISTA DE SOLICITUDES --- */}
      {cargando ? (
        <ActivityIndicator size="large" color={COLORES.verde} style={styles.loader}/>
      ) : (
        <ScrollView style={styles.scrollContainer}>
            {listaSolicitudes.map((item) => (
                <TarjetaSolicitud key={item.solicitud_id} item={item} verMotivo={verMotivo} />
            ))}
        </ScrollView>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORES.blanco,
  },
  
  // HEADER
  headerContainer: {
    marginHorizontal: 1,
    marginTop: 33,
    marginBottom: 15,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: COLORES.gris,
    overflow: 'hidden',
    backgroundColor: COLORES.verde,
    justifyContent: 'center',
  },
  header: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  headerIconCircle: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: COLORES.blanco,
    borderWidth: 2,
    borderColor: COLORES.gris,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIconText: {
    fontSize: 24,
    color: 'black',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    flex: 1,
    textAlign: 'center',
    marginRight: 60,
    marginLeft: 10,
  },

  // BUSCADOR Y MENÚ
  searchSection: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    zIndex: 100, 
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    zIndex: 100, 
  },
  
  menuWrapper: {
    zIndex: 200, 
    position: 'relative',
  },
  botonMenuAccion: {
    padding: 5,
    marginRight: 10,
  },
  menuIcon: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    width: 30, 
    textAlign: 'center',
  },

  listaFlotante: {
    position: 'absolute',
    top: 45,
    left: 0,
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    paddingVertical: 5,
  },
  botonLista: {
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  textoLista: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  separador: {
    height: 1,
    backgroundColor: '#eee',
    marginHorizontal: 10,
  },

  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORES.gris,
    borderRadius: 20,
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: COLORES.blanco,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    paddingVertical: 0,
  },
  searchIcon: {
    fontSize: 18,
  },

  // TABS
  tabsContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORES.gris,
    backgroundColor: COLORES.blanco,
    marginTop: 5,
  },
  tab: {
     flex: 1,
     paddingVertical: 10,
     alignItems: 'center',
     borderRightWidth: 1,
     borderRightColor: COLORES.gris,
  },
   tabText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },

  // SUBHEADER (Solo texto ahora)
  subHeader: {
    backgroundColor: COLORES.verde,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 5,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: COLORES.gris,
    justifyContent: 'center',
  },
  subHeaderText: {
    fontSize: 13,
    color: '#333',
    fontWeight: '500',
  },

  // NUEVO BOTÓN DE AGREGAR
  contenedorBotonAgregar: {
      paddingHorizontal: 10,
      marginTop: 10, // Separación del subtítulo
      marginBottom: 5,
      alignItems: 'flex-start', // Alineado a la izquierda
  },
  botonAgregar: {
      backgroundColor: '#70F164', 
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 25,
      elevation: 5,
      flexDirection: 'row',
      alignItems: 'center',
  },
  textoBotonAgregar: {
      color: '#000000ff',
      fontWeight: 'bold',
      fontSize: 14,
  },
  
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  loader: {
    marginTop: 20,
  },
  
  // MODAL STYLES
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plantillaContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#000',
    padding: 20,
  },
  plantillaTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  infoBanco: {
    backgroundColor: '#E8F5E9',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  infoBancoLabel: {
    fontSize: 12,
    color: '#555',
  },
  infoBancoText: {
    fontWeight: 'bold',
    color: '#2E7D32',
    fontSize: 14,
  },
  toggleContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    overflow: 'hidden',
  },
  toggleBtn: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  toggleActive: {
    backgroundColor: COLORES.verde,
  },
  textActive: {
    fontWeight: 'bold',
    color: '#000',
  },
  textInactive: {
    color: '#666',
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
    fontSize: 14,
  },
  evidenciaBox: {
    height: 110,
    borderWidth: 1.5,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    backgroundColor: '#f9f9f9',
  },
  btnAddImage: {
    alignItems: 'center',
  },
  plusIconLarge: {
    fontSize: 35,
    color: '#ccc',
  },
  addImageText: {
    color: '#999',
    fontWeight: '600',
  },
  inputUrl: {
    borderWidth: 0,
    height: '100%',
    width: '100%',
    padding: 10,
    textAlignVertical: 'top',
  },
  rowButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  btnAction: {
    width: '48%',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  btnCancel: {
    backgroundColor: '#ddd',
  },
  btnPublish: {
    backgroundColor: COLORES.verde,
  },
  btnPublishText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default PantallaSolicitar;