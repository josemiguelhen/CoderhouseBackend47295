import express  from 'express';
const app = express()
import ProductRouter from './routes/products.js'; 
import cartRouter from './routes/carts.js'; 

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/products", ProductRouter)
app.use("/api/carts", cartRouter)




const sv = app.listen(8080, () => console.log("Hola mundo!"))

sv.on('error', error => console.log(error))