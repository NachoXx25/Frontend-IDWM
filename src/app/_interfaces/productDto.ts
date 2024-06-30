import { ProductType } from "./productType";

export interface productDto{
  id: number, // Identificador del producto
  name: string, // Nombre del producto
  price: number, // Precio del producto
  stock: number, // Stock del producto
  imgUrl: string, // Imagen del producto
  productType: ProductType // Tipo de producto
}
