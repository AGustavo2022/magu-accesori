"use client"

import { useSearchParams } from "next/navigation"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface Props {
  currentPage: number
  totalPages: number
}

export default function PaginationProducts({
  currentPage,
  totalPages,
}: Props) {
  const searchParams = useSearchParams()

  const buildHref = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", String(page))
    return `?${params.toString()}`
  }

  const prevPage = Math.max(currentPage - 1, 1)
  const nextPage = Math.min(currentPage + 1, totalPages)

  return (
    <Pagination>
      <PaginationContent>

        {/* PREVIOUS */}
        <PaginationItem>
          <PaginationPrevious
            href={buildHref(prevPage)}
            className={
              currentPage === 1
                ? "pointer-events-none opacity-50"
                : ""
            }
          />
        </PaginationItem>

        {/* PAGE NUMBERS (máx 5) */}
        {(() => {
          const MAX_VISIBLE = 5
          const pages: number[] = []

          let start = Math.max(
            currentPage - Math.floor(MAX_VISIBLE / 2),
            1
          )

          let end = start + MAX_VISIBLE - 1

          if (end > totalPages) {
            end = totalPages
            start = Math.max(end - MAX_VISIBLE + 1, 1)
          }

          for (let i = start; i <= end; i++) {
            pages.push(i)
          }

          return pages.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href={buildHref(page)}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))
        })()}

        {/* NEXT */}
        <PaginationItem>
          <PaginationNext
            href={buildHref(nextPage)}
            className={
              currentPage === totalPages
                ? "pointer-events-none opacity-50"
                : ""
            }
          />
        </PaginationItem>

      </PaginationContent>
    </Pagination>
  )
}
