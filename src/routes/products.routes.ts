import { Request, Response, Router } from "express";
import { productsController as pc } from "../controllers/products.controller";

class ProductRoutes {
  public router: Router;
  constructor() {
    this.router = Router();
    this.routes();
  }
  routes() {
    this.router.get("/", pc.getProducts);
    this.router.get("/:id", pc.getProduct);
  }
}
const productsRoutes = new ProductRoutes();

export default productsRoutes.router;
