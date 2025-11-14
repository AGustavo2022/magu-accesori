import { getCategoryAll } from "@/lib/data"
import Link from "next/link"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Subcategory } from "@/lib/definitions"
import { createSlug } from "@/lib/utils"




export default async function CategorySidebar() {

  const productCategories = await getCategoryAll()


  // console.log(JSON.stringify(productCategories, null, 2))


  return (
    <Accordion type="single" collapsible className="w-full">

      {productCategories.map((cat) => (
        <AccordionItem key={cat.category_id} value={`cat-${cat.category_id}`}>
          <AccordionTrigger className="w-full">
            {cat.category_name}
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2 pl-4">
            {cat.subcategories.map((sub: Subcategory) => (

              <Link
                key={sub.subcategory_id}
                href={`/category/subcategory/${createSlug(sub.subcategory_name)}`}
                className="text-gray-700 hover:text-blue-600 text-sm"
              >
                {sub.subcategory_name}
              </Link>
            ))
            }

            <Link
              href={`/category/${createSlug(cat.category_name)}`} // Asumiendo que esta es la ruta para la categoría completa
              className="text-gray-700 hover:text-blue-800 font-semibold text-sm"
            >
              Ver todos
            </Link>

          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}