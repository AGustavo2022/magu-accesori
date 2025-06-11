import React from 'react'
import { Separator } from '../ui/separator';

const categories: string[] = [
  "Cocina",
  "Cristalería",
  "Organización",
  "Limpieza del Hogar",
  "Decoración",
  "Baño",
  "Jardín",
  "Textiles para el Hogar",
  "Electrodomésticos Pequeños",
  "Infantil",
];


function Category() {
    return (
        <div className='flex h-full flex-col px-3 py-4 md:px-2 bg-amber-200'>
            <h1>Categoria</h1>
            <Separator/>
                <ul>
                    {categories.map((cat) => (
                        <li key={cat} className="p-2">
                            {cat}
                        </li>
                    ))}
                </ul>

        </div>
    )
}

export default Category