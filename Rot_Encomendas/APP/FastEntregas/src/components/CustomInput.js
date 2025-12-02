import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';

const CustomInput = ({ control, name, label, placeholder, rules = {}, keyboardType = 'default' }) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View style={styles.container}>
          <TextInput
            style={[styles.input, error && styles.inputError]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder={placeholder || label} 
            placeholderTextColor="#888"
            keyboardType={keyboardType}
          />
          {/* Exibe a mensagem de erro da validação (Yup) */}
          {error && <Text style={styles.errorText}>{error.message || 'Erro'}</Text>}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 15,
  },
  input: {
    backgroundColor: 'white',
    height: 50,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    fontSize: 16,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    alignSelf: 'stretch',
    marginTop: 4,
    marginLeft: 5,
    fontSize: 12,
  },
});

export default CustomInput;
