import { Request, Response } from "express";
import fs from "fs";
import { dataPath } from "../config/config";

export class ProductsController {
  public constructor() {}
  public async getProducts(req: Request, res: Response): Promise<void> {
    await fs.readFile(dataPath.products, "utf-8", (error, data) => {
      if (error) {
        console.log(error);
        return res.status(500).send("<h1>An error has ocurred</h1>");
      } else {
        res.send(data);
      }
    });
  }
  public async getProduct(req: Request, res: Response): Promise<void> {
    res.send("<h1>Hello from get singular product in the controller</h1>");
  }
  public async postProducts(req: Request, res: Response): Promise<void> {
    
  }
}

const productsController = new ProductsController();
export { productsController };
