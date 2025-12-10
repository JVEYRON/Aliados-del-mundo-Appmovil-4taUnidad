import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView 
} from 'react-native';
import COLORES from '../constantes/colores';

const PantallaTusSolicitudes = ({ irAtras }) => {

  // Datos de ejemplo (Simulando lo que se ve en tu imagen)
  const misSolicitudes = [
    {
      id: 1,
      titulo: 'Héctor pidió una Trompeta',
      donadores: [
        { nombre: 'pablitoGot', monto: 70 },
        { nombre: 'juanGot', monto: 700 },
        { nombre: 'panchoGot', monto: 10 },
      ],
      recaudado: 780,
      total: 1500
    },
    // Puedes agregar más objetos aquí para probar el scroll
  ];

  return (
    <View style={styles.container}>
      
      {/* --- ENCABEZADO --- */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={irAtras}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Tus Solicitudes</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {misSolicitudes.map((item) => (
          <View key={item.id} style={styles.card}>
            
            {/* COLUMNA IZQUIERDA (Info Solicitud) */}
            <View style={styles.leftColumn}>
              <View style={styles.titleContainer}>
                <Text style={styles.cardTitle}>{item.titulo}</Text>
              </View>
              {/* Espacio vacío para la imagen/contenido */}
              <View style={styles.imagePlaceholder} />
            </View>

            {/* COLUMNA DERECHA (Donadores y Totales) */}
            <View style={styles.rightColumn}>
              
              {/* Lista de Donadores */}
              <View style={styles.donorsList}>
                {item.donadores.map((donador, index) => (
                  <View key={index} style={styles.donorRow}>
                    <Text style={styles.donorName}>{donador.nombre}</Text>
                    <Text style={styles.donorAmount}>${donador.monto}</Text>
                  </View>
                ))}
              </View>

              {/* Sección de Totales (Abajo a la derecha) */}
              <View style={styles.totalSection}>
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Recaudado</Text>
                  <Text style={styles.totalValue}>${item.recaudado}</Text>
                </View>
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Total</Text>
                  <Text style={styles.totalValue}>${item.total}</Text>
                </View>
              </View>

            </View>
          </View>
        ))}

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
    padding: 20,
  },

  // --- Encabezado (Igual que Perfil) ---
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
    fontFamily: 'serif', // Para que se parezca a la letra de tu imagen
  },

  // --- TARJETA ---
  card: {
    flexDirection: 'row', // Divide en izquierda y derecha
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 10,
    height: 200, // Altura fija como en la imagen
    marginBottom: 20,
    overflow: 'hidden',
  },

  // Columna Izquierda
  leftColumn: {
    flex: 1.5, // Ocupa más espacio (60%)
    borderRightWidth: 1,
    borderColor: '#000',
  },
  titleContainer: {
    borderBottomWidth: 1,
    borderColor: '#000',
    padding: 5,
  },
  cardTitle: {
    fontSize: 12,
    color: '#333',
  },
  imagePlaceholder: {
    flex: 1,
    backgroundColor: COLORES.blanco,
  },

  // Columna Derecha
  rightColumn: {
    flex: 1, // Ocupa menos espacio (40%)
    flexDirection: 'column',
  },
  donorsList: {
    flex: 1,
    padding: 5,
  },
  donorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  donorName: {
    fontSize: 12,
    color: COLORES.azul, // Azul como en la imagen
  },
  donorAmount: {
    fontSize: 12,
    color: '#000',
  },

  // Totales (Parte baja de la columna derecha)
  totalSection: {
    borderTopWidth: 1,
    borderColor: '#000',
    padding: 5,
    backgroundColor: '#F9F9F9',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalLabel: {
    fontSize: 10,
    color: '#555',
  },
  totalValue: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default PantallaTusSolicitudes;