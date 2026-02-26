"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Camera, ArrowRight, MapPin } from "lucide-react"

const IMG = "https://images.unsplash.com"

const galleryImages = [
  { image: `${IMG}/photo-1506905925346-21bda4d32df4?w=800&q=80`, location: "Swiss Alps, Switzerland", caption: "Summit dreams at golden hour" },
  { image: `${IMG}/photo-1540959733332-eab4deabeeaf?w=800&q=80`, location: "Tokyo, Japan", caption: "Neon nights in Shibuya" },
  { image: `${IMG}/photo-1537996194471-e657df975ab4?w=800&q=80`, location: "Ubud, Bali", caption: "Emerald rice terraces" },
  { image: `${IMG}/photo-1613395877344-13d4a8e0d49e?w=800&q=80`, location: "Santorini, Greece", caption: "Blue domes and endless views" },
  { image: `${IMG}/photo-1504829857797-ddff29c27927?w=800&q=80`, location: "Reykjavik, Iceland", caption: "Dancing with the aurora" },
  { image: `${IMG}/photo-1489749798305-4fea3ae63d43?w=800&q=80`, location: "Marrakech, Morocco", caption: "Colors of the souk" },
  { image: `${IMG}/photo-1507525428034-b723cf961d3e?w=800&q=80`, location: "Maldives", caption: "Paradise found" },
  { image: `${IMG}/photo-1552465011-b4e21bf6e79a?w=800&q=80`, location: "Patagonia, Chile", caption: "Edge of the world" },
  { image: `${IMG}/photo-1514890547357-a9ee288728e0?w=800&q=80`, location: "Venice, Italy", caption: "Floating through history" },
  { image: `${IMG}/photo-1516483638261-f4dbaf036963?w=800&q=80`, location: "Lisbon, Portugal", caption: "Trams and tiles" },
  { image: `${IMG}/photo-1528181304800-259b08848526?w=800&q=80`, location: "Machu Picchu, Peru", caption: "Lost city in the clouds" },
  { image: `${IMG}/photo-1504280390367-361c6d9f38f4?w=800&q=80`, location: "Moab, USA", caption: "Desert arches" },
]

const photoCollections = [
  { title: "Mountains & Trails", image: `${IMG}/photo-1464822759023-fed622ff2c3b?w=800&q=80`, count: "24 photos" },
  { title: "Urban Adventures", image: `${IMG}/photo-1536098561742-ca998e48cbcc?w=800&q=80`, count: "38 photos" },
  { title: "Sunsets & Beaches", image: `${IMG}/photo-1507525428034-b723cf961d3e?w=800&q=80`, count: "45 photos" },
  { title: "Culture & People", image: `${IMG}/photo-1489749798305-4fea3ae63d43?w=800&q=80`, count: "31 photos" },
]

export default function PhotoJournalPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="relative h-[45vh] min-h-[300px] flex items-center justify-center overflow-hidden mt-20">
        <div className="absolute inset-0">
          <img
            src={`${IMG}/photo-1488646953014-85cb44e25828?w=1920&q=80`}
            alt="Travel photo journal - snapshots from around the world"
            className="absolute inset-0 w-full h-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-background" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <Camera className="w-14 h-14 text-white/90 mx-auto mb-5" />
          <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-3">
            Travel Photo Journal
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-xl mx-auto">
            Snapshots and stories from journeys around the globe—one frame at a time.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="container mx-auto px-4 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-2">Recent shots</h2>
          <p className="text-muted-foreground">Moments captured along the way</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((item, index) => (
            <Card
              key={index}
              className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={item.image}
                  alt={`${item.caption} — ${item.location}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <div className="flex items-center gap-2 text-white/90 text-sm mb-1">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span>{item.location}</span>
                  </div>
                  <p className="text-white font-medium text-lg">{item.caption}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Photo Collections */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-2">Photo collections</h2>
            <p className="text-muted-foreground">Curated galleries by theme</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {photoCollections.map((collection, index) => (
              <Card
                key={index}
                className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={collection.image}
                    alt={collection.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="font-heading font-bold text-xl text-white mb-1">{collection.title}</h3>
                    <p className="text-white/80 text-sm">{collection.count}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Travel Stories */}
      <section className="container mx-auto px-4 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-2">Travel stories</h2>
          <p className="text-muted-foreground">Behind the lens</p>
        </div>

        <div className="space-y-16 max-w-5xl mx-auto">
          <Card className="overflow-hidden border-0 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-72 lg:h-auto min-h-[320px] lg:min-h-0">
                <img
                  src={`${IMG}/photo-1473580044384-7ba9967e16a0?w=1000&q=80`}
                  alt="Sahara Desert at sunset - a night under the stars"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <CardContent className="p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                  <MapPin className="w-4 h-4" />
                  <span>Sahara Desert, Morocco</span>
                </div>
                <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">A night under the stars</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  The Sahara at sunset is pure magic. As the sun dipped below endless sand dunes, the desert came alive with colors—deep oranges melting into purples and finally the deepest indigo. That night, lying on the cool sand and gazing up at more stars than I thought existed, I understood why this place has captivated travelers for centuries.
                </p>
                <Button className="w-fit bg-primary hover:bg-primary/90 rounded-full" size="sm">
                  Read full story
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </div>
          </Card>

          <Card className="overflow-hidden border-0 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <CardContent className="p-8 md:p-12 flex flex-col justify-center order-2 lg:order-1">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                  <MapPin className="w-4 h-4" />
                  <span>Kyoto, Japan</span>
                </div>
                <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">Finding peace in the bamboo grove</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Walking through Arashiyama's bamboo forest felt like stepping into another world. The towering stalks swayed gently in the breeze, creating a rhythmic rustling that seemed to slow down time. Early morning light filtered through the canopy, casting an ethereal green glow. In that moment of stillness, surrounded by nature's architecture, I found the tranquility Kyoto is famous for.
                </p>
                <Button className="w-fit bg-primary hover:bg-primary/90 rounded-full" size="sm">
                  Read full story
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
              <div className="relative h-72 lg:h-auto min-h-[320px] lg:min-h-0 order-1 lg:order-2">
                <img
                  src={`${IMG}/photo-1493976040374-85c8e12f0c0e?w=1000&q=80`}
                  alt="Arashiyama bamboo grove, Kyoto - finding peace"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </Card>

          <Card className="overflow-hidden border-0 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-72 lg:h-auto min-h-[320px] lg:min-h-0">
                <img
                  src={`${IMG}/photo-1502602898657-3e91760cbb34?w=1000&q=80`}
                  alt="Eiffel Tower at dawn, Paris - first light"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <CardContent className="p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                  <MapPin className="w-4 h-4" />
                  <span>Paris, France</span>
                </div>
                <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">First light at the Eiffel Tower</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  I set the alarm for 5 a.m. to beat the crowds. Standing on the Trocadéro at dawn, watching the first rays hit the iron lattice—that's when Paris felt entirely mine. The city slowly woke up; by the time the first café opened, I had the shot I'd imagined for years. Sometimes the best travel moments are the ones you plan for and the silence you get in return.
                </p>
                <Button className="w-fit bg-primary hover:bg-primary/90 rounded-full" size="sm">
                  Read full story
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </div>
          </Card>

          <Card className="overflow-hidden border-0 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <CardContent className="p-8 md:p-12 flex flex-col justify-center order-2 lg:order-1">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                  <MapPin className="w-4 h-4" />
                  <span>Amalfi Coast, Italy</span>
                </div>
                <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">Cliffside villages and lemon groves</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Driving the Amalfi Coast in a vintage Fiat was equal parts thrilling and terrifying. Every bend revealed another postcard: pastel houses stacked on cliffs, lemon trees spilling toward the sea, and that impossible blue. We stopped in Positano for gelato and in Ravello for views that made the winding roads worth every white-knuckle moment.
                </p>
                <Button className="w-fit bg-primary hover:bg-primary/90 rounded-full" size="sm">
                  Read full story
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
              <div className="relative h-72 lg:h-auto min-h-[320px] lg:min-h-0 order-1 lg:order-2">
                <img
                  src={`${IMG}/photo-1523531294919-4fcd274e17da?w=1000&q=80`}
                  alt="Amalfi Coast, Italy - cliffside villages and sea"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
