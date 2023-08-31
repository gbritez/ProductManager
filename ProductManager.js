
export default class ProductManager {
    constructor() {
        this.products = []
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        let id = 1;

        const product = this.products[this.products.length - 1]
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

        if (this.validateProduct(keyValueArray)) {
            const newProduct = keyValueArray.reduce((obj, item) => {
                obj[item.key] = item.value;
                return obj;
            }, {})
            this.products = [...this.products, newProduct]
            console.log('Successfully added product.')
        }
    }

    getProducts() {
        console.table(this.products);
        return this.products;
    }

    getProductById(id) {
        const result = this.products.find(x => x.id === id)
        if (result) {
            console.table(result);
            return result;
        }
        else {
            console.log('Not found.')
        }
    }

    validateProduct(params) {
        let validation = true;

        params.forEach(element => {
            if (!element.value) {
                console.log(`Parameter '${element.key}' has no value.`)
                validation = false;
            }
        })

        const code = params.find(x => x.key === 'code')
        const product = this.products.find(x => x.code === code.value)

        if (product) {
            console.log('Duplicated product code.')
            validation = false;
        }
        return validation;
    }
}
