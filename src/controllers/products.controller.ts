import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import Product from "../types/product";
import { dataFile } from "../helpers/data.helper";

class ProductsController {
  public constructor() {}

  // get a specific page of the list of products

  public async getProducts(req: Request, res: Response): Promise<Response> {
    const page: number = req.query.page ? <number>(<unknown>req.query.page) : 1;
    const limit: number = req.query.limit
      ? <number>(<unknown>req.query.limit)
      : 5;
    const startIndex: number = (page - 1) * limit;
    const endIndex: number = page * limit;

    try {
      const allProducts: Product[] = await dataFile.readProductsFile();
      const products = allProducts.slice(startIndex, endIndex);
      return res.status(200).send(products);
    } catch (error) {
      return res.json({ msg: "An error has ocurred" });
    }
  }

  //get a single product by using its ID

  public async getProduct(req: Request, res: Response): Promise<Response> {
    try {
      const products = await dataFile.readProductsFile();
      const product = products.find((p) => p.id === req.params.pid);
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

  // update a product

  public async updateProduct(req: Request, res: Response): Promise<Response> {
    const products = await dataFile.readProductsFile();
    const index = products.findIndex((p) => p.id === req.params.pid);
    if (index < 0) {
      return res.status(404).json({ msg: "No product matches that ID" });
    } else {
      if (req.body.title) products[index].title = req.body.title;
      if (req.body.description)
        products[index].description = req.body.description;
      if (req.body.code) products[index].code = req.body.code;
      if (req.body.price) products[index].price = req.body.price;
      if (req.body.status) products[index].status = req.body.status;
      if (req.body.stock) products[index].stock = req.body.stock;
      if (req.body.category) products[index].category = req.body.category;
      if (req.body.thumbnails) products[index].thumbnails = req.body.thumbnails;

      dataFile.writeProductsFile(products);
      return res.status(200).json({ msg: "Product successfully updated" });
    }
  }

  // delete a product

  public async deleteProduct(req: Request, res: Response): Promise<Response> {
    const products = await dataFile.readProductsFile();
    const product = products.find((p) => p.id === req.params.pid);
    if (product) {
      const newProducts = products.filter((p) => p.id != req.params.pid);
      await dataFile.writeProductsFile(newProducts)
      return res.status(200).json({ msg: "Product successfully deleted" });
    } else {
      return res.status(404).json({ msg: "No product matches that ID" });
    }
  }
}

const productsController = new ProductsController();
export { productsController };
