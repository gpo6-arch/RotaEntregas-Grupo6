// src/controllers/deliveriesController.js
import prisma from "../services/prismaClient.js";

export async function listDeliveries(req, res) {
  try {
    const deliveries = await prisma.delivery.findMany({
      include: { cliente: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(deliveries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao listar entregas" });
  }
}

export async function getDelivery(req, res) {
  try {
    const id = Number(req.params.id);
    const delivery = await prisma.delivery.findUnique({
      where: { id },
      include: { cliente: true },
    });
    if (!delivery)
      return res.status(404).json({ error: "Entrega não encontrada" });
    res.json(delivery);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar entrega" });
  }
}

export async function createDelivery(req, res) {
  try {
    const { pickup_address, dropoff_address, clientId, scheduled_at } =
      req.body;
    if (!pickup_address || !dropoff_address) {
      return res.status(400).json({ error: "Endereços são obrigatórios" });
    }
    const delivery = await prisma.delivery.create({
      data: {
        pickup_address,
        dropoff_address,
        scheduled_at: scheduled_at ? new Date(scheduled_at) : null,
        clientId: clientId || null,
      },
    });
    res.status(201).json(delivery);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao criar entrega" });
  }
}

export async function updateDelivery(req, res) {
  try {
    const id = Number(req.params.id);
    const { pickup_address, dropoff_address, status, scheduled_at } = req.body;

    const data = {};
    if (pickup_address !== undefined) data.pickup_address = pickup_address;
    if (dropoff_address !== undefined) data.dropoff_address = dropoff_address;
    if (status !== undefined) data.status = status;
    if (scheduled_at !== undefined)
      data.scheduled_at = scheduled_at ? new Date(scheduled_at) : null;

    const updated = await prisma.delivery.update({
      where: { id },
      data,
    });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao atualizar entrega" });
  }
}

export async function deleteDelivery(req, res) {
  try {
    const id = Number(req.params.id);
    await prisma.delivery.delete({ where: { id } });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao excluir entrega" });
  }
}
