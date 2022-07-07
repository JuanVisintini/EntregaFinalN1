const Contendor = require('../modelo/contenedor');

const carrito = new Contendor("carritos.json");
const producto = new Contendor("productos.json");



const guardarCarrito = async (req, res) => {
    try {
        const nuevoCarrito = {
            timestamp: new Date(),
            productos: [],

        }
        const id = await carrito.save(nuevoCarrito);
        res.status(200).json(id)
    }
    catch (e) {
        return res.status(400).json({
            error: e.message,
        });
    }
}

const carritoById = async (req, res) => {
    const id = req.params.id;
    try {
        const cartById = await carrito.getById(id);
        if (cartById) {
            return res.status(200).json(cartById);
        }
        else {
            throw new Error("No encontrado");
        }
    } catch (e) {
        return res.status(400).json({
            error: e.message,
        });
    }
}

const guardarProductosByCarrito = async (req, res) => {
    const id = req.params.id;
    const { idProducto } = req.body;

    try {
        if (idProducto) {
            const cart = await carrito.getById(id);
            const product = await producto.getById(idProducto);

            if (cart && product) {
                cart.productos.push(product);
                await carrito.update(id, cart);
                return res.status(200).json(cart)
            }
            else {
                throw new Error("No encontrado");
            }
        } else {
            throw new Error("No encontrado");
        }

    }
    catch (e) {
        return res.status(400).json({
            error: e.message,
        });
    }
}

const deletCarrito = async (req, res) => {
    try {
        const id = req.params.id;
        if (id) {
            const carritoEliminado = await carrito.deleteById(id);
            if (carritoEliminado) {
                res.status(200).json(`carrito eleminado con el id: ${id}`)
            } else {
                throw new Error("No encontrado");
            }
        }
    } catch (e) {
        return res.status(400).json({
            error: e.message,
        });
    }
}



const deletProductosByCarrito = async (req, res) => {
    const id = req.params.id;
    const idProducto = req.params.id_prod;

    try {
        if (id) {
            let cart = await carrito.getById(id);
            const cartByProducts = cart.productos.findIndex((element) => element.id == idProducto);
            if (cartByProducts == -1) throw new Error("Producto no encontrado");
            cart.productos.splice(cartByProducts, 1)
            await carrito.update(id, cart);
            return res.status(200).json(cart)
        } else {
            throw new Error("No encontrado");
        }

    }
    catch (e) {
        return res.status(400).json({
            error: e.message,
        });
    }
}

module.exports = {
    guardarCarrito, carritoById, deletCarrito, deletProductosByCarrito, guardarProductosByCarrito
}