import { Router } from "express";
const viewsRouter = Router()
import ProductManager from "../productManager.js"
const manager = new ProductManager("./src/products.json")


viewsRouter.get('/realtimeproducts', async (req,res)=> { 

   const products = await manager.getProducts()
   res.render('home', {products})
   
   req.context.socketSv.on('connection',(socket) => {
      console.log( `Cliente conectado con el id ${socket.id}`);
      req.context.socketSv.emit('products',products)
  
  })
  
   


})

export default viewsRouter;