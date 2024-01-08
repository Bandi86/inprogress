import productsModel from '../models/products_model.js';

const productsService = {
    findAll() {
        return productsModel.findAll()
        .catch(err => {
            if (err.message === "DB_AUTH_FAIL") {
                throw new Error ("Internal server error")
            }})
    },

    async findOne(id) {
        if (!id) throw new Error ("Missing id params")
        const result = await productsModel.findOne(id)
        return result
    },

    async insert(product) {
        if (!product) throw new Error ("Missing product data")
        const result = await productsModel.insert(product)
        return result
    },

    async delete(id) {
        if (!id) throw new Error ("Missing id params")
        const result = await productsModel.delete(id)
        return (result.changes > 0)
    }
}

export default productsService;