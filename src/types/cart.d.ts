import Product from "./product";

export default interface carts {
  id: string;
  products: Product[];
  quantity: number;
}
