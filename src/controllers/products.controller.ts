import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import Product from "../types/product";
import { dataFile } from "../helpers/data.helper";

export class ProductsController {
  public constructor() {}

  // get the whole list of products

  public getProducts(req: Request, res: Response): Response {
    try {
      const products : Product[] = dataFile.readProducts();
      return res.status(200).send(products);
    } catch (error) {
      return res.json({ msg: "An error has ocurred" });
    }
  }

  // get a single product by using its ID

  public getProduct(req: Request, res: Response): Response {
    try {
      const products : Product[] = dataFile.readProducts();
      const productId = req.params.id
      const product = products.find(p => p.id ===productId)
      if (product){
        return res.status(200).send(product);
      } else {
        return res.status(404).json({msg:"No product matches that ID"})
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
    const products = dataFile.readProducts();
    console.log('Products array before adding new one ', products)
    console.log('Product to add', product)
    products.push(product);
    console.log('Products array after adding new one', products)
    dataFile.saveProducts(products)

    res.json({ msg: "Product successfully created" });
  }
}

const productsController = new ProductsController();
export { productsController };
