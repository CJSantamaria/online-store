import fs from "fs/promises";
import Product from "../types/product";
import Cart from "../types/cart";
import { dataPath } from "../config/config";

class DataFile {

  public async readProductsFile(): Promise<Product[]> {
    try {
      const rawData = await fs.readFile(dataPath.products, "utf-8");
      return JSON.parse(rawData);
    } catch (err) {
      throw new Error(`Error reading products file: ${err}`);
    }
  }

  public async writeProductsFile(products: Product[]): Promise<void> {
    try {
      const dataToWrite = JSON.stringify(products, null, 2);
      await fs.writeFile(dataPath.products, dataToWrite, "utf-8");
    } catch (error) {
      throw new Error(`Error writing products file: ${error}`);
    }
  }

  public async readCartsFile(): Promise<Cart[]> {
    try {
      const rawData = await fs.readFile(dataPath.carts, "utf-8");
      return JSON.parse(rawData);
    } catch (error) {
      throw new Error(`Error reading carts file: ${error}`);
    }
  }

  public async writeCartsFile(carts: Cart[]): Promise<void> {
    try {
      const dataToWrite = JSON.stringify(carts, null, 2);
      await fs.writeFile(dataPath.carts, dataToWrite, "utf-8");
    } catch (error) {
      throw new Error(`Error writing carts file: ${error}`);
    }
  }

}

export const dataFile = new DataFile();
