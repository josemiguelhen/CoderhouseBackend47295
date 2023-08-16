const fs = require('fs')

class ProductManager {

    products;

    constructor() {

        this.products = []
        this.path = './products.json'

    }

    async getProducts() {

        const data = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
        return data
    }

    async getId() {
        let data = await this.getProducts()
        return data.length + 1;

    }

    async addProduct(title, description, price, thumbnail, code, stock) {

        const newProduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        try {

            if (!fs.existsSync(this.path)) {

                const emptyList = []
                emptyList.push({ ...newProduct, id: await this.getId() })

                await fs.promises.writeFile(this.path, JSON.stringify(emptyList, null, '\t'))

            }

            else {

                const data = await this.getProducts()
                const repeatCode = data.some(e => e.code == newProduct.code)
                repeatCode == true ? console.log("El codigo esta repetido") : data.push({ ...newProduct, id: await this.getId() })
                await fs.promises.writeFile(this.path, JSON.stringify(data, null, '\t'))

            }

        }

        catch (err) {
            console.log(err)

        }
    }

    async getProductsById(id) {

        const data = await this.getProducts()
        let productFind = data.find(e => e.id == id)
        return productFind === undefined ? console.log("Not found") : productFind

    }

    async deleteProduct(id) {
        const data = await this.getProducts()
        let i = data.findIndex(e => e.id === id)
        data.splice(i, 1)
        await fs.promises.writeFile(this.path, JSON.stringify(data))

    }

    async updateProducts(id, product) {
        let data = await this.getProducts()
        let i = data.findIndex(e => e.id === id)
        product.id = id
        data.splice(i, 1, product)
        await fs.promises.writeFile(this.path, JSON.stringify(data))

    }

}

const funcionAsync = async () => {
    const productManager = new ProductManager()
    console.log(await productManager.getProducts())
    await productManager.addProduct("producto 1", "Este es un producto prueba", 100, "Sin imagen", "def456", 30)
    await productManager.getProducts()
    await productManager.addProduct("producto 1", "Este es un producto prueba", 100, "Sin imagen", "def456", 30)
    console.log(await productManager.getProducts())
    await productManager.getProductsById(2)
    await productManager.addProduct("producto 2 ", "Este es un producto prueba 2", 180, "Sin imagen", "abc454", 12)
    await productManager.updateProducts(2, { "title": "producto prueba 2 ", "description": "Este es un producto prueba 2", "price": 180, "thumbnail": "Sin imagen", "code": "abc454", "stock": 12, "id": 3 })
    await productManager.deleteProduct(2)
};

funcionAsync()