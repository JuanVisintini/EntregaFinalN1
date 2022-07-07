const express = require("express");
const router = express.Router();

const { middlewareAutenticacion, middlewareAutorizacion } = require("../auth/auth")

const { guardarProductos, productosById, deletProduct, updateProducto } = require("../controlador/productos")

//GET
router.get("/:id?", middlewareAutenticacion, productosById);

//POST
router.post("/", middlewareAutenticacion, middlewareAutorizacion, guardarProductos);

//UPDATE
router.put("/:id", middlewareAutenticacion, middlewareAutorizacion, updateProducto);

//DELETE
router.delete("/:id", middlewareAutenticacion, middlewareAutorizacion, deletProduct);

module.exports = router;