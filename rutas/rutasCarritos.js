const express = require("express");
const router = express.Router();

const {guardarCarrito, carritoById, deletCarrito, deletProductosByCarrito, guardarProductosByCarrito} = require("../controlador/carritos")

router.get("/:id/productos", carritoById);

router.post("/", guardarCarrito);
router.post("/:id/productos", guardarProductosByCarrito);

router.delete("/:id/productos/:id_prod", deletProductosByCarrito);
router.delete("/:id", deletCarrito);

module.exports = router;