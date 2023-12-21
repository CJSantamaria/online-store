export default interface Cart {
  id: string;
  products: [
    {
      pid: string,
      quantity: number;
    }
  ];
}
