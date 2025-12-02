// src/app.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import deliveriesRouter from "./routes/deliveries.js";
import prisma from "./services/prismaClient.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => res.json({ ok: true }));

app.use("/deliveries", deliveriesRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, async () => {
  console.log(`API FastEntregas rodando na porta ${PORT}`);

  try {
    await prisma.$connect();
    console.log("Prisma conectado");
  } catch (err) {
    console.error("Erro ao conectar Prisma:", err);
  }
});
