const fs = require('fs')


class Contendor {
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo
    }

    save = async (producto) => {
        try {
            let arrayObjetc = []
            if (fs.existsSync(this.nombreArchivo)) {
                const allData = await this.getAll();
                const id = allData[allData.length - 1].id + 1;
                producto.id = id
                allData.push(producto);
                await fs.promises.writeFile(
                    this.nombreArchivo,
                    JSON.stringify(allData)
                );
                console.log(`Se creo el producto con el id ${producto.id}`)
                return producto.id
            } else {
                producto.id = 1;
                arrayObjetc.push(producto);
                await fs.promises.writeFile(
                    this.nombreArchivo,
                    JSON.stringify(arrayObjetc)
                )
                console.log(`Se creo el producto con el id ${producto.id}`)
                return producto.id
            }
        } catch (e) {
            console.error(`Error al guardar el objeto: ${e.message}`);
        }
    }


    getAll = async () => {
        try {
            let data = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
            return JSON.parse(data)
        } catch (e) {
            console.error(`Error al mostrar los objetos: ${e.message}`);
        }
    }

    getById = async (id) => {
        try {
            const todos = await this.getAll();
            let objetoId = todos.find((element) => element.id == id);
            if (objetoId) {
                return objetoId
            } else {
                console.log(`No se encuentra el objeto con el id ${id}`)
            }
        } catch (e) {
            console.error(`Error al guardar el objeto: ${error.message}`);
        }
    }



    deleteById = async (id) => {
        try {
            const objetoDeleted = await this.getById(id)
            if (objetoDeleted) {
                const todos = await this.getAll();
                let arrayWithoutObject = todos.filter((element) => element.id != id);
                if (arrayWithoutObject) {
                    await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(arrayWithoutObject))
                }
                return objetoDeleted;
            } else {
                console.log("no existe ese objeto");
            }
        } catch (e) {
            console.log(e, "Erorr al borrar por id")
        }

    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(this.nombreArchivo, "[]")
            console.log("Se borraron los elementos ")
        } catch (e) {
            console.log(e, "Error al borrar todos los elementos")
        }
    }

    update = async (id, nuevoObjeto) => {
        try {
            const todos = await this.getAll();
            const result = todos.findIndex((element) => element.id == id);
            if (id) {
                nuevoObjeto.id = parseInt(id);
                todos[result] = nuevoObjeto;
                await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(todos));
                return nuevoObjeto;
            } else {
                console.log(`No se encontro el objeto con el: ${id}`)
            }
        } catch (e) {
            console.log(e, "Error al modificar el elemento")
        }
    }

}

module.exports = Contendor;