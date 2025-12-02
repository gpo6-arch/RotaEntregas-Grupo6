import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import CustomSelectModal from '../../components/CustomSelectModal';

const mockMotoristas = [
    { id: 1, nome: 'Motorista A' },
    { id: 2, nome: 'Motorista B' },
    { id: 3, nome: 'Motorista C' },
];

const mockPedidos = [
    { id: 1, descricao: 'Pedido #0001 - Nome Cliente - Endereço', selecionado: true },
    { id: 2, descricao: 'Pedido #0002 - Pedro Alves - Av. Manoel Gallo, 34', selecionado: true },
    { id: 3, descricao: 'Pedido #0003 - Anna Gonçalves - Rua Almeida Campos, 345 - apto. 34', selecionado: false },
    { id: 4, descricao: 'Pedido #0004 - Cliente D - Rua de Teste, 10', selecionado: true },
];

export default function AtribuirPedidosScreen({ navigation }) {
    const [motoristaSelecionado, setMotoristaSelecionado] = useState(mockMotoristas[0]?.id || null); 
    const [pedidosDisponiveis, setPedidosDisponiveis] = useState(mockPedidos);
    
    const motoristaItems = [
        { label: 'Selecione um motorista', value: null }, 
        ...mockMotoristas.map(m => ({ label: m.nome, value: m.id })),
    ];
    
    const togglePedido = (id) => {
        setPedidosDisponiveis(pedidosDisponiveis.map(pedido => 
            pedido.id === id ? { ...pedido, selecionado: !pedido.selecionado } : pedido
        ));
    };

    const handleAtribuir = () => {
        const pedidosAtribuidos = pedidosDisponiveis.filter(p => p.selecionado);

        if (!motoristaSelecionado) {
            return Alert.alert('Atenção', 'Selecione um motorista para atribuir os pedidos.');
        }
        
        if (pedidosAtribuidos.length === 0) {
            return Alert.alert('Atenção', 'Selecione pelo menos um pedido para atribuir.');
        }

        Alert.alert('Sucesso', `${pedidosAtribuidos.length} pedidos atribuídos ao Motorista ID: ${motoristaSelecionado}.`);

        navigation.navigate('Mapa', { 
            motoristaId: motoristaSelecionado,
            pontos: pedidosAtribuidos,
        });
    };

    const renderPedidoItem = ({ item }) => (
        <View style={styles.pedidoItem}>
            <TouchableOpacity 
                style={styles.checkboxContainer} 
                onPress={() => togglePedido(item.id)}
            >
                <View style={styles.checkbox}>
                    <MaterialIcons 
                        name={item.selecionado ? "check-box" : "check-box-outline-blank"} 
                        size={24} 
                        color={item.selecionado ? "#4CAF50" : "#d32f2f"} 
                    />
                </View>
            </TouchableOpacity>
            <Text style={styles.pedidoText}>{item.descricao}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <MaterialIcons name="arrow-back-ios" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Atribuir Pedidos</Text>
                <View style={{ width: 24 }} /> 
            </View>

            <View style={styles.content}>
                <Text style={styles.sectionTitle}>Motoristas Disponíveis</Text>
                
                <CustomSelectModal
                    value={motoristaSelecionado}
                    onSelect={setMotoristaSelecionado}
                    label="Selecionar Motorista"
                    placeholder="Selecione um motorista"
                    items={motoristaItems}
                />

                <Text style={styles.sectionTitle}>Pedidos Disponíveis</Text>
                
                <FlatList
                    data={pedidosDisponiveis}
                    renderItem={renderPedidoItem}
                    keyExtractor={item => item.id.toString()}
                    style={styles.list}
                />
            </View>

            <TouchableOpacity 
                style={styles.atribuirButton} 
                onPress={handleAtribuir}
            >
                <Text style={styles.atribuirButtonText}>Atribuir</Text>
            </TouchableOpacity>
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
    content: {
        flex: 1,
        padding: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#60B0E0',
        marginTop: 10,
        marginBottom: 10,
    },
    list: {
        flex: 1,
        marginBottom: 20,
    },
    pedidoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#eee',
    },
    pedidoText: {
        flex: 1,
        fontSize: 14,
        color: '#343a40',
        marginLeft: 10,
    },
    checkboxContainer: {
        paddingRight: 10,
    },
    checkbox: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    atribuirButton: {
        backgroundColor: '#60B0E0',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        margin: 20,
        marginTop: 0,
    },
    atribuirButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
