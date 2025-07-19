"use client"

import { useEffect, useState } from "react"
import { getCategorias } from "@/lib/actions"
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
        const data = await getCategorias();
        setProductCategories(data as Category[]);
      }
      fetchData();
    }, []);
    
 console.log(productCategories)
return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      // defaultValue="item-2"
    >

    {productCategories.map((cat: any) => (

      <AccordionItem value={cat.id}>
        <AccordionTrigger className="w-full">{cat.name}</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
              <Link
                key={cat.id}
                href={`/category/${cat.id}`}
                className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium transition-colors duration-200"
              >
                {cat.description}
              </Link>
          </p>

        </AccordionContent>
      </AccordionItem>
    ))}
    </Accordion>
  )

  }

      //         <ul className="list-disc pl-6">
      //   {productCategories.map((cat: any) => (
      //     <li key={cat.id}>{cat.name}.........{cat.description}</li>
      //   ))}
      // </ul>