"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const products = [
  {
    id: 1,
    name: "Tarte aux Fruits",
    description: "Pâte sablée croustillante, crème pâtissière vanille et fruits frais de saison",
    price: "28€",
    category: "Tartes",
    image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=600&h=600&fit=crop",
  },
  {
    id: 2,
    name: "Paris-Brest",
    description: "Pâte à choux, crème pralinée aux noisettes torréfiées",
    price: "32€",
    category: "Classiques",
    image: "https://images.unsplash.com/photo-1612203985729-70726954388c?w=600&h=600&fit=crop",
  },
  {
    id: 3,
    name: "Entremet Chocolat",
    description: "Mousse chocolat noir 70%, biscuit moelleux et glaçage miroir",
    price: "38€",
    category: "Entremets",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&h=600&fit=crop",
  },
  {
    id: 4,
    name: "Macarons Assortis",
    description: "Coffret de 12 macarons aux parfums variés",
    price: "24€",
    category: "Petits Fours",
    image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=600&h=600&fit=crop",
  },
  {
    id: 5,
    name: "Croissants Dorés",
    description: "Pur beurre AOP, feuilletage artisanal 48h de repos",
    price: "3,50€",
    category: "Viennoiseries",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&h=600&fit=crop",
  },
  {
    id: 6,
    name: "Wedding Cake",
    description: "Création sur mesure pour votre grand jour",
    price: "Sur devis",
    category: "Événements",
    image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=600&h=600&fit=crop",
  },
]

const categories = ["Tous", "Tartes", "Classiques", "Entremets", "Petits Fours", "Viennoiseries", "Événements"]

export function ProductsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeCategory, setActiveCategory] = useState("Tous")
  const [visibleProducts, setVisibleProducts] = useState(products)

  useEffect(() => {
    if (activeCategory === "Tous") {
      setVisibleProducts(products)
    } else {
      setVisibleProducts(products.filter((p) => p.category === activeCategory))
    }
  }, [activeCategory])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = sectionRef.current?.querySelectorAll(".reveal")
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [visibleProducts])

  return (
    <section id="creations" ref={sectionRef} className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="reveal opacity-0 inline-block text-sm font-medium text-primary uppercase tracking-widest">
            Nos Créations
          </span>
          <h2 className="reveal opacity-0 font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground text-balance">
            Douceurs Artisanales
          </h2>
          <p className="reveal opacity-0 text-muted-foreground max-w-2xl mx-auto text-lg" style={{ animationDelay: "0.1s" }}>
            Chaque création est un voyage gustatif, façonnée avec amour et les meilleurs ingrédients.
          </p>
        </div>

        {/* Category Filter */}
        <div className="reveal opacity-0 flex flex-wrap justify-center gap-3 mb-12" style={{ animationDelay: "0.2s" }}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card text-muted-foreground hover:bg-primary/10 hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleProducts.map((product, index) => (
            <Card
              key={product.id}
              className="reveal opacity-0 group bg-card border-0 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden rounded-2xl"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-card/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-foreground">
                    {product.category}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <Button
                    asChild
                    className="w-full bg-card hover:bg-card/90 text-foreground rounded-full"
                  >
                    <a href="#commander">Commander</a>
                  </Button>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl font-semibold text-foreground">{product.name}</h3>
                  <span className="text-primary font-bold text-lg">{product.price}</span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{product.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
