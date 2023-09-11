
const fs = require('fs')

class ProductManager {
    constructor(path) {
        this.path = path;
        const fileExists = fs.existsSync(path)
        if (!fileExists) {
            fs.writeFileSync(this.path, '')
        }
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        let id = 1;
        let products = await this.getProducts()

        const product = products[products.length - 1]
        if (product) {
            id = product.id + 1;
        }

        const keyValueArray = [
            { key: 'title', value: title },
            { key: 'description', value: description },
            { key: 'price', value: price },
            { key: 'thumbnail', value: thumbnail },
            { key: 'code', value: code },
            { key: 'stock', value: stock },
            { key: 'id', value: id }
        ]

        if (this.validateProduct(keyValueArray, products)) {
            const newProduct = keyValueArray.reduce((obj, item) => {
                obj[item.key] = item.value;
                return obj;
            }, {})
            products = [...products, newProduct]
            await fs.promises.writeFile(this.path, JSON.stringify(products))
            console.log('Product added successfully.')
        }
    }

    async getProducts() {
        const products = await fs.promises.readFile(this.path, 'utf-8');
        if (products) {
            return JSON.parse(products)
        }
        else {
            return []
        }
    }
    async getProductById(id) {
        const products = await this.getProducts()
        const result = products.find(x => x.id === id)
        if (result) {
            console.table(result);
            return result;
        }
        else {
            console.log('Not found.')
        }
    }
    async deleteProduct(id) {
        const products = await this.getProducts()
        const result = products.find(x => x.id === id)

        if (result) {
            let filteredProducts = products.filter(x => x.id !== result.id)
            await fs.promises.writeFile(this.path, JSON.stringify(filteredProducts))
            console.log('Product has been deleted.')
        }
        else {
            console.log('Not found.')
        }
    }
    async updateProduct(id, property, value) {
        let products = await this.getProducts()
        let product = await this.getProductById(id)
        const keys = Object.keys(product)

        if (!product) {
            console.log('Not found')
            return;
        }

        if (!keys.includes(property)) {
            console.log(`'${property}' is not a valid property`)
            return;
        }

        try {
            product[property] = value;
            products = products.filter(x => x.id !== product.id)
            products = [...products, product]
            await fs.promises.writeFile(this.path, JSON.stringify(products))
            console.log('Product updated successfully.')
        }
        catch (err) {
            console.log(err)
        }
    }
    validateProduct(params, products) {
        let validation = true;

        params.forEach(element => {
            if (!element.value) {
                console.log(`Parameter '${element.key}' has no value.`)
                validation = false;
            }
        })

        const code = params.find(x => x.key === 'code')
        const product = products.find(x => x.code === code.value)

        if (product) {
            console.log('Duplicated product code.')
            validation = false;
        }
        return validation;
    }
}

module.exports = ProductManager