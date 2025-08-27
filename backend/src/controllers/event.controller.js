import prisma from "../prismaClient.js";

export const createEvent = async (req, res) => {
  try {
    const event = await prisma.event.create({ data: req.body });
    res.json(event);
  } catch (err) {
    res.status(400).json({ error: "Failed to create event" });
  }
};

export const getEvents = async (req, res) => {
  const events = await prisma.event.findMany({ include: { tickets: true } });
  res.json(events);
};
