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
    <section id="commander" ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="container mx-auto px-6 relative">
        {/* Diagonal header section */}
        <div className="relative mb-20">
          <div className="absolute -left-6 top-0 w-1 h-full bg-gradient-to-b from-primary via-accent to-transparent" />
          <div className="pl-8">
            <span className="reveal opacity-0 inline-flex items-center gap-2 text-sm font-medium text-primary uppercase tracking-widest mb-4">
              <Sparkles className="w-4 h-4" />
              Commander en ligne
            </span>
            <h2 className="reveal opacity-0 font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-none">
              Créez Votre
              <span className="block text-primary mt-2">Moment Gourmand</span>
            </h2>
          </div>
        </div>

        {isSubmitted ? (
          <div className="max-w-2xl mx-auto">
            <Card className="p-12 bg-card border-0 shadow-2xl rounded-3xl text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary" />
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mb-8 shadow-lg">
                <Check className="w-12 h-12 text-primary-foreground" />
              </div>
              <h3 className="font-serif text-4xl font-bold text-foreground mb-4">Merci !</h3>
              <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
                Votre commande a été envoyée avec succès. Notre équipe vous contactera sous peu pour confirmer les détails.
              </p>
              <Button
                onClick={handleNewOrder}
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-lg font-semibold transition-all duration-300 hover:scale-105"
              >
                Passer une nouvelle commande
              </Button>
            </Card>
          </div>
        ) : (
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Products Selection - Bento style */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {orderItems.map((item, index) => {
                  const inCart = cart.find((i) => i.id === item.id)
                  const isLarge = index === 0 || index === 3
                  return (
                    <Card
                      key={item.id}
                      className={`reveal opacity-0 group bg-card border-0 shadow-sm hover:shadow-xl transition-all duration-500 rounded-2xl overflow-hidden ${
                        isLarge ? "md:col-span-2 md:row-span-1" : ""
                      }`}
                      style={{ animationDelay: `${0.05 * index}s` }}
                    >
                      <div className={`relative ${isLarge ? "aspect-[2/1]" : "aspect-square"}`}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <div className="flex items-end justify-between">
                            <div>
                              <h4 className="font-serif font-semibold text-background text-lg">{item.name}</h4>
                              <p className="text-background/80 font-bold">{item.price}$</p>
                            </div>
                            {inCart ? (
                              <div className="flex items-center gap-1 bg-background/90 backdrop-blur-sm rounded-full p-1">
                                <button
                                  onClick={() => updateQuantity(item.id, -1)}
                                  className="w-8 h-8 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-8 text-center font-bold text-foreground">{inCart.quantity}</span>
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
                                className="rounded-full bg-background hover:bg-background/90 text-foreground shadow-lg"
                              >
                                <Plus className="w-4 h-4" />
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
            <div className="lg:col-span-2 reveal opacity-0" style={{ animationDelay: "0.3s" }}>
              <div className="lg:sticky lg:top-24">
                <Card className="p-8 bg-card border-0 shadow-2xl rounded-3xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary" />
                  
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                      <ShoppingBag className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-foreground">Votre Panier</h3>
                      <p className="text-muted-foreground text-sm">{cart.length} article{cart.length > 1 ? 's' : ''}</p>
                    </div>
                  </div>

                  {/* Cart Items */}
                  {cart.length > 0 ? (
                    <div className="space-y-3 mb-8 pb-6 border-b border-border">
                      {cart.map((item) => (
                        <div key={item.id} className="flex justify-between items-center py-2">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl overflow-hidden">
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <span className="text-foreground font-medium block">{item.name}</span>
                              <span className="text-muted-foreground text-sm">x{item.quantity}</span>
                            </div>
                          </div>
                          <span className="font-bold text-foreground">{item.price * item.quantity}$</span>
                        </div>
                      ))}
                      <div className="pt-4 flex justify-between items-center">
                        <span className="text-lg font-semibold text-foreground">Total</span>
                        <span className="text-3xl font-serif font-bold text-primary">{total}$</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-10 mb-6 rounded-2xl bg-secondary/30">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
                        <ShoppingBag className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <p className="text-muted-foreground">Sélectionnez des produits</p>
                    </div>
                  )}

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative col-span-2">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          type="text"
                          placeholder="Votre nom"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          className="w-full pl-12 pr-4 py-4 rounded-xl bg-secondary/50 border-0 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                        />
                      </div>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          type="email"
                          placeholder="Courriel"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          className="w-full pl-12 pr-4 py-4 rounded-xl bg-secondary/50 border-0 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                        />
                      </div>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          type="tel"
                          placeholder="Téléphone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required
                          className="w-full pl-12 pr-4 py-4 rounded-xl bg-secondary/50 border-0 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                        />
                      </div>
                    </div>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        required
                        className="w-full pl-12 pr-4 py-4 rounded-xl bg-secondary/50 border-0 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                      />
                    </div>
                    <textarea
                      placeholder="Instructions spéciales..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-4 rounded-xl bg-secondary/50 border-0 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50 outline-none transition-all resize-none"
                    />
                    <Button
                      type="submit"
                      disabled={cart.length === 0}
                      className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground rounded-xl py-6 text-lg font-semibold transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
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
