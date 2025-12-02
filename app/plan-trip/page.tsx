"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import {
  CalendarDays,
  Users,
  MapPin,
  Plane,
  Hotel,
  Utensils,
  Camera,
  Banknote,
  CheckCircle2,
  Plus,
  Trash2,
} from "lucide-react"

interface Activity {
  id: string
  title: string
  time: string
}

interface DayPlan {
  day: number
  activities: Activity[]
}

export default function PlanTripPage() {
  const [tripName, setTripName] = useState("")
  const [destination, setDestination] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [travelers, setTravelers] = useState("1")
  const [budget, setBudget] = useState("")
  const [tripType, setTripType] = useState("")
  const [notes, setNotes] = useState("")
  const [interests, setInterests] = useState<string[]>([])
  const [dayPlans, setDayPlans] = useState<DayPlan[]>([])

  const interestOptions = [
    { id: "beaches", label: "Beaches", icon: "🏖️" },
    { id: "culture", label: "Culture & History", icon: "🏛️" },
    { id: "food", label: "Food & Dining", icon: "🍽️" },
    { id: "adventure", label: "Adventure", icon: "🏔️" },
    { id: "nature", label: "Nature & Wildlife", icon: "🌿" },
    { id: "photography", label: "Photography", icon: "📸" },
    { id: "nightlife", label: "Nightlife", icon: "🌃" },
    { id: "shopping", label: "Shopping", icon: "🛍️" },
  ]

  const toggleInterest = (id: string) => {
    setInterests((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const addDay = () => {
    setDayPlans([
      ...dayPlans,
      {
        day: dayPlans.length + 1,
        activities: [],
      },
    ])
  }

  const removeDay = (day: number) => {
    setDayPlans(dayPlans.filter((d) => d.day !== day))
  }

  const addActivity = (day: number) => {
    setDayPlans(
      dayPlans.map((d) =>
        d.day === day
          ? {
              ...d,
              activities: [...d.activities, { id: Date.now().toString(), title: "", time: "" }],
            }
          : d,
      ),
    )
  }

  const removeActivity = (day: number, activityId: string) => {
    setDayPlans(
      dayPlans.map((d) => (d.day === day ? { ...d, activities: d.activities.filter((a) => a.id !== activityId) } : d)),
    )
  }

  const updateActivity = (day: number, activityId: string, field: string, value: string) => {
    setDayPlans(
      dayPlans.map((d) =>
        d.day === day
          ? {
              ...d,
              activities: d.activities.map((a) => (a.id === activityId ? { ...a, [field]: value } : a)),
            }
          : d,
      ),
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Component */}
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 pt-32 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
              Plan Your Dream Trip
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Create a detailed itinerary, set your budget, and organize every aspect of your journey
            </p>
          </div>
        </div>
      </section>

      {/* Planning Form */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          {/* Trip Overview */}
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="font-heading text-2xl flex items-center gap-2">
                <MapPin className="w-6 h-6 text-primary" />
                Trip Overview
              </CardTitle>
              <CardDescription>Let's start with the basics of your journey</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="tripName">Trip Name</Label>
                  <Input
                    id="tripName"
                    placeholder="e.g., Summer in Europe"
                    value={tripName}
                    onChange={(e) => setTripName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destination">Destination</Label>
                  <Input
                    id="destination"
                    placeholder="e.g., Paris, France"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="startDate" className="flex items-center gap-2">
                    <CalendarDays className="w-4 h-4" />
                    Start Date
                  </Label>
                  <Input id="startDate" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input id="endDate" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="travelers" className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Travelers
                  </Label>
                  <Select value={travelers} onValueChange={setTravelers}>
                    <SelectTrigger id="travelers">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {num === 1 ? "Traveler" : "Travelers"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="budget" className="flex items-center gap-2">
                    <Banknote className="w-4 h-4" />
                    Budget (USD)
                  </Label>
                  <Input
                    id="budget"
                    type="number"
                    placeholder="e.g., 5000"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tripType">Trip Type</Label>
                  <Select value={tripType} onValueChange={setTripType}>
                    <SelectTrigger id="tripType">
                      <SelectValue placeholder="Select trip type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="leisure">Leisure</SelectItem>
                      <SelectItem value="adventure">Adventure</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="family">Family Vacation</SelectItem>
                      <SelectItem value="romantic">Romantic Getaway</SelectItem>
                      <SelectItem value="solo">Solo Travel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interests */}
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="font-heading text-2xl flex items-center gap-2">
                <Camera className="w-6 h-6 text-primary" />
                What Interests You?
              </CardTitle>
              <CardDescription>Select all that apply to personalize your experience</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {interestOptions.map((option) => (
                  <div
                    key={option.id}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      interests.includes(option.id)
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => toggleInterest(option.id)}
                  >
                    <Checkbox
                      id={option.id}
                      checked={interests.includes(option.id)}
                      onCheckedChange={() => toggleInterest(option.id)}
                    />
                    <Label htmlFor={option.id} className="cursor-pointer flex items-center gap-2 flex-1">
                      <span className="text-xl">{option.icon}</span>
                      <span className="text-sm font-medium">{option.label}</span>
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Daily Itinerary */}
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="font-heading text-2xl flex items-center gap-2">
                <CalendarDays className="w-6 h-6 text-primary" />
                Daily Itinerary
              </CardTitle>
              <CardDescription>Plan your activities day by day</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {dayPlans.map((dayPlan) => (
                <div key={dayPlan.day} className="border border-border rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-heading font-semibold text-xl">Day {dayPlan.day}</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeDay(dayPlan.day)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {dayPlan.activities.map((activity) => (
                      <div key={activity.id} className="flex gap-3 items-start">
                        <Input
                          placeholder="Time (e.g., 9:00 AM)"
                          value={activity.time}
                          onChange={(e) => updateActivity(dayPlan.day, activity.id, "time", e.target.value)}
                          className="w-32"
                        />
                        <Input
                          placeholder="Activity (e.g., Visit Eiffel Tower)"
                          value={activity.title}
                          onChange={(e) => updateActivity(dayPlan.day, activity.id, "title", e.target.value)}
                          className="flex-1"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeActivity(dayPlan.day, activity.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <Button variant="outline" size="sm" onClick={() => addActivity(dayPlan.day)} className="mt-4 w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Activity
                  </Button>
                </div>
              ))}

              <Button onClick={addDay} variant="outline" className="w-full bg-transparent">
                <Plus className="w-5 h-5 mr-2" />
                Add Day
              </Button>
            </CardContent>
          </Card>

          {/* Quick Checklist */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="font-heading text-lg flex items-center gap-2">
                  <Plane className="w-5 h-5 text-primary" />
                  Flights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Checkbox id="flight-book" />
                  <Label htmlFor="flight-book" className="cursor-pointer">
                    Book flights
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="flight-confirm" />
                  <Label htmlFor="flight-confirm" className="cursor-pointer">
                    Confirm bookings
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="flight-checkin" />
                  <Label htmlFor="flight-checkin" className="cursor-pointer">
                    Online check-in
                  </Label>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="font-heading text-lg flex items-center gap-2">
                  <Hotel className="w-5 h-5 text-primary" />
                  Accommodation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Checkbox id="hotel-book" />
                  <Label htmlFor="hotel-book" className="cursor-pointer">
                    Book hotels
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="hotel-confirm" />
                  <Label htmlFor="hotel-confirm" className="cursor-pointer">
                    Confirm reservations
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="hotel-directions" />
                  <Label htmlFor="hotel-directions" className="cursor-pointer">
                    Save directions
                  </Label>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="font-heading text-lg flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-primary" />
                  Dining
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Checkbox id="restaurant-research" />
                  <Label htmlFor="restaurant-research" className="cursor-pointer">
                    Research restaurants
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="restaurant-reserve" />
                  <Label htmlFor="restaurant-reserve" className="cursor-pointer">
                    Make reservations
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="restaurant-dietary" />
                  <Label htmlFor="restaurant-dietary" className="cursor-pointer">
                    Note dietary needs
                  </Label>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Notes */}
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="font-heading text-2xl">Additional Notes</CardTitle>
              <CardDescription>Any other details, requirements, or ideas for your trip</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Add notes about visa requirements, travel insurance, special events, local contacts, or anything else..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-32"
              />
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="rounded-full px-8">
              <CheckCircle2 className="w-5 h-5 mr-2" />
              Save Trip Plan
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 bg-transparent">
              Export as PDF
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 bg-transparent">
              Share with Others
            </Button>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <h2 className="font-heading font-bold text-3xl text-center mb-8">Planning Tips</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <CalendarDays className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">Book Early</h3>
                <p className="text-muted-foreground text-sm">
                  Reserve flights and hotels 2-3 months in advance for better rates and availability.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4">
                  <Banknote className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">Budget Buffer</h3>
                <p className="text-muted-foreground text-sm">
                  Add 15-20% extra to your budget for unexpected expenses and spontaneous experiences.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-accent/50 rounded-xl flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-accent-foreground" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">Stay Flexible</h3>
                <p className="text-muted-foreground text-sm">
                  Leave some free time in your itinerary to explore and discover hidden gems.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer Component */}
      <Footer />
    </div>
  )
}
