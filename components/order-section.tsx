"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, Minus, Plus, ShoppingBag, Calendar, User, Phone, Mail } from "lucide-react"

const orderItems = [
  {
    id: 1,
    name: "Tarte aux Fruits",
    price: 28,
    image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=200&h=200&fit=crop",
  },
  {
    id: 2,
    name: "Paris-Brest",
    price: 32,
    image: "https://images.unsplash.com/photo-1612203985729-70726954388c?w=200&h=200&fit=crop",
  },
  {
    id: 3,
    name: "Entremet Chocolat",
    price: 38,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=200&h=200&fit=crop",
  },
  {
    id: 4,
    name: "Macarons (x12)",
    price: 24,
    image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=200&h=200&fit=crop",
  },
  {
    id: 5,
    name: "Croissants (x6)",
    price: 18,
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=200&h=200&fit=crop",
  },
]

type CartItem = {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

export function OrderSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [cart, setCart] = useState<CartItem[]>([])
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const addToCart = (item: typeof orderItems[0]) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id)
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const updateQuantity = (id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (cart.length === 0) return
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setCart([])
      setFormData({ name: "", email: "", phone: "", date: "", message: "" })
    }, 3000)
  }

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

  if (isSubmitted) {
    return (
      <section id="commander" className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-md mx-auto space-y-6">
            <div className="w-20 h-20 mx-auto bg-primary rounded-full flex items-center justify-center animate-bounce">
              <Check className="w-10 h-10 text-primary-foreground" />
            </div>
            <h2 className="font-serif text-3xl font-bold text-foreground">Commande Envoyée !</h2>
            <p className="text-muted-foreground">
              Merci pour votre commande. Nous vous contacterons rapidement pour confirmer les détails.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="commander" ref={sectionRef} className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="reveal opacity-0 inline-block text-sm font-medium text-primary uppercase tracking-widest">
            Commander
          </span>
          <h2 className="reveal opacity-0 font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground text-balance">
            Passez Votre Commande
          </h2>
          <p className="reveal opacity-0 text-muted-foreground max-w-2xl mx-auto text-lg" style={{ animationDelay: "0.1s" }}>
            Sélectionnez vos gourmandises préférées et nous préparerons votre commande avec soin.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Products Selection */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="reveal opacity-0 font-serif text-xl font-semibold text-foreground mb-6">
              Sélectionnez vos produits
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {orderItems.map((item, index) => {
                const inCart = cart.find((i) => i.id === item.id)
                return (
                  <Card
                    key={item.id}
                    className="reveal opacity-0 flex items-center gap-4 p-4 bg-card border-0 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl"
                    style={{ animationDelay: `${0.05 * index}s` }}
                  >
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{item.name}</h4>
                      <p className="text-primary font-bold">{item.price}€</p>
                    </div>
                    {inCart ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-semibold">{inCart.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <Button
                        onClick={() => addToCart(item)}
                        size="sm"
                        className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
                      >
                        Ajouter
                      </Button>
                    )}
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Order Form */}
          <div className="reveal opacity-0 lg:sticky lg:top-24 self-start" style={{ animationDelay: "0.3s" }}>
            <Card className="p-6 bg-card border-0 shadow-lg rounded-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground">Votre Commande</h3>
              </div>

              {/* Cart Items */}
              {cart.length > 0 ? (
                <div className="space-y-3 mb-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-sm">
                      <span className="text-foreground">
                        {item.name} <span className="text-muted-foreground">x{item.quantity}</span>
                      </span>
                      <span className="font-semibold">{item.price * item.quantity}€</span>
                    </div>
                  ))}
                  <div className="border-t border-border pt-3 flex justify-between items-center">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="text-xl font-bold text-primary">{total}€</span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>Votre panier est vide</p>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Votre nom"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-secondary/50 border-0 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-secondary/50 border-0 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="tel"
                    placeholder="Téléphone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-secondary/50 border-0 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-secondary/50 border-0 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                  />
                </div>
                <textarea
                  placeholder="Instructions spéciales (allergies, personnalisation...)"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-secondary/50 border-0 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50 outline-none transition-all resize-none"
                />
                <Button
                  type="submit"
                  disabled={cart.length === 0}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-6 text-lg font-semibold transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Envoyer la Commande
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
