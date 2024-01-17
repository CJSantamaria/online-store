import e, { Request, Response } from "express";
import Cart from "../models/cart.model";
import Product from "../models/product.model";
import mongoose from "mongoose";

class CartsController {
  // create cart

  public async createCart(req: Request, res: Response): Promise<Response> {
    const receivedProducts = req.body.products;

    type Products = {  
      productId: mongoose.Schema.Types.ObjectId;
      quantity: number;
    }[];

    const verifiedProducts: Products = [];
    try {
      await Promise.all(
        receivedProducts.map(async (p: any) => { 
          const product = await Product.findById(p.pid);
          if (product) {  
            verifiedProducts.push({
              productId: p.pid,
              quantity: p.quantity,
            });
          } else {
            console.error(`product ${p.pid} does not exist`);
          }
        })
      );
      if (verifiedProducts.length > 0) {
        const cartObject = {
          products: verifiedProducts,
        };
        const cart = Cart.create(cartObject);
      } else {
        return res.status(404).json({ msg: "No products match those IDs" });
      }
      return res.status(201).json({ msg: "cart succcessfully created" });
    } catch (error) {
      return res.json({ msg: error.message });
    }
  }

  // get cart by id

  public async getCart(req: Request, res: Response): Promise<Response> {
    try {
      const cart = await Cart.findOne({ _id: req.params.cid });
      if (cart) {
        return res.status(200).send(cart);
      }

      return res.status(404).json({ msg: "No cart matches that ID" });
    } catch (error) {
      return res.json({ msg: error.message });
    }
  }

  // add product to the cart

  public async addProduct(req: Request, res: Response): Promise<Response> {
    const { cid, pid } = req.params;
    try {
      const cart = await Cart.findById(cid);
      if (!cart) {
        return res.status(404).json({ msg: "No cart matches that ID" });
      }
      const product = await Product.findById(pid);
      if (!product) {
        return res.status(404).json({ msg: "No product matches that ID" });
      }
      const existingProduct = cart.products.find(
        (p: any) => String(p.productId) === pid
      );
      if (existingProduct) {
        existingProduct.quantity = Number(existingProduct.quantity) + 1;
      } else {
        const productId = new mongoose.Schema.Types.ObjectId(pid);
        cart.products.push({ productId, quantity: 1 });
      }
      await cart.save();
      return res
        .status(201)
        .json({ msg: "Product successfully added to the cart" });
    } catch (error) {
      return res.json({ msg: error.message });
    }
  }
}

const cartsController = new CartsController();
export { cartsController };
