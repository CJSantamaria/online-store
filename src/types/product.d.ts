import mongoose from "mongoose";

export default interface Product {
    id: mongoose.Schema.Types.ObjectId;
    title: string;
    description: string;
    code: string;
    price: number;
    status: boolean;
    stock: number;
    category: string;
    thumbnails: string[];
  }