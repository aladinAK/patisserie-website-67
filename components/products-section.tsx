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
  },
  {
    id: 2,
    name: "Paris-Brest",
    description: "Pâte à choux, crème pralinée aux noisettes torréfiées",
    price: "42$",
    category: "Classiques",
    image: "https://images.unsplash.com/photo-1612203985729-70726954388c?w=600&h=600&fit=crop",
  },
  {
    id: 3,
    name: "Entremet Chocolat",
    description: "Mousse chocolat noir 70%, biscuit moelleux et glaçage miroir",
    price: "52$",
    category: "Entremets",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&h=600&fit=crop",
  },
  {
    id: 4,
    name: "Macarons Assortis",
    description: "Coffret de 12 macarons aux parfums variés",
    price: "32$",
    category: "Petits Fours",
    image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=600&h=600&fit=crop",
  },
  {
    id: 5,
    name: "Croissants Dorés",
    description: "Pur beurre AOP, feuilletage artisanal 48h de repos",
    price: "4,50$",
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
    <section id="creations" ref={sectionRef} className="py-16 md:py-24 bg-secondary/30 relative overflow-hidden">
      {/* Large background text - hidden on mobile */}
      <div className="hidden md:block absolute top-20 left-0 right-0 overflow-hidden pointer-events-none select-none">
        <h2 className="font-serif text-[15vw] font-bold text-foreground/[0.02] whitespace-nowrap">
          Douceurs Artisanales
        </h2>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative">
        {/* Header */}
        <div className="flex flex-col gap-4 md:gap-8 mb-10 md:mb-16">
          <div className="max-w-2xl">
            <span className="reveal opacity-0 inline-block text-sm font-medium text-primary uppercase tracking-widest mb-3 md:mb-4">
              Nos Créations
            </span>
            <h2 className="reveal opacity-0 font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-none">
              Douceurs
              <span className="block text-primary">Artisanales</span>
            </h2>
          </div>
          <p className="reveal opacity-0 text-muted-foreground text-base md:text-lg max-w-md" style={{ animationDelay: "0.1s" }}>
            Chaque création est un voyage gustatif, façonnée avec amour et les meilleurs ingrédients.
          </p>
        </div>

        {/* Category Filter - Horizontal scroll on mobile */}
        <div className="reveal opacity-0 -mx-4 px-4 md:mx-0 md:px-0 overflow-x-auto pb-4 mb-8 md:mb-12" style={{ animationDelay: "0.2s" }}>
          <div className="flex gap-2 md:flex-wrap w-max md:w-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 md:px-6 py-2.5 md:py-3 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  activeCategory === category
                    ? "bg-foreground text-background shadow-lg"
                    : "bg-card text-muted-foreground hover:bg-card/80 hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid - Simple responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {visibleProducts.map((product, index) => (
            <div
              key={product.id}
              className="reveal opacity-0 group"
              style={{ animationDelay: `${0.05 * index}s` }}
            >
              <div className="relative rounded-2xl md:rounded-3xl overflow-hidden bg-card shadow-sm hover:shadow-xl transition-all duration-500 h-full">
                {/* Image container with fixed aspect ratio */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                  
                  {/* Category badge */}
                  <div className="absolute top-3 left-3 md:top-4 md:left-4">
                    <span className="bg-card/90 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs font-medium text-foreground shadow-sm">
                      {product.category}
                    </span>
                  </div>

                  {/* Price badge */}
                  <div className="absolute top-3 right-3 md:top-4 md:right-4">
                    <span className="bg-primary px-3 py-1.5 md:px-4 md:py-2 rounded-full text-sm font-bold text-primary-foreground shadow-lg">
                      {product.price}
                    </span>
                  </div>

                  {/* Content overlay - always visible on mobile, hover on desktop */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                    <h3 className="font-serif text-xl md:text-2xl font-bold text-background mb-1 md:mb-2">{product.name}</h3>
                    <p className="text-background/80 text-sm mb-3 md:mb-4 line-clamp-2">{product.description}</p>
                    <Button
                      asChild
                      size="sm"
                      className="w-full bg-background hover:bg-background/90 text-foreground rounded-full group/btn md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-300"
                    >
                      <a href="#commander" className="flex items-center justify-center gap-2">
                        Commander
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
