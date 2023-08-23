const express = require('express')
const ProductManager = require("../productManager.js");
const manager = new ProductManager("../product.json")
const app = express()

app.get('/saludo',(req,res)=> res.send('Hola a todos!'))

app.get("/products", async (req, res) => {
    let { limit } = req.query;
    let products = await manager.getProducts();
    res.send(products.slice(0, limit));
  });

  app.get ("/products/:pid", async(req, res)=> {
    let id = req.params.pid;
    let productId = await manager.getProductsById(id);
   !productId ?res.status(404).send("Product no found") : res.send(productId)
   
   });
   



const sv = app.listen(8080, () => console.log("Hola Mundo!"))

sv.on('error', error => console.log(error))