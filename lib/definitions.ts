
export type Product = {
  id: number;
  title: string;
  shortDescription: string;
  longDescription: string;
  price: number;
  stock: number;
  image_url: string;
  category: string;
  subcategory: string;
  status: boolean;
  discount: number
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
  product: Product[];
};

export type ProductCardProps = {
  product: Product;
}