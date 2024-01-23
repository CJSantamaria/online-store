import mongoose from "mongoose";

export default interface Cart {
  id: mongoose.Types.ObjectId;
  products: {
    productId: mongoose.Types.ObjectId;
    quantity: number;
  }[];
}
