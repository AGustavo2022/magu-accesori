
export type CreateProductState = { 
    success: true; 
    message?: string; 
    errors?: string; 
} | {
  success: false;
  message?: string | null;
  errors: {
    title?: string[];
    shortDescription?: string[];
    longDescription?: string[];
    price?: string[];
    stock?: string[];
    image_url?: string[];
    category?: string[];
    subcategory?: string[];
    discount?: string[];
  };
};


export type UpdateProductState = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
};

export type DeleteActionState = {
  success: boolean;
  message: string | null;
  errors?: Record<string, string[]>;
};
