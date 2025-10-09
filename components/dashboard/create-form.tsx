'use client';
//import { CustomerField } from '@/app/lib/definitions';
import Link from 'next/link';
import { Button } from '../ui/button';
import { ProductsField } from '@/lib/definitions';
import { createProduct } from '@/lib/actions';


export default function CreateProductForm() {
  // Nota: El prop 'customers' se mantiene en la firma por consistencia con tu código,
  // pero ya no se usa.

  return (
    <form action={createProduct}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

        {/* 1. Título (title) - Campo nuevo */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Título
          </label>
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
        
        {/* 2. Descripción Corta (shortDescription) - Campo nuevo */}
        <div className="mb-4">
          <label htmlFor="shortDescription" className="mb-2 block text-sm font-medium">
            Descripción Corta
          </label>
          <div className="relative">
            <textarea
              id="shortDescription"
              name="shortDescription"
              placeholder="Breve descripción del producto"
              rows={2}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
            />
          </div>
        </div>

        {/* 3. Descripción Larga (longDescription) - Campo nuevo */}
        <div className="mb-4">
          <label htmlFor="longDescription" className="mb-2 block text-sm font-medium">
            Descripción Larga
          </label>
          <div className="relative">
            <textarea
              id="longDescription"
              name="longDescription"
              placeholder="Descripción detallada del producto"
              rows={4}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
            />
          </div>
        </div>

        {/* 4. Precio (price) - Adaptado de "Invoice Amount" */}
        <div className="mb-4">
          <label htmlFor="price" className="mb-2 block text-sm font-medium">
            Precio
          </label>
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

        {/* 5. Stock (stock) - Campo nuevo */}
        <div className="mb-4">
          <label htmlFor="stock" className="mb-2 block text-sm font-medium">
            Stock
          </label>
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

        {/* 6. URL de Imagen (image_url) - Campo nuevo */}
        <div className="mb-4">
          <label htmlFor="image_url" className="mb-2 block text-sm font-medium">
            URL de la Imagen
          </label>
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

        {/* 7. Categoría (category) - Campo nuevo */}
        <div className="mb-4">
          <label htmlFor="category" className="mb-2 block text-sm font-medium">
            Categoría
          </label>
          <div className="relative">
            <input
              id="category"
              name="category"
              type="text"
              placeholder="Ej: Electrónica"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
            />
          </div>
        </div>

        {/* 8. Subcategoría (subcategory) - Campo nuevo */}
        <div className="mb-4">
          <label htmlFor="subcategory" className="mb-2 block text-sm font-medium">
            Subcategoría
          </label>
          <div className="relative">
            <input
              id="subcategory"
              name="subcategory"
              type="text"
              placeholder="Ej: Smartphones"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
            />
          </div>
        </div>

        {/* 9. Descuento (discount) - Campo nuevo */}
        <div className="mb-4">
          <label htmlFor="discount" className="mb-2 block text-sm font-medium">
            Descuento (%)
          </label>
          <div className="relative">
            <input
              id="discount"
              name="discount"
              type="number"
              step="0.01"
              placeholder="0.00"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
            />
          </div>
        </div>

        {/* 10. Estado (status) - Adaptado de "Invoice Status" para booleano */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Estado del Producto
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="active"
                  name="status"
                  type="radio"
                  value="true" // Esto se enviará como string 'true'
                  defaultChecked={true}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="active"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Activo
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="inactive"
                  name="status"
                  type="radio"
                  value="false" // Esto se enviará como string 'false'
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="inactive"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Inactivo
                </label>
              </div>
            </div>
          </div>
        </fieldset>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/products"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Crear Producto</Button>
      </div>
    </form>
  );
}