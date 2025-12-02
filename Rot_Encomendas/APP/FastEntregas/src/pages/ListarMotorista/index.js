import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 

const mockMotoristas = [
  { id: 'd1', nome: 'Maximiliano Garcia', veiculo: 'Moto' },
  { id: 'd2', nome: 'Luana Monsalles B.', veiculo: 'Carro' },
];

const DriverCard = ({ motorista, onEdit }) => (
    <View style={styles.card}>
        <View style={styles.infoContainer}>
            <Text style={styles.driverName}>{motorista.nome}</Text>
            <Text style={styles.vehicleType}>Veículo: {motorista.veiculo}</Text>
        </View>
        <TouchableOpacity 
            style={styles.editButton} 
            onPress={() => onEdit(motorista.id)} 
        >
            <Text style={styles.editButtonText}>Editar</Text>
        </TouchableOpacity>
    </View>
);

const MotoristasScreen = ({ navigation }) => {
    
    const handleEdit = (driverId) => {
        navigation.navigate('DriverForm', { driverId: driverId });
    };

    const handleCreate = () => {
        navigation.navigate('DriverForm', { driverId: null });
    };

    const navigateToHome = () => {
        navigation.navigate('Home');
    };

    const renderItem = ({ item }) => (
        <DriverCard 
            motorista={item} 
            onEdit={handleEdit} 
        />
    );

    return (
        <View style={styles.container}>
            {/* 🚨 CABEÇALHO PADRÃO AZUL */}
            <View style={styles.header}>
                <TouchableOpacity onPress={navigateToHome}>
                    <MaterialIcons name="arrow-back-ios" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Motoristas</Text>
                {/* Espaço para alinhamento */}
                <View style={{ width: 24 }} /> 
            </View>

            {/* Botão de Criação */}
            <TouchableOpacity 
                style={styles.createButton} 
                onPress={handleCreate}
            >
                <MaterialIcons name="person-add" size={20} color="white" style={{ marginRight: 10 }}/>
                <Text style={styles.createButtonText}>Cadastrar novo motorista</Text>
            </TouchableOpacity>
            
            {/* 🚨 USO DE FLATLIST (MELHOR PARA LISTAS LONGAS) */}
            <FlatList
                data={mockMotoristas}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

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
        backgroundColor: '#90EE90', 
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
        paddingHorizontal: 15,
        paddingBottom: 20,
    },
    card: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        marginVertical: 8,
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
    driverName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 2,
        color: '#333',
    },
    vehicleType: {
        fontSize: 14,
        color: '#666',
    },
    editButton: {
        backgroundColor: '#ffaa00', 
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
        minWidth: 70,
        alignItems: 'center',
    },
    editButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
});

export default MotoristasScreen;
