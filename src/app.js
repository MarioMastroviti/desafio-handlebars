const express = require('express');
const handlebars = require('express-handlebars');
const app = express();
const productsRouter = require('../src/routes/products.router');
const cartRouter = require('../src/routes/cart.router');
const path = require('path');
const productos = require('./managers/contenedor');





const PORT = 8080;

app.engine("handlebars", handlebars.engine() )
app.set("views", __dirname + "/views")
app.set('view engine', 'handlebars');
app.use("/", express.static(__dirname + "/public"))

app.use(express.json());
app.use("/" , productsRouter);
app.use("/" , cartRouter);


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

