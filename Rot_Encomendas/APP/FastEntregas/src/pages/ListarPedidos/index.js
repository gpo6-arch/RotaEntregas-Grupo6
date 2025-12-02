import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 

import OrderCard from '../../components/OrderCard'; 

const mockOrders = [
  { 
    id: 'o1', 
    clienteNome: 'Isabella M. Barbosa', 
    endereco: 'Rua Migliani, 45', 
    descricaoProduto: 'Airfryer',
    porteProduto: 'Porte Grande',
    status: 'Em rota...',
    },
  { 
    id: 'o2', 
    clienteNome: 'Pedro Alves Silva', 
    endereco: 'Av. Manoel Gallo, 34', 
    descricaoProduto: 'Lego Barco Creator',
    porteProduto: 'Porte Médio',
    status: 'Finalizado',
    },
  { 
    id: 'o3', 
    clienteNome: 'Lucas Freitas', 
    endereco: 'Rua A, 123', 
    descricaoProduto: 'Televisão',
    porteProduto: 'Porte Grande',
    status: 'Pendente',
   },
];

export default function OrderListScreen({ navigation }) {
  const [orders, setOrders] = useState(mockOrders); 

  const handleEdit = (orderId) => {
    navigation.navigate('OrderForm', { orderId: orderId });
  };
  
  const handleCreate = () => {
    navigation.navigate('OrderForm', { orderId: null });
  };

  const renderItem = ({ item }) => (
    <OrderCard 
      order={item} 
      onEdit={handleEdit} 
    />
  );

  return (
    <View style={styles.container}>
      {/* Componente de Cabeçalho AJUSTADO */}
      <View style={styles.header}>
        {/* 🚨 BOTÃO DE NAVEGAÇÃO RÁPIDA PARA CLIENTES (TESTE) */}
        <TouchableOpacity onPress={() => navigation.goBack('Home')}>
          <MaterialIcons name="arrow-back-ios" size={24} color="white" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Pedidos</Text>
        
        {/* Espaço em branco para alinhamento (ou outro botão) */}
        <View style={{ width: 24 }} />
      </View>

      {/* Botão de Criação */}
      <TouchableOpacity 
        style={styles.createButton} 
        onPress={handleCreate}
      >
        <MaterialIcons name="edit" size={20} color="white" style={{ marginRight: 10 }}/>
        <Text style={styles.createButtonText}>Criar um novo pedido</Text>
      </TouchableOpacity>

      {/* Lista de Pedidos */}
      <FlatList
        data={orders}
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
    backgroundColor: '#60B0E0', 
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
