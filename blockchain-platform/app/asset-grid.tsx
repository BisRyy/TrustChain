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
import { readContract } from "thirdweb";
import { formatAddress } from "@/lib/utils";
import { QrCodeDialog } from "@/components/qr-code-dialog";
import { useState } from "react";

export function AssetGrid() {
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [selectedAssetId, setSelectedAssetId] = useState<string>("");
  const account = useActiveAccount();

  const { data: assets, isPending: isLoadingAssets } = useReadContract({
    contract,
    method:
      "function getAssetsByOwner(address _owner) view returns ((uint256 id, string name, address owner, string[] keys, string[] values)[])",
    params: [account?.address || ""],
  });

  if (isLoadingAssets) {
    return <p>Loading assets...</p>;
  }

  if (!assets) {
    return <p>No assets found</p>;
  }
  console.log(assets, "assets");

  return (
    <div className="grid gap-4 md:grid-cols-3 grid-cols-2 lg:grid-cols-4">
      {assets ? (
        assets.map((asset) => (
          <Card key={asset.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Asset #{asset.id.toString()}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    setSelectedAssetId(asset.id.toString());
                    setQrDialogOpen(true);
                  }}
                >
                  <QrCode className="h-4 w-4" />
                  <span className="sr-only">View QR Code</span>
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-square relative mb-4">
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
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Name:</span>
                  <span className="text-sm">{asset.name}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm font-medium">Owner:</span>
                  <span className="text-sm"> {formatAddress(asset.owner)}</span>
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
      <QrCodeDialog
        open={qrDialogOpen}
        onOpenChange={setQrDialogOpen}
        assetId={selectedAssetId}
        assetName="Bisrat"
      />
    </div>
  );
}
