import * as yup from 'yup';

export const clientSchema = yup.object().shape({
  nome: yup.string().required('O nome do cliente é obrigatório'),
  cpf: yup
    .string()
    .required('O CPF é obrigatório')
    .min(11, 'O CPF deve ter 11 dígitos'), 
  telefone: yup.string().required('O telefone é obrigatório'),
  codigoPostal: yup.string().required('O Código Postal (CEP) é obrigatório'),
  endereco: yup.string().required('O endereço é obrigatório'),
  numero: yup.string().required('O número é obrigatório'),
  cidade: yup.string().required('A cidade é obrigatória'),
  estado: yup.string().required('O estado é obrigatório'),
});
