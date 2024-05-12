const path = require('path');
const express = require('express');
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const app = express();
const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.post("/api/users", async (req, res) => {
  const { name, job } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        name,
        job,
      },
    });
    res.status(201).json({ 
      message: "Succesfully Create User!",
      user 
    });
  } catch (err) {
    res.status(400).json({ message: "User already exists" });
  }
});

app.put("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {name, job } = req.body;
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        name,
        job
      },
    });
    res.status(200).json({ 
      message: "Succesfully Update User!",
      user 
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Something went wrong" });
  }
});

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

if (process.env.NODE_ENV != "test"){

  app.listen(port, () =>{
      console.log(`Server Running in port ${port}`)
  })
}