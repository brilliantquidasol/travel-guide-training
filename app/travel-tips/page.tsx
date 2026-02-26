"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ArrowRight, BookOpen } from "lucide-react"

const IMG = "https://images.unsplash.com"

export default function TravelTipsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = ["All Tips", "Packing", "Budget Travel", "Safety", "Food", "Solo Travel"]

  const tips = [
    {
      category: "Packing",
      image: `${IMG}/photo-1553062407-98eeb64c6a62?w=800&q=80`,
      title: "The Ultimate Packing Checklist for Any Trip",
      preview:
        "Never forget essential items again. What to pack for beach, city, and adventure trips—plus the one bag that works for all of them. Includes seasonal lists and TSA-friendly tips.",
    },
    {
      category: "Budget Travel",
      image: `${IMG}/photo-1488646953014-85cb44e25828?w=800&q=80`,
      title: "How to Travel the World on a Shoestring Budget",
      preview:
        "Cheap flights, reward points, and free activities. Real strategies from long-term travelers: when to book, which tools to use, and how to eat and sleep well for less.",
    },
    {
      category: "Safety",
      image: `${IMG}/photo-1488085061387-0eaca0c367ff?w=800&q=80`,
      title: "Essential Safety Tips for International Travel",
      preview:
        "Protect your documents and money, avoid common scams, and stay healthy abroad. Simple habits that keep you safe without ruining the fun—from pickpockets to tap water.",
    },
    {
      category: "Food",
      image: `${IMG}/photo-1504674900247-0877df9cc836?w=800&q=80`,
      title: "A Foodie's Guide to Eating Like a Local",
      preview:
        "Find authentic spots, read foreign menus, and try street food safely. How to discover the best meals and avoid tourist traps—and what to do when your stomach says no.",
    },
    {
      category: "Solo Travel",
      image: `${IMG}/photo-1527661591475-527312dd65f5?w=800&q=80`,
      title: "Your Complete Guide to Solo Travel",
      preview:
        "Why solo travel is rewarding and how to start. Picking friendly destinations, meeting people on the road, and staying safe and connected when you're on your own.",
    },
    {
      category: "Packing",
      image: `${IMG}/photo-1581605405669-fcdf81165afa?w=800&q=80`,
      title: "Mastering the Art of Carry-On Only Travel",
      preview:
        "Pack a week (or more) in one bag. Capsule wardrobes, toiletries that pass security, and folding tricks. Skip baggage claim and save on fees every time you fly.",
    },
    {
      category: "Budget Travel",
      image: `${IMG}/photo-1566073771259-6a8506099945?w=800&q=80`,
      title: "Finding Affordable Accommodation Anywhere",
      preview:
        "Hostels, guesthouses, house-sitting, and reward stays. When to book, how to spot good value, and which sites to use in different countries for the best deals.",
    },
    {
      category: "Food",
      image: `${IMG}/photo-1498654896293-37aacf113fd9?w=800&q=80`,
      title: "Traveling with Dietary Restrictions",
      preview:
        "Manage allergies, intolerances, and preferences abroad. Translation cards, apps, and how to talk to kitchens. Plus tips for vegans, gluten-free, and halal travel.",
    },
    {
      category: "Safety",
      image: `${IMG}/photo-1450101499163-c8848c66ca85?w=800&q=80`,
      title: "Understanding Travel Insurance: What You Need",
      preview:
        "Medical, cancellation, and gear coverage explained. What to buy for a weekend vs. a year abroad, and how to actually use your policy if something goes wrong.",
    },
    {
      category: "Solo Travel",
      image: `${IMG}/photo-1506929562872-bb421503ef21?w=800&q=80`,
      title: "Solo Female Travel: Safety and Confidence",
      preview:
        "Practical advice for women traveling alone: choosing destinations, dressing, accommodation, and staying in touch. Real stories and habits that build confidence.",
    },
    {
      category: "Packing",
      image: `${IMG}/photo-1548036328-c93fa766078c?w=800&q=80`,
      title: "10 Toiletries That Save Space and Weight",
      preview:
        "Solid shampoo, mini first-aid kits, and multipurpose products. The exact items frequent travelers swap in to keep bags light and TSA-friendly.",
    },
    {
      category: "Budget Travel",
      image: `${IMG}/photo-1436491865332-7a61a109cc05?w=800&q=80`,
      title: "Using Points and Miles for Free Flights and Hotels",
      preview:
        "A simple intro to travel rewards: which cards to consider, how to earn and redeem points, and how to get your first award flight or free night without the overwhelm.",
    },
  ]

  const filteredTips =
    selectedCategory === "all"
      ? tips
      : tips.filter((tip) => tip.category.toLowerCase() === selectedCategory.toLowerCase())

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[280px] flex items-center justify-center overflow-hidden mt-20">
        <div className="absolute inset-0">
          <img
            src={`${IMG}/photo-1488646953014-85cb44e25828?w=1920&q=80`}
            alt="Travel tips and guides - exploring the world"
            className="absolute inset-0 w-full h-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-background" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="font-heading font-bold text-5xl md:text-6xl text-white mb-4 animate-fade-in">
            Travel Tips & Guides
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Pack smarter, spend less, and stay safe—practical advice from experienced travelers.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 lg:px-8 py-12">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(category === "All Tips" ? "all" : category.toLowerCase())}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                (category === "All Tips" && selectedCategory === "all") || category.toLowerCase() === selectedCategory
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-white hover:bg-muted border border-border"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Tips Grid */}
      <section id="tips-grid" className="container mx-auto px-4 lg:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTips.map((tip, index) => (
            <Card
              key={index}
              className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group flex flex-col"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={tip.image}
                  alt={tip.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 text-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    {tip.category}
                  </span>
                </div>
              </div>
              <CardContent className="p-6 flex-1 flex flex-col">
                <h3 className="font-heading font-bold text-xl mb-3 group-hover:text-primary transition-colors">
                  {tip.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6 flex-1">{tip.preview}</p>
                <Button
                  variant="ghost"
                  className="w-full rounded-full group-hover:bg-primary/10 group-hover:text-primary transition-colors"
                >
                  Read More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Article */}
      <section className="bg-muted/30 py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <BookOpen className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="font-heading font-bold text-4xl mb-4">Featured Guide</h2>
          </div>

          <Card className="overflow-hidden border-0 shadow-2xl max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="relative h-72 lg:h-[420px] overflow-hidden">
                <img
                  src={`${IMG}/photo-1469854523086-cc02fe5d8800?w=1000&q=80`}
                  alt="Planning your first international trip - travel guide"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <CardContent className="p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-primary/5 to-secondary/5">
                <span className="inline-block bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-full mb-6 w-fit">
                  Editor's Pick
                </span>
                <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">
                  The Complete Guide to Planning Your First International Trip
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  From choosing a destination and booking flights to visas, customs, and staying safe—this guide walks you through every step. Whether you're heading to Europe, Asia, or beyond, you'll learn how to plan like a pro, avoid rookie mistakes, and actually enjoy the journey. Packed with checklists and real traveler advice.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full" asChild>
                    <a href="#tips-grid">
                      Read Full Guide
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" className="rounded-full bg-transparent">
                    Save for Later
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
