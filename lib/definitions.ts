
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
  subcategory_id: number;
  subcategory_name: string;
};

export type Category = {
  category_id: number;
  category_name: string;
  description: string;
  subcategories: Subcategory[];
};

export type ProductGridProps = {
  products: Product[];
};

export type ProductItemProps = {
  product: Product;
};