import Link from "next/link"
import { Instagram, Facebook, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold">SKINSEOUL</h3>
            <p className="text-sm text-muted-foreground">
              Premium Korean skincare products for your daily beauty routine.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shop" className="text-muted-foreground hover:text-foreground">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/shop/bestsellers" className="text-muted-foreground hover:text-foreground">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link href="/shop/new" className="text-muted-foreground hover:text-foreground">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Help</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-foreground">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-muted-foreground hover:text-foreground">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Connect</h3>
            <div className="flex space-x-4">
              <Link href="https://instagram.com" className="text-muted-foreground hover:text-foreground">
                <Instagram aria-hidden="true" className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://facebook.com" className="text-muted-foreground hover:text-foreground">
                <Facebook aria-hidden="true" className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="https://twitter.com" className="text-muted-foreground hover:text-foreground">
                <Twitter aria-hidden="true" className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
            <div className="mt-4">
              <h4 className="mb-2 text-sm font-medium">Subscribe to our newsletter</h4>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full rounded-l-md border border-input bg-background px-3 py-2 text-sm"
                  required
                />
                <button
                  type="submit"
                  className="rounded-r-md bg-pink-500 px-3 py-2 text-sm font-medium text-white hover:bg-pink-600"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} SKINSEOUL. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
