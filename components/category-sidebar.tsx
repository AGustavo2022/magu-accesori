"use client"

import { useEffect, useState } from "react"
import { getCategorias, getCategorias2 } from "@/lib/actions"
import { Category } from "@/lib/definitions"
import Link from "next/link"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"



export default function CategorySidebar() {
  const [productCategories, setProductCategories] = useState<Array<Category>>([]);

    useEffect(() => {
      async function fetchData() {
        //const data = await getCategorias();
        const data = await getCategorias2();
        setProductCategories(data as Category[]);
      }
      fetchData();
    }, []);

return (
    <Accordion type="single" collapsible className="w-full">
      
      {productCategories.map((cat) => (
        <AccordionItem key={cat.category_id} value={`cat-${cat.category_id}`}>
          <AccordionTrigger className="w-full">
            {cat.category_name}
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2 pl-4">
            {cat.subcategories.map((sub) => (
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