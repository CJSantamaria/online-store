import Product from "./product";

export default interface Cart {
  id: string;
  products: Product[];
  quantity: number;
}
