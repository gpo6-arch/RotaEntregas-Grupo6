import * as yup from 'yup';

export const orderSchema = yup.object().shape({
  nomeCliente: yup.string().required('O nome do cliente é obrigatório'),
  telefone: yup.string().required('O telefone é obrigatório'),

  descricaoProduto: yup.string().required('A descrição do produto é obrigatória'),
  porteProduto: yup.string().required('O porte do produto é obrigatório'),

  codigoPostal: yup.string().required('O Código Postal (CEP) é obrigatório'),
  endereco: yup.string().required('O endereço é obrigatório'),
  numero: yup.string().required('O número é obrigatório'),
  cidade: yup.string().required('A cidade é obrigatória'),
  estado: yup.string().required('O estado é obrigatório'),

});

