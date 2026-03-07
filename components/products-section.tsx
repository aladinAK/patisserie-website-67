"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Tarte aux Fruits",
    description: "Pâte sablée croustillante, crème pâtissière vanille et fruits frais de saison",
    price: "38$",
    category: "Tartes",
    image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=600&h=600&fit=crop",
    featured: true,
  },
  {
    id: 2,
    name: "Paris-Brest",
    description: "Pâte à choux, crème pralinée aux noisettes torréfiées",
    price: "42$",
    category: "Classiques",
    image: "https://images.unsplash.com/photo-1612203985729-70726954388c?w=600&h=600&fit=crop",
    featured: false,
  },
  {
    id: 3,
    name: "Entremet Chocolat",
    description: "Mousse chocolat noir 70%, biscuit moelleux et glaçage miroir",
    price: "52$",
    category: "Entremets",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&h=600&fit=crop",
    featured: true,
  },
  {
    id: 4,
    name: "Macarons Assortis",
    description: "Coffret de 12 macarons aux parfums variés",
    price: "32$",
    category: "Petits Fours",
    image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=600&h=600&fit=crop",
    featured: false,
  },
  {
    id: 5,
    name: "Croissants Dorés",
    description: "Pur beurre AOP, feuilletage artisanal 48h de repos",
    price: "4,50$",
    category: "Viennoiseries",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&h=600&fit=crop",
    featured: true,
  },
  {
    id: 6,
    name: "Wedding Cake",
    description: "Création sur mesure pour votre grand jour",
    price: "Sur devis",
    category: "Événements",
    image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=600&h=600&fit=crop",
    featured: false,
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
    <section id="creations" ref={sectionRef} className="py-24 bg-secondary/30 relative overflow-hidden">
      {/* Large background text */}
      <div className="absolute top-20 left-0 right-0 overflow-hidden pointer-events-none select-none">
        <h2 className="font-serif text-[15vw] font-bold text-foreground/[0.02] whitespace-nowrap">
          Douceurs Artisanales
        </h2>
      </div>
      
      <div className="container mx-auto px-6 relative">
        {/* Header with asymmetric layout */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <span className="reveal opacity-0 inline-block text-sm font-medium text-primary uppercase tracking-widest mb-4">
              Nos Créations
            </span>
            <h2 className="reveal opacity-0 font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-none">
              Douceurs
              <span className="block text-primary">Artisanales</span>
            </h2>
          </div>
          <p className="reveal opacity-0 text-muted-foreground text-lg max-w-md" style={{ animationDelay: "0.1s" }}>
            Chaque création est un voyage gustatif, façonnée avec amour et les meilleurs ingrédients.
          </p>
        </div>

        {/* Category Filter - Pill style */}
        <div className="reveal opacity-0 flex flex-wrap gap-2 mb-12" style={{ animationDelay: "0.2s" }}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-foreground text-background shadow-lg scale-105"
                  : "bg-card text-muted-foreground hover:bg-card/80 hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products - Masonry-like grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProducts.map((product, index) => {
            const isLarge = product.featured
            return (
              <div
                key={product.id}
                className={`reveal opacity-0 group ${isLarge ? "lg:row-span-2" : ""}`}
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div className={`relative rounded-3xl overflow-hidden bg-card shadow-sm hover:shadow-2xl transition-all duration-500 ${isLarge ? "h-full" : ""}`}>
                  <div className={`relative overflow-hidden ${isLarge ? "aspect-[3/4]" : "aspect-square"}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Category badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-card/90 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-medium text-foreground shadow-sm">
                        {product.category}
                      </span>
                    </div>

                    {/* Price badge */}
                    <div className="absolute top-4 right-4">
                      <span className="bg-primary px-4 py-2 rounded-full text-sm font-bold text-primary-foreground shadow-lg">
                        {product.price}
                      </span>
                    </div>

                    {/* Hover content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="font-serif text-2xl font-bold text-background mb-2">{product.name}</h3>
                      <p className="text-background/80 text-sm mb-4 line-clamp-2">{product.description}</p>
                      <Button
                        asChild
                        className="w-full bg-background hover:bg-background/90 text-foreground rounded-full group/btn"
                      >
                        <a href="#commander" className="flex items-center justify-center gap-2">
                          Commander
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </a>
                      </Button>
                    </div>
                  </div>

                  {/* Default content (visible when not hovering) */}
                  <div className="p-6 group-hover:opacity-0 transition-opacity duration-300">
                    <h3 className="font-serif text-xl font-semibold text-foreground mb-1">{product.name}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">{product.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
