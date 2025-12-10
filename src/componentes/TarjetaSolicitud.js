import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';
import COLORES from '../constantes/colores';

const TarjetaSolicitud = ({ item }) => {
  return (
    <View style={styles.cardContainer}>
        
        {/* --- IZQUIERDA (70%) --- */}
        <View style={styles.cardLeft}>
            
            {/* CONTENEDOR SUPERIOR (Con relleno para textos y foto) */}
            <View style={styles.leftContent}>
                <View style={styles.cardHeader}>
                    <View style={styles.iconCircle}>
                        <Text style={styles.iconUser}>👤</Text>
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={styles.userName} numberOfLines={1}>
                            {item.alias ? item.alias : item.nombre}
                        </Text>
                        <Text style={styles.bankInfo} numberOfLines={1}>
                            🏦 {item.nombre_banco || 'Banco'} • {item.cuenta_bancaria || '---'}
                        </Text>
                    </View>
                </View>

                <Text style={styles.cardTitle} numberOfLines={2}>{item.titulo}</Text>
                <Text style={styles.cardMonto}>Meta: ${item.monto}</Text>
                
                {/* ESPACIO PARA FOTO (Ahora tiene más altura gracias al ajuste) */}
                <View style={styles.emptyBox}>
                   {item.tipo_evidencia === 'digital' && 
                    <Text style={styles.urlText} numberOfLines={1}>
                        {item.evidencia_data}
                    </Text>
                   }
                </View>
            </View>

            {/* BARRA DE ACCIONES (Sin relleno lateral, pegada a los bordes) */}
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
                    <Text style={styles.shareIcon}>➦</Text>
                </TouchableOpacity>
            </View>
        </View>

        {/* --- DERECHA (30%): MOTIVO --- */}
        <View style={styles.cardRight}>
            <Text style={styles.motivoLabel}>MOTIVO:</Text>
            <View style={styles.motivoContent}>
                <Text style={styles.motivoText} numberOfLines={10} ellipsizeMode="tail">
                    {item.descripcion}
                </Text>
            </View>
        </View>

    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 12,
    marginBottom: 20,
    backgroundColor: COLORES.blanco,
    overflow: 'hidden',
    height: 220,
    elevation: 3,
  },
  
  // IZQUIERDA: Quitamos el padding global para que los botones toquen los bordes
  cardLeft: {
    flex: 2.3, 
    justifyContent: 'space-between', 
    borderRightWidth: 1.5,
    borderColor: '#000',
  },
  
  // NUEVO: Contenedor interno solo para la información de arriba
  leftContent: {
    flex: 1,
    padding: 10, // Aquí sí va el relleno
    paddingBottom: 5, 
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    backgroundColor: '#eee',
  },
  iconUser: { fontSize: 18 },
  userName: { fontSize: 13, fontWeight: 'bold', color: '#1206FF' },
  bankInfo: { fontSize: 10, color: '#2E7D32', fontWeight: '700' },
  cardTitle: { fontSize: 13, color: '#000', fontWeight: 'bold', marginBottom: 2 },
  cardMonto: { fontSize: 12, color: '#555', marginBottom: 2 },
  
  emptyBox: {
    flex: 1, // Se expandirá para ocupar el espacio ganado
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 5, // Un pequeño margen antes de los botones
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    padding: 5,
  },
  urlText: { fontSize: 10, color: 'blue' },
  
  // BOTONES: Ahora tocan los bordes y el "techo" es la línea negra
  actionRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#000', // Línea negra sólida
    height: 40, // Altura fija para botones cómodos
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff', // Asegura fondo blanco
  },
  actionBtn: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    height: '100%',
  },
  actionText: { 
    fontSize: 9, 
    fontWeight: 'bold', 
    color: '#000',
  },
  verticalLine: { 
    width: 1, 
    height: '100%', 
    backgroundColor: '#000', // Línea negra para separar botones
  },
  shareBtn: { 
    width: 35, 
    alignItems: 'center', 
    justifyContent: 'center',
    height: '100%',
  },
  shareIcon: { fontSize: 16, fontWeight: 'bold' },

  // DERECHA
  cardRight: {
    flex: 1,
    backgroundColor: '#ffffffff',
    padding: 8,
    alignItems: 'center',
  },
  motivoLabel: {
    fontSize: 10,
    fontWeight: '900',
    color: '#000',
    marginBottom: 5,
    textDecorationLine: 'underline',
  },
  motivoContent: {
    flex: 1,
    width: '100%',
  },
  motivoText: {
    fontSize: 10,
    color: '#333',
    textAlign: 'left',
    lineHeight: 14,
  },
});

export default TarjetaSolicitud;