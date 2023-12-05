import { Request, Response, Router } from "express";
import { productsController } from "../controllers/products.controller";

class ProductRoutes{
    public router: Router
    constructor(){
        this.router = Router()
        this.routes()
    }
    routes(){
        this.router.get('/', productsController.getProducts)
        this.router.get('/:id', productsController.getProduct)
    }
}
const productsRoutes = new ProductRoutes()

export default productsRoutes.router