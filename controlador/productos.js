const Contendor = require('../modelo/contenedor');

const producto = new Contendor("productos.json");

const guardarProductos = async (req, res) => {
    const { nombre, descripcion, codigo, fotoUrl, precio, stock } = req.body;

    try {
        const nuevoproducto = {
            nombre,
            descripcion,
            codigo,
            fotoUrl,
            precio,
            stock,
            timestamp: new Date()
        }
        const id = await producto.save(nuevoproducto);
        res.status(200).json(id)
    }
    catch (e) {
        return res.status(400).json({
            error: e.message,
        });
    }
}

const productosById = async (req, res) => {
    const id = req.params.id;
    try {
        if (id) {
            const productById = await producto.getById(id);
            if (productById) {
                return res.status(200).json(productById);
            }
            else {
                throw new Error("No encontrado");
            }
        } else {
            const products = await producto.getAll();
            if (products) {
                return res.status(200).json(products);
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

const deletProduct = async (req, res) => {
    try {
        const id = req.params.id;
        if (id) {
            const productoEliminado = await producto.deleteById(id);
            if (productoEliminado) {
                res.status(200).json(`producto eleminado con el id: ${id}`)
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

const updateProducto = async (req, res) => {
    const id = req.params.id;
    try {
        const { nombre, descripcion, codigo, fotoUrl, precio, stock } = req.body;
        const prodcutoUpdate = await producto.getById(id);

        if (prodcutoUpdate) {
            let nuevoObjeto = {
                nombre: nombre || prodcutoUpdate.nombre,
                descripcion: descripcion || prodcutoUpdate.descripcion,
                codigo: codigo || prodcutoUpdate.prodcutoUpdate.codigo,
                fotoUrl: fotoUrl || prodcutoUpdate.fotoUrl,
                precio: precio || prodcutoUpdate.precio,
                stock: stock || prodcutoUpdate.stock
            };

            nuevoObjeto = await producto.update(id, nuevoObjeto);
            res.status(201).json({ message: `se modifico el producto con el id: ${id}`, nuevoObjeto })
        } else {
            throw new Error("No encontrado");
        }
    } catch (e) {
        return res.status(400).json({
            error: e.message,
        });
    }
}

module.exports = {
    guardarProductos, productosById, deletProduct, updateProducto,
}