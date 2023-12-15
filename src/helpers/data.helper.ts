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

  private writeFile(entity: string, products: string) {
    fs.writeFile(this.Paths[entity], products, "utf-8", (error) => {
      if (error) {
        return { message: error.message };
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

  public saveProducts(products: Product[]) {
    const stringProducts = JSON.stringify(products, null, 2);
    this.writeFile("products", stringProducts);
  }
}

export const dataFile = new DataFile();
