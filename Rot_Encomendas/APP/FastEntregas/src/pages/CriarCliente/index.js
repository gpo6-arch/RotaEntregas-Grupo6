import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { MaterialIcons } from '@expo/vector-icons'; 

import { clientSchema } from '../../validation/clientSchema'; 
import CustomInput from '../../components/CustomInput'; 

export default function ClientFormScreen({ navigation, route }) {
  const { clientId } = route.params || {};
  const isEditing = !!clientId; 
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(clientSchema),

    defaultValues: { 
      nome: isEditing ? 'Nome Existente' : '',
      cpf: isEditing ? '12345678900' : '',
      telefone: '',
      codigoPostal: '',
      endereco: '',
      numero: '',
      cidade: '',
      estado: '',
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);

    const action = isEditing ? 'atualizado' : 'criado';
    Alert.alert('Simulação de Sucesso', `Cliente ${action} com os seguintes dados:\n${JSON.stringify(data, null, 2)}`);
    
    navigation.goBack(); 
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{isEditing ? 'Editar Cliente' : 'Cadastro Cliente'}</Text>
        <View style={{ width: 24 }} /> 
      </View>
      
      <View style={styles.formContainer}>
        {/* CAMPOS DO FORMULÁRIO */}
        <CustomInput control={control} name="nome" label="Nome do cliente" />
        <CustomInput control={control} name="cpf" label="CPF" keyboardType="numeric" />
        <CustomInput control={control} name="telefone" label="Telefone" keyboardType="phone-pad" />
        <CustomInput control={control} name="codigoPostal" label="Código Postal" keyboardType="numeric" />
        
        {/* Linha Dupla: Endereço e Número */}
        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <CustomInput control={control} name="endereco" label="Endereço" />
          </View>
          <View style={styles.quarterWidth}>
            <CustomInput control={control} name="numero" label="Número" keyboardType="numeric" />
          </View>
        </View>

        <CustomInput control={control} name="cidade" label="Cidade" />
        <CustomInput control={control} name="estado" label="Estado" />

        {/* Botões */}
        <TouchableOpacity 
          style={styles.saveButton} 
          onPress={handleSubmit(onSubmit)} 
          disabled={isSubmitting} 
        >
          {isSubmitting ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            <Text style={styles.buttonText}>Salvar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 40,
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
  formContainer: {
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    flex: 0.65, 
    marginRight: 10,
  },
  quarterWidth: {
    flex: 0.35, 
  },
  saveButton: {
    backgroundColor: '#60B0E0', 
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#60B0E0',
  },
  cancelButtonText: {
    color: '#60B0E0',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
