import mongoose, { Schema, Document } from "mongoose";
import productSchema from "./product.model";

interface Product {
  productId: mongoose.Types.ObjectId;
  quantity: number;
}

interface Cart extends Document {
  products: Product[];
}

const cartSchema = new Schema<Cart>({
  products: [
    {
      _id: false,
      productId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: productSchema,
      },
      quantity: { type: Number, required: true },
    },
  ],
});

const CartModel = mongoose.model<Cart>("Cart", cartSchema);

export default CartModel;
