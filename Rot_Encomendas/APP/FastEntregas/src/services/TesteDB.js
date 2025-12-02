// src/services/testeDB.js
import pkg from "@prisma/client";
const { PrismaClient } = pkg; // Importação compatível com Node.js CommonJS

const prisma = new PrismaClient();

async function main() {
  try {
    // Tenta listar os clientes apenas para testar a conexão
    const clientes = await prisma.cliente.findMany();
    console.log("Conexão bem-sucedida! Clientes encontrados:", clientes);
  } catch (error) {
    console.error("Erro ao conectar no banco:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
