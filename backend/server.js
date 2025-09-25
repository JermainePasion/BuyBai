const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.model.js");
const productRoute = require("./routes/product.route.js");
const app = express();
const bcrypt = require("bcrypt")

app.use(express.json());

const users = []

app.get('/users', (req, res) => {
  
  res.json(users);

});

app.post('/users', async (req, res) =>{
  try{

    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = {name: req.body.name, password: hashedPassword}
    users.push(user);
    res.status(201).send();
  }
  catch (error) {
            res.status(500).json({ message: error.message });
  }
});

app.post('/users/login', async (req, res) => {
  const user = users.find(user => user.name = req.body.name)
  if (user == null) {
    return res.status(400).send('Cannot find user!')
  }
  try{
    if (await bcrypt.compare(req.body.password, user.password)){
      res.send('Success!')
    }
    else{
      res.send('Wrong Username/Password')
    }

  }
  catch{
    res.status(500).send()

  }


});


// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//routes
app.use("/api/products", productRoute);



app.get("/", (req, res) => {
  res.send("Hello from Node API");
});

mongoose
  .connect(
    "mongodb+srv://roldlearns_db_user:vG8ilxGoF5n2kfSu@mongodb.0kjr38w.mongodb.net/Node-API?retryWrites=true&w=majority&appName=MongoDB"
  )

  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000");
    });
  })
  .catch(() => {
    console.error("Error connecting to MongoDB");
  });
