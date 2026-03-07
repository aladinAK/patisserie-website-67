"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, Minus, Plus, ShoppingBag, Calendar, User, Phone, Mail, Sparkles } from "lucide-react"

const orderItems = [
  {
    id: 1,
    name: "Tarte aux Fruits",
    price: 38,
    image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=200&h=200&fit=crop",
  },
  {
    id: 2,
    name: "Paris-Brest",
    price: 42,
    image: "https://images.unsplash.com/photo-1612203985729-70726954388c?w=200&h=200&fit=crop",
  },
  {
    id: 3,
    name: "Entremet Chocolat",
    price: 52,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=200&h=200&fit=crop",
  },
  {
    id: 4,
    name: "Macarons (x12)",
    price: 32,
    image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=200&h=200&fit=crop",
  },
  {
    id: 5,
    name: "Croissants (x6)",
    price: 24,
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
    setCart([])
    setFormData({ name: "", email: "", phone: "", date: "", message: "" })
  }

  const handleNewOrder = () => {
    setIsSubmitted(false)
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
  }, [isSubmitted])

  return (
    <section id="commander" ref={sectionRef} className="py-16 md:py-24 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 md:w-80 h-48 md:h-80 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="container mx-auto px-4 md:px-6 relative">
        {/* Header */}
        <div className="relative mb-10 md:mb-20">
          <div className="absolute -left-4 md:-left-6 top-0 w-1 h-full bg-gradient-to-b from-primary via-accent to-transparent" />
          <div className="pl-6 md:pl-8">
            <span className="reveal opacity-0 inline-flex items-center gap-2 text-sm font-medium text-primary uppercase tracking-widest mb-3 md:mb-4">
              <Sparkles className="w-4 h-4" />
              Commander en ligne
            </span>
            <h2 className="reveal opacity-0 font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-none">
              Créez Votre
              <span className="block text-primary mt-1 md:mt-2">Moment Gourmand</span>
            </h2>
          </div>
        </div>

        {isSubmitted ? (
          <div className="max-w-2xl mx-auto px-4">
            <Card className="p-8 md:p-12 bg-card border-0 shadow-2xl rounded-2xl md:rounded-3xl text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary" />
              <div className="w-20 h-20 md:w-24 md:h-24 mx-auto bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mb-6 md:mb-8 shadow-lg">
                <Check className="w-10 h-10 md:w-12 md:h-12 text-primary-foreground" />
              </div>
              <h3 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3 md:mb-4">Merci !</h3>
              <p className="text-muted-foreground text-base md:text-lg mb-6 md:mb-8 max-w-md mx-auto">
                Votre commande a été envoyée avec succès. Notre équipe vous contactera sous peu pour confirmer les détails.
              </p>
              <Button
                onClick={handleNewOrder}
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 md:px-8 py-5 md:py-6 text-base md:text-lg font-semibold transition-all duration-300 hover:scale-105"
              >
                Passer une nouvelle commande
              </Button>
            </Card>
          </div>
        ) : (
          <div className="grid lg:grid-cols-5 gap-6 md:gap-8">
            {/* Products Selection */}
            <div className="lg:col-span-3 order-2 lg:order-1">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
                {orderItems.map((item, index) => {
                  const inCart = cart.find((i) => i.id === item.id)
                  return (
                    <Card
                      key={item.id}
                      className="reveal opacity-0 group bg-card border-0 shadow-sm hover:shadow-xl transition-all duration-500 rounded-xl md:rounded-2xl overflow-hidden"
                      style={{ animationDelay: `${0.05 * index}s` }}
                    >
                      <div className="relative aspect-square">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                          <div className="space-y-2">
                            <div>
                              <h4 className="font-serif font-semibold text-background text-sm md:text-base leading-tight">{item.name}</h4>
                              <p className="text-background/80 font-bold text-sm">{item.price}$</p>
                            </div>
                            {inCart ? (
                              <div className="flex items-center justify-center gap-1 bg-background/90 backdrop-blur-sm rounded-full p-1">
                                <button
                                  onClick={() => updateQuantity(item.id, -1)}
                                  className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors"
                                >
                                  <Minus className="w-3 h-3 md:w-4 md:h-4" />
                                </button>
                                <span className="w-6 md:w-8 text-center font-bold text-foreground text-sm">{inCart.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.id, 1)}
                                  className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center transition-colors"
                                >
                                  <Plus className="w-3 h-3 md:w-4 md:h-4" />
                                </button>
                              </div>
                            ) : (
                              <Button
                                onClick={() => addToCart(item)}
                                size="sm"
                                className="w-full rounded-full bg-background hover:bg-background/90 text-foreground shadow-lg text-xs md:text-sm py-2"
                              >
                                <Plus className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                                Ajouter
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </div>
            </div>

            {/* Order Form - Sticky sidebar */}
            <div className="lg:col-span-2 order-1 lg:order-2 reveal opacity-0" style={{ animationDelay: "0.3s" }}>
              <div className="lg:sticky lg:top-24">
                <Card className="p-5 md:p-8 bg-card border-0 shadow-2xl rounded-2xl md:rounded-3xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary" />
                  
                  <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg flex-shrink-0">
                      <ShoppingBag className="w-6 h-6 md:w-7 md:h-7 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground">Votre Panier</h3>
                      <p className="text-muted-foreground text-sm">{cart.length} article{cart.length > 1 ? 's' : ''}</p>
                    </div>
                  </div>

                  {/* Cart Items */}
                  {cart.length > 0 ? (
                    <div className="space-y-2 md:space-y-3 mb-6 md:mb-8 pb-4 md:pb-6 border-b border-border">
                      {cart.map((item) => (
                        <div key={item.id} className="flex justify-between items-center py-2">
                          <div className="flex items-center gap-2 md:gap-3 min-w-0">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl overflow-hidden flex-shrink-0">
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="min-w-0">
                              <span className="text-foreground font-medium block text-sm md:text-base truncate">{item.name}</span>
                              <span className="text-muted-foreground text-xs md:text-sm">x{item.quantity}</span>
                            </div>
                          </div>
                          <span className="font-bold text-foreground text-sm md:text-base flex-shrink-0 ml-2">{item.price * item.quantity}$</span>
                        </div>
                      ))}
                      <div className="pt-3 md:pt-4 flex justify-between items-center">
                        <span className="text-base md:text-lg font-semibold text-foreground">Total</span>
                        <span className="text-2xl md:text-3xl font-serif font-bold text-primary">{total}$</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 md:py-10 mb-4 md:mb-6 rounded-xl md:rounded-2xl bg-secondary/30">
                      <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 rounded-full bg-secondary flex items-center justify-center">
                        <ShoppingBag className="w-6 h-6 md:w-8 md:h-8 text-muted-foreground" />
                      </div>
                      <p className="text-muted-foreground text-sm md:text-base">Sélectionnez des produits</p>
                    </div>
                  )}

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                    <div className="relative">
                      <User className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Votre nom"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="w-full pl-10 md:pl-12 pr-4 py-3 md:py-4 rounded-lg md:rounded-xl bg-secondary/50 border-0 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50 outline-none transition-all text-sm md:text-base"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                      <div className="relative">
                        <Mail className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
                        <input
                          type="email"
                          placeholder="Courriel"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          className="w-full pl-10 md:pl-12 pr-3 md:pr-4 py-3 md:py-4 rounded-lg md:rounded-xl bg-secondary/50 border-0 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50 outline-none transition-all text-sm md:text-base"
                        />
                      </div>
                      <div className="relative">
                        <Phone className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
                        <input
                          type="tel"
                          placeholder="Téléphone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required
                          className="w-full pl-10 md:pl-12 pr-3 md:pr-4 py-3 md:py-4 rounded-lg md:rounded-xl bg-secondary/50 border-0 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50 outline-none transition-all text-sm md:text-base"
                        />
                      </div>
                    </div>
                    <div className="relative">
                      <Calendar className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        required
                        className="w-full pl-10 md:pl-12 pr-4 py-3 md:py-4 rounded-lg md:rounded-xl bg-secondary/50 border-0 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50 outline-none transition-all text-sm md:text-base"
                      />
                    </div>
                    <textarea
                      placeholder="Instructions spéciales..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 md:py-4 rounded-lg md:rounded-xl bg-secondary/50 border-0 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50 outline-none transition-all resize-none text-sm md:text-base"
                    />
                    <Button
                      type="submit"
                      disabled={cart.length === 0}
                      className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground rounded-lg md:rounded-xl py-5 md:py-6 text-base md:text-lg font-semibold transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                    >
                      Envoyer la Commande
                    </Button>
                  </form>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
