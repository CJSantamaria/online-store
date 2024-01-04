import { Request, Response } from "express";
import productSchema from "../models/product.model";
import mongoose from "mongoose";

class ProductsController {
  public constructor() {}

  // get a specific page of the list of products

  public async getProducts(req: Request, res: Response): Promise<Response> {
    const page: number = req.query.page ? <number>(<unknown>req.query.page) : 1;
    const limit: number = req.query.limit
      ? <number>(<unknown>req.query.limit)
      : 10;
    const startIndex: number = (page - 1) * limit;

    try {
      const products = await productSchema.find().skip(startIndex).limit(limit);
      return res.status(200).send(products);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }

  //get a single product by using its ID

  public async getProduct(req: Request, res: Response): Promise<Response> {
    try {
      const product = await productSchema.findOne({ _id: req.params.pid });
      if (product) {
        return res.status(200).send(product);
      } else {
        return res.status(404).json({ msg: "No product matches that ID" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: error.message });
    }
  }

  // create a new product

  public async createProduct(req: Request, res: Response): Promise<Response> {
    const product = new productSchema(req.body);
    try {
      await product.save();
      return res.status(201).json({ msg: "Product successfully created" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }

  // update a product

  public async updateProduct(req: Request, res: Response): Promise<Response> {
    if (!req.params.pid)
      return res.status(400).json({ msg: "Bad request: missing product ID" });
    try {
      await productSchema.updateOne(
        { _id: req.params.pid },
        { $set: req.body }
      );
      return res.status(200).json({ msg: "Product successfully updated" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // delete a product

  public async deleteProduct(req: Request, res: Response): Promise<Response> {
    if (!mongoose.Types.ObjectId.isValid(req.params.pid))
      return  res.status(400).json({ msg: "Bad request: invalid product ID" });
    try {
      const product = await productSchema.findById(req.params.pid);
      if (product) {
        await productSchema.findByIdAndDelete(req.params.pid);
        return res.status(200).json({ msg: "Product successfully deleted" });
      } else {
        return res.status(404).json({ msg: "No product matches that ID" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }
}

const productsController = new ProductsController();
export { productsController };
