const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const productsRouter = require('../src/routes/products.router');
const cartRouter = require('../src/routes/cart.router');
const productos = require('./managers/contenedor');
const path = require('path');

const PORT = 8080;

//Config Handlebars
app.engine("handlebars", handlebars.engine())
app.set("views", path.join(__dirname, '/views'))
app.set("view engine", "handlebars")
app.use(express.static(path.join(__dirname, '/public')))



app.use(express.json());
app.use("/" , productsRouter);
app.use("/" , cartRouter);

//Routing
app.get("/", async(req, res)=>{
    let todosProductos = await productos.getAllProducts()  
        res.render("index", {
        titulo: "Lista de productos",
        products : todosProductos
        })
})

app.get("/:id", async(req, res)=>{
    const id = parseInt(req.params.id);
   let productoId = await productos.productById(id)  
        res.render("prod", {
        titulo: "Producto Filtrado",
        products : productoId
        })
})


app.listen(PORT, () => {
    console.log(`escuchando en el puerto ${PORT}`)
})

