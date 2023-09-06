import { Router } from "express";
const ProductRouter = Router()
import ProductManager from "../productManager.js"
const manager = new ProductManager("./src/products.json")


let productAdd = {
    title: "Test Product",
    descripction: "Test Description",
    price: 3100,
    thumbnail: "No image available",
    code: 1123,
    stock: 5,
    status: true,
  };



ProductRouter.get("/", async (req, res) => {
    let { limit } = req.query;
    let products = await manager.getProducts();
    res.send(products.slice(0, limit));
  });




  ProductRouter.get("/:pid", async(req, res)=> {
    let id = req.params.pid;
    let productId = await manager.getProductsById(id);
   !productId ?res.status(404).send("Product no found") : res.send(productId)
   
   });


    ProductRouter.post("/", async(req,res)=> { 
      productAdd = req.body
    await manager.addProduct(productAdd)
    res.send("Succesfully added")
 })
 

    ProductRouter.put("/:pid" , async(req,res)=>{

        let id = parseInt(req.params.pid);
        let update = req.body;
        await manager.updateProducts(id, update);
        res.send("updated product");


    })

     
    ProductRouter.delete("/:pid" , async (req , res)=> {
   
        let id = parseInt (req.params.pid);
        await manager.deleteProduct(id)
        res.send("Deleted Product")
    })

   

   export default ProductRouter;