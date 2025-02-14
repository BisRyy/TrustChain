import React from "react";
import { MainNav } from "../main-nav";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { NotificationCenter } from "../notification-center";
import { UserNav } from "../user-nav";
import { ConnectButton } from "thirdweb/react";
import { chain, client } from "@/lib/client";

function NavBar() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search assets..."
              className="w-[200px] pl-8 md:w-[300px] lg:w-[400px]"
            />
          </div>
          <NotificationCenter />
          <UserNav />
          <div className="flex justify-center">
            <ConnectButton
              client={client}
              chain={chain}
              appMetadata={{
                name: "Example App",
                url: "https://example.com",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
