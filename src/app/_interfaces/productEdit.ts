export interface ProductEdit{
  name: string, // Nombre del producto
  price: number, // Precio del producto
  stock: number, // Stock del producto
  image: FormData, // Imagen del producto
  productTypeId: string // Tipo de producto
}
