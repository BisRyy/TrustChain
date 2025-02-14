"use client";
import {
  ArrowLeft,
  ArrowUpRight,
  Box,
  CheckCircle2,
  Clock,
  Edit,
  QrCode,
  XCircle,
} from "lucide-react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { UpdatePropertyDialog } from "./update-property-dialog";
import { TransferAssetDialog } from "./transfer-asset-dialog";
import { contract } from "@/lib/client";
import { useReadContract } from "thirdweb/react";
import { formatAddress } from "@/lib/utils";

// This would come from your API/database
const assetData = {
  id: "0001",
  name: "Product A",
  type: "Electronics",
  status: "Active",
  createdAt: "2024-01-15T10:00:00Z",
  lastUpdated: "2024-01-20T15:30:00Z",
  owner: "Electronics Corp",
  properties: {
    "Batch Number": "BN-2024-001",
    "Manufacturing Date": "2024-01-15",
    "Serial Number": "SN-123456",
    "Quality Certification": "ISO-9001",
    "Warranty Period": "24 months",
  },
  propertyHistory: [
    {
      property: "Quality Certification",
      oldValue: "Pending",
      newValue: "ISO-9001",
      updatedAt: "2024-01-18T09:15:00Z",
      updatedBy: "Quality Control Dept",
    },
    {
      property: "Warranty Period",
      oldValue: "12 months",
      newValue: "24 months",
      updatedAt: "2024-01-16T14:20:00Z",
      updatedBy: "Product Management",
    },
  ],
  transactions: [
    {
      id: "tx1",
      type: "Creation",
      from: "Manufacturing Dept",
      to: "Electronics Corp",
      status: "Completed",
      timestamp: "2024-01-15T10:00:00Z",
    },
    {
      id: "tx2",
      type: "Property Update",
      from: "Quality Control",
      to: "N/A",
      status: "Completed",
      timestamp: "2024-01-18T09:15:00Z",
    },
  ],
};

export default function AssetDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { data: asset, isPending } = useReadContract({
    contract,
    method:
      "function getAssetDetails(uint256 _id) view returns ((uint256 id, string name, address owner, string[] keys, string[] values))",
    params: [BigInt(params.id)],
  });

  if (isPending || !asset) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-muted-foreground hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <h1 className="text-3xl font-bold tracking-tight">
                Asset #{params.id}
              </h1>
              <Badge variant="outline" className="ml-2">
                {assetData.status}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon">
                <QrCode className="h-4 w-4" />
              </Button>
              <TransferAssetDialog id={params.id} />
              <UpdatePropertyDialog id={params.id} />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Created on {new Date(assetData.createdAt).toLocaleDateString()} •
            Last updated {new Date(assetData.lastUpdated).toLocaleDateString()}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Asset Information</CardTitle>
              <CardDescription>
                Basic details and current properties
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-square relative mb-6">
                <Image
                  src={
                    `https://ipfs.io/ipfs/${
                      asset.values[asset.keys.indexOf("image")]
                    }` || "/placeholder.png"
                  }
                  alt={asset.name}
                  className="rounded-lg object-cover"
                  fill
                />
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Name</p>
                    <p className="text-sm text-muted-foreground">
                      {asset.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Type</p>
                    <p className="text-sm text-muted-foreground">
                      {assetData.type}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Current Owner</p>
                    <p className="text-sm text-muted-foreground">
                      {formatAddress(asset.owner)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Status</p>
                    <p className="text-sm text-muted-foreground">
                      {assetData.status}
                    </p>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <p className="text-sm font-medium">Properties</p>
                  {Object.entries(assetData.properties).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{key}</span>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Property History</CardTitle>
                <CardDescription>
                  Track changes to asset properties over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {assetData.propertyHistory.map((change, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="mt-1">
                        <Edit className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="space-y-1 flex-1">
                        <p className="text-sm">
                          <span className="font-medium">{change.property}</span>{" "}
                          updated from{" "}
                          <span className="text-muted-foreground">
                            {change.oldValue}
                          </span>{" "}
                          to{" "}
                          <span className="font-medium">{change.newValue}</span>
                        </p>
                        <p className="text-xs text-muted-foreground">
                          By {change.updatedBy} •{" "}
                          {new Date(change.updatedAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>
                  Complete record of asset transactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assetData.transactions.map((tx) => (
                      <TableRow key={tx.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Box className="h-4 w-4 text-muted-foreground" />
                            <span>{tx.type}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {tx.status === "Completed" && (
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                            )}
                            {tx.status === "Pending" && (
                              <Clock className="h-4 w-4 text-yellow-500" />
                            )}
                            {tx.status === "Failed" && (
                              <XCircle className="h-4 w-4 text-red-500" />
                            )}
                            <span>{tx.status}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {new Date(tx.timestamp).toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <Link
                            href={`/transaction/${tx.id}`}
                            className="inline-flex items-center text-blue-600"
                          >
                            View
                            <ArrowUpRight className="ml-1 h-4 w-4" />
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
