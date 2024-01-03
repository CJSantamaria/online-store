import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import productsRoutes from "./routes/products.routes";
import cartsRoutes from "./routes/carts.routes";
import dotenv from "dotenv";

class Server {
  public app: express.Application;
  constructor() {
    this.app = express();
    this.config();
    this.connectDB();
    this.routes();
  }

  config() {
    dotenv.config();
    this.app.set("port", process.env.PORT || 8080);
    this.app.use(express.json());
    this.app.use(morgan("dev"));
  }
  connectDB() {
    mongoose
      .connect(process.env.MONGODB_URI!)
      .then(() => {
        console.log("database connected");
      })
      .catch((error) => {
        console.log("Couldn't reach the database:", error);
      });
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
