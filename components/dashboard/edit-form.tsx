// 'use client';

// import Link from 'next/link';
// import { Button } from '../ui/button';

// import { UpdateProductState } from '@/lib/types/product.types';
// import { useState } from 'react';
// import { EditProductFormProps, Subcategory } from '@/lib/types/definitions';
// import { getCategoryIdByName, getSubcategoryIdByName } from '@/lib/utils';
// import { Switch } from '../ui/switch';
// import { useFormState } from 'react-dom';
// import { updateProduct } from '@/lib/actions/actions';

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// export default function EditProductForm({ product, categories }: EditProductFormProps) {

//   const initialState: UpdateProductState = {
//     success: true,
//     message: undefined,
//     errors: {},
//     values: {},
//   };

//   const [state, formAction] = useFormState(
//     updateProduct.bind(null, product.id),
//     initialState
//   );

//   const categoryId = getCategoryIdByName(product.category, categories);
//   const subCategoryId = getSubcategoryIdByName(product.subcategory, categories);

//   const [selectedCategory, setSelectedCategory] = useState<string>(
//     state.values?.category ?? categoryId ?? ''
//   );

//   const [availableSubcategories, setAvailableSubcategories] = useState<Subcategory[]>(() => {
//     const numericCategoryId = Number(categoryId);
//     const categoryObject = categories.find(
//       (cat) => cat.category_id === numericCategoryId
//     );
//     return categoryObject ? categoryObject.subcategories : [];
//   });

//   const [selectedSubcategory, setSelectedSubcategory] = useState<string>(
//     state.values?.subcategory ?? subCategoryId ?? ''
//   );

//   const [status, setStatus] = useState<boolean>(
//     state.values?.status
//       ? state.values.status === 'true'
//       : product.status
//   );

//   const handleCategoryChange = (categoryIdString: string) => {
//     setSelectedCategory(categoryIdString);

//     const numericCategoryId = Number(categoryIdString);
//     const categoryObject = categories.find(
//       (cat) => cat.category_id === numericCategoryId
//     );

//     setAvailableSubcategories(categoryObject?.subcategories ?? []);
//     setSelectedSubcategory('');
//   };

//   const handleSubcategoryChange = (subcategoryIdString: string) => {
//     setSelectedSubcategory(subcategoryIdString);
//   };

//   return (
//     <form action={formAction} className="max-w-4xl mx-auto my-8">

//       <div className="rounded-md bg-gray-50 p-4 md:p-6">

//         {/* TÍTULO */}
//         <div className="mb-4">
//           <label className="mb-2 block text-sm font-medium">Título</label>
//           <input
//             name="title"
//             type="text"
//             defaultValue={state.values?.title ?? product.title}
//             className="block w-full rounded-md border py-2 pl-3 text-sm"
//           />
//           {state.errors?.title && (
//             <p className="mt-1 text-sm text-red-500">{state.errors.title[0]}</p>
//           )}
//         </div>

//         {/* DESCRIPCIÓN CORTA */}
//         <div className="mb-4">
//           <label className="mb-2 block text-sm font-medium">Descripción corta</label>
//           <textarea
//             name="shortDescription"
//             rows={2}
//             defaultValue={state.values?.shortDescription ?? product.short_description}
//             className="block w-full rounded-md border py-2 pl-3 text-sm resize-none"
//           />
//           {state.errors?.shortDescription && (
//             <p className="mt-1 text-sm text-red-500">{state.errors.shortDescription[0]}</p>
//           )}
//         </div>

//         {/* DESCRIPCIÓN LARGA */}
//         <div className="mb-4">
//           <label className="mb-2 block text-sm font-medium">Descripción larga</label>
//           <textarea
//             name="longDescription"
//             rows={4}
//             defaultValue={state.values?.longDescription ?? product.long_description}
//             className="block w-full rounded-md border py-2 pl-3 text-sm resize-none"
//           />
//           {state.errors?.longDescription && (
//             <p className="mt-1 text-sm text-red-500">{state.errors.longDescription[0]}</p>
//           )}
//         </div>

//         {/* PRECIO / STOCK / DESCUENTO */}
//         <div className="flex gap-4">
//           <input
//             name="price"
//             type="number"
//             defaultValue={state.values?.price ?? product.price}
//             className="w-1/3 rounded-md border py-2 pl-3 text-sm"
//           />
//           <input
//             name="stock"
//             type="number"
//             defaultValue={state.values?.stock ?? product.stock}
//             className="w-1/3 rounded-md border py-2 pl-3 text-sm"
//           />
//           <input
//             name="discount"
//             type="number"
//             defaultValue={state.values?.discount ?? product.discount}
//             className="w-1/3 rounded-md border py-2 pl-3 text-sm"
//           />
//         </div>

//         {/* IMAGEN */}
//         <div className="mt-4">
//           <input
//             name="image_url"
//             type="text"
//             defaultValue={state.values?.image_url ?? product.image_url}
//             className="block w-full rounded-md border py-2 pl-3 text-sm"
//           />
//         </div>

//         {/* CATEGORÍA / SUB */}
//         <div className="flex gap-4 mt-4">

//           <Select value={selectedCategory || undefined} onValueChange={handleCategoryChange}>
//             <SelectTrigger className="w-[200px]">
//               <SelectValue placeholder="Categoría" />
//             </SelectTrigger>
//             <SelectContent>
//               {categories.map((cat) => (
//                 <SelectItem key={cat.category_id} value={cat.category_id.toString()}>
//                   {cat.category_name}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>

//           <input type="hidden" name="category" value={selectedCategory} />

//           <Select
//             value={selectedSubcategory || undefined}
//             onValueChange={handleSubcategoryChange}
//             disabled={!availableSubcategories.length}
//           >
//             <SelectTrigger className="w-[200px]">
//               <SelectValue placeholder="Subcategoría" />
//             </SelectTrigger>
//             <SelectContent>
//               {availableSubcategories.map((sub) => (
//                 <SelectItem
//                   key={sub.subcategory_id}
//                   value={sub.subcategory_id.toString()}
//                 >
//                   {sub.subcategory_name}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>

//           <input type="hidden" name="subcategory" value={selectedSubcategory} />

//           {/* STATUS */}
//           <div className="flex items-center gap-3">
//             <Switch checked={status} onCheckedChange={setStatus} />
//             <span className="text-sm">{status ? 'Activo' : 'Inactivo'}</span>
//             <input type="hidden" name="status" value={status ? 'true' : 'false'} />
//           </div>

//         </div>
//       </div>

//       <div className="mt-6 flex justify-end gap-4">
//         <Link href="/dashboard" className="px-4 py-2 bg-gray-200 rounded-md">
//           Cancelar
//         </Link>
//         <Button type="submit">Editar Producto</Button>
//       </div>
//     </form>
//   );
// }

'use client';

import Link from 'next/link';
import { useActionState, useEffect, useState } from 'react';

import { Button } from '../ui/button';
import { Switch } from '../ui/switch';

import { updateProduct } from '@/lib/actions/actions';
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
    <form action={formAction} className="mx-auto my-8 max-w-4xl">
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

        {/* TÍTULO */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">Título</label>
          <input
            name="title"
            defaultValue={errorState?.values.title ?? product.title}
            className="block w-full rounded-md border py-2 pl-3 text-sm"
          />
          {errorState?.errors.title && (
            <p className="text-sm text-red-500">
              {errorState.errors.title[0]}
            </p>
          )}
        </div>

        {/* DESCRIPCIÓN CORTA */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">Descripción corta</label>
          <textarea
            name="shortDescription"
            rows={2}
            defaultValue={
              errorState?.values.shortDescription ??
              product.short_description
            }
            className="block w-full resize-none rounded-md border py-2 pl-3 text-sm"
          />
          {errorState?.errors.shortDescription && (
            <p className="text-sm text-red-500">
              {errorState.errors.shortDescription[0]}
            </p>
          )}
        </div>

        {/* DESCRIPCIÓN LARGA */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">Descripción larga</label>
          <textarea
            name="longDescription"
            rows={4}
            defaultValue={
              errorState?.values.longDescription ??
              product.long_description
            }
            className="block w-full resize-none rounded-md border py-2 pl-3 text-sm"
          />
          {errorState?.errors.longDescription && (
            <p className="text-sm text-red-500">
              {errorState.errors.longDescription[0]}
            </p>
          )}
        </div>

        {/* PRECIO / STOCK / DESCUENTO */}
        <div className="flex gap-4">
          <input
            name="price"
            type="number"
            defaultValue={errorState?.values.price ?? product.price}
            className="w-1/3 rounded-md border py-2 pl-3 text-sm"
          />
          <input
            name="stock"
            type="number"
            defaultValue={errorState?.values.stock ?? product.stock}
            className="w-1/3 rounded-md border py-2 pl-3 text-sm"
          />
          <input
            name="discount"
            type="number"
            defaultValue={errorState?.values.discount ?? product.discount}
            className="w-1/3 rounded-md border py-2 pl-3 text-sm"
          />
        </div>

        {/* IMAGEN */}
        <div className="mt-4">
          <input
            name="image_url"
            defaultValue={errorState?.values.image_url ?? product.image_url}
            className="block w-full rounded-md border py-2 pl-3 text-sm"
          />
        </div>

        {/* CATEGORÍA / SUBCATEGORÍA / STATUS */}
        <div className="mt-4 flex gap-4 items-center">

          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Categoría" />
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

          <Select
            value={selectedSubcategory}
            onValueChange={setSelectedSubcategory}
            disabled={!availableSubcategories.length}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Subcategoría" />
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

          <div className="flex items-center gap-3">
            <Switch checked={status} onCheckedChange={setStatus} />
            <span className="text-sm">
              {status ? 'Activo' : 'Inactivo'}
            </span>
            <input
              type="hidden"
              name="status"
              value={status ? 'true' : 'false'}
            />
          </div>

        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard"
          className="rounded-md bg-gray-200 px-4 py-2 text-sm"
        >
          Cancelar
        </Link>
        <Button type="submit">Editar producto</Button>
      </div>
    </form>
  );
}
