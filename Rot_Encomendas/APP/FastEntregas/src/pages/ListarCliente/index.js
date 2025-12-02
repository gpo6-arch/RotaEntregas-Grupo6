import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 

import ClientCard from '../../components/ClientCard';

const mockClients = [
  { id: '1', nome: 'Allana Ribeiro Aparicio', endereco: 'Rua Ganço Cinza, 3...', telefone: '(11) 99876-0098' },
  { id: '2', nome: 'Eduardo Barros Riso', endereco: 'Travessa Angêlo, 78', telefone: '(11) 99900-2234' },
  { id: '3', nome: 'Pedro Alves Silva', endereco: 'Av. Brasil, 100', telefone: '(11) 98765-4321' },
];

export default function ClientListScreen({ navigation }) {
  const [clients, setClients] = useState(mockClients);

  const handleEdit = (clientId) => {
    navigation.navigate('ClientForm', { clientId: clientId });
  };

  const handleCreate = () => {
    navigation.navigate('ClientForm', { clientId: null });
  };

  const renderItem = ({ item }) => (
    <ClientCard 
      client={item} 
      onEdit={handleEdit} 
    />
  );

  return (
    <View style={styles.container}>
      {/* Componente de Cabeçalho AJUSTADO */}
      <View style={styles.header}>
        {/* Botão para voltar (pode ser o menu Home, se existir) */}
        <TouchableOpacity onPress={() => navigation.goBack('Home')}>
          <MaterialIcons name="arrow-back-ios" size={24} color="white" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Clientes</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Botão de Criação */}
      <TouchableOpacity 
        style={styles.createButton} 
        onPress={handleCreate}
      >
        <MaterialIcons name="edit" size={20} color="white" style={{ marginRight: 10 }}/>
        <Text style={styles.createButtonText}>Criar um novo cliente</Text>
      </TouchableOpacity>

      {/* Lista de Clientes */}
      <FlatList
        data={clients}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  header: { 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#60B0E0', 
    paddingTop: 40, 
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  headerTitle: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C3DA2C', 
    padding: 15,
    borderRadius: 10,
    margin: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  createButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  list: {
    paddingBottom: 20,
  },
});
