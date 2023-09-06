import express  from 'express';
import ProductRouter from './routes/products.js'; 
import cartRouter from './routes/carts.js'; 
import viewsRouter from './routes/views.Router.js';
import handlebars from "express-handlebars"
import { Server } from 'socket.io';
import { __dirname } from './path.js';

const app = express()
const sv = app.listen(8080, () => console.log("Toy prendido mano"))
sv.on('error', error => console.log(error))
const socketSv = new Server(sv)

app.engine('handlebars', handlebars.engine())
app.set('views' + __dirname + 'views')
app.set('view engine','handlebars')
app.set('views','./src/views')
app.use(express.static('./src/public'))

app.use((req,res,next)=>{
req.context = {socketSv};
next()


})

app.use(express.json())
app.use(express.urlencoded({extended:true}))



app.use('/',viewsRouter)
app.use("/api/products", ProductRouter)
app.use("/api/carts", cartRouter)


