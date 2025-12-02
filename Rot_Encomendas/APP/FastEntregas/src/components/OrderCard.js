import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const OrderCard = ({ order, onEdit }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Em rota...':
        return '#FFA500'; 
      case 'Finalizado':
        return '#008000'; 
      case 'Pendente':
      default:
        return '#FF0000'; 
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.infoContainer}>
        {/* Nome do Cliente */}
        <Text style={styles.name}>{order.clienteNome}</Text>
        {/* Endereço */}
        <Text style={styles.detail}>{order.endereco}</Text>
        {/* Descrição do Produto */}
        <Text style={styles.detail}>Descrição/ produto: {order.descricaoProduto}</Text>
        {/* Porte do Produto */}
        <Text style={styles.detail}>Porte do produto: {order.porteProduto}</Text>
        {/* Status */}
        <View style={styles.statusRow}>
          <Text style={styles.detail}>Status: </Text>
          <Text style={[styles.statusText, { color: getStatusColor(order.status) }]}>
            {order.status}
          </Text>
        </View>
      </View>

      {/* Botão Editar (Agora ocupa o lado direito sozinho) */}
      <View style={styles.actionContainer}>
        <TouchableOpacity 
          style={styles.editButton} 
          onPress={() => onEdit(order.id)}
        >
          <Text style={styles.editText}>Editar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    marginHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  infoContainer: {
    flex: 3, 
    marginRight: 15,
  },
  actionContainer: {
    flex: 1, 
    alignItems: 'flex-end',
    justifyContent: 'center', 
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#333',
  },
  detail: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  statusRow: {
    flexDirection: 'row',
    marginTop: 5,
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  
  editButton: {
    backgroundColor: '#ffaa00',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    minWidth: 70, 
    alignItems: 'center',
    alignSelf: 'stretch', 
  },
  editText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default OrderCard;
