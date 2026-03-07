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
    <section id="apropos" ref={sectionRef} className="py-24 overflow-hidden relative">
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-secondary/30" />
      
      <div className="container mx-auto px-6 relative">
        {/* Top section - Large typography with overlap */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          <div className="reveal opacity-0">
            <span className="inline-block text-sm font-medium text-primary uppercase tracking-widest mb-4">
              Notre Histoire
            </span>
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-none">
              Une Passion
              <span className="block text-primary">Familiale</span>
            </h2>
          </div>
          <div className="reveal opacity-0 flex items-end" style={{ animationDelay: "0.1s" }}>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
              Depuis 2009, Maison Délice perpétue l{"'"}art de la pâtisserie française 
              au coeur de Montréal. Notre philosophie est simple : des ingrédients de qualité, 
              des techniques traditionnelles et beaucoup d{"'"}amour.
            </p>
          </div>
        </div>

        {/* Bento grid layout */}
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
          {/* Large image */}
          <div className="reveal opacity-0 md:col-span-2 lg:row-span-2 rounded-3xl overflow-hidden aspect-square lg:aspect-auto">
            <img
              src="https://images.unsplash.com/photo-1486427944544-d2c6e40c8c36?w=800&h=800&fit=crop"
              alt="Préparation de croissants"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          
          {/* Stats card */}
          <div className="reveal opacity-0 bg-primary rounded-3xl p-8 flex flex-col justify-center" style={{ animationDelay: "0.1s" }}>
            <div className="space-y-6">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <span className="block font-serif text-4xl font-bold text-primary-foreground">{stat.value}</span>
                  <span className="text-primary-foreground/70 text-sm">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Small image */}
          <div className="reveal opacity-0 rounded-3xl overflow-hidden" style={{ animationDelay: "0.2s" }}>
            <img
              src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=400&h=400&fit=crop"
              alt="Intérieur de la boutique"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Quote card */}
          <div className="reveal opacity-0 md:col-span-2 bg-card rounded-3xl p-8 flex items-center shadow-lg" style={{ animationDelay: "0.3s" }}>
            <div>
              <blockquote className="font-serif text-2xl text-foreground italic mb-4">
                {"\""}Chaque matin, notre équipe s{"'"}affaire à préparer des créations qui éveilleront vos papilles.{"\""}
              </blockquote>
              <p className="text-muted-foreground">— Marie Delacroix, Fondatrice</p>
            </div>
          </div>
        </div>

        {/* Features - Horizontal scroll on mobile, grid on desktop */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="reveal opacity-0 group p-6 rounded-2xl bg-card hover:bg-primary transition-colors duration-500 shadow-sm hover:shadow-xl"
              style={{ animationDelay: `${0.1 * (index + 4)}s` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 group-hover:bg-primary-foreground/20 flex items-center justify-center mb-4 transition-colors duration-500">
                <feature.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-primary-foreground mb-2 transition-colors duration-500">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground group-hover:text-primary-foreground/80 transition-colors duration-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
