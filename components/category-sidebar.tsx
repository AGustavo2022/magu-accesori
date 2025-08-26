
import { getCategorias2 } from "@/lib/actions"
import Link from "next/link"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Subcategory } from "@/lib/definitions"

export default  async function CategorySidebar() {

  const productCategories = await getCategorias2()

  console.log(productCategories)

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
                  href={`/category/${sub.subcategory_id}`}
                  className="text-gray-700 hover:text-blue-600 text-sm"
                >
                  {sub.subcategory_name}
                </Link>

              ))
            }
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}