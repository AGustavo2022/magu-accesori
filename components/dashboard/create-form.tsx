'use client';

import Link from 'next/link';
import { useActionState, useEffect, useState } from 'react';

import { Button } from '../ui/button';
import { createProduct } from '@/lib/actions/product.actions';
import { CreateProductState } from '@/lib/types/product.types';
import { Category, Subcategory } from '@/lib/types/definitions';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Trash2 } from 'lucide-react';

type Specification = {
  label: string;
  value: string;
};

export default function CreateProductForm({
  categories,
}: {
  categories: Category[];
}) {
  /* -------------------- STATE -------------------- */

  const initialState: CreateProductState = {
    success: false,
    message: null,
    errors: {},
    values: {},
  };

  const [state, formAction] = useActionState(createProduct, initialState);
  const errorState = !state.success ? state : null;

  const [selectedCategory, setSelectedCategory] = useState('');
  const [availableSubcategories, setAvailableSubcategories] = useState<Subcategory[]>([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  const [specifications, setSpecifications] = useState<Specification[]>([
    { label: '', value: '' },
  ]);

  /* -------------------- EFFECTS -------------------- */

  useEffect(() => {
    if (!errorState) return;

    if (errorState.values.category) {
      setSelectedCategory(errorState.values.category);

      const category = categories.find(
        c => c.category_id === Number(errorState.values.category)
      );

      setAvailableSubcategories(category?.subcategories ?? []);
    }

    if (errorState.values.subcategory) {
      setSelectedSubcategory(errorState.values.subcategory);
    }
  }, [errorState, categories]);

  /* -------------------- HANDLERS -------------------- */

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);

    const category = categories.find(
      c => c.category_id === Number(value)
    );

    setAvailableSubcategories(category?.subcategories ?? []);
    setSelectedSubcategory('');
  };

  const addSpecification = () => {
    setSpecifications(prev => [...prev, { label: '', value: '' }]);
  };

  const removeSpecification = (index: number) => {
    setSpecifications(prev => prev.filter((_, i) => i !== index));
  };

  const updateSpecification = (
    index: number,
    field: 'label' | 'value',
    value: string
  ) => {
    setSpecifications(prev => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  /* -------------------- RENDER -------------------- */

  return (
    <form action={formAction} className="mx-auto my-8 max-w-4xl">
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

        {/* INPUT HIDDEN PARA ESPECIFICACIONES */}
        <input
          type="hidden"
          name="specifications"
          value={JSON.stringify(
            specifications.filter(
              s => s.label.trim() !== '' && s.value.trim() !== ''
            )
          )}
        />

        {/* TÍTULO */}
        <div className="mb-8">
          <label className="mb-2 block text-sm font-medium">Título</label>
          <input
            name="title"
            placeholder="Introduce el título del producto"
            defaultValue={errorState?.values.title ?? ''}
            className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm"
          />
          {errorState?.errors.title && (
            <p className="text-sm text-red-500">
              {errorState.errors.title[0]}
            </p>
          )}
        </div>

        {/* DESCRIPCIÓN CORTA */}
        <div className="mb-8">
          <label className="mb-2 block text-sm font-medium">Descripción corta</label>
          <textarea
            name="shortDescription"
            rows={2}
            placeholder="Breve descripción del producto"
            defaultValue={errorState?.values.shortDescription ?? ''}
            className="block w-full resize-none rounded-md border border-gray-200 py-2 pl-3 text-sm"
          />
          {errorState?.errors.shortDescription && (
            <p className="text-sm text-red-500">
              {errorState.errors.shortDescription[0]}
            </p>
          )}
        </div>

        {/* DESCRIPCIÓN LARGA */}
        <div className="mb-8">
          <label className="mb-2 block text-sm font-medium">Descripción larga</label>
          <textarea
            name="longDescription"
            rows={4}
            placeholder="Descripción detallada del producto"
            defaultValue={errorState?.values.longDescription ?? ''}
            className="block w-full resize-none rounded-md border border-gray-200 py-2 pl-3 text-sm"
          />
          {errorState?.errors.longDescription && (
            <p className="text-sm text-red-500">
              {errorState.errors.longDescription[0]}
            </p>
          )}
        </div>

        {/* ESPECIFICACIONES */}
        <div className="mb-8">
          <div className="flex items-center justify-between pb-4">
            <label className="text-sm font-medium">Especificaciones</label>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={addSpecification}
              className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
            >
              <Plus className="mr-1 h-3 w-3" />
              Agregar
            </Button>
          </div>

          <div className="space-y-2">
            {specifications.map((spec, index) => (
              <div
                key={index}
                className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center"
              >
                <input
                  className="block w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
                  placeholder="Nombre"
                  value={spec.label}
                  onChange={(e) =>
                    updateSpecification(index, 'label', e.target.value)
                  }
                />

                <input
                  className="block w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
                  placeholder="Valor"
                  value={spec.value}
                  onChange={(e) =>
                    updateSpecification(index, 'value', e.target.value)
                  }
                />

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground hover:text-destructive"
                  onClick={() => removeSpecification(index)}
                  disabled={specifications.length === 1}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* PRECIO / STOCK / DESCUENTO */}
        <div className="mb-8 flex gap-4">
          <div className="w-1/3">
            <label className="mb-2 block text-sm font-medium">Precio</label>
            <input
              name="price"
              type="number"
              step="0.01"
              placeholder="0.00"
              defaultValue={errorState?.values.price ?? ''}
              className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm"
            />
            {errorState?.errors.price && (
              <p className="text-sm text-red-500">
                {errorState.errors.price[0]}
              </p>
            )}
          </div>

          <div className="w-1/3">
            <label className="mb-2 block text-sm font-medium">Stock</label>
            <input
              name="stock"
              type="number"
              placeholder="Cantidad en stock"
              defaultValue={errorState?.values.stock ?? ''}
              className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm"
            />
            {errorState?.errors.stock && (
              <p className="text-sm text-red-500">
                {errorState.errors.stock[0]}
              </p>
            )}
          </div>

          <div className="w-1/3">
            <label className="mb-2 block text-sm font-medium">Descuento (%)</label>
            <input
              name="discount"
              type="number"
              step="1"
              placeholder="0"
              defaultValue={errorState?.values.discount ?? ''}
              className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm"
            />
            {errorState?.errors.discount && (
              <p className="text-sm text-red-500">
                {errorState.errors.discount[0]}
              </p>
            )}
          </div>
        </div>

        {/* IMAGEN */}
        <div className="mb-8">
          <label className="mb-2 block text-sm font-medium">URL de la imagen</label>
          <input
            name="image_url"
            placeholder="http://..."
            defaultValue={errorState?.values.image_url ?? ''}
            className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm"
          />
          {errorState?.errors.image_url && (
            <p className="text-sm text-red-500">
              {errorState.errors.image_url[0]}
            </p>
          )}
        </div>

        {/* CATEGORÍA / SUBCATEGORÍA */}
        <div className="flex gap-4">
          <div className="w-1/4">
            <label className="mb-2 block text-sm font-medium">Categoría</label>
            <Select value={selectedCategory} onValueChange={handleCategoryChange}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
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
          </div>

          <div className="w-1/4">
            <label className="mb-2 block text-sm font-medium">Subcategoría</label>
            <Select
              value={selectedSubcategory}
              onValueChange={setSelectedSubcategory}
              disabled={!availableSubcategories.length}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccione subcategoría" />
              </SelectTrigger>
              <SelectContent>
                {availableSubcategories.map(sub => (
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
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/products"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Crear producto</Button>
      </div>
    </form>
  );
}
