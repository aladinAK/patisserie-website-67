"use client"

import { useEffect, useRef } from "react"
import { Award, Heart, Leaf, Clock } from "lucide-react"

const features = [
  {
    icon: Heart,
    title: "Fait avec Passion",
    description: "Chaque création est le fruit d'un savoir-faire transmis avec amour.",
  },
  {
    icon: Leaf,
    title: "Ingrédients Locaux",
    description: "Nous privilégions les producteurs locaux et les ingrédients de saison.",
  },
  {
    icon: Award,
    title: "Qualité Artisanale",
    description: "Des techniques traditionnelles pour des saveurs authentiques.",
  },
  {
    icon: Clock,
    title: "Fraîcheur Garantie",
    description: "Préparées chaque jour pour vous offrir le meilleur.",
  },
]

const stats = [
  { value: "15+", label: "Années d'expérience" },
  { value: "50k", label: "Clients satisfaits" },
  { value: "100%", label: "Fait maison" },
]

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

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
  }, [])

  return (
    <section id="apropos" ref={sectionRef} className="py-16 md:py-24 overflow-hidden relative">
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-secondary/30" />
      
      <div className="container mx-auto px-4 md:px-6 relative">
        {/* Top section - Large typography */}
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-20">
          <div className="reveal opacity-0">
            <span className="inline-block text-sm font-medium text-primary uppercase tracking-widest mb-3 md:mb-4">
              Notre Histoire
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-none">
              Une Passion
              <span className="block text-primary">Familiale</span>
            </h2>
          </div>
          <div className="reveal opacity-0 lg:flex lg:items-end" style={{ animationDelay: "0.1s" }}>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">
              Depuis 2009, Maison Délice perpétue l{"'"}art de la pâtisserie française 
              au coeur de Montréal. Notre philosophie est simple : des ingrédients de qualité, 
              des techniques traditionnelles et beaucoup d{"'"}amour.
            </p>
          </div>
        </div>

        {/* Bento grid layout - Simplified for mobile */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 mb-12 md:mb-16">
          {/* Large image */}
          <div className="reveal opacity-0 col-span-2 md:col-span-2 lg:row-span-2 rounded-2xl md:rounded-3xl overflow-hidden aspect-video md:aspect-auto md:min-h-[400px]">
            <img
              src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=800&fit=crop"
              alt="Croissants frais sortis du four"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          
          {/* Stats card */}
          <div className="reveal opacity-0 col-span-1 bg-primary rounded-2xl md:rounded-3xl p-4 md:p-8 flex flex-col justify-center" style={{ animationDelay: "0.1s" }}>
            <div className="space-y-4 md:space-y-6">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <span className="block font-serif text-2xl md:text-4xl font-bold text-primary-foreground">{stat.value}</span>
                  <span className="text-primary-foreground/70 text-xs md:text-sm">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Small image */}
          <div className="reveal opacity-0 col-span-1 rounded-2xl md:rounded-3xl overflow-hidden aspect-square" style={{ animationDelay: "0.2s" }}>
            <img
              src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=400&h=400&fit=crop"
              alt="Intérieur de la boutique"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Quote card */}
          <div className="reveal opacity-0 col-span-2 bg-card rounded-2xl md:rounded-3xl p-5 md:p-8 flex items-center shadow-lg" style={{ animationDelay: "0.3s" }}>
            <div>
              <blockquote className="font-serif text-lg md:text-2xl text-foreground italic mb-3 md:mb-4">
                {"\""}Chaque matin, notre équipe s{"'"}affaire à préparer des créations qui éveilleront vos papilles.{"\""}
              </blockquote>
              <p className="text-muted-foreground text-sm md:text-base">— Marie Delacroix, Fondatrice</p>
            </div>
          </div>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="reveal opacity-0 group p-4 md:p-6 rounded-xl md:rounded-2xl bg-card hover:bg-primary transition-colors duration-500 shadow-sm hover:shadow-xl"
              style={{ animationDelay: `${0.1 * (index + 4)}s` }}
            >
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-primary/10 group-hover:bg-primary-foreground/20 flex items-center justify-center mb-3 md:mb-4 transition-colors duration-500">
                <feature.icon className="w-5 h-5 md:w-7 md:h-7 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
              </div>
              <h3 className="font-serif text-base md:text-lg font-semibold text-foreground group-hover:text-primary-foreground mb-1 md:mb-2 transition-colors duration-500">
                {feature.title}
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground group-hover:text-primary-foreground/80 transition-colors duration-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
