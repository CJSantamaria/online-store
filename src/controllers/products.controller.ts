import { Request, Response } from "express";
import productSchema from "../models/product.model";
import mongoose from "mongoose";
import getLink from "../helpers/string.helper";

class ProductsController {
  public constructor() {}

  // get a specific page of the list of products

  public async getProducts(req: Request, res: Response): Promise<Response> {
    const page: number = req.query.page ? Number(req.query.page) : 1; // pagination
    const limit: number = req.query.limit
      ? <number>(<unknown>req.query.limit)
      : 10;
    const startIndex: number = (page - 1) * limit;

    // query results filtering

    const categoryRegex = new RegExp(`^${req.query.category}$`, "i"); // category case insensitive comparison
    const anyRegex = new RegExp("^.*$");
    const categoryFilter = req.query.category
      ? { $regex: categoryRegex }
      : { $regex: anyRegex };
    const stockFilter = req.query.stock ? <string>req.query.stock : "0";
    const statusFilter = req.query.status
      ? <string>req.query.status
      : { $exists: true };

    // query results sorting

    type SortOption = "asc" | "desc" | null;
    const sortOrder: SortOption = req.query.sort
      ? <SortOption>req.query.sort
      : null;

    try {
      const [products, total] = await Promise.all([
        productSchema
          .find({
            category: categoryFilter,
            status: statusFilter,
            stock: { $gte: stockFilter },
          })
          .skip(startIndex)
          .limit(limit)
          .sort(sortOrder === null ? {} : { price: sortOrder }),
        productSchema.countDocuments({
          category: categoryFilter,
          status: statusFilter,
          stock: { $gte: stockFilter },
        }),
      ]);
      const totalPages = Math.ceil(total / limit);
      const prevPage = page > 1 ? page <= totalPages ? page - 1 : totalPages : null;
      const nextPage = page < totalPages ? page + 1 : null;
      const hasPrevPage = prevPage !== null;
      const hasNextPage = nextPage !== null;
      const prevLink = hasPrevPage ? getLink(req.url, page, totalPages, "prev") : "";
      const nextLink = hasNextPage ? getLink(req.url, page, totalPages, "next") : "";
      return res.status(200).json({
        payload: products,
        totalPages,
        page,
        prevPage,
        nextPage,
        hasPrevPage,
        hasNextPage,
        prevLink,
        nextLink,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }

  //get a single product by using its ID

  public async getProduct(req: Request, res: Response): Promise<Response> {
    try {
      const product = await productSchema.findById(req.params.pid );
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
      return res.status(400).json({ msg: "Bad request: invalid product ID" });
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
