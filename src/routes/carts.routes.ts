import { request, response, Router } from "express";

class CartsRoutes {
    public router: Router
    constructor(){
        this.router = Router()
        this.routes()
    }
    routes(){
        this.router.get('/carts', (req, res)=>{
            res.send('<h1>HEllo from carts route!!</h1>')
        })
    }
}

const cartsRoutes =  new CartsRoutes()
export default cartsRoutes.router