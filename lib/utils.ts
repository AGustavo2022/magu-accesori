import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Category, Product } from "./types/definitions";
import { CartItem } from "./types/cart.types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Convierte un texto en un slug URL-friendly.
 */
export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

/**
 * Convierte un slug en texto legible.
 */
export function unslugify(slug?: string | null): string {
  if (!slug) return ""

  return slug
    .replace(/-/g, " ")
    .toLowerCase()
    .split(" ")
    .map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ")
}


/**
 * Formatea un precio en pesos argentinos.
 */
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

  const foundCategory = categories.find(
    (cat) => cat.category_name === categoryName
  );

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

  for (const category of categories) {
    const foundSubcategory = category.subcategories.find(
      (sub) => sub.subcategory_name === subcategoryName
    );

    if (foundSubcategory) {
      subcategoryId = foundSubcategory.subcategory_id.toString();
      break;
    }
  }

  return subcategoryId;
}



export function productToCartItem(
  product: Product,
  quantity: number
): CartItem {
  return {
    productId: product.id,
    title: product.title,
    image_url: product.image_url,
    stock: product.stock,
    price: product.price,
    discount: product.discount,
    quantity,
  }
}



/**
 * Formatea una fecha en zona horaria de Argentina (America/Argentina/Buenos_Aires).
 *
 * Convierte un string ISO o un objeto Date a:
 * - fecha → formato DD/MM/YYYY
 * - hora → formato HH:mm (24hs)
 * - full  → combinación de fecha y hora
 *
 * Ideal para mostrar fechas de órdenes, pagos o registros guardados en UTC.
 *
 * @param {string | Date} dateInput - Fecha en formato ISO string (UTC recomendado) o instancia de Date.
 *
 * @returns {{
 *   fecha: string;
 *   hora: string;
 *   full: string;
 * }}
 *
 * @example
 * const result = formatDateAR("2026-02-19T16:32:01.000Z")
 *
 * result.fecha // "19/02/2026"
 * result.hora  // "13:32"
 * result.full  // "19/02/2026 13:32"
 */
export function formatDateAR(dateInput: string | Date) {
  const date = new Date(dateInput)

  const fecha = date.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "America/Argentina/Buenos_Aires",
  })

  const hora = date.toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "America/Argentina/Buenos_Aires",
  })

  return {
    fecha,
    hora,
    full: `${fecha} ${hora}`,
  }
}
