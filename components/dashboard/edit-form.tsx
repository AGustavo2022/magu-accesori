'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
import { updateProduct } from '@/lib/actions';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from 'react';
import { Category, Subcategory } from '@/lib/definitions';

// Interfaz (sin cambios)
interface ProductForm {
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
    created_at: Date
}

interface EditProductFormProps {
    product: ProductForm;
    categories: Category[];
}

export default function EditProductForm({ product, categories }: EditProductFormProps) {

    /**
    * Busca el ID de una categoría dado su nombre.
    * @param categoryName El nombre de la categoría (p.ej., 'Llaveros').
    * @param categories El array completo de objetos Category.
    * @returns El ID de la categoría (como string), o null si no se encuentra.
    */
    function getCategoryIdByName(
      categoryName: string,
      categories: Category[]
    ): string | null {

      // 1. Buscar la categoría en el array 'categories' por el nombre
      const foundCategory = categories.find(
        (cat) => cat.category_name === categoryName
      );

      // 2. Devolver el ID (convertido a string para compatibilidad con el Select)
      return foundCategory ? foundCategory.category_id.toString() : null;
    }

    const categoryId = getCategoryIdByName(product.category, categories)

    /**
    * Busca el ID de una subcategoría dado su nombre, navegando por todas las categorías.
    * @param subcategoryName El nombre de la subcategoría (p.ej., 'Regulares').
    * @param categories El array completo de objetos Category, que contienen las subcategorías.
    * @returns El ID de la subcategoría (como string), o null si no se encuentra.
    */
    function getSubcategoryIdByName(
        subcategoryName: string, 
        categories: Category[]
    ): string | null {
        
        let subcategoryId: string | null = null;

        // 1. Iterar sobre cada categoría
        for (const category of categories) {
            // 2. Buscar la subcategoría dentro del array 'subcategories' de la categoría actual
            const foundSubcategory = category.subcategories.find(
                (sub) => sub.subcategory_name === subcategoryName
            );

            // 3. Si se encuentra, guardar el ID y salir del bucle
            if (foundSubcategory) {
                subcategoryId = foundSubcategory.subcategory_id.toString();
                break; 
            }
        }

        return subcategoryId;
    }

    const subCategoryId = getSubcategoryIdByName(product.subcategory, categories)

    // --- ⬇️ INICIALIZACIÓN DE ESTADOS CORREGIDA ⬇️ ---
    
    // 1. selectedCategory ahora es de tipo string, ya que el Select lo requiere.
    // Usamos el resultado de getCategoryIdByName directamente (que es string|null). 
    // Usamos el operador coalescing (??) para asegurar un valor inicial si categoryId es null.
    const [selectedCategory, setSelectedCategory] = useState<string>(categoryId ?? '');
    
    const [availableSubcategories, setAvailableSubcategories] = useState<Subcategory[]>(() => {
        // Usamos el ID de la categoría del producto (que es el valor inicial de selectedCategory)
        const numericCategoryId = Number(categoryId); // Convertimos el ID inicial a número para la búsqueda
        const categoryObject = categories.find(
            (cat) => cat.category_id === numericCategoryId
        );
        return categoryObject ? categoryObject.subcategories : [];
    });
    
    // 2. selectedSubcategory ahora es de tipo string, ya que el Select lo requiere.
    const [selectedSubcategory, setSelectedSubcategory] = useState<string>(subCategoryId ?? '');

    // --- ⬆️ INICIALIZACIÓN DE ESTADOS CORREGIDA ⬆️ ---

    const updateProductWithId = updateProduct.bind(null, product.id);


    // --- ⬇️ HANDLERS CORREGIDOS ⬇️ ---

    const handleCategoryChange = (categoryIdString: string) => {
        // 1. Actualiza el estado con la string (lo que usa el Select)
        setSelectedCategory(categoryIdString); 

        // 2. Convierte a number para buscar en tu array 'categories'
        const numericCategoryId = Number(categoryIdString);

        const categoryObject = categories.find(
            (cat) => cat.category_id === numericCategoryId
        );

        // 3. Actualiza las subcategorías disponibles y resetea la subcategoría seleccionada
        const subArray = categoryObject ? categoryObject.subcategories : [];
        setAvailableSubcategories(subArray);
        setSelectedSubcategory(''); // Usamos string vacía para resetear el valor del Select
    };

    const handleSubcategoryChange = (subcategoryIdString: string) => {
        // Acepta string y actualiza el estado (lo que usa el Select)
        setSelectedSubcategory(subcategoryIdString);
        // Si necesitas el ID numérico para otra lógica, puedes convertirlo aquí:
        // const numericSubcategoryId = Number(subcategoryIdString);
    };

    // --- ⬆️ HANDLERS CORREGIDOS ⬆️ ---


    return (
        <form action={updateProductWithId} className="max-w-4xl mx-auto my-8">

            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                {/* ... (Otros campos del formulario sin cambios) ... */}

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
                            defaultValue={product.title}
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
                            defaultValue={product.short_description}
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
                            defaultValue={product.long_description}
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
                                    defaultValue={product.price}
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
                                defaultValue={product.stock}
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
                                defaultValue={product.discount}
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
                            defaultValue={product.image_url}
                        />
                    </div>
                </div>

                {/* 6. Categoría y Subcategoría */}
                <div className="flex gap-4">

                    {/* Selector de Categoría */}
                    <div className="mb-4 w-1/4">
                        <label htmlFor="category" className="mb-2 block text-sm font-medium">
                            Categoría
                        </label>
                        <Select
                            onValueChange={handleCategoryChange}
                            // El 'value' debe ser la string que espera el Select
                            value={selectedCategory} 
                        >
                            <SelectTrigger className="w-[200px] ">
                                <SelectValue placeholder="Seleccione Categoría" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((cat) => (
                                    <SelectItem 
                                        key={cat.category_id} 
                                        // El 'value' de SelectItem DEBE ser un string
                                        value={cat.category_id.toString()}
                                    >
                                        {cat.category_name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {/* Input oculto que envía el ID como string al action */}
                        <input
                            type="hidden"
                            name="category"
                            value={selectedCategory}
                        />
                    </div>

                    {/* Selector de Subcategoría */}
                    <div className="mb-4 w-1/4">
                        <label htmlFor="subcategory" className="mb-2 block text-sm font-medium">
                            Subcategoría
                        </label>
                        <Select
                            onValueChange={handleSubcategoryChange}
                            // El 'value' debe ser la string que espera el Select
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
                                        // El 'value' de SelectItem DEBE ser un string
                                        value={sub.subcategory_id.toString()}
                                    >
                                        {sub.subcategory_name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {/* Input oculto que envía el ID como string al action */}
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
                    href="/dashboard/products"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancelar
                </Link>
                <Button type="submit">Editar Producto</Button>
            </div>
        </form>
    );
}