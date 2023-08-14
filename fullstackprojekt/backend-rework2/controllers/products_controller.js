import productsService from "../services/products_service.js";

const productsController = {
    getAll(req, res, next) {
        productsService.findAll()
        .then((products) => res.send({products}))
        .catch(err => next(err))
    },

    getOne(req, res, next) {
        productsService.findOne(req.params.id)
        .then((product) => res.send({product}))
        .catch(err => next(err))
    },

    insert(req, res, next) {
        productsService.insert(req.body)
        .then((product) => res.send({product}))
        .catch(err => next(err))
    },


    delete(req, res, next) {
        const {id} = req.params;
        if (!id) throw new Error ("Missing id params", 400)
        productsService.delete(id)
        .then(() => res.send({message: "Product deleted"}))
        .catch(err => next(err)) 
    }
}

export default productsController