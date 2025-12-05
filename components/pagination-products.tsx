"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Props {
  currentPage: number;
  totalPages: number;
}

export default function PaginationProducts({
  currentPage,
  totalPages,
}: Props) {
  const prevPage = currentPage > 1 ? currentPage - 1 : 1;
  const nextPage =
    currentPage < totalPages ? currentPage + 1 : totalPages;

  return (
    <Pagination>
      <PaginationContent>

        {/* PREVIOUS */}
        <PaginationItem>
          <PaginationPrevious
            href={`?page=${prevPage}`}
            className={
              currentPage === 1
                ? "pointer-events-none opacity-50"
                : ""
            }
          />
        </PaginationItem>

        {/* PAGE NUMBERS */}
        {(() => {
          const pages: (number | string)[] = [];

          // Siempre mostrar 1
          if (currentPage !== 1) {
            pages.push(1);
          }

          // Ventana dinámica
          let start = Math.max(currentPage - 1, 2);
          let end = Math.min(currentPage + 1, totalPages - 1);

          // Cercano al inicio
          if (currentPage <= 3) {
            start = 2;
            end = Math.min(4, totalPages - 1);
          }

          // Cercano al final
          if (currentPage >= totalPages - 2) {
            start = Math.max(totalPages - 3, 2);
            end = totalPages - 1;
          }

          // Ellipsis inicial
          if (start > 2) {
            pages.push("ellipsis-start");
          }

          // Números del medio
          for (let i = start; i <= end; i++) {
            pages.push(i);
          }

          // Ellipsis final
          if (end < totalPages - 1) {
            pages.push("ellipsis-end");
          }

          // Siempre mostrar última página
          if (totalPages !== 1) {
            pages.push(totalPages);
          }

          return pages.map((p, index) =>
            typeof p === "string" ? (
              <PaginationItem key={index}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={p}>
                <PaginationLink
                  href={`?page=${p}`}
                  isActive={p === currentPage}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            )
          );
        })()}

        {/* NEXT */}
        <PaginationItem>
          <PaginationNext
            href={`?page=${nextPage}`}
            className={
              currentPage === totalPages
                ? "pointer-events-none opacity-50"
                : ""
            }
          />
        </PaginationItem>

      </PaginationContent>
    </Pagination>
  );
}
