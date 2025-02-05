import { Activity, Box, Home, Settings } from "lucide-react"
import Link from "next/link"
import type React from "react" // Added import for React

import { cn } from "@/lib/utils"

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
        <Home className="h-4 w-4" />
        <span className="sr-only">Home</span>
      </Link>
      <Link href="/assets" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        <Box className="h-4 w-4" />
        <span className="sr-only">Assets</span>
      </Link>
      <Link href="/activity" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        <Activity className="h-4 w-4" />
        <span className="sr-only">Activity</span>
      </Link>
      <Link href="/settings" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        <Settings className="h-4 w-4" />
        <span className="sr-only">Settings</span>
      </Link>
    </nav>
  )
}

