'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
import { createProduct } from '@/lib/actions/actions';
import { CreateProductState } from '@/lib/types/product-state';
import { Category, Subcategory } from '@/lib/types/definitions';
import { useActionState, useEffect, useState } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreateProductForm({
  categories,
}: {
  categories: Category[];
}) {
  const initialState: CreateProductState = {
    success: false,
    message: null,
    errors: {},
    values: {},
  };

  const [state, formAction] = useActionState(createProduct, initialState);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [availableSubcategories, setAvailableSubcategories] = useState<Subcategory[]>([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  useEffect(() => {
    if (!state.success && state.values.category) {
      setSelectedCategory(state.values.category);

      const category = categories.find(
        (c) => c.category_id === Number(state.values.category)
      );

      setAvailableSubcategories(category?.subcategories ?? []);
    }

    if (!state.success && state.values.subcategory) {
      setSelectedSubcategory(state.values.subcategory);
    }
  }, [state, categories]);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);

    const category = categories.find(
      (c) => c.category_id === Number(value)
    );

    setAvailableSubcategories(category?.subcategories ?? []);
    setSelectedSubcategory('');
  };

  return (
    <form action={formAction} className="max-w-4xl mx-auto my-8">
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

        {/* TÍTULO */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">Título</label>
          <input
            name="title"
            placeholder="Introduce el título del producto"
            defaultValue={!state.success ? state.values.title ?? '' : ''}
            className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm"
          />
          {state.errors.title && (
            <p className="text-red-500 text-sm">{state.errors.title[0]}</p>
          )}
        </div>

        {/* DESCRIPCIÓN CORTA */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">Descripción corta</label>
          <textarea
            name="shortDescription"
            rows={2}
            placeholder="Breve descripción del producto"
            defaultValue={!state.success ? state.values.shortDescription ?? '' : ''}
            className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm resize-none"
          />
          {state.errors.shortDescription && (
            <p className="text-red-500 text-sm">{state.errors.shortDescription[0]}</p>
          )}
        </div>

        {/* DESCRIPCIÓN LARGA */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">Descripción larga</label>
          <textarea
            name="longDescription"
            rows={4}
            placeholder="Descripción detallada del producto"
            defaultValue={!state.success ? state.values.longDescription ?? '' : ''}
            className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm resize-none"
          />
          {state.errors.longDescription && (
            <p className="text-red-500 text-sm">{state.errors.longDescription[0]}</p>
          )}
        </div>

        {/* PRECIO / STOCK / DESCUENTO */}
        <div className="flex gap-4">

          <div className="mb-4 w-1/3">
            <label className="mb-2 block text-sm font-medium">Precio</label>
            <input
              name="price"
              type="number"
              step="0.01"
              placeholder="0.00"
              defaultValue={!state.success ? state.values.price ?? '' : ''}
              className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm"
            />
            {state.errors.price && (
              <p className="text-red-500 text-sm">{state.errors.price[0]}</p>
            )}
          </div>

          <div className="mb-4 w-1/3">
            <label className="mb-2 block text-sm font-medium">Stock</label>
            <input
              name="stock"
              type="number"
              placeholder="Cantidad en stock"
              defaultValue={!state.success ? state.values.stock ?? '' : ''}
              className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm"
            />
            {state.errors.stock && (
              <p className="text-red-500 text-sm">{state.errors.stock[0]}</p>
            )}
          </div>

          <div className="mb-4 w-1/3">
            <label className="mb-2 block text-sm font-medium">Descuento (%)</label>
            <input
              name="discount"
              type="number"
              step="1"
              placeholder="0"
              defaultValue={!state.success ? state.values.discount ?? '' : ''}
              className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm"
            />
            {state.errors.discount && (
              <p className="text-red-500 text-sm">{state.errors.discount[0]}</p>
            )}
          </div>

        </div>

        {/* IMAGEN */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">URL de la imagen</label>
          <input
            name="image_url"
            type="text"
            placeholder="http://..."
            defaultValue={!state.success ? state.values.image_url ?? '' : ''}
            className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm"
          />
          {state.errors.image_url && (
            <p className="text-red-500 text-sm">{state.errors.image_url[0]}</p>
          )}
        </div>

        {/* CATEGORÍA / SUBCATEGORÍA */}
        <div className="flex gap-4">

          <div className="mb-4 w-1/4">
            <label className="mb-2 block text-sm font-medium">Categoría</label>
            <Select value={selectedCategory} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Seleccione categoría" />
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
            <input type="hidden" name="category" value={selectedCategory} />
            {state.errors.category && (
              <p className="text-red-500 text-sm">{state.errors.category[0]}</p>
            )}
          </div>

          <div className="mb-4 w-1/4">
            <label className="mb-2 block text-sm font-medium">Subcategoría</label>
            <Select
              value={selectedSubcategory}
              onValueChange={setSelectedSubcategory}
              disabled={!availableSubcategories.length}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Seleccione subcategoría" />
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
            <input type="hidden" name="subcategory" value={selectedSubcategory} />
            {state.errors.subcategory && (
              <p className="text-red-500 text-sm">{state.errors.subcategory[0]}</p>
            )}
          </div>

        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Crear producto</Button>
      </div>
    </form>
  );
}
