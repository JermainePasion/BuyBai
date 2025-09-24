const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Product = require('./models/product.model');

app.use(express.json());

app.get('/', (req, res) => {

    res.send("Hello from Node API");
}); 

app.get('/api/products', async(req, res) => {
  try{
    const products = await Product.find({});
    res.status(200).json(products);
  }
  catch{
    (error => {
      res.status(500).json({message: error.message});
    })
  }
});

app.get('/api/product/:id', async (req, res) => {
  try{
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  }
  catch (error) {
    res.status(500).json({message: error.message});
    
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  }
  catch{(error) => {
      res.status(500).json({message: error.message})
  }

  }
});


// Update product by ID
app.put('/api/product/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(id, req.body);
    if(!product){
      return res.status(404).json({message: "Product not found"});
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  
  }
  catch (error) {
    res.status(500).json({message: error.message});

  }
});

mongoose.connect
("mongodb+srv://roldlearns_db_user:vG8ilxGoF5n2kfSu@mongodb.0kjr38w.mongodb.net/Node-API?retryWrites=true&w=majority&appName=MongoDB")

.then(() => {
  console.log("Connected to MongoDB");
  app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
});

})
.catch(() => {
  console.error("Error connecting to MongoDB")
});
