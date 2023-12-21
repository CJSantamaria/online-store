import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import Cart from "../types/cart";
import { dataFile } from "../helpers/data.helper";

class CartsController{
    public async createCart(req: Request, res:Response){

    }
}

const cartsController = new CartsController
export {cartsController}