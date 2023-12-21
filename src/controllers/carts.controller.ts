import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import Cart from "../types/cart";
import { dataFile } from "../helpers/data.helper";
import { json } from "stream/consumers";

class CartsController {
  public async createCart(req: Request, res: Response): Promise<Response> {
    const id = uuidv4();
    const cart: Cart = {
      id,
      ...req.body,
    };
    try {
        const carts = await dataFile.readCartsFile();
        carts.push(cart);
        await dataFile.writeCartsFile(carts);
        return res.send({"msg": "cart succcessfully created"})
    } catch (error) {
        return res.json({"error": error.message})
    }
  }
}

const cartsController = new CartsController();
export { cartsController };
