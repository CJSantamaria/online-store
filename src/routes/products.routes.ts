import { Router } from "express";
import { productsController as pc } from "../controllers/products.controller";
import {
  validateCreate,
  validateUpdate,
} from "../validators/products.validator";
import {
  trimStringValues,
  normalizeFieldNames,
} from "../middlewares/strings.midddleware";

class ProductRoutes {
  public router: Router;
  constructor() {
    this.router = Router();
    this.routes();
  }
  routes() {
    this.router.get("/", pc.getProducts);
    this.router.get("/:pid", pc.getProduct);
    this.router.post("/", validateCreate, pc.createProduct);
    this.router.put("/", pc.updateProduct);
    this.router.put(
      "/:pid",
      trimStringValues,
      normalizeFieldNames,
      validateUpdate,
      pc.updateProduct
    );
    this.router.delete("/:pid", pc.deleteProduct);
  }
}
const productsRoutes = new ProductRoutes();

export default productsRoutes.router;
