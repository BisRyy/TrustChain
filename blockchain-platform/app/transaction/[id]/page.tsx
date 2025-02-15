import { ArrowLeft, ArrowUpRight, Copy, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { VerificationStatus } from "./verification-status";
import { TransactionTimeline } from "./transaction-timeline";

// This would come from your API/database
const transactionData = {
  id: "tx1",
  type: "Transfer",
  status: "Completed",
  timestamp: "2024-01-20T15:30:00Z",
  hash: "0x1234...5678",
  blockNumber: 12345678,
  confirmations: 128,
  from: {
    name: "Electronics Corp",
    address: "0xabc...def",
    role: "Manufacturer",
  },
  to: {
    name: "Distributor LLC",
    address: "0x789...012",
    role: "Distributor",
  },
  asset: {
    id: "0001",
    name: "Product A",
    type: "Electronics",
    image: "/placeholder.svg",
  },
  details: {
    "Gas Used": "125,000",
    "Gas Price": "25 Gwei",
    "Total Fee": "0.003125 ETH",
    Nonce: "42",
  },
  timeline: [
    {
      status: "Initiated",
      timestamp: "2024-01-20T15:30:00Z",
      description: "Transaction initiated by Electronics Corp",
    },
    {
      status: "Pending",
      timestamp: "2024-01-20T15:30:05Z",
      description: "Transaction submitted to blockchain",
    },
    {
      status: "Confirmed",
      timestamp: "2024-01-20T15:32:00Z",
      description: "Transaction confirmed in block #12345678",
    },
    {
      status: "Completed",
      timestamp: "2024-01-20T15:32:30Z",
      description: "Asset ownership successfully transferred",
    },
  ],
};

export default function TransactionDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">
              Transaction Details
            </h1>
            <Badge
              variant={
                transactionData.status === "Completed"
                  ? "default"
                  : transactionData.status === "Pending"
                  ? "outline"
                  : "destructive"
              }
            >
              {transactionData.status}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Copy className="mr-2 h-4 w-4" />
              Copy TX Hash
            </Button>
            <Button variant="outline" size="sm">
              <ExternalLink className="mr-2 h-4 w-4" />
              View on Explorer
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Transaction Hash: {transactionData.hash} • Block #
          {transactionData.blockNumber}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Transaction Information</CardTitle>
              <CardDescription>
                Details about this blockchain transaction
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">From</p>
                  <div className="space-y-1">
                    <p className="font-medium">{transactionData.from.name}</p>
                    <p className="text-sm font-mono">
                      {transactionData.from.address}
                    </p>
                    <Badge variant="outline">{transactionData.from.role}</Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">To</p>
                  <div className="space-y-1">
                    <p className="font-medium">{transactionData.to.name}</p>
                    <p className="text-sm font-mono">
                      {transactionData.to.address}
                    </p>
                    <Badge variant="outline">{transactionData.to.role}</Badge>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-sm font-medium mb-2">Transaction Details</p>
                <div className="grid gap-2">
                  {Object.entries(transactionData.details).map(
                    ([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{key}</span>
                        <span className="font-mono">{value}</span>
                      </div>
                    )
                  )}
                </div>
              </div>

              <Separator />

              <TransactionTimeline timeline={transactionData.timeline} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Verification Status</CardTitle>
              <CardDescription>
                Current verification and confirmation status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <VerificationStatus
                status={transactionData.status}
                confirmations={transactionData.confirmations}
              />
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Related Asset</CardTitle>
              <CardDescription>
                Asset involved in this transaction
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="aspect-square relative">
                  <Image
                    src={transactionData.asset.image || "/placeholder.svg"}
                    alt={transactionData.asset.name}
                    className="rounded-lg object-cover"
                    fill
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">
                        Asset #{transactionData.asset.id}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {transactionData.asset.name}
                      </p>
                    </div>
                    <Link
                      href={`/asset/${transactionData.asset.id}`}
                      className="text-blue-600 inline-flex items-center text-sm"
                    >
                      View Details
                      <ArrowUpRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {transactionData.asset.type}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
