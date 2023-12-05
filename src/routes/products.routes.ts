import { request, response, Router } from "express";

class ProductRoutes{
    public router: Router
    constructor(){
        this.router = Router()
        this.routes()
    }
    routes(){
        this.router.get('/products', (req, res,)=>{
            res.send('<H1>WELCOME FROM ROUTES / PRODUCTS</H1>')
        })
    }
}
const productRoutes = new ProductRoutes()

export default productRoutes.router