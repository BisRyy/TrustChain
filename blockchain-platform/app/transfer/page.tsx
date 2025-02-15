import { ArrowLeft, Building2, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TransferForm } from "./transfer-form"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// This would come from your API/database
const assetData = {
  id: "0001",
  name: "Product A",
  type: "Electronics",
  status: "Active",
  currentOwner: {
    name: "Electronics Corp",
    address: "0xabc...def",
    type: "Organization",
  },
  image: "/placeholder.svg",
  properties: {
    "Batch Number": "BN-2024-001",
    "Manufacturing Date": "2024-01-15",
    "Serial Number": "SN-123456",
  },
}

export default function TransferPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Transfer Asset</h1>
        </div>
        <p className="text-sm text-muted-foreground mt-1">Transfer ownership of your asset to another address</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Asset Details</CardTitle>
              <CardDescription>Review the asset information before transfer</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="aspect-video relative">
                <Image
                  src={assetData.image || "/placeholder.svg"}
                  alt={assetData.name}
                  className="rounded-lg object-cover"
                  fill
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Asset #{assetData.id}</h3>
                    <p className="text-sm text-muted-foreground">{assetData.name}</p>
                  </div>
                  <Badge variant="outline">{assetData.status}</Badge>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">Current Owner</p>
                  <div className="flex items-start gap-3 rounded-lg border p-3">
                    {assetData.currentOwner.type === "Organization" ? (
                      <Building2 className="h-5 w-5 text-muted-foreground mt-0.5" />
                    ) : (
                      <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                    )}
                    <div>
                      <p className="font-medium">{assetData.currentOwner.name}</p>
                      <p className="text-sm font-mono text-muted-foreground">{assetData.currentOwner.address}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Properties</p>
                  <div className="space-y-2">
                    {Object.entries(assetData.properties).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{key}</span>
                        <span>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Transfer Details</CardTitle>
              <CardDescription>Enter the recipient details and transfer conditions</CardDescription>
            </CardHeader>
            <CardContent>
              <TransferForm assetId={assetData.id} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Transfer Guidelines</CardTitle>
              <CardDescription>Important information about asset transfers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <div className="space-y-2">
                  <p className="font-medium">Before you transfer:</p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Verify the recipient&apos;s address carefully</li>
                    <li>Ensure the recipient is authorized to receive assets</li>
                    <li>Review any transfer conditions or restrictions</li>
                    <li>Consider any regulatory requirements</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="font-medium">After transfer:</p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>The transaction will be recorded on the blockchain</li>
                    <li>Ownership will be updated after confirmation</li>
                    <li>All parties will receive transfer notifications</li>
                    <li>The asset&apos;s history will be updated</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

