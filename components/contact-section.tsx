"use client"

import { useEffect, useRef } from "react"
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, ArrowUpRight } from "lucide-react"

const contactInfo = [
  {
    icon: MapPin,
    title: "Adresse",
    content: "1234 Rue Saint-Denis",
    subContent: "Montréal, QC H2X 3J8",
  },
  {
    icon: Phone,
    title: "Téléphone",
    content: "(514) 555-0123",
    subContent: "Appelez-nous",
  },
  {
    icon: Mail,
    title: "Courriel",
    content: "info@maisondelice.ca",
    subContent: "Écrivez-nous",
  },
  {
    icon: Clock,
    title: "Horaires",
    content: "Mar-Sam: 7h-19h",
    subContent: "Dim: 8h-13h",
  },
]

export function ContactSection() {
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
    <section id="contact" ref={sectionRef} className="py-16 md:py-24 bg-foreground text-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 md:w-80 h-48 md:h-80 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left - Content */}
          <div className="space-y-8 md:space-y-12">
            <div>
              <span className="reveal opacity-0 inline-block text-sm font-medium text-primary uppercase tracking-widest mb-3 md:mb-4">
                Nous Trouver
              </span>
              <h2 className="reveal opacity-0 font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Venez Nous
                <span className="block text-primary">Rendre Visite</span>
              </h2>
            </div>

            {/* Contact Grid - 2x2 */}
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {contactInfo.map((info, index) => (
                <div
                  key={info.title}
                  className="reveal opacity-0 group"
                  style={{ animationDelay: `${0.1 * (index + 1)}s` }}
                >
                  <div className="flex flex-col sm:flex-row items-start gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-background/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                      <info.icon className="w-4 h-4 md:w-5 md:h-5 text-background group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-background/60 text-xs md:text-sm uppercase tracking-wider mb-0.5 md:mb-1">
                        {info.title}
                      </h3>
                      <p className="text-background font-medium text-sm md:text-base break-words">{info.content}</p>
                      <p className="text-background/60 text-xs md:text-sm">{info.subContent}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="reveal opacity-0 flex items-center gap-4 md:gap-6" style={{ animationDelay: "0.5s" }}>
              <span className="text-background/60 text-sm md:text-base">Suivez-nous</span>
              <div className="flex gap-2 md:gap-3">
                <a
                  href="#"
                  className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-background/10 hover:bg-primary flex items-center justify-center transition-all duration-300 group"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4 md:w-5 md:h-5 text-background group-hover:text-primary-foreground" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-background/10 hover:bg-primary flex items-center justify-center transition-all duration-300 group"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4 md:w-5 md:h-5 text-background group-hover:text-primary-foreground" />
                </a>
              </div>
            </div>
          </div>

          {/* Right - Large CTA Card */}
          <div className="reveal opacity-0" style={{ animationDelay: "0.3s" }}>
            <div className="relative">
              <div className="aspect-square md:aspect-square rounded-2xl md:rounded-3xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=800&h=800&fit=crop"
                  alt="Notre boutique"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Floating Card - Repositioned for mobile */}
              <div className="absolute -bottom-4 left-4 right-4 md:-bottom-8 md:-left-8 md:right-auto bg-primary p-5 md:p-8 rounded-2xl md:rounded-3xl shadow-2xl md:max-w-xs">
                <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                  <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-primary-foreground/20 flex items-center justify-center flex-shrink-0">
                    <span className="font-serif text-xl md:text-2xl font-bold text-primary-foreground">M</span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-serif text-lg md:text-xl font-semibold text-primary-foreground truncate">Maison Délice</h3>
                    <p className="text-xs md:text-sm text-primary-foreground/70">Depuis 2009</p>
                  </div>
                </div>
                <a
                  href="#commander"
                  className="flex items-center justify-between w-full py-2.5 md:py-3 px-4 md:px-5 bg-primary-foreground/20 hover:bg-primary-foreground/30 rounded-lg md:rounded-xl transition-colors group"
                >
                  <span className="text-primary-foreground font-medium text-sm md:text-base">Commander maintenant</span>
                  <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform flex-shrink-0" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
