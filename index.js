const express = require('express');
const app = express();
const routerProductos = require('./rutas/rutasProducto')
const routerCarrito = require('./rutas/rutasCarritos')

const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use("/api/product", routerProductos);
app.use("/api/cart", routerCarrito);


app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto: ${port}`)
})