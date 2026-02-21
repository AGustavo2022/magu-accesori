'use client';

import Link from 'next/link';
import { useActionState, useEffect, useState } from 'react';

import { Button } from '../ui/button';
import { Switch } from '../ui/switch';

import { updateProduct } from '@/lib/actions/product.actions';
import { UpdateProductState } from '@/lib/types/product.types';
import { EditProductFormProps, Subcategory } from '@/lib/types/definitions';
import { getCategoryIdByName, getSubcategoryIdByName } from '@/lib/utils';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

export default function EditProductForm({
  product,
  categories,
}: EditProductFormProps) {
  /* -------------------- STATE -------------------- */

const initialState: UpdateProductState = {
  success: true,
  message: null,
};

  const [state, formAction] = useActionState(
    updateProduct.bind(null, product.id),
    initialState
  );

  /** Narrowing central */
  const errorState = !state.success ? state : null;

  const initialCategoryId =
    getCategoryIdByName(product.category, categories) ?? '';

  const initialSubcategoryId =
    getSubcategoryIdByName(product.subcategory, categories) ?? '';

  const [selectedCategory, setSelectedCategory] = useState<string>(
    errorState?.values.category ?? initialCategoryId
  );

  const [availableSubcategories, setAvailableSubcategories] =
    useState<Subcategory[]>([]);

  const [selectedSubcategory, setSelectedSubcategory] = useState<string>(
    errorState?.values.subcategory ?? initialSubcategoryId
  );

  const [status, setStatus] = useState<boolean>(
    errorState?.values.status
      ? errorState.values.status === 'true'
      : product.status
  );

  const [imagePreview, setImagePreview] = useState<string>(
  errorState?.values.image_url ?? product.image_url ?? ''
);
  /* -------------------- EFFECTS -------------------- */

  useEffect(() => {
    const categoryId = Number(selectedCategory);
    const category = categories.find(
      c => c.category_id === categoryId
    );

    setAvailableSubcategories(category?.subcategories ?? []);
  }, [selectedCategory, categories]);

  /* -------------------- HANDLERS -------------------- */

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setSelectedSubcategory('');
  };

  /* -------------------- RENDER -------------------- */

return (
  <form action={formAction} className="bg-gray-50 rounded-xl p-8 mx-auto my-12 max-w-6xl space-y-12">

    {/* Header */}
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-semibold tracking-tight">
        Editar producto
      </h1>

      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">
          {status ? 'Activo' : 'Inactivo'}
        </span>
        <Switch checked={status} onCheckedChange={setStatus} />
        <input
          type="hidden"
          name="status"
          value={status ? 'true' : 'false'}
        />
      </div>
    </div>

    {/* CONTENIDO */}
    <div className="grid gap-16 lg:grid-cols-3">

      {/* ================= CONTENIDO ================= */}
      <div className="lg:col-span-2 space-y-8">

        {/* Título */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Título</label>
          <Input
            name="title"
            defaultValue={errorState?.values.title ?? product.title}
            className="border-0 border-b rounded-none px-0 focus-visible:ring-0"
          />
        </div>

        {/* Descripción corta */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Descripción corta</label>
          <Textarea
            name="shortDescription"
            rows={2}
            defaultValue={
              errorState?.values.shortDescription ??
              product.short_description
            }
            className="resize-none border-0 border-b rounded-none px-0 focus-visible:ring-0"
          />
        </div>

        {/* Descripción larga */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Descripción larga</label>
          <Textarea
            name="longDescription"
            rows={4}
            defaultValue={
              errorState?.values.longDescription ??
              product.long_description
            }
            className="resize-none border-0 border-b rounded-none px-0 focus-visible:ring-0"
          />
        </div>

        {/* Precio / Stock / Descuento */}
        <div className="grid grid-cols-3 gap-8">
          <div className="space-y-2">
            <label className="text-sm font-medium">Precio</label>
            <Input
              name="price"
              type="number"
              defaultValue={errorState?.values.price ?? product.price}
              className="border-0 border-b rounded-none px-0 focus-visible:ring-0"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Cantidad</label>
            <Input
              name="stock"
              type="number"
              defaultValue={errorState?.values.stock ?? product.stock}
              className="border-0 border-b rounded-none px-0 focus-visible:ring-0"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Descuento (%)</label>
            <Input
              name="discount"
              type="number"
              defaultValue={errorState?.values.discount ?? product.discount}
              className="border-0 border-b rounded-none px-0 focus-visible:ring-0"
            />
          </div>
        </div>

        {/* Categoría / Subcategoría */}
        <div className="flex gap-10">
          <div className="w-[45%] space-y-2">
            <label className="text-sm font-medium">Categoría</label>
            <Select
              value={selectedCategory}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger className="w-full border-0 border-b rounded-none px-0 focus:ring-0">
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

          <div className="w-[45%] space-y-2">
            <label className="text-sm font-medium">Subcategoría</label>
            <Select
              value={selectedSubcategory}
              onValueChange={setSelectedSubcategory}
              disabled={!availableSubcategories.length}
            >
              <SelectTrigger className="w-full border-0 border-b rounded-none px-0 focus:ring-0">
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
            <input
              type="hidden"
              name="subcategory"
              value={selectedSubcategory}
            />
          </div>
        </div>

      </div>

      {/* ================= IMAGEN ================= */}
      <div className="space-y-4">
        <label className="text-sm font-medium">Imagen</label>

        <div className="aspect-square overflow-hidden rounded-md border bg-muted">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Preview"
              className="h-full w-full object-cover"
              onError={() => setImagePreview('')}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              Vista previa
            </div>
          )}
        </div>

        <Input
          name="image_url"
          defaultValue={
            errorState?.values.image_url ?? product.image_url
          }
          onChange={(e) => setImagePreview(e.target.value)}
          placeholder="https://..."
          className="border-0 border-b rounded-none px-0 focus-visible:ring-0"
        />
      </div>

    </div>

      {/* Footer */}
      <div className="flex gap-4 pt-10 border-t mt-10">
        <Link
          href="/dashboard/products"
          className="flex-1"
        >
          <Button
            type="button"
            variant="outline"
            className="w-full h-12 text-base"
          >
            Cancelar
          </Button>
        </Link>

        <Button
          type="submit"
          className="flex-1 h-12 text-base"
        >
          Gurdar Cambios
        </Button>
      </div>

  </form>
)

  // return (
  //   <form action={formAction} className="mx-auto my-8 max-w-4xl">
  //     <div className="rounded-md bg-gray-50 p-4 md:p-6">

  //       {/* TÍTULO */}
  //       <div className="mb-4">
  //         <label className="mb-2 block text-sm font-medium">Título</label>
  //         <input
  //           name="title"
  //           defaultValue={errorState?.values.title ?? product.title}
  //           className="block w-full rounded-md border py-2 pl-3 text-sm"
  //         />
  //         {errorState?.errors.title && (
  //           <p className="text-sm text-red-500">
  //             {errorState.errors.title[0]}
  //           </p>
  //         )}
  //       </div>

  //       {/* DESCRIPCIÓN CORTA */}
  //       <div className="mb-4">
  //         <label className="mb-2 block text-sm font-medium">Descripción corta</label>
  //         <textarea
  //           name="shortDescription"
  //           rows={2}
  //           defaultValue={
  //             errorState?.values.shortDescription ??
  //             product.short_description
  //           }
  //           className="block w-full resize-none rounded-md border py-2 pl-3 text-sm"
  //         />
  //         {errorState?.errors.shortDescription && (
  //           <p className="text-sm text-red-500">
  //             {errorState.errors.shortDescription[0]}
  //           </p>
  //         )}
  //       </div>

  //       {/* DESCRIPCIÓN LARGA */}
  //       <div className="mb-4">
  //         <label className="mb-2 block text-sm font-medium">Descripción larga</label>
  //         <textarea
  //           name="longDescription"
  //           rows={4}
  //           defaultValue={
  //             errorState?.values.longDescription ??
  //             product.long_description
  //           }
  //           className="block w-full resize-none rounded-md border py-2 pl-3 text-sm"
  //         />
  //         {errorState?.errors.longDescription && (
  //           <p className="text-sm text-red-500">
  //             {errorState.errors.longDescription[0]}
  //           </p>
  //         )}
  //       </div>

  //       {/* PRECIO / STOCK / DESCUENTO */}
  //       <div className="flex gap-4">
  //         <input
  //           name="price"
  //           type="number"
  //           defaultValue={errorState?.values.price ?? product.price}
  //           className="w-1/3 rounded-md border py-2 pl-3 text-sm"
  //         />
  //         <input
  //           name="stock"
  //           type="number"
  //           defaultValue={errorState?.values.stock ?? product.stock}
  //           className="w-1/3 rounded-md border py-2 pl-3 text-sm"
  //         />
  //         <input
  //           name="discount"
  //           type="number"
  //           defaultValue={errorState?.values.discount ?? product.discount}
  //           className="w-1/3 rounded-md border py-2 pl-3 text-sm"
  //         />
  //       </div>

  //       {/* IMAGEN */}
  //       <div className="mt-4">
  //         <input
  //           name="image_url"
  //           defaultValue={errorState?.values.image_url ?? product.image_url}
  //           className="block w-full rounded-md border py-2 pl-3 text-sm"
  //         />
  //       </div>

  //       {/* CATEGORÍA / SUBCATEGORÍA / STATUS */}
  //       <div className="mt-4 flex gap-4 items-center">

  //         <Select value={selectedCategory} onValueChange={handleCategoryChange}>
  //           <SelectTrigger className="w-50">
  //             <SelectValue placeholder="Categoría" />
  //           </SelectTrigger>
  //           <SelectContent>
  //             {categories.map(cat => (
  //               <SelectItem
  //                 key={cat.category_id}
  //                 value={cat.category_id.toString()}
  //               >
  //                 {cat.category_name}
  //               </SelectItem>
  //             ))}
  //           </SelectContent>
  //         </Select>

  //         <input type="hidden" name="category" value={selectedCategory} />

  //         <Select
  //           value={selectedSubcategory}
  //           onValueChange={setSelectedSubcategory}
  //           disabled={!availableSubcategories.length}
  //         >
  //           <SelectTrigger className="w-50">
  //             <SelectValue placeholder="Subcategoría" />
  //           </SelectTrigger>
  //           <SelectContent>
  //             {availableSubcategories.map(sub => (
  //               <SelectItem
  //                 key={sub.subcategory_id}
  //                 value={sub.subcategory_id.toString()}
  //               >
  //                 {sub.subcategory_name}
  //               </SelectItem>
  //             ))}
  //           </SelectContent>
  //         </Select>

  //         <input type="hidden" name="subcategory" value={selectedSubcategory} />

  //         <div className="flex items-center gap-3">
  //           <Switch checked={status} onCheckedChange={setStatus} />
  //           <span className="text-sm">
  //             {status ? 'Activo' : 'Inactivo'}
  //           </span>
  //           <input
  //             type="hidden"
  //             name="status"
  //             value={status ? 'true' : 'false'}
  //           />
  //         </div>

  //       </div>
  //     </div>

  //     <div className="mt-6 flex justify-end gap-4">
  //       <Link
  //         href="/dashboard/products"
  //         className="rounded-md bg-gray-200 px-4 py-2 text-sm"
  //       >
  //         Cancelar
  //       </Link>
  //       <Button type="submit">Editar producto</Button>
  //     </div>
  //   </form>
  // );
}

