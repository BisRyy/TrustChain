import { Bell } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function NotificationCenter() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Toggle notifications</span>
          <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-background bg-red-600" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Notifications</p>
            <p className="text-xs leading-none text-muted-foreground">You have 3 unread notifications</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">Asset Transfer Request</p>
              <p className="text-xs text-muted-foreground">Asset #1234 transfer request from Supplier Inc.</p>
              <p className="text-xs text-muted-foreground">2 minutes ago</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">Property Update</p>
              <p className="text-xs text-muted-foreground">Quality certification updated for Asset #5678</p>
              <p className="text-xs text-muted-foreground">1 hour ago</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">New Integration</p>
              <p className="text-xs text-muted-foreground">ERP system successfully connected</p>
              <p className="text-xs text-muted-foreground">2 hours ago</p>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

