import fs, { readFile } from "fs";
import Product from "../types/product";
import Cart from "../types/cart";
import { dataPath } from "../config/config";

class DataFromFile {
  public products: Product[] = [];
  public carts: Cart[] = [];
  constructor() {
    fs.readFile(dataPath.products, "utf-8", (error, data) => {
      if (error) {
        console.log(error.message);
        return { message: error.message };
      } else {
        this.products = JSON.parse(data);
      }
    });
    fs.readFile(dataPath.carts, "utf-8", (error, data) => {
      if (error) {
        console.log(error.message);
        return { message: error.message };
      } else {
        this.carts = JSON.parse(data);
      }
    });
  }
}

export const dataFromFile = new DataFromFile();