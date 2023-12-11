import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import Product from "../types/product";
import { dataFromFile } from "../helpers/data.helper";

export class ProductsController {
  public constructor() {}

  public getProducts(req: Request, res: Response) {
    const products = dataFromFile.products;
    try {
      console.log(products);
      res.send(products);
    } catch (error) {
      console.log(error);
      return res.json({ msg: "An error has ocurred" });
    }
  }
  public async getProduct(req: Request, res: Response): Promise<void> {
    res.send("<h1>Hello from get singular product in the controller</h1>");
  }
  public async createProduct(req: Request, res: Response): Promise<void> {
    const products = dataFromFile.products;
    const id = uuidv4();
    const {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    } = req.body;
    const product: Product = {
      id,
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    };
    products.push(product);
    console.log(products);

    res.json({ msg: "Product successfully created" });
  }
}

const productsController = new ProductsController();
export { productsController };
