"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Camera, ArrowRight, MapPin } from "lucide-react"

export default function PhotoJournalPage() {
  const galleryImages = [
    {
      image: "/placeholder.svg?height=600&width=800",
      location: "Swiss Alps, Switzerland",
      caption: "Summit dreams at golden hour",
    },
    {
      image: "/placeholder.svg?height=800&width=600",
      location: "Tokyo, Japan",
      caption: "Neon nights in Shibuya",
    },
    {
      image: "/placeholder.svg?height=700&width=900",
      location: "Ubud, Bali",
      caption: "Emerald rice terraces",
    },
    {
      image: "/placeholder.svg?height=600&width=600",
      location: "Santorini, Greece",
      caption: "Blue domes and endless views",
    },
    {
      image: "/placeholder.svg?height=900&width=700",
      location: "Reykjavik, Iceland",
      caption: "Dancing with the aurora",
    },
    {
      image: "/placeholder.svg?height=650&width=850",
      location: "Marrakech, Morocco",
      caption: "Colors of the souk",
    },
    {
      image: "/placeholder.svg?height=800&width=800",
      location: "Maldives",
      caption: "Paradise found",
    },
    {
      image: "/placeholder.svg?height=700&width=1000",
      location: "Patagonia, Chile",
      caption: "Edge of the world",
    },
    {
      image: "/placeholder.svg?height=600&width=700",
      location: "Venice, Italy",
      caption: "Floating through history",
    },
  ]

  const photoCollections = [
    {
      title: "Mountains & Trails",
      image: "/placeholder.svg?height=600&width=800",
      count: "24 photos",
    },
    {
      title: "Urban Adventures",
      image: "/placeholder.svg?height=600&width=800",
      count: "38 photos",
    },
    {
      title: "Sunsets & Beaches",
      image: "/placeholder.svg?height=600&width=800",
      count: "45 photos",
    },
    {
      title: "Culture & People",
      image: "/placeholder.svg?height=600&width=800",
      count: "31 photos",
    },
  ]

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden mt-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/placeholder.svg?height=1000&width=1920')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-background" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <Camera className="w-16 h-16 text-white mx-auto mb-6 animate-fade-in" />
          <h1 className="font-heading font-bold text-5xl md:text-6xl text-white mb-4 animate-fade-in">
            Travel Photo Journal
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto animate-slide-up">
            Snapshots and stories from journeys around the globe
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="container mx-auto px-4 lg:px-8 py-24">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {galleryImages.map((item, index) => (
            <div key={index} className="break-inside-avoid group cursor-pointer">
              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="relative overflow-hidden">
                  <div
                    className="w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{
                      backgroundImage: `url('${item.image}')`,
                      paddingBottom: index % 3 === 0 ? "133%" : index % 3 === 1 ? "150%" : "120%",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center gap-2 text-white/90 text-sm mb-2">
                        <MapPin className="w-4 h-4" />
                        <span>{item.location}</span>
                      </div>
                      <p className="text-white font-medium text-lg">{item.caption}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* Photo Collections */}
      <section className="bg-muted/30 py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl mb-4">Photo Collections</h2>
            <p className="text-muted-foreground text-lg">Curated galleries organized by theme</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {photoCollections.map((collection, index) => (
              <Card
                key={index}
                className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer"
              >
                <div className="relative h-64 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url('${collection.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="font-heading font-bold text-2xl text-white mb-2">{collection.title}</h3>
                      <p className="text-white/80 text-sm">{collection.count}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Travel Stories */}
      <section className="container mx-auto px-4 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-4xl mb-4">Travel Stories</h2>
          <p className="text-muted-foreground text-lg">Behind the lens moments</p>
        </div>

        <div className="space-y-16">
          {/* Story 1 */}
          <Card className="overflow-hidden border-0 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div
                className="h-96 lg:h-auto bg-cover bg-center order-2 lg:order-1"
                style={{
                  backgroundImage: `url('/placeholder.svg?height=900&width=1000')`,
                }}
              />
              <CardContent className="p-12 flex flex-col justify-center order-1 lg:order-2">
                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <MapPin className="w-5 h-5" />
                  <span className="font-medium">Sahara Desert, Morocco</span>
                </div>
                <h3 className="font-heading font-bold text-3xl mb-6">A Night Under the Stars</h3>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  The Sahara at sunset is pure magic. As the sun dipped below endless sand dunes, the desert came alive
                  with colors I'd never seen before - deep oranges melting into purples and finally the deepest indigo.
                  That night, lying on the cool sand and gazing up at more stars than I thought existed, I understood
                  why this place has captivated travelers for centuries.
                </p>
                <Button className="w-fit bg-primary hover:bg-primary/90 rounded-full">
                  Read Full Story
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </div>
          </Card>

          {/* Story 2 */}
          <Card className="overflow-hidden border-0 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <CardContent className="p-12 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <MapPin className="w-5 h-5" />
                  <span className="font-medium">Kyoto, Japan</span>
                </div>
                <h3 className="font-heading font-bold text-3xl mb-6">Finding Peace in the Bamboo Grove</h3>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Walking through Arashiyama's bamboo forest felt like stepping into another world. The towering stalks
                  swayed gently in the breeze, creating a rhythmic rustling that seemed to slow down time itself. Early
                  morning light filtered through the canopy, casting an ethereal green glow. In that moment of
                  stillness, surrounded by nature's architecture, I found the tranquility that Kyoto is famous for.
                </p>
                <Button className="w-fit bg-primary hover:bg-primary/90 rounded-full">
                  Read Full Story
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
              <div
                className="h-96 lg:h-auto bg-cover bg-center"
                style={{
                  backgroundImage: `url('/placeholder.svg?height=900&width=1000')`,
                }}
              />
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
