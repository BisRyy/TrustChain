import { Shield } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center md:pl-16">
      <Link className="flex items-center justify-center" href="/">
        <Shield className="h-6 w-6" />
        <span className="ml-2 text-xl font-bold">TrustChain</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6 items-center justify-center">
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#features"
        >
          Features
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#how-it-works"
        >
          How It Works
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#benefits"
        >
          Benefits
        </Link>
        <Button asChild>
          <Link href="/login">Get Started</Link>
        </Button>
      </nav>
    </header>
  );
}

