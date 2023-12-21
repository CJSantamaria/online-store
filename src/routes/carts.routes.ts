import { Router } from "express";
import { cartsController as cc } from "../controllers/carts.controller";

class CartsRoutes {
  public router: Router;
  constructor() {
    this.router = Router();
    this.routes();
  }
  routes() {
    this.router.post("/", cc.createCart);
    this.router.get("/:cid", cc.getCart);
    this.router.post("/:cid/product/:pid", cc.addProduct)
  }
}

const cartsRoutes = new CartsRoutes();
export default cartsRoutes.router;
