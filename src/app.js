const fs = require('fs');
const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const productsRouter = require('../src/routes/products.router');
const cartRouter = require('../src/routes/cart.router');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const productos = require('./managers/contenedor');

const server = http.createServer(app);
const io = new Server(server);

// Configuración de Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

// Configuración de archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de rutas y middleware
app.use(express.json());
app.use('/', productsRouter);
app.use('/', cartRouter);

// Ruta principal para renderizar la página realTimeProducts
app.get('/', (req, res) => {
    res.render('realTimeProducts', {
        titulo: 'Productos en tiempo real'
    });
});


io.on("connection", async(socket) => {
    
    const products = await productos.getAllProducts();
    io.emit('productosActualizados', products);

      socket.on('disconnect', () => {
        console.log('Un usuario se ha desconectado');
      })
      })
          


const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});