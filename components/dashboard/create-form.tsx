'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
import { createProduct } from '@/lib/actions';
import { Category, Subcategory } from '@/lib/definitions'; 
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from 'react';

interface CreateProductFormProps {
  categories: Category[]; 
}

export default function CreateProductForm({ categories }: CreateProductFormProps) {
  
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [availableSubcategories, setAvailableSubcategories] = useState<Subcategory[]>([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');


  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    
    const numericCategoryId = Number(categoryId);

    const categoryObject = categories.find(
      (cat) => cat.category_id === numericCategoryId
    );
    
    const subArray = categoryObject ? categoryObject.subcategories : [];

    setAvailableSubcategories(subArray);
    
    setSelectedSubcategory(''); 
  };
  
  const handleSubcategoryChange = (subcategoryId: string) => {
    setSelectedSubcategory(subcategoryId);
  };


  return (
    <form action={createProduct} className="max-w-4xl mx-auto my-8">

      <div className="rounded-md bg-gray-50 p-4 md:p-6">

        {/* 1. Título */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">Título</label>
          <div className="relative">
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Introduce el título del producto"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
            />
          </div>
        </div>
        
        {/* 2. Descripción Corta */}
        <div className="mb-4">
          <label htmlFor="shortDescription" className="mb-2 block text-sm font-medium">Descripción Corta</label>
          <div className="relative">
            <textarea
              id="shortDescription"
              name="shortDescription"
              placeholder="Breve descripción del producto"
              rows={2}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500 resize-none"
            />
          </div>
        </div>

        {/* 3. Descripción Larga */}
        <div className="mb-4">
          <label htmlFor="longDescription" className="mb-2 block text-sm font-medium">Descripción Larga</label>
          <div className="relative">
            <textarea
              id="longDescription"
              name="longDescription"
              placeholder="Descripción detallada del producto"
              rows={4}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500 resize-none"
            />
          </div>
        </div>

        {/* 4. Precio, Stock y Descuento */}
        <div className="flex gap-4">
          <div className="mb-4 w-1/3">
            <label htmlFor="price" className="mb-2 block text-sm font-medium">Precio</label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                />
              </div>
            </div>
          </div>
          <div className="mb-4 w-1/3">
            <label htmlFor="stock" className="mb-2 block text-sm font-medium">Stock</label>
            <div className="relative">
              <input
                id="stock"
                name="stock"
                type="number"
                placeholder="Cantidad en stock"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
          <div className="mb-4 w-1/3">
            <label htmlFor="discount" className="mb-2 block text-sm font-medium">Descuento (%)</label>
            <div className="relative">
              <input
                id="discount"
                name="discount"
                type="number"
                step="1"
                placeholder="0"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* 5. URL de Imagen */}
        <div className="mb-4">
          <label htmlFor="image_url" className="mb-2 block text-sm font-medium">URL de la Imagen</label>
          <div className="relative">
            <input
              id="image_url"
              name="image_url"
              type="text"
              placeholder="http://..."
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
            />
          </div>
        </div>
        
        {/* 6. Categoría y Subcategoría */}
        <div className="flex gap-4">

          <div className="mb-4 w-1/4">
            <label htmlFor="category" className="mb-2 block text-sm font-medium">
              Categoría
            </label>
            <Select 
              onValueChange={handleCategoryChange} 
              value={selectedCategory}
            >
              <SelectTrigger className="w-[200px] ">
                <SelectValue placeholder="Seleccione Categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem 
                    key={cat.category_id} 
                    value={cat.category_id.toString()}
                  >
                    {cat.category_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <input
              type="hidden"
              name="category"
              value={selectedCategory}
            />
          </div>

          <div className="mb-4 w-1/4">
            <label htmlFor="subcategory" className="mb-2 block text-sm font-medium">
              Subcategoría
            </label>
            <Select
              onValueChange={handleSubcategoryChange}
              value={selectedSubcategory}
              disabled={availableSubcategories.length === 0}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Seleccione Subcategoría" />
              </SelectTrigger>
              <SelectContent>
                {availableSubcategories.map((sub) => (
                  <SelectItem 
                    key={sub.subcategory_id} 
                    value={sub.subcategory_id.toString()}
                  >
                    {sub.subcategory_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <input
              type="hidden"
              name="subcategory"
              value={selectedSubcategory}
            />
          </div>
          
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Crear Producto</Button>
      </div>
    </form>
  );
}