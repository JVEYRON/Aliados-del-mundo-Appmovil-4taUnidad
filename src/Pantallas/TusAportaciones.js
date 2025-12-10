import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView 
} from 'react-native';
import COLORES from '../constantes/colores';

const PantallaTusAportaciones = ({ irAtras }) => {

  // Datos simulados de las peticiones a las que has aportado
  const historial = [
    { id: 1, usuario: 'Comunidad Verde', titulo: 'Salvemos a las tortugas', detalle: 'Tu aporte ayudó a la meta.' },
    { id: 2, usuario: 'Escuela Benito', titulo: 'Reforestación Urbana', detalle: 'Gracias a ti compramos 10 árboles.' },
    { id: 3, usuario: 'Refugio Animal', titulo: 'Medicinas para perros', detalle: 'Cubriste el 10% del tratamiento.' },
  ];

  return (
    <View style={styles.container}>
      
      {/* --- ENCABEZADO --- */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={irAtras}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Tus Aportaciones</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {historial.map((item) => (
          <View key={item.id} style={styles.cardContainer}>
            
            {/* LADO IZQUIERDO (Contenido) */}
            <View style={styles.cardLeft}>
                
                {/* Encabezado Tarjeta */}
                <View style={styles.cardHeader}>
                    <View style={styles.iconCircle}>
                        <Text style={{fontSize: 20, color: '#000'}}>👤</Text>
                    </View>
                    <Text style={styles.userName}>{item.usuario}</Text>
                </View>
                
                {/* Título o Descripción */}
                <Text style={styles.cardDescription}>{item.titulo}</Text>

                {/* Caja vacía (Imagen) */}
                <View style={styles.emptyBox}></View>

                {/* Botones de Acción (Igual a la imagen) */}
                <View style={styles.actionRow}>
                    <TouchableOpacity style={styles.actionBtn}>
                        <Text style={styles.actionText}>Contribuir</Text>
                    </TouchableOpacity>
                    <View style={styles.verticalLine} />
                    
                    <TouchableOpacity style={styles.actionBtn}>
                        <Text style={styles.actionText}>Comprar</Text>
                    </TouchableOpacity>
                    <View style={styles.verticalLine} />
                    
                    <TouchableOpacity style={styles.actionBtn}>
                        <Text style={styles.actionText}>Comentar</Text>
                    </TouchableOpacity>
                    <View style={styles.verticalLine} />
                    
                    <TouchableOpacity style={styles.shareBtn}>
                        <Text style={{fontSize: 16}}>➦</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* LADO DERECHO (Pestaña Motivo) */}
            <View style={styles.cardRight}>
                <Text style={styles.arrows}>{'>>>'}</Text>
                <View style={styles.rotatedTextContainer}>
                    <Text style={styles.sideText}>Motivo</Text>
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
    padding: 15,
  },

  // --- Encabezado ---
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
    fontFamily: 'serif',
  },

  // --- TARJETA ESTILO "Apoyo/Aportación" ---
  cardContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: COLORES.blanco,
    overflow: 'hidden',
    height: 200, 
  },
  
  // Sección Izquierda
  cardLeft: {
    flex: 1,
    padding: 5,
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  iconCircle: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  userName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1206FF', // Azul
  },
  cardDescription: {
    fontSize: 10,
    color: '#000',
    marginBottom: 5,
    paddingLeft: 2,
  },
  emptyBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#999',
    marginBottom: 5,
  },
  
  // Botones de acción
  actionRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#000',
    paddingTop: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 30,
  },
  actionBtn: {
    flex: 1,
    alignItems: 'center',
  },
  actionText: {
    fontSize: 9,
    color: '#000',
  },
  verticalLine: {
    width: 1,
    height: '100%',
    backgroundColor: '#000',
  },
  shareBtn: {
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Sección Derecha
  cardRight: {
    width: 35,
    borderLeftWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORES.blanco,
  },
  arrows: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
    position: 'absolute',
    top: 60,
  },
  rotatedTextContainer: {
    transform: [{ rotate: '-90deg' }],
    width: 100,
    alignItems: 'center',
  },
  sideText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default PantallaTusAportaciones;