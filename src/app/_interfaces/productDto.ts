import { ProductType } from "./productType";

export interface productDto{
  id: number,
  name: string,
  price: number,
  stock: number,
  imgUrl: string,
  productType: ProductType
}
