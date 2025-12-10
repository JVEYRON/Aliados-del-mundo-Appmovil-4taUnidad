import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  LayoutAnimation,
  Platform,
  UIManager,
  ActivityIndicator
} from 'react-native';

import COLORES from '../constantes/colores';
import { API_URL } from '../api/constantes'; 
import TarjetaSolicitud from '../componentes/TarjetaSolicitud'; 

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const PantallaHome = ({ 
  irAHome, 
  irASolicitar, 
  irAPerfil, 
  irATusSolicitudes, 
  irATusAportaciones 
}) => {
  
  // --- MENU FLOTANTE ---
  const [listaVisible, setListaVisible] = useState(false);
  const toggleLista = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setListaVisible(!listaVisible);
  };

  // --- DATOS Y FILTROS ---
  const [listaSolicitudes, setListaSolicitudes] = useState([]);
  const [listaFiltrada, setListaFiltrada] = useState([]); 
  const [cargando, setCargando] = useState(true);
  
  const [categoriaActiva, setCategoriaActiva] = useState('Todos');
  const [textoBusqueda, setTextoBusqueda] = useState('');

  // --- CATEGORÍAS (FORMALES, SIN EMOJIS) ---
  const categorias = [
      { id: 'Todos', texto: 'Todo' },
      { id: 'Ambiente', texto: 'Medio Ambiente' },
      { id: 'Salud', texto: 'Salud' },
      { id: 'Negocio', texto: 'Empresas' },
      { id: 'Educacion', texto: 'Educación' },
      { id: 'Comida', texto: 'Alimentos' },
      { id: 'Emergencia', texto: 'Urgencias' }
  ];

  // --- PALABRAS CLAVE (FILTRO INTELIGENTE) ---
  const palabrasClave = {
      'Ambiente': ['ambiente', 'arbol', 'reciclaje', 'planeta', 'basura', 'limpieza', 'ecologia', 'verde', 'plastico', 'agua'],
      'Salud': ['salud', 'medicina', 'hospital', 'enfermedad', 'cirugia', 'medicamento', 'pulmon', 'transplante', 'cancer', 'doctor'],
      'Negocio': ['negocio', 'empresa', 'emprendimiento', 'local', 'tienda', 'invertir', 'maquina', 'comercio'],
      'Educacion': ['escuela', 'libro', 'colegiatura', 'universidad', 'estudio', 'alumno', 'clases'],
      'Comida': ['comida', 'alimento', 'despensa', 'hambre', 'nutricion'],
      'Emergencia': ['urgente', 'choque', 'incendio', 'ayuda', 'desastre', 'accidente']
  };

  // --- CARGAR DATOS ---
  const obtenerSolicitudes = async () => {
    try {
      const response = await fetch(`${API_URL}/obtener_solicitudes.php`);
      const data = await response.json();
      setListaSolicitudes(data);
      setListaFiltrada(data); 
      setCargando(false);
    } catch (error) {
      console.error("Error al cargar home:", error);
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerSolicitudes();
  }, []);

  // --- FUNCIÓN DE FILTRADO ---
  const filtrarDatos = (categoria, texto) => {
      let datos = listaSolicitudes;

      if (categoria !== 'Todos') {
          const keywords = palabrasClave[categoria] || [];
          datos = datos.filter(item => {
              const contenido = `${item.titulo} ${item.descripcion} ${item.tipo || ''}`.toLowerCase();
              return keywords.some(palabra => contenido.includes(palabra));
          });
      }

      if (texto.length > 0) {
          datos = datos.filter(item => {
              const contenido = `${item.titulo} ${item.descripcion}`.toLowerCase();
              return contenido.includes(texto.toLowerCase());
          });
      }

      setListaFiltrada(datos);
  };

  const alPresionarCategoria = (catId) => {
      setCategoriaActiva(catId);
      filtrarDatos(catId, textoBusqueda);
  };

  const alEscribirBusqueda = (texto) => {
      setTextoBusqueda(texto);
      filtrarDatos(categoriaActiva, texto);
  };

  const verMotivo = (motivo) => {
     alert("Detalle: " + motivo);
  };

  return (
    <View style={styles.container}>
      
      {/* 1. Header */}
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <View style={styles.headerIconCircle}>
            <TouchableOpacity style={styles.headerIconCircle} onPress={irAPerfil}>
              {/* Dejé este icono porque suele ser estándar, pero puedes quitarlo si quieres */}
              <Text style={{fontSize: 24, color: 'black'}}>👤</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.headerTitle}>Aliados del Mundo</Text>
        </View>
      </View>

      {/* 2. Buscador y Menú */}
      <View style={styles.searchSection}>
        <View style={styles.searchRow}>
          
          <View style={styles.menuWrapper}>
            <TouchableOpacity onPress={toggleLista} style={styles.botonMenuAccion}>
              {/* Cambié la X y las rayas por texto o simbolos simples si prefieres */}
              <Text style={styles.menuIcon}>{listaVisible ? 'X' : '≡'}</Text>
            </TouchableOpacity>

            {listaVisible && (
              <View style={styles.listaFlotante}>
                <TouchableOpacity style={styles.botonLista} onPress={irATusSolicitudes}>
                  <Text style={styles.textoLista}>Tus Peticiones</Text>
                </TouchableOpacity>
                <View style={styles.separador} />
                <TouchableOpacity style={styles.botonLista} onPress={irATusAportaciones}>
                  <Text style={styles.textoLista}>Tus Aportaciones</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          
          <View style={styles.searchBar}>
            <TextInput 
              style={styles.searchInput} 
              placeholder="Buscar" 
              placeholderTextColor="#555"
              value={textoBusqueda}
              onChangeText={alEscribirBusqueda}
            />
            <Text style={styles.searchIcon}>🔍</Text>
          </View>
        </View>
      </View>

      {/* 3. Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity style={styles.tab} onPress={irAHome}>
            <Text style={styles.tabText}>Iniciativas ▶</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, styles.lastTab]} onPress={irASolicitar}>
            <Text style={styles.tabText}>Solicitar ▶</Text>
        </TouchableOpacity>
      </View>

      {/* 4. Subtitulo (AHORA VA PRIMERO) */}
      <View style={styles.subHeader}>
        <Text style={styles.subHeaderText}>
            {categoriaActiva === 'Todos' 
                ? 'Explora todas las iniciativas' 
                : `Categoría: ${categorias.find(c => c.id === categoriaActiva)?.texto}`}
        </Text>
      </View>

      {/* 5. BARRA DE FILTROS (AHORA VA DEBAJO DEL SUBTITULO) */}
      <View style={styles.categoriasContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollCategorias}>
              {categorias.map((cat) => (
                  <TouchableOpacity 
                    key={cat.id} 
                    style={[
                        styles.botonCategoria, 
                        categoriaActiva === cat.id && styles.botonCategoriaActivo
                    ]}
                    onPress={() => alPresionarCategoria(cat.id)}
                  >
                      <Text style={[
                          styles.textoCategoria,
                          categoriaActiva === cat.id && styles.textoCategoriaActivo
                      ]}>
                          {cat.texto}
                      </Text>
                  </TouchableOpacity>
              ))}
          </ScrollView>
      </View>

      {/* 6. Lista de Tarjetas */}
      {cargando ? (
         <ActivityIndicator size="large" color={COLORES.verde} style={{marginTop: 50}} />
      ) : (
        <ScrollView style={styles.scrollContainer}>
            {listaFiltrada.length === 0 ? (
                <View style={styles.vacioContainer}>
                    <Text style={styles.textoVacio}>
                        No hay resultados disponibles.
                    </Text>
                </View>
            ) : (
                listaFiltrada.map((item) => (
                    <TarjetaSolicitud 
                        key={item.solicitud_id} 
                        item={item} 
                        verMotivo={verMotivo} 
                    />
                ))
            )}
            <View style={{height: 20}} />
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
  
  // Header
  headerContainer: {
    marginHorizontal: 1,
    marginTop: 33,
    marginBottom: 15,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#000000',
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
    borderColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
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
  
  // Buscador y Menu
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
    width: 180, 
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

  // Tabs
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
  lastTab: {
    borderRightWidth: 0,
  },
  tabText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },

  // Subheader
  subHeader: {
    backgroundColor: COLORES.verde,
    paddingVertical: 10,
    alignItems: 'center',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#000000',
    marginTop: 5,
    // marginBottom: 10, // Quitamos el margen inferior porque ahora vienen las categorías
  },
  subHeaderText: {
    fontSize: 13,
    color: '#333',
    fontWeight: '500',
  },

  // Categorías
  categoriasContainer: {
    height: 60,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    justifyContent: 'center',
    marginBottom: 5, // Margen para separar de la lista
  },
  scrollCategorias: {
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  botonCategoria: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  botonCategoriaActivo: {
    backgroundColor: '#000', 
    borderColor: '#000',
  },
  textoCategoria: {
    color: '#555',
    fontWeight: '600',
    fontSize: 13,
  },
  textoCategoriaActivo: {
    color: '#fff',
  },

  // Scroll Content
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  vacioContainer: {
      marginTop: 50,
      alignItems: 'center',
  },
  textoVacio: {
      color: '#555',
      fontSize: 16,
      textAlign: 'center',
      paddingHorizontal: 20,
  }
});

export default PantallaHome;