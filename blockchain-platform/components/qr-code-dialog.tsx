"use client";

import { useRef } from "react";
import { Download } from "lucide-react";
import QRCode from "react-qr-code";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface QrCodeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  assetId: string;
  assetName: string;
}

export function QrCodeDialog({
  open,
  onOpenChange,
  assetId,
  assetName,
}: QrCodeDialogProps) {
  const verificationUrl = `${window.location.origin}/asset/${assetId}`;
  const qrCodeRef = useRef<HTMLDivElement>(null);

  const downloadQrCode = async () => {
    const qrCodeElement = document.getElementById("qr-code");
    if (!qrCodeElement || !qrCodeRef.current) return;

    // Create canvas
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size with padding for text and logo
    const padding = 40;
    const qrSize = 256;
    canvas.width = qrSize + padding * 2;
    canvas.height = qrSize + padding * 2 + 60; // Extra height for text

    // Fill background
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw QR Code
    const svgData = new XMLSerializer().serializeToString(qrCodeElement);
    const img = new Image();

    await new Promise((resolve) => {
      img.onload = async () => {
        // Draw QR code
        ctx.drawImage(img, padding, padding, qrSize, qrSize);

        // Draw logo
        const logo = new Image();
        logo.crossOrigin = "anonymous";
        logo.src = "/shield.svg";

        await new Promise((logoResolve) => {
          logo.onload = () => {
            // Calculate logo size and position (20% of QR code size)
            const logoSize = qrSize * 0.2;
            const logoX = (canvas.width - logoSize) / 2;
            const logoY = (qrSize + padding - logoSize) / 2 + padding;
            ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);
            logoResolve(null);
          };
          logo.onerror = () => logoResolve(null); // Continue even if logo fails to load
        });

        // Add text
        ctx.fillStyle = "black";
        ctx.font = "bold 16px Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(assetName, canvas.width / 2, qrSize + padding * 2 + 20);

        ctx.font = "14px Inter, sans-serif";
        ctx.fillStyle = "#6b7280";
        ctx.fillText(
          `Asset #${assetId}`,
          canvas.width / 2,
          qrSize + padding * 2 + 45
        );

        // Download the image
        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = `${assetName
          .toLowerCase()
          .replace(/\s+/g, "-")}-${assetId}-qr.png`;
        downloadLink.href = pngFile;
        downloadLink.click();

        resolve(null);
      };
      img.src = "data:image/svg+xml;base64," + btoa(svgData);
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Asset #{assetId} QR Code</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4">
          <div className="bg-white p-8 rounded-lg" ref={qrCodeRef}>
            <div className="relative">
              <QRCode
                id="qr-code"
                value={verificationUrl}
                size={256}
                level="H"
                className="h-auto max-w-full"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src="/shield.svg"
                  alt="TrustWallet"
                  className="w-12 h-12 bg-white rounded-full p-2"
                />
              </div>
            </div>
            <div className="text-center mt-4">
              <h3 className="font-bold text-base">{assetName}</h3>
              <p className="text-sm text-muted-foreground">Asset #{assetId}</p>
            </div>
          </div>
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Scan to verify this asset
            </p>
            <p className="text-xs text-muted-foreground break-all">
              {verificationUrl}
            </p>
          </div>
          <Button className="w-full" onClick={downloadQrCode}>
            <Download className="mr-2 h-4 w-4" />
            Download QR Code
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
