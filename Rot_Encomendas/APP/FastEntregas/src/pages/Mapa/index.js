import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Linking from "expo-linking";
import axios from "axios";
import { MaterialIcons } from '@expo/vector-icons'; 

export default function Mapa({ route, navigation }) {
    
    // 🚨 1. DESESTRUTURAR PARÂMETROS DA ROTA
    const { motoristaId, pontos: pontosIniciais } = route.params || {};

    // 🚨 2. ESTADOS DO COMPONENTE
    const [pontos, setPontos] = useState(pontosIniciais || []);
    const [info, setInfo] = useState(null);
    const [polylineCoordinates, setPolylineCoordinates] = useState([]);
    
    // 🚨 3. FUNÇÕES (gerarRota, finalizarRota, abrirWaze, etc.)
    // Essas funções DEVEM ser definidas aqui, antes do return.
    
    function gerarRota() {
        // Lógica de geração de rota (API call, etc.)
        // Exemplo: Simular a resposta da API de rotas
        if (pontos.length < 2) {
            return Alert.alert("Atenção", "Selecione pelo menos 2 pontos para gerar a rota.");
        }
        
        // Simulação de dados (Substitua pela sua chamada real ao backend)
        const mockPolyline = pontos.map(p => ({
            latitude: p.lat || -23.55, // Use a coordenada real do pedido, se disponível
            longitude: p.lng || -46.63,
        }));

        setPolylineCoordinates(mockPolyline);

        setInfo({
            distancia_total_km: "40.5",
            tempo_estimado_min: "75",
        });

        Alert.alert("Sucesso", "Rota gerada com sucesso!");
    }

    function finalizarRota() {
        // Lógica de finalização de rota (API call, limpar estados)
        setPontos([]);
        setInfo(null);
        setPolylineCoordinates([]);
        Alert.alert("Rota Finalizada", "Todos os pedidos foram concluídos.");
        navigation.navigate('Home'); 
    }

    function abrirWaze() {
        // Esta função precisa ser ajustada para pegar as coordenadas do primeiro ponto de entrega.
        // Assumindo que o primeiro ponto é pontos[0] e ele tem endereço ou coordenadas:
        const primeiroPonto = pontos[0];

        // Exemplo: Tentando abrir o Waze com o endereço (mais robusto)
        // Você precisará garantir que seu mockPedidos em AtribuirPedidos inclua o campo 'endereco'
        const endereco = primeiroPonto?.descricao; // Usando a descrição como endereço no mock
        if (endereco) {
            const urlWaze = `waze://?q=${encodeURIComponent(endereco)}&navigate=yes`;
            Linking.openURL(urlWaze).catch(err => {
                console.error('Falha ao abrir o Waze:', err);
                Alert.alert("Erro", "O aplicativo Waze não está instalado.");
            });
        } else {
             Alert.alert("Atenção", "Endereço do primeiro ponto não encontrado.");
        }
    }


    function iniciarEntrega() {
        if (!pontos || pontos.length < 1) { // 1 ponto é suficiente para iniciar a primeira navegação
            return Alert.alert("Erro", "Gere uma rota primeiro.");
        }
        abrirWaze();
        Alert.alert("Entrega Iniciada", "Navegação para o primeiro ponto iniciada!");
    }

    // --- RENDERIZAÇÃO ---
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back-ios" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Rotas</Text>
                <View style={{ width: 24 }} /> 
            </View>
            
            <MapView
                style={styles.map}
                // Garante que o centro inicial seja o primeiro ponto OU um local padrão
                initialRegion={{
                    latitude: pontos[0]?.lat || -23.55,
                    longitude: pontos[0]?.lng || -46.63,
                    latitudeDelta: 0.08,
                    longitudeDelta: 0.04,
                }}
            >
                {/* Marcadores */}
                {pontos.map((p, index) => (
                    <Marker
                        key={p.id}
                        coordinate={{ 
                            latitude: p.lat || -23.55 + index * 0.005, // Use coords reais
                            longitude: p.lng || -46.63 + index * 0.005, // Use coords reais
                        }}
                        title={p.descricao}
                        pinColor={index === 0 ? 'green' : 'red'}
                    />
                ))}

                {/* Linha da Rota */}
                {polylineCoordinates.length > 0 && (
                    <Polyline
                        coordinates={polylineCoordinates}
                        strokeWidth={4}
                        strokeColor="#1976d2"
                    />
                )}
            </MapView>

            <View style={styles.infoBox}>
                {info ? (
                    <>
                        <Text style={styles.infoText}>
                            Distância Km: {info.distancia_total_km} km
                        </Text>
                        <Text style={styles.infoText}>
                            Tempo de entrega: {info.tempo_estimado_min} min
                        </Text>
                    </>
                ) : (
                    <>
                        <Text style={styles.infoText}>Distância Km: --</Text>
                        <Text style={styles.infoText}>Tempo de entrega: --</Text>
                    </>
                )}
            </View>

            <View style={styles.buttons}>
                <TouchableOpacity style={styles.btnAzul} onPress={gerarRota}>
                    <Text style={styles.btnText}>Gerar Rota</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnVerde} onPress={iniciarEntrega}>
                    <Text style={styles.btnText}>Iniciar Entrega</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btnVermelho}
                    onPress={finalizarRota}
                >
                    <Text style={styles.btnText}>Finalizar Rota</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F7F7F7' },
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
    map: { width: "100%", height: "50%", marginBottom: 15 },
    infoBox: {
        height: 80, 
        marginHorizontal: 15,
        backgroundColor: "#fff",
        justifyContent: "center",
        padding: 10,
        borderRadius: 8,
        elevation: 3,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    infoText: { fontSize: 16, fontWeight: "600", color: '#333' },
    buttons: {
        flex: 1, 
        padding: 15,
        justifyContent: "space-evenly", 
    },
    btnAzul: {
        backgroundColor: "#1976d2",
        padding: 12,
        borderRadius: 8,
    },
    btnVerde: {
        backgroundColor: "#4CAF50",
        padding: 12,
        borderRadius: 8,
    },
    btnVermelho: {
        backgroundColor: "#d32f2f",
        padding: 12,
        borderRadius: 8,
    },
    btnText: { color: "#fff", textAlign: "center", fontWeight: "700", fontSize: 18 },
});

