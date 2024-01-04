import mongoose, { model, Document } from "mongoose";

interface productInterface extends Document{
    title:  string,
    description:  string,
    code:  string,
    price:  number,
    status:  boolean,
    stock:  number,
    category:  string,
    thumbnails:  string[] 
}

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: Boolean, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  thumbnails: { type: [String] }
});

export default model('Product', productSchema)
//module.exports = model('Product', productSchema)
