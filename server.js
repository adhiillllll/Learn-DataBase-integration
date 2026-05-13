const express = require("express");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Running");
});

app.post("/users", async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    });

    res.json(user);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});