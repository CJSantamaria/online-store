import e, { Request, Response } from "express";
import Cart from "../models/cart.model";
import Product from "../models/product.model";
import mongoose from "mongoose";
import { promiseHooks } from "v8";

type cartProduct = {
  productId: mongoose.Types.ObjectId;
  quantity: number;
};

type cartProducts = cartProduct[];

class CartsController {
  // create cart

  public async createCart(req: Request, res: Response): Promise<Response> {
    const receivedProducts = req.body.products;

    const verifiedProducts: cartProducts = [];
    try {
      await Promise.all(
        receivedProducts.map(async (p: cartProduct) => {
          const product = await Product.findById(p.productId);
          if (product) {
            verifiedProducts.push({
              productId: p.productId,
              quantity: p.quantity,
            });
          } else {
            console.error(`product ${p.productId} does not exist`);
          }
        })
      );
      if (verifiedProducts.length > 0) {
        const cartObject = {
          products: verifiedProducts,
        };
        Cart.create(cartObject);
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
      const productInCatalog = await Product.findById(pid);
      if (!productInCatalog) {
        return res.status(404).json({ msg: "No product matches that ID" });
      }
      const productIncart = cart.products.find(
        (p) => String(p.productId) === pid
      );

      if (productIncart) {
        productIncart.quantity += 1;
      } else {
        const newProduct: cartProduct = {
          productId: new mongoose.Types.ObjectId(pid),
          quantity: 1,
        };
        cart.products.push(newProduct);
      }
      await cart.save();
      return res
        .status(201)
        .json({ msg: "Product successfully added to the cart" });
    } catch (error) {
      return res.json({ msg: error.message });
    }
  }

  // remove product from the cart

  public async removeProduct(req: Request, res: Response): Promise<Response> {
    const { cid, pid } = req.params;
    try {
      const product = await Product.findById(pid);
      if (!product) {
        return res.status(404).json({ msg: "No product matches that ID" });
      }
      const cart = await Cart.findById(cid);
      if (!cart) {
        return res.status(404).json({ msg: "No cart matches that ID" });
      }
      const cartInProduct = cart.products.find(
        (p) => String(p.productId) === pid
      );
      if (!cartInProduct) {
        return res.status(404).json({ msg: "Product not found in the cart" });
      }
      await Cart.findByIdAndUpdate(
        cid,
        { $pull: { products: { productId: pid } } },
        { new: true }
      );
      return res.status(200).json({ msg: "Product successfully removed" });
    } catch (error) {
      return res.json({ msg: error.message });
    }
  }

  // update the whole cart

  public async updateCart(req: Request, res: Response): Promise<Response> {
    const receivedProducts = req.body.products;
    const verifiedProducts: cartProducts = [];
    try {
      await Promise.all(
        receivedProducts.map(async (p: cartProduct) => {
          const productInCatalog = await Product.findById(p.productId);
          if (productInCatalog) {
            verifiedProducts.push({
              productId: p.productId,
              quantity: p.quantity,
            });
            console.log(`Product ${p.productId} added to the cart`);
          }
        })
      );
      if (verifiedProducts.length > 0) {
        await Cart.findByIdAndUpdate(req.params.cid, {
          products: verifiedProducts,
        });
      } else {
        return res.status(404).json({ msg: "No products match those IDs" });
      }
      return res
        .status(200)
        .json({ msg: "Cart contents successfully updated" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }

  // update product quantity

  public async updateProductQuantity(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    try {
      const cart = await Cart.findById(cid);
      if (!cart) {
        return res.status(404).json({ msg: "No cart matches that ID" });
      }
      const productIncart = cart.products.find(
        (p) => String(p.productId) === pid
      );
      if (!productIncart) {
        return res.status(404).json({ msg: "Product not found in the cart" });
      }
      productIncart.quantity = quantity;
      await cart.save();
      return res.status(200).json({ msg: "Product quantity updated" });
    } catch (error) {
      return res.json({ msg: error.message });
    }
  }

  // delete cart

  public async deleteCart(req: Request, res: Response): Promise<Response> {
    try {
      const cart = await Cart.findById(req.params.cid);
      if (!cart) {
        return res.status(404).json({ msg: "No cart matches that Id" });
      }

      await Cart.findByIdAndUpdate(req.params.cid, {$pull: {products: { $exists: true}}})

      return res
        .status(200)
        .json({ msg: "Cart contents successfully removed" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }
}

const cartsController = new CartsController();
export { cartsController };
