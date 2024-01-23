import { Router } from "express";
import { cartsController as cc } from "../controllers/carts.controller";

class CartsRoutes {
  public router: Router;
  constructor() {
    this.router = Router();
    this.routes();
  }
  routes() {
    this.router.post("/", cc.createCart); // create cart
    this.router.get("/:cid", cc.getCart); // get cart by id
    this.router.post("/:cid/product/:pid", cc.addProduct); // add product to cart
    this.router.delete("/:cid/product/:pid", cc.removeProduct); // remove product from cart
    this.router.put("/:cid", cc.updateCart); // update whole cart
    this.router.patch("/:cid/products/:pid", cc.updateProductQuantity); // update product quantity in cart
  }
}

const cartsRoutes = new CartsRoutes();
export default cartsRoutes.router;
