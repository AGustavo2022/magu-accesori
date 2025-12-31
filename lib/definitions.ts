
export type Product = {
  id: string;
  title: string;
  short_description: string;
  long_description: string;
  price: number;
  stock: number;
  image_url: string;
  category: string;
  subcategory: string;
  status: boolean;
  discount: number;
  created_at: Date
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
export type ProductArrayProps = {
  products: number;
  cardTitle: string;
  unitSigla?: string
};

export type ProductTableProps = {
  products: Product[];
}

export type ProductItemProps = {
  product: Product[];
};

export type ProductCardProps = {
  product: Product;
}

export type ProductsField = {
  id: string;
  title: string;
};


export type ProductFormState = {
    errors?: {
        title?: string[];
        shortDescription?: string[];
        longDescription?: string[];
        price?: string[];
        stock?: string[];
        image_url?: string[];
        category?: string[];
        subcategory?: string[];
        status?: string[];
        discount?: string[];
    };
    message?: string | null;
};

export type DeleteProductArgs = {
  id: string;
}
// Interfaz (sin cambios)
export interface ProductForm {
    id: string;
    title: string;
    short_description: string;
    long_description: string;
    price: number;
    stock: number;
    image_url: string;
    category: string;
    subcategory: string;
    status: boolean; // Se mantiene en la interfaz, pero se ignora en el formulario
    discount: number;
    created_at: Date;
}export interface EditProductFormProps {
    product: ProductForm;
    categories: Category[];
}

