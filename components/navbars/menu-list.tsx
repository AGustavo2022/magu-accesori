import Link from "next/link"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const listMenu = [
  {
    id: 1,
    name: 'Inicio',
    href:'/'
  },
  {
    id: 2,
    name: 'Productos',
    href:'/products'
  },
  {
    id: 3,
    name: 'Quienes Somos',
    href:'/about'
  },
  {
    id: 4,
    name: 'Contacto',
    href:'/contact'
  }
]

export function MenuList() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {listMenu.map((item) => (
          <NavigationMenuItem>
            <Link
              key={item.id }
              href={item.href}>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {item.name}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          )
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
