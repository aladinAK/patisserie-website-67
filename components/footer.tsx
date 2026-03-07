import { Heart } from "lucide-react"

const footerLinks = [
  {
    title: "Navigation",
    links: [
      { label: "Accueil", href: "#accueil" },
      { label: "Créations", href: "#creations" },
      { label: "Notre Histoire", href: "#apropos" },
      { label: "Commander", href: "#commander" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Gâteaux sur mesure", href: "#commander" },
      { label: "Événements", href: "#commander" },
      { label: "Mariages", href: "#commander" },
      { label: "Entreprises", href: "#commander" },
    ],
  },
  {
    title: "Légal",
    links: [
      { label: "Mentions légales", href: "#" },
      { label: "Politique de confidentialité", href: "#" },
      { label: "CGV", href: "#" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <a href="#accueil" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-serif text-xl font-bold">M</span>
              </div>
              <span className="font-serif text-2xl font-semibold">Maison Délice</span>
            </a>
            <p className="text-background/70 max-w-sm leading-relaxed">
              Pâtisserie artisanale au cœur de Paris. 
              Des créations uniques, faites avec passion et les meilleurs ingrédients.
            </p>
            <div className="flex items-center gap-2 text-sm text-background/50">
              <span>Fait avec</span>
              <Heart className="w-4 h-4 text-accent fill-accent" />
              <span>à Paris</span>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-background/70 hover:text-background transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-background/50">
          <p>© 2024 Maison Délice. Tous droits réservés.</p>
          <p className="text-center md:text-right">
            Site vitrine de démonstration — 
            <span className="text-accent"> Créé pour montrer nos services web</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
