"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)

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

    const elements = heroRef.current?.querySelectorAll(".reveal")
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="accueil"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Geometric Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-accent/20 animate-float" />
        <div className="absolute top-40 right-20 w-24 h-24 rounded-full bg-primary/10 animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-32 left-1/4 w-16 h-16 rounded-full bg-secondary animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/3 right-1/4 w-40 h-40 rotate-45 bg-accent/10 animate-float" style={{ animationDelay: "0.5s" }} />
        <div className="absolute bottom-20 right-10 w-20 h-20 rounded-full bg-primary/15 animate-float" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-8 text-center lg:text-left">
          <div className="reveal opacity-0 space-y-4">
            <span className="inline-block text-sm font-medium text-primary uppercase tracking-widest">
              Pâtisserie Artisanale
            </span>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight text-balance">
              L{"'"}Art de la
              <span className="block text-primary">Gourmandise</span>
            </h1>
          </div>
          
          <p className="reveal opacity-0 text-lg text-muted-foreground max-w-md mx-auto lg:mx-0 leading-relaxed" style={{ animationDelay: "0.2s" }}>
            Des créations uniques, faites avec passion et des ingrédients de qualité. 
            Chaque pâtisserie raconte une histoire de saveurs et de savoir-faire.
          </p>

          <div className="reveal opacity-0 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start" style={{ animationDelay: "0.4s" }}>
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <a href="#commander">Passer Commande</a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full px-8 py-6 text-lg border-2 border-foreground/20 hover:bg-foreground hover:text-background transition-all duration-300"
            >
              <a href="#creations">Nos Créations</a>
            </Button>
          </div>
        </div>

        {/* Right Image */}
        <div className="reveal opacity-0 relative" style={{ animationDelay: "0.3s" }}>
          <div className="relative aspect-square max-w-lg mx-auto">
            {/* Decorative Frame */}
            <div className="absolute inset-4 border-2 border-primary/30 rounded-3xl rotate-3" />
            <div className="absolute inset-0 bg-gradient-to-br from-secondary to-accent/20 rounded-3xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=800&fit=crop"
                alt="Gâteau au chocolat élégant"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-4 -left-4 bg-card p-4 rounded-2xl shadow-xl animate-float">
              <div className="text-center">
                <span className="block text-3xl font-serif font-bold text-primary">100%</span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Fait Maison</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <a
        href="#creations"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <span className="text-xs uppercase tracking-widest">Découvrir</span>
        <ArrowDown className="w-5 h-5 animate-bounce" />
      </a>
    </section>
  )
}
