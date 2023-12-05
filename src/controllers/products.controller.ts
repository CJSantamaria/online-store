import { Request, Response } from "express";

export class ProductsController{
    public constructor(){
    }
    public getProducts(req: Request, res: Response): void{
        res.send('<h1>Hello from get products in the controller!! </h1>')
    }
    public getProduct(req: Request, res:Response): void{
        res.send('<h1>Hello from get singular product in the controller</h1>')
    }
}

const productsController = new ProductsController()
export { productsController }

