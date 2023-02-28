export interface Product {
  id?: number;
  name: string;
  desc: string;
  categoryId: number;
  inventoryId: number;
  price: number;
  discountId: number;
  image: File;
}
