import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Category } from "./definitions";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function createSlug(text: string): string {
  return text
    .toLowerCase() // 1. Convertir a minúsculas
    .replace(/\s+/g, '-') // 2. Reemplazar espacios por guiones
    .normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // 3. Opcional: Eliminar acentos
}

export function unslugify(slug: string): string {
  // 1. Reemplazar todos los guiones por espacios
  const textWithSpaces = slug.replace(/-/g, ' ');

  // 2. Capitalizar la primera letra de cada palabra (opcional, pero mejora la presentación)
  return textWithSpaces.toLowerCase().split(' ')
    .map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(' ');
}

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(price)
}

/**
* Busca el ID de una categoría dado su nombre.
* @param categoryName El nombre de la categoría (p.ej., 'Llaveros').
* @param categories El array completo de objetos Category.
* @returns El ID de la categoría (como string), o null si no se encuentra.
*/
export function getCategoryIdByName(
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

/**
* Busca el ID de una subcategoría dado su nombre, navegando por todas las categorías.
* @param subcategoryName El nombre de la subcategoría (p.ej., 'Regulares').
* @param categories El array completo de objetos Category, que contienen las subcategorías.
* @returns El ID de la subcategoría (como string), o null si no se encuentra.
*/
export function getSubcategoryIdByName(
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