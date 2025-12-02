import * as yup from 'yup';

export const driverSchema = yup.object().shape({
    nome: yup
        .string()
        .required('O nome é obrigatório.')
        .min(3, 'O nome deve ter pelo menos 3 caracteres.'),
        
    cpf: yup
        .string()
        .required('O CPF é obrigatório.')
        .matches(/^\d{11}$/, 'O CPF deve ter 11 dígitos numéricos.'),

    cnh: yup
        .string()
        .required('A CNH é obrigatória.')
        .matches(/^\d{10}$/, 'A CNH deve ter 10 dígitos numéricos.'),
        
    telefone: yup
        .string()
        .required('O telefone é obrigatório.')
        .matches(/^\d{10,11}$/, 'O telefone deve ter 10 ou 11 dígitos numéricos.'),

    placaVeiculo: yup
        .string()
        .required('A placa do veículo é obrigatória.')
        .min(7, 'A placa deve ter no mínimo 7 caracteres.'),
        
    modeloVeiculo: yup
        .string()
        .required('O tipo de veículo é obrigatório.'),
        
    status: yup
        .string()
        .required('O status é obrigatório.'),

    // --- Endereço ---
    codigoPostal: yup
        .string()
        .required('O CEP é obrigatório.')
        .matches(/^\d{8}$/, 'O CEP deve ter 8 dígitos.'),
        
    endereco: yup
        .string()
        .required('O endereço é obrigatório.'),

    numero: yup
        .string()
        .required('O número é obrigatório.'),

    cidade: yup
        .string()
        .required('A cidade é obrigatória.'),

    estado: yup
        .string()
        .required('O estado é obrigatório.')
        .min(2, 'O estado deve ter 2 letras (Ex: SP).')
        .max(2, 'O estado deve ter 2 letras (Ex: SP).'),
});
