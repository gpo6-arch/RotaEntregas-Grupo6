import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const CustomSelectModal = ({ value, onSelect, label, items, placeholder }) => {
    const [modalVisible, setModalVisible] = useState(false);
    
    const selectedItem = items.find(item => item.value === value);
    const displayLabel = selectedItem ? selectedItem.label : (placeholder || label);

    const handleSelect = (newValue) => {
        onSelect(newValue);
        setModalVisible(false);
    };

    return (
        <View style={selectStyles.selectWrapper}>
            {/* Campo que abre o Modal */}
            <TouchableOpacity 
                style={[selectStyles.inputContainer, selectStyles.selectInput]}
                onPress={() => setModalVisible(true)}
            >
                <Text 
                    style={[selectStyles.selectText, value === null && selectStyles.placeholderText]}
                    numberOfLines={1}
                >
                    {displayLabel}
                </Text>
                <MaterialIcons name="arrow-drop-down" size={24} color="#60B0E0" />
            </TouchableOpacity>

            {/* Modal de Opções */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableOpacity 
                    style={selectStyles.modalOverlay} 
                    activeOpacity={1}
                    onPress={() => setModalVisible(false)}
                >
                    <View style={selectStyles.modalContent}>
                        <Text style={selectStyles.modalTitle}>{label}</Text>
                        <ScrollView style={selectStyles.optionsScrollView}>
                            {items.map((item) => {
                                // Não renderiza o item vazio (placeholder) dentro das opções
                                if (item.value === null || item.value === '') return null; 
                                return (
                                    <TouchableOpacity
                                        key={item.value}
                                        style={selectStyles.optionItem}
                                        onPress={() => handleSelect(item.value)}
                                    >
                                        <Text style={selectStyles.optionText}>{item.label}</Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </ScrollView>
                        <TouchableOpacity 
                            style={selectStyles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={selectStyles.closeButtonText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const selectStyles = StyleSheet.create({
    selectWrapper: {
        marginBottom: 15,
    },
    inputContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ced4da',
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: 50, 
    },
    selectInput: {
        justifyContent: 'space-between',
        paddingRight: 15,
    },
    selectText: {
        fontSize: 16,
        color: '#343a40', 
        flex: 1,
    },
    placeholderText: {
        color: '#6c757d', 
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        maxHeight: '70%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#60B0E0',
    },
    optionsScrollView: {
        maxHeight: 200, 
    },
    optionItem: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    optionText: {
        fontSize: 16,
        color: '#343a40',
    },
    closeButton: {
        marginTop: 15,
        padding: 10,
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#6c757d',
        fontWeight: 'bold',
    },
});

export default CustomSelectModal;
