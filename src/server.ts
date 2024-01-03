import express from "express";
import morgan from "morgan";
import productsRoutes from "./routes/products.routes";
import cartsRoutes from "./routes/carts.routes";

class Server {
  public app: express.Application;
  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  config() {
    this.app.set("port", process.env.PORT || 8080);
    this.app.use(express.json());
    this.app.use(morgan("dev"));
  }
  routes() {
    this.app.use("/api/products", productsRoutes);
    this.app.use("/api/carts", cartsRoutes);
  }
  start() {
    this.app.listen(this.app.get("port"), () => {
      console.log(`Server listening on port ${this.app.get("port")}...`);
    });
  }
}
const server = new Server();
server.start();
