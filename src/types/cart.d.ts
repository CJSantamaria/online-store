import mongoose from "mongoose";

export default interface Cart {
  id: mongoose.Schema.Types.ObjectId;
  products: {
    pid: mongoose.Schema.Types.ObjectId;
    quantity: number;
  }[];
}
