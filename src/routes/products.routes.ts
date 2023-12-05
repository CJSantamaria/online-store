import { Request, Response, Router } from "express";
import getProducts from "../controllers/products.controller";

class ProductRoutes{
    public router: Router
    constructor(){
        this.router = Router()
        this.routes()
    }
    routes(){
        this.router.get('/product', (req, res,)=>{
            res.send('<H1>WELCOME FROM ROUTES / PRODUCTS</H1>')
        })
        this.router.get('/products', getProducts)
    }
    // this.router.get('/products', ProductsController.getProducts())
}
const productsRoutes = new ProductRoutes()

export default productsRoutes.router