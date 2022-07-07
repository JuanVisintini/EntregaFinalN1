const express = require("express");
const router = express.Router();

const {guardarProductos, productosById, deletProduct, updateProducto} = require("../controlador/productos")

router.get("/:id?", productosById);

router.post("/", guardarProductos);

router.put("/:id", updateProducto);

router.delete("/:id", deletProduct);

module.exports = router;