import path from "path";
const root = process.cwd();
const dataBaseDir = "/database";

export const dataPath  = {
  products: path.join(root, dataBaseDir, "/products.json"),
  carts: path.join(root, dataBaseDir, "/carts.json")
};
