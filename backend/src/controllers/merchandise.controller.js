import prisma from "../prismaClient.js";

export const createMerchandise = async (req, res) => {
  try {
    const merch = await prisma.merchandise.create({ data: req.body });
    res.json(merch);
  } catch (err) {
    res.status(400).json({ error: "Failed to create merchandise" });
  }
};

export const getMerchandise = async (req, res) => {
  const merch = await prisma.merchandise.findMany();
  res.json(merch);
};
