"use client";
import { ArrowUpRight, QrCode } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { contract } from "@/lib/client";

export function AssetGrid() {
  // const { account } = useActiveAccount();
  // Get all assets deployed
  const {
    data: assets,
    isLoading: isLoadingAssets,
    refetch: refetchAssets,
  } = useReadContract({
    contract: contract,
    method:
      "function getAllAssets() view returns ((uint256 id, string name, address owner)[])",
    params: [],
  });

  // const {
  //   data: assets,
  //   isLoading: isLoadingAssets,
  //   refetch: refetchAssets,
  // } = useReadContract({
  //   contract: contract,
  //   method:
  //     "function getAssetsByOwner(address _owner) view returns (uint256[])",
  //   params: [account?.address || "0x"],
  // });
  return (
    <div className="grid gap-4 md:grid-cols-3 grid-cols-2 lg:grid-cols-4">
      {assets ? (
        assets.map((asset) => (
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
                <Image
                  src="/placeholder.svg"
                  alt={asset.name}
                  className="rounded-lg object-cover"
                  fill
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Name:</span>
                  <span className="text-sm">{asset.name}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm font-medium">Owner:</span>
                  <span className="text-sm"> {asset.owner}</span>
                </div>
                {/*  <div className="flex justify-between">
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
                ))} */}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              {/* <span className="text-sm text-muted-foreground">
                Updated {asset.lastUpdated}
              </span> */}
              <Link
                href={`/asset/${asset.id}`}
                className="flex items-center text-blue-600"
              >
                View Details
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </CardFooter>
          </Card>
        ))
      ) : (
        <p>Loading assets...</p>
      )}
    </div>
  );
}
