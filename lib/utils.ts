import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

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