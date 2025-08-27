import prisma from "../prismaClient.js";

export const createOrder = async (req, res) => {
  const { userId, items } = req.body;

  try {
    // 1. Validate inventory
    for (const item of items) {
      if (item.ticketId) {
        const ticket = await prisma.ticket.findUnique({
          where: { id: item.ticketId },
        });
        if (!ticket || ticket.quantity - ticket.sold < item.quantity) {
          return res.status(400).json({
            error: `Not enough tickets for Ticket ID ${item.ticketId}`,
          });
        }
      }

      if (item.merchandiseId) {
        const merch = await prisma.merchandise.findUnique({
          where: { id: item.merchandiseId },
        });
        if (!merch || merch.stock < item.quantity) {
          return res.status(400).json({
            error: `Not enough stock for Merchandise ID ${item.merchandiseId}`,
          });
        }
      }
    }

    // 2. Calculate total
    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    // 3. Use transaction to create order and update stock/sold
    const order = await prisma.$transaction(async (tx) => {
      const createdOrder = await tx.order.create({
        data: {
          userId,
          total,
          status: "PENDING",
          orderItems: {
            create: items.map((i) => ({
              ticketId: i.ticketId || null,
              merchandiseId: i.merchandiseId || null,
              quantity: i.quantity,
              price: i.price,
            })),
          },
        },
        include: { orderItems: true },
      });

      // 4. Update inventory
      for (const item of items) {
        if (item.ticketId) {
          await tx.ticket.update({
            where: { id: item.ticketId },
            data: { sold: { increment: item.quantity } },
          });
        }

        if (item.merchandiseId) {
          await tx.merchandise.update({
            where: { id: item.merchandiseId },
            data: { stock: { decrement: item.quantity } },
          });
        }
      }

      return createdOrder;
    });

    res.status(201).json(order);
  } catch (err) {
    console.error("Order creation failed:", err);
    res.status(500).json({ error: "Failed to create order" });
  }
};

export const getUserOrders = async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await prisma.order.findMany({
      where: { userId: Number(userId) },
      include: {
        orderItems: {
          include: {
            ticket: {
              include: {
                event: true,
              },
            },
            merchandise: true,
          },
        },
      },
    });

    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get orders" });
  }
};
