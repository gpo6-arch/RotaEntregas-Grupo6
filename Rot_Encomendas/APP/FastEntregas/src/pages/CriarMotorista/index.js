import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator, Platform, Modal } from 'react-native';
import { useForm, useController } from 'react-hook-form'; 
import { yupResolver } from '@hookform/resolvers/yup';
import { MaterialIcons } from '@expo/vector-icons'; 

import CustomInput from '../../components/CustomInput'; 
import { driverSchema } from '../../validation/driverSchema'; 

const SelectModal = ({ control, name, label, items }) => {
    const [modalVisible, setModalVisible] = useState(false);
    
    const { field, fieldState: { error } } = useController({
        control,
        name,
        defaultValue: '',
    });

    const selectedItem = items.find(item => item.value === field.value);
    const displayLabel = selectedItem ? selectedItem.label : label;

    const handleSelect = (value) => {
        field.onChange(value);
        setModalVisible(false);
    };

    return (
        <View style={styles.selectWrapper}>
            <TouchableOpacity 
                style={[styles.inputContainer, styles.selectInput]}
                onPress={() => setModalVisible(true)}
            >
                <Text 
                    style={[styles.selectText, field.value === '' && styles.placeholderText]}
                    numberOfLines={1}
                >
                    {displayLabel}
                </Text>
                <MaterialIcons name="arrow-drop-down" size={24} color="#60B0E0" />
            </TouchableOpacity>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableOpacity 
                    style={styles.modalOverlay} 
                    activeOpacity={1}
                    onPress={() => setModalVisible(false)}
                >
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{label}</Text>
                        <ScrollView style={styles.optionsScrollView}>
                            {items.map((item) => {
                                if (item.value === '') return null;
                                return (
                                    <TouchableOpacity
                                        key={item.value}
                                        style={styles.optionItem}
                                        onPress={() => handleSelect(item.value)}
                                    >
                                        <Text style={styles.optionText}>{item.label}</Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </ScrollView>
                        <TouchableOpacity 
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
            {error && <Text style={styles.errorText}>{error.message}</Text>}
        </View>
    );
};

const FormInput = (props) => (
    <View style={styles.inputContainer}> 
        <CustomInput 
            control={props.control} 
            name={props.name} 
            label={props.label}
            keyboardType={props.keyboardType}
        />
    </View>
);


const CadastroMotoristaScreen = ({ navigation, route }) => {
    const { driverId } = route.params || {};
    const isEditing = !!driverId;

    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const vehicleOptions = [
        { label: 'Selecione o Tipo de Veículo', value: '' }, 
        { label: 'Carro', value: 'Carro' },
        { label: 'Moto', value: 'Moto' },
        { label: 'Caminhão', value: 'Caminhao' },
        { label: 'Van', value: 'Van' },
    ];
    
    const statusOptions = [
        { label: 'Selecione o Status', value: '' }, 
        { label: 'Ativo', value: 'Ativo' },
        { label: 'Inativo', value: 'Inativo' },
        { label: 'Em Férias', value: 'Ferias' },
    ];

    const { control, handleSubmit, reset } = useForm({
        resolver: yupResolver(driverSchema),
        defaultValues: {
            nome: isEditing ? 'Maximiliano Garcia' : '',
            cpf: isEditing ? '12345678900' : '',
            cnh: isEditing ? '1234567890' : '',
            telefone: isEditing ? '9987654321' : '',
            placaVeiculo: isEditing ? 'ABC1D23' : '',
            modeloVeiculo: isEditing ? 'Moto' : '', 
            status: isEditing ? 'Ativo' : '',
            codigoPostal: isEditing ? '01000000' : '',
            endereco: isEditing ? 'Rua das Flores' : '',
            numero: isEditing ? '100' : '',
            cidade: isEditing ? 'São Paulo' : '',
            estado: isEditing ? 'SP' : '',
        },
    });

    const handleSave = async (data) => {
        setIsSubmitting(true);
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setIsSubmitting(false);

        const action = isEditing ? 'atualizado' : 'criado';
        Alert.alert('Simulação de Sucesso', `Motorista ${action} com os seguintes dados:\n${JSON.stringify(data, null, 2)}`);
        
        navigation.goBack(); 
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#F7F7F7' }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back-ios" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{isEditing ? 'Editar Motorista' : 'Cadastro Motorista'}</Text>
                <View style={{ width: 24 }} /> 
            </View>
            
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                
                <Text style={styles.sectionTitle}>Dados Pessoais</Text>
                <FormInput control={control} name="nome" label="Nome do motorista" />
                <FormInput control={control} name="cpf" label="CPF" keyboardType="numeric" />
                <FormInput control={control} name="cnh" label="CNH" keyboardType="numeric" />
                <FormInput control={control} name="telefone" label="Telefone" keyboardType="phone-pad" />
                
                <Text style={styles.sectionTitle}>Dados do Veículo</Text>
                <SelectModal 
                    control={control} 
                    name="modeloVeiculo" 
                    label="Tipo de veículo" 
                    items={vehicleOptions}
                /> 
                <FormInput control={control} name="placaVeiculo" label="Placa do veículo" />
                
                <SelectModal 
                    control={control} 
                    name="status" 
                    label="Status" 
                    items={statusOptions}
                /> 
                
                <Text style={styles.sectionTitle}>Endereço</Text>
                <FormInput control={control} name="codigoPostal" label="Código Postal (CEP)" keyboardType="numeric" />
                <FormInput control={control} name="endereco" label="Endereço" />
                <FormInput control={control} name="numero" label="Número" keyboardType="numeric" />
                <FormInput control={control} name="cidade" label="Cidade" />
                <FormInput control={control} name="estado" label="Estado" />


                <TouchableOpacity 
                    style={styles.saveButton} 
                    onPress={handleSubmit(handleSave)}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <ActivityIndicator color="white" size="small" />
                    ) : (
                        <Text style={styles.buttonText}>{isEditing ? 'Atualizar' : 'Salvar'}</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        padding: 20,
        backgroundColor: '#f8f9fa', 
        paddingBottom: 40,
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
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#60B0E0',
        marginTop: 10,
        marginBottom: 10,
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
        marginBottom: 15, 
    },
    selectWrapper: {
        marginBottom: 15,
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
    // FIM DOS ESTILOS SELECT
    
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5, 
        paddingLeft: 5, 
    },
    saveButton: {
        backgroundColor: '#60B0E0', 
        padding: 15,
        borderRadius: 10, 
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 10,
    },
    cancelButton: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10, 
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#60B0E0', 
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    cancelButtonText: {
        color: '#60B0E0', 
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default CadastroMotoristaScreen;
