"use client"

import { useEffect, useRef } from "react"
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from "lucide-react"

const contactInfo = [
  {
    icon: MapPin,
    title: "Adresse",
    content: "42 Rue de la Pâtisserie, 75004 Paris",
  },
  {
    icon: Phone,
    title: "Téléphone",
    content: "01 23 45 67 89",
  },
  {
    icon: Mail,
    title: "Email",
    content: "bonjour@maisondelice.fr",
  },
  {
    icon: Clock,
    title: "Horaires",
    content: "Mar-Sam: 7h-19h | Dim: 8h-13h",
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
    <section id="contact" ref={sectionRef} className="py-24">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="reveal opacity-0 inline-block text-sm font-medium text-primary uppercase tracking-widest">
                Contact
              </span>
              <h2 className="reveal opacity-0 font-serif text-4xl md:text-5xl font-bold text-foreground leading-tight text-balance">
                Venez Nous Rendre Visite
              </h2>
              <p className="reveal opacity-0 text-muted-foreground text-lg leading-relaxed" style={{ animationDelay: "0.1s" }}>
                Notre boutique vous accueille dans une ambiance chaleureuse. 
                Passez nous voir pour découvrir nos créations du jour !
              </p>
            </div>

            {/* Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {contactInfo.map((info, index) => (
                <div
                  key={info.title}
                  className="reveal opacity-0 group p-5 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors duration-300"
                  style={{ animationDelay: `${0.1 * (index + 2)}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <info.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{info.title}</h3>
                      <p className="text-sm text-muted-foreground">{info.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="reveal opacity-0 flex items-center gap-4" style={{ animationDelay: "0.5s" }}>
              <span className="text-sm text-muted-foreground">Suivez-nous :</span>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right - Map Placeholder */}
          <div className="reveal opacity-0" style={{ animationDelay: "0.3s" }}>
            <div className="relative aspect-square lg:aspect-auto lg:h-full min-h-[400px] rounded-2xl overflow-hidden bg-secondary">
              <img
                src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=800&h=800&fit=crop"
                alt="Notre boutique"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              {/* Overlay Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-card/95 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground font-serif text-xl font-bold">M</span>
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-foreground">Maison Délice</h3>
                    <p className="text-sm text-muted-foreground">Pâtisserie Artisanale depuis 2009</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
