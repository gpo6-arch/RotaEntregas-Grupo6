import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ClientCard = ({ client, onEdit }) => {
  return (
    <View style={styles.card}>
      <View style={styles.infoContainer}>
        {/* Nome do Cliente */}
        <Text style={styles.name}>{client.nome}</Text> 
        {/* Endereço */}
        <Text style={styles.detail}>{client.endereco}</Text> 
        {/* Contato (Telefone) */}
        <Text style={styles.detail}>{client.telefone}</Text> 
      </View>
      
      {/* Botão Editar */}
      <TouchableOpacity 
        style={styles.editButton} 
        onPress={() => onEdit(client.id)}
      >
        <Text style={styles.editText}>Editar</Text>
      </TouchableOpacity>
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
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  infoContainer: {
    flex: 1,
    marginRight: 10,
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
  editButton: {
    backgroundColor: '#ffaa00', 
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  editText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default ClientCard;

