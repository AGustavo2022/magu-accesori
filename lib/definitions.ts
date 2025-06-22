
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

export type Category = {
  id: number;              
  name: string;            
  description: string;              
};

export type ProductGridProps = {
  products: Product[];
};