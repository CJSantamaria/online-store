import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import Cart from "../types/cart";
import { dataFile } from "../helpers/data.helper";

class CartsController {
  // create cart

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
      return res.send({ msg: "cart succcessfully created" });
    } catch (error) {
      return res.json({ error: error.message });
    }
  }

  // get cart by id

  public async getCart(req: Request, res: Response): Promise<Response> {
    try {
      const carts = await dataFile.readCartsFile();
      const cart = carts.find((c) => c.id === req.params.cid);
      if (cart) {
        return res.status(200).send(cart);
      } else {
        return res.status(404).json({ msg: "No cart matches that ID" });
      }
    } catch (error) {
      return res.json({ msg: error.message });
    }
  }

  // add product to the cart

  public async addProduct(req: Request, res: Response): Promise<Response> {
    try {
      const carts = await dataFile.readCartsFile();
      const cartIndex = carts.findIndex((c) => c.id === req.params.cid);
      if (cartIndex < 0)
        return res.status(404).json({ msg: "No cart matches that ID" });

      const products = await dataFile.readProductsFile();
      const product = products.find((p) => p.id === req.params.pid);
      if (!product)
        return res.status(404).json({ msg: "no product matches that ID" });
      const productIndex = carts[cartIndex].products.findIndex(
        (p) => p.pid === req.params.pid
      );
      if (productIndex < 0) {
        const product = {
          pid: req.params.pid,
          quantity: 1,
        };
        carts[cartIndex].products.push(product);
      } else {
        carts[cartIndex].products[productIndex].quantity += 1;
      }
      await dataFile.writeCartsFile(carts);
      return res
        .status(201)
        .json({ msg: "Product successfully added to the cart" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }
}

const cartsController = new CartsController();
export { cartsController };
