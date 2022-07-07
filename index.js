const express = require('express');
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT


const routerProductos = require('./rutas/rutasProducto')
const routerCarrito = require('./rutas/rutasCarritos')

const port = 8080;

app.use(express.json());
//app.use(express.urlencoded({ extended: true }));

app.use("/api/product", routerProductos);
app.use("/api/cart", routerCarrito);

app.use((req, res) => {
    res.status(404).json({
        error: "Ruta no encontrada",
    });
});


app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto: ${PORT}`)
})