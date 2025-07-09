"use client"

import { useEffect, useState } from "react"
import { ChevronRight, ChevronDown } from "lucide-react"
import Link from "next/link"
import { getCategorias } from "@/lib/actions"
import { Category } from "@/lib/definitions"


export default function CategorySidebar() {
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);
  const [productCategories, setProductCategories] = useState<Array<Category>>([]);

    useEffect(() => {
      async function fetchData() {
        const data = await getCategorias();
        setProductCategories(data as Category[]);
      }
      fetchData();
    }, []);
    
    console.log(productCategories)

    return(
      <>hola</>
    )

  }
