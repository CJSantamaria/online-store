import mongoose, { model } from "mongoose";
import Product from "../types/product";

// interface Product {
//   id: mongoose.Schema.Types.ObjectId;
//   title: string;
//   description: string;
//   code: string;
//   price: number;
//   status: boolean;
//   stock: number;
//   category: string;
//   thumbnails: string[];
// }

const productSchema = new mongoose.Schema<Product>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: Boolean, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  thumbnails: { type: [String] },
});

export default model("Product", productSchema);
