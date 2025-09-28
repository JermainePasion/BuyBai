require("dotenv").config();               // <-- load variables first
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");  
const Product = require("./models/product.model.js");
const productRoute = require("./routes/product.route.js");
const usersRoute = require("./routes/user.route.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const users = [];

app.use(cors({
  origin: "http://localhost:5173",   // allow your frontend dev server
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// user routes
app.use("/users/login", usersRoute);

app.get("/users", (req, res) => res.json(users));

app.post("/users", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { name: req.body.name, password: hashedPassword };
    users.push(user);
    res.status(201).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/users/login", async (req, res) => {
  const user = users.find(u => u.name === req.body.name); // fixed comparison
  if (!user) return res.status(400).send("Cannot find user!");
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send("Success!");
    } else {
      res.send("Wrong Username/Password");
    }
  } catch {
    res.status(500).send();
  }
});

// product routes
app.use("/api/products", productRoute);

app.get("/", (req, res) => res.send("Hello from Node API"));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running on http://localhost:${process.env.PORT || 3000}`);
    });
  })
  .catch(err => console.error("Error connecting to MongoDB:", err));

app.use(cors());
