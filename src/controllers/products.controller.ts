import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import Product from "../types/product";
import { dataFile } from "../helpers/data.helper";

export class ProductsController {
  public constructor() {}

  // get the whole list of products

  public async getProducts(req: Request, res: Response): Promise<Response> {
    try {
      const products: Product[] = await dataFile.readProductsFile();
      return res.status(200).send(products);
    } catch (error) {
      return res.json({ msg: "An error has ocurred" });
    }
  }

  //get a single product by using its ID

  public async getProduct(req: Request, res: Response): Promise<Response> {
    try {
      const products: Product[] = await dataFile.readProductsFile();
      const product = products.find((p) => p.id === req.params.id);
      if (product) {
        return res.status(200).send(product);
      } else {
        return res.status(404).json({ msg: "No product matches that ID" });
      }
    } catch (error) {
      console.log(error);
      return res.json({ msg: "An error has ocurred" });
    }
  }

  // create a new product

  public async createProduct(req: Request, res: Response): Promise<void> {
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
    const products = await dataFile.readProductsFile();
    products.push(product);
    dataFile.writeProductsFile(products);
    res.json({ msg: "Product successfully created" });
  }
}

const productsController = new ProductsController();
export { productsController };
