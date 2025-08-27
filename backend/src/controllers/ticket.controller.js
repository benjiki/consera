import prisma from "../prismaClient.js";

export const createTicket = async (req, res) => {
  try {
    const { eventId, type, price, quantity } = req.body;
    const ticket = await prisma.ticket.create({
      data: { eventId, type, price, quantity },
    });
    res.json(ticket);
  } catch (err) {
    res.status(400).json({ error: "Failed to create ticket" });
  }
};
