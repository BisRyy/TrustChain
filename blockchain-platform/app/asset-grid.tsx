import { ArrowUpRight, QrCode } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function AssetGrid() {
  const assets = [
    {
      id: "0001",
      name: "Product A",
      type: "Electronics",
      status: "Active",
      lastUpdated: "2 hours ago",
      properties: {
        "Batch Number": "BN-2024-001",
        "Manufacturing Date": "2024-01-15",
      },
    },
    {
      id: "0002",
      name: "Product B",
      type: "Pharmaceuticals",
      status: "In Transit",
      lastUpdated: "5 hours ago",
      properties: {
        "Batch Number": "BN-2024-002",
        "Expiry Date": "2025-01-15",
      },
    },
    {
      id: "0003",
      name: "Product C",
      type: "Food & Beverage",
      status: "Quality Check",
      lastUpdated: "1 day ago",
      properties: {
        "Batch Number": "BN-2024-003",
        "Production Date": "2024-01-14",
      },
    },

    {
      id: "0004",
      name: "Product D",
      type: "Food & Beverage",
      status: "Quality Check",
      lastUpdated: "4 day ago",
      properties: {
        "Batch Number": "BN-2024-003",
        "Production Date": "2024-01-14",
      },
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-3 grid-cols-2 lg:grid-cols-4">
      {assets.map((asset) => (
        <Card key={asset.id}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Asset #{asset.id}</span>
              <Button variant="outline" size="icon">
                <QrCode className="h-4 w-4" />
                <span className="sr-only">View QR Code</span>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-square relative mb-4">
              <Image src="/placeholder.svg" alt={asset.name} className="rounded-lg object-cover" fill />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Name:</span>
                <span className="text-sm">{asset.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Type:</span>
                <span className="text-sm">{asset.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Status:</span>
                <span className="text-sm">{asset.status}</span>
              </div>
              {Object.entries(asset.properties).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-sm font-medium">{key}:</span>
                  <span className="text-sm">{value}</span>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <span className="text-sm text-muted-foreground">Updated {asset.lastUpdated}</span>
            <Link href={`/asset/${asset.id}`} className="flex items-center text-blue-600">
              View Details
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

