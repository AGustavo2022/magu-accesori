
import { Menu } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import Link from "next/link"

 function MenuListMobile() {
  return (
    <Popover>
      <PopoverTrigger>
        <Menu/>
      </PopoverTrigger>
      <PopoverContent >
        <Link href="/contacto" className="block">Opcion 1</Link>
        <Link href='/' className="block">Opcion 1</Link>
        <Link href="/about" className="block">Sobre Nosotros 1</Link>
        
      </PopoverContent>
    </Popover>
  )
}

export default MenuListMobile