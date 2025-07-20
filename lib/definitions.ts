
export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  stock: number;
  status: boolean;
  category: string;
};

export type Subcategory = {
  id: number;
  name: string;
  category_id: number;
};

export type Category = {
  id: number;              
  name: string;            
  description: string; 
  subcategory?:Subcategory[];             
};

export type ProductGridProps = {
  products: Product[];
};

export type ProductItemProps = {
  product: Product;
};