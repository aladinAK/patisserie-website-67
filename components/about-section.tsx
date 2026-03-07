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
    <section id="apropos" ref={sectionRef} className="py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Images */}
          <div className="reveal opacity-0 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1556217477-d325251ece38?w=400&h=533&fit=crop"
                    alt="Pâtissier au travail"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden bg-primary/10 flex items-center justify-center">
                  <div className="text-center p-6">
                    <span className="block font-serif text-5xl font-bold text-primary">15</span>
                    <span className="text-sm text-muted-foreground uppercase tracking-wider">Années d{"'"}expérience</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1486427944544-d2c6e40c8c36?w=400&h=400&fit=crop"
                    alt="Ingrédients frais"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=400&h=533&fit=crop"
                    alt="Préparation des pâtisseries"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-accent/20 -z-10" />
          </div>

          {/* Right - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="reveal opacity-0 inline-block text-sm font-medium text-primary uppercase tracking-widest">
                Notre Histoire
              </span>
              <h2 className="reveal opacity-0 font-serif text-4xl md:text-5xl font-bold text-foreground leading-tight text-balance">
                Une Passion Familiale depuis 2009
              </h2>
              <p className="reveal opacity-0 text-muted-foreground text-lg leading-relaxed" style={{ animationDelay: "0.1s" }}>
                Maison Délice est née d{"'"}une passion commune pour les saveurs authentiques et 
                le travail bien fait. Notre philosophie est simple : des ingrédients de qualité, 
                des techniques traditionnelles et beaucoup d{"'"}amour.
              </p>
              <p className="reveal opacity-0 text-muted-foreground leading-relaxed" style={{ animationDelay: "0.2s" }}>
                Chaque matin, notre équipe s{"'"}affaire à préparer des créations qui éveilleront 
                vos papilles. Du croissant doré au gâteau d{"'"}anniversaire personnalisé, 
                nous mettons notre cœur dans chaque pièce.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6 pt-4">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="reveal opacity-0 group flex gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors duration-300"
                  style={{ animationDelay: `${0.1 * (index + 3)}s` }}
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
