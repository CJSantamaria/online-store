import { Router } from "express";
import { cartsController as cc} from "../controllers/carts.controller";

class CartsRoutes {
  public router: Router;
  constructor() {
    this.router = Router();
    this.routes();
  }
  routes() {
    this.router.get("/carts", (req, res) => {
      res.send("<h1>Hi from carts route!!</h1>");
    });
  }
}

const cartsRoutes = new CartsRoutes();
export default cartsRoutes.router;
