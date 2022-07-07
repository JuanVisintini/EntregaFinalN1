const Contendor = require('../modelo/contenedor');

const carrito = new Contendor("carritos.json");
const producto = new Contendor("productos.json");

const guardarCarrito = async (req, res) => {
    try{
        const nuevoCarrito = {
            producto: [],
            timestam: new Date(),

         }
        const id = await carrito.save(nuevoCarrito);
        res.status(200).json(id)
        } 
    catch(e){
        console.log(e);
    }
}

const carritoById = async (req, res) => {
    const id = req.params.id;
    try {
        const cartById = await carrito.getById(id);
        if(cartById) {
        return res.status(200).json(cartById);
        }
        else{
        console.log(`No hay carritos con el id ${id}`)
        }    
    } catch(e){
        console.log(e);
    }
}

const deletCarrito = async (req, res) => {
    try{
        const id = req.params.id;
        if(id){
            const carritoEliminado = await carrito.deleteById(id);
            if(carritoEliminado){
                res.status(200).json(`carrito eleminado con el id: ${id}`)
            }else{
                console.log(`No existe el carrito con el id: ${id}`)
            }
        }
    }catch(e){
        console.log(e);
    }
}

const guardarProductosByCarrito = async (req, res) => {
    const id = req.params.id;
    const { idProducto } = req.body;
    console.log(req.params)
    console.log(req.body)

        try{
            if(idProducto){
            const cart = await carrito.getById(id);
            const product = await producto.getById(idProducto);
            console.log(product)
            if(cart && product){
              cart.producto.push(product);
              await carrito.update(id, cart);
              return res.status(200).json(cart)
            }else{
                console.log(`no existe el carrito o el producto que estas pasando`)
           }
         }else{
            console.log("no hay productos con ese id")
         }
            
        }
        catch(e){
            console.log(e, "no paso nada")
        }
}

const deletProductosByCarrito = async (req, res) => {
    const {id, idProducts} = req.params;
    try{
        const cart = await carrito.getById(id);
        let cartByProducts = cart.producto.find((element) => element.id == idProducts);
        if(cartByProducts){
            cartByProducts = cartByProducts.filter (producto => producto.id != idProducts);
            cart.product = cartByProducts

            const cartlist = cart.filter(cart => cart.id != idProducts);
            cartlist.push(cart);

            await carrito.updadte(id, cartlist);
        }else{
            console.log( "no existe el carrito")
        }

    }
    catch(e){
        console.log(e);
    }
}

module.exports = {
    guardarCarrito, carritoById, deletCarrito,deletProductosByCarrito, guardarProductosByCarrito
}