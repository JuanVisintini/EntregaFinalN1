const express = require("express");
const router = express.Router();

const { middlewareAutenticacion, middlewareAutorizacion } = require("../auth/auth")


const { guardarCarrito, carritoById, deletCarrito, deletProductosByCarrito, guardarProductosByCarrito } = require("../controlador/carritos")


//GET
router.get("/:id/productos", middlewareAutenticacion, carritoById);

//POST
router.post("/", middlewareAutenticacion, guardarCarrito);
router.post("/:id/productos", middlewareAutenticacion, guardarProductosByCarrito);

//DELETE
router.delete("/:id/productos/:id_prod", middlewareAutenticacion, deletProductosByCarrito);
router.delete("/:id", middlewareAutenticacion, middlewareAutorizacion, deletCarrito);

module.exports = router;