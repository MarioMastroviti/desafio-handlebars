const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const productsRouter = require('../src/routes/products.router');
const cartRouter = require('../src/routes/cart.router');
const productos = require('./managers/contenedor');
const path = require('path');

const PORT = 8080;

app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs',
  exphbs.create({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs'
}).engine);

app.set('view engine', '.hbs');



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

