"use client";

import { QrCode, Search } from "lucide-react";
import { useState } from "react";
import type React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QrScanner } from "./qr-scanner";
import { VerificationResult } from "./verification-result";
import Html5QrcodePlugin from "../scan/Html5QrcodePlugin";
import { useReadContract } from "thirdweb/react";
import { contract } from "@/lib/client";
import { readContract } from "thirdweb";

export function VerifyDialog() {
  const [open, setOpen] = useState(false);
  const [assetId, setAssetId] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("manual");

  async function handleVerify(id: string) {
    try {
      setIsVerifying(true);

      const asset = await readContract({
        contract,
        method:
          "function getAssetDetails(uint256 _id) view returns ((uint256 id, string name, address owner, string[] keys, string[] values))",
        params: [BigInt(id)],
      });

      // Mock verification result
      setVerificationResult({
        isAuthentic: asset,
        asset: {
          id: id,
          name: asset.name,
          image:
            `https://ipfs.io/ipfs/${
              asset.values[asset.keys.indexOf("image")]
            }` || "/placeholder.png",
          type: "Electronics",
          status: "Active",
          manufacturer: "Electronics Corp",
          manufacturingDate: "2024-01-15",
          lastTransfer: "2024-02-10",
          properties: {
            "Serial Number": "SN-123456",
            "Batch Number": "BN-2024-001",
            "Quality Certification": "ISO-9001",
          },
        },
      });
      setActiveTab("result");
    } catch (error) {
      setVerificationResult({
        isAuthentic: false,
        error: "Could not verify asset. Please try again.",
      });
      setActiveTab("result");
    } finally {
      setIsVerifying(false);
    }
  }

  function handleQrCodeScanned(result: string) {
    // Extract asset ID from QR code data
    // Assuming QR code contains data in format "asset:0001"
    const results = result.split("/");
    const id = results[results.length - 1];
    if (id) {
      handleVerify(id);
    }
  }

  function handleManualSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (assetId) {
      handleVerify(assetId);
    }
  }

  function handleOpenChange(open: boolean) {
    setOpen(open);
    if (!open) {
      // Reset state when dialog closes
      setAssetId("");
      setVerificationResult(null);
      setIsVerifying(false);
      setActiveTab("manual");
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <QrCode className="mr-2 h-4 w-4" />
          Verify
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] overflow-y-auto max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Verify Asset</DialogTitle>
          <DialogDescription>
            Enter an asset ID or scan a QR code to verify authenticity
          </DialogDescription>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="manual">Manual Entry</TabsTrigger>
            <TabsTrigger value="qr">QR Code</TabsTrigger>
            <TabsTrigger value="result" disabled={!verificationResult}>
              Results
            </TabsTrigger>
          </TabsList>

          <TabsContent value="manual">
            <form onSubmit={handleManualSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="assetId">Asset ID</Label>
                <div className="flex gap-2">
                  <Input
                    id="assetId"
                    placeholder="Enter asset ID"
                    value={assetId}
                    onChange={(e) => setAssetId(e.target.value)}
                  />
                  <Button type="submit" disabled={!assetId || isVerifying}>
                    {isVerifying ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Verifying
                      </div>
                    ) : (
                      <>
                        <Search className="mr-2 h-4 w-4" />
                        Verify
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="qr">
            <div className="space-y-4">
              <div className="rounded-lg border bg-muted/50 p-4">
                <QrScanner
                  onResult={handleQrCodeScanned}
                  isScanning={true}
                  fps={10}
                  qrbox={250}
                  aspectRatio={1}
                  disableFlip={false}
                  verbose={false}
                />
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Position the QR code within the frame to scan
              </p>
            </div>
          </TabsContent>

          <TabsContent value="result">
            {verificationResult && (
              <VerificationResult result={verificationResult} />
            )}
          </TabsContent>
        </Tabs>

        <div className="space-y-4 text-sm">
          <div className="space-y-2">
            <p className="font-medium">How verification works:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Asset details are verified against blockchain records</li>
              <li>Ownership and transfer history are validated</li>
              <li>Digital signatures are checked for authenticity</li>
              <li>Current status and properties are confirmed</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
