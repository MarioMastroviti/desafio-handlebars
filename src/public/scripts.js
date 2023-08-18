const productList = document.getElementById('productList');
const socket = io();

socket.on('connect', () => {
    console.log('Conexión establecida');
});

socket.on('productosActualizados', (products) => {
    renderProducts(products);
    console.log('Productos actualizados:', products);
});


function renderProducts(products) {
    productList.innerHTML = '';
    products.forEach((product) => {
        const li = document.createElement('li');
        li.textContent = `${product.titulo} - ${product.precio}`;
        productList.appendChild(li);
    });
}