"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ArrowRight, BookOpen } from "lucide-react"

export default function TravelTipsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = ["All Tips", "Packing", "Budget Travel", "Safety", "Food", "Solo Travel"]

  const tips = [
    {
      category: "Packing",
      image: "/placeholder.svg?height=500&width=700",
      title: "The Ultimate Packing Checklist for Any Trip",
      preview:
        "Never forget essential items again with this comprehensive packing guide. Learn the art of efficient packing and what to bring for different climates and trip durations.",
    },
    {
      category: "Budget Travel",
      image: "/placeholder.svg?height=500&width=700",
      title: "How to Travel the World on a Shoestring Budget",
      preview:
        "Discover insider tips for finding cheap flights, affordable accommodation, and free activities. Travel more for less without sacrificing experiences.",
    },
    {
      category: "Safety",
      image: "/placeholder.svg?height=500&width=700",
      title: "Essential Safety Tips for International Travel",
      preview:
        "Stay safe abroad with these crucial safety guidelines. From protecting your valuables to avoiding common scams and staying healthy on the road.",
    },
    {
      category: "Food",
      image: "/placeholder.svg?height=500&width=700",
      title: "A Foodie's Guide to Eating Like a Local",
      preview:
        "Discover how to find authentic local cuisine, navigate foreign menus, and experience the best food destinations without getting sick.",
    },
    {
      category: "Solo Travel",
      image: "/placeholder.svg?height=500&width=700",
      title: "Your Complete Guide to Solo Travel",
      preview:
        "Build confidence and learn strategies for traveling alone safely. From choosing destinations to meeting other travelers and staying connected.",
    },
    {
      category: "Packing",
      image: "/placeholder.svg?height=500&width=700",
      title: "Mastering the Art of Carry-On Only Travel",
      preview:
        "Learn to pack everything you need in just a carry-on bag. Save time, money, and hassle by avoiding checked luggage on your next trip.",
    },
    {
      category: "Budget Travel",
      image: "/placeholder.svg?height=500&width=700",
      title: "Finding Affordable Accommodation Anywhere",
      preview:
        "From hostels to house-sitting, explore all the ways to find cheap places to stay. Get insider tips on booking strategies and hidden gems.",
    },
    {
      category: "Food",
      image: "/placeholder.svg?height=500&width=700",
      title: "Traveling with Dietary Restrictions",
      preview:
        "Navigate food allergies and dietary preferences while traveling. Learn how to communicate your needs and find suitable restaurants anywhere.",
    },
    {
      category: "Safety",
      image: "/placeholder.svg?height=500&width=700",
      title: "Understanding Travel Insurance: What You Need",
      preview:
        "Demystify travel insurance and learn what coverage you actually need. Avoid common pitfalls and travel with peace of mind.",
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
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden mt-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/placeholder.svg?height=800&width=1920')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-background" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="font-heading font-bold text-5xl md:text-6xl text-white mb-4 animate-fade-in">
            Travel Tips & Guides
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">Helpful advice to make your journeys smoother</p>
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
      <section className="container mx-auto px-4 lg:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTips.map((tip, index) => (
            <Card
              key={index}
              className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group flex flex-col"
            >
              <div className="relative h-56 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url('${tip.image}')` }}
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
              <div
                className="h-96 lg:h-auto bg-cover bg-center"
                style={{
                  backgroundImage: `url('/placeholder.svg?height=900&width=1000')`,
                }}
              />
              <CardContent className="p-12 flex flex-col justify-center bg-gradient-to-br from-primary/5 to-secondary/5">
                <span className="inline-block bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-full mb-6 w-fit">
                  Editor's Pick
                </span>
                <h2 className="font-heading font-bold text-4xl mb-6">
                  The Complete Guide to Planning Your First International Trip
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  Feeling overwhelmed about planning your first trip abroad? This comprehensive guide walks you through
                  every step of the process, from choosing a destination and booking flights to handling customs and
                  staying safe. Learn from seasoned travelers and gain the confidence to embark on your international
                  adventure.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full">
                    Read Full Guide
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button size="lg" variant="outline" className="rounded-full bg-transparent">
                    Download PDF
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
