"use client";

import { useEffect, useState } from "react";
import { QrCode } from "lucide-react";
import { Html5QrcodeScanner } from "html5-qrcode";

interface QrScannerProps {
  onResult: (result: string) => void;
  isScanning: boolean;
  fps?: number;
  qrbox?: number;
  aspectRatio?: number;
  disableFlip?: boolean;
  verbose?: boolean;
}

export function QrScanner({
  onResult,
  isScanning,
  fps = 10,
  qrbox = 250,
  aspectRatio = 1,
  disableFlip,
  verbose = false,
}: QrScannerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasCamera, setHasCamera] = useState(false);
  const qrcodeRegionId = "html5qr-code-full-region";

  useEffect(() => {
    if (!isScanning) return;

    let scanner: Html5QrcodeScanner | null = null;

    async function initializeScanner() {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const hasVideoDevice = devices.some(
          (device) => device.kind === "videoinput"
        );
        setHasCamera(hasVideoDevice);

        if (hasVideoDevice) {
          const config = {
            fps,
            qrbox,
            aspectRatio,
            disableFlip,
          };

          setTimeout(() => {
            scanner = new Html5QrcodeScanner(qrcodeRegionId, config, verbose);

            scanner.render(
              (decodedText) => {
                onResult(decodedText);
                if (scanner) {
                  scanner.clear();
                }
              },
              (error) => {
                console.error("QR Code scanning failed:", error);
              }
            );
          }, 100);
        }
      } catch (error) {
        console.error("Could not initialize camera:", error);
        setHasCamera(false);
      } finally {
        setIsLoading(false);
      }
    }

    initializeScanner();

    return () => {
      if (scanner) {
        scanner.clear().catch((error) => {
          console.error("Failed to clear html5QrcodeScanner. ", error);
        });
      }
    };
  }, [onResult, isScanning, fps, qrbox, aspectRatio, disableFlip, verbose]);

  if (!isScanning) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">
            Initializing camera...
          </p>
        </div>
      </div>
    );
  }

  if (!hasCamera) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        <div className="flex flex-col items-center gap-2 text-center">
          <QrCode className="h-8 w-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            No camera detected. Please ensure you have granted camera
            permissions.
          </p>
        </div>
      </div>
    );
  }

  return <div id={qrcodeRegionId} className="w-full"></div>;
}
