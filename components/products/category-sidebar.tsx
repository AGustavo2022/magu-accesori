import Link from "next/link";
import { getCategoryAll } from "@/lib/data";
import { createSlug } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Subcategory } from "@/lib/definitions";

export default async function CategorySidebar() {
  const categories = await getCategoryAll();

  if (!categories?.length) return null;

  return (
    <Accordion type="single" collapsible className="w-full">
      {categories.map((cat) => (
        <AccordionItem
          key={cat.category_id}
          value={`cat-${cat.category_id}`}
        >
          {/* CATEGORÍA */}
          <AccordionTrigger className="w-full">
            {cat.category_name}
          </AccordionTrigger>

          {/* SUBCATEGORÍAS */}
          <AccordionContent className="flex flex-col gap-2 pl-4">
            {cat.subcategories?.map((sub: Subcategory) => (
              <SidebarLink
                key={sub.subcategory_id}
                label={sub.subcategory_name}
                href={`/category/subcategory/${createSlug(
                  sub.subcategory_name
                )}`}
              />
            ))}

            {/* VER TODOS */}
            <SidebarLink
              label="Ver todos"
              href={`/category/${createSlug(cat.category_name)}`}
              className="font-semibold"
            />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

/* 🔹 Componente Link reutilizable */
function SidebarLink({
  href,
  label,
  className = "",
}: {
  href: string;
  label: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`text-gray-700 hover:text-blue-600 text-sm ${className}`}
    >
      {label}
    </Link>
  );
}
