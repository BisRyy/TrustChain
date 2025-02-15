import {
  ArrowUpRight,
  BarChart3,
  Box,
  CircleDollarSign,
  QrCode,
  Search,
  Shield,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AssetGrid } from "../asset-grid";
import { NotificationCenter } from "../notification-center";
import { RecentTransactions } from "../recent-transactions";
import { UserNav } from "../user-nav";
import { RegisterAssetDialog } from "../register-asset-dialog";
import { chain, client } from "@/lib/client";
import { ConnectButton } from "thirdweb/react";
import Overview from "./overview";
import { VerifyDialog } from "./verify-dialog";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <Link className="flex items-center justify-center" href="/">
            <Shield className="h-6 w-6" />
            <span className="ml-2 text-xl font-bold">TrustChain</span>
          </Link>
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
                  name: "TrustChain",
                  url: "https://trustchain.bisry.me",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            {/* <Button>
              <Link href="/transfer" className="flex">
                <QrCode className="mr-2 h-4 w-4" />
                Transfer
              </Link>
            </Button> */}
            <VerifyDialog />
            <RegisterAssetDialog />
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="assets">Assets</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <Overview />
          </TabsContent>
          <TabsContent value="assets" className="space-y-4">
            <AssetGrid />
          </TabsContent>
          <TabsContent value="transactions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>
                  A complete record of all blockchain transactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentTransactions />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
