import fs, { readFile } from "fs";
import Product from "../types/product";
import Cart from "../types/cart";
import { dataPath } from "../config/config";

class DataFile {
  private products: Product[] = [];
  private carts: Cart[] = [];

  private Paths: { [key: string]: string } = {
    products: dataPath.products,
    carts: dataPath.carts,
  };

  private readFile(entity: string) {
    fs.readFile(this.Paths[entity], "utf-8", (error, data) => {
      if (error) {
        console.log(error.message);
        return { message: error.message };
      } else {
        switch (entity) {
          case "products":
            this.products = JSON.parse(data);
            break;
          case "carts":
            this.carts = JSON.parse(data);
            break;
          default:
            throw new Error(`No such entity: ${entity}`);
        }
      }
    });
  }

  public readProducts(): Product[] {
    this.readFile("products");
    return this.products;
  }

  public readCarts(): Cart[] {
    this.readFile("carts");
    return this.carts;
  }

  public saveProducts() {
    console.log("Hello from the datafile class!!!");
  }
}

export const dataFile = new DataFile();
