import ProductCard from "./product-card"

const products = [
  {
    id: 1,
    title: "Zapatillas Deportivas Premium",
    price: 79.99,
    description: "Zapatillas deportivas de alta calidad con tecnología de amortiguación avanzada para máximo confort.",
    imageUrl: "/images/sneakers.png",
  },
  {
    id: 2,
    title: "Reloj Inteligente Serie X",
    price: 129.99,
    description:
      "Monitorea tu actividad física, recibe notificaciones y controla tu música con este reloj inteligente.",
    imageUrl: "/images/smartwatch.png",
  },
  {
    id: 3,
    title: "Auriculares Inalámbricos Pro",
    price: 89.99,
    description: "Disfruta de un sonido de alta calidad con cancelación de ruido y hasta 20 horas de batería.",
    imageUrl: "/images/headphones.png",
  },
  {
    id: 4,
    title: "Mochila Impermeable Viajera",
    price: 49.99,
    description: "Espaciosa, resistente al agua y con compartimentos para laptop y accesorios.",
    imageUrl: "/images/backpack.png",
  },
]
console.log(products)
export default function ProductGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          title={product.title}
          price={product.price}
          description={product.description}
          imageUrl={product.imageUrl}
        />
      ))}
    </div>
  )
}
