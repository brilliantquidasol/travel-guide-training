import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t border-border mt-24">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-heading font-bold text-2xl mb-4">Wanderlust</h3>
            <p className="text-muted-foreground max-w-md leading-relaxed">
              Your guide to discovering the world's most incredible destinations. Plan your next adventure with expert
              tips and stunning travel inspiration.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Explore</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/destinations" className="text-muted-foreground hover:text-primary transition-colors">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/tours" className="text-muted-foreground hover:text-primary transition-colors">
                  Tours
                </Link>
              </li>
              <li>
                <Link href="/hotels" className="text-muted-foreground hover:text-primary transition-colors">
                  Hotels
                </Link>
              </li>
              <li>
                <Link href="/travel-tips" className="text-muted-foreground hover:text-primary transition-colors">
                  Travel Tips
                </Link>
              </li>
              <li>
                <Link href="/photo-journal" className="text-muted-foreground hover:text-primary transition-colors">
                  Photo Journal
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">© 2025 Wanderlust. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Facebook className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Youtube className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
