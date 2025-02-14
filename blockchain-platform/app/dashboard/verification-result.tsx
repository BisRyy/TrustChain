import { CheckCircle2, ExternalLink, XCircle } from "lucide-react";
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

interface VerificationResultProps {
  result: {
    isAuthentic: boolean;
    asset?: {
      id: string;
      name: string;
      type: string;
      status: string;
      manufacturer: string;
      manufacturingDate: string;
      lastTransfer: string;
      properties: Record<string, string>;
    };
    error?: string;
  };
}

export function VerificationResult({ result }: VerificationResultProps) {
  if (!result.isAuthentic) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <XCircle className="h-5 w-5 text-destructive" />
            <CardTitle>Verification Failed</CardTitle>
          </div>
          <CardDescription>
            Could not verify the authenticity of this asset
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{result.error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!result.asset) return <div>Unable to verify asset</div>;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <CardTitle>Verification Successful</CardTitle>
            </div>
            <Badge variant="outline" className="capitalize">
              {result.asset.status}
            </Badge>
          </div>
          <CardDescription>
            This asset has been verified as authentic
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="aspect-video relative">
            <Image
              src="/placeholder.svg"
              alt={result.asset.name}
              className="rounded-lg object-cover"
              fill
            />
          </div>

          <div>
            <h3 className="font-semibold">Asset #{result.asset.id}</h3>
            <p className="text-sm text-muted-foreground">{result.asset.name}</p>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Manufacturer</p>
                <p className="text-sm text-muted-foreground">
                  {result.asset.manufacturer}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Type</p>
                <p className="text-sm text-muted-foreground">
                  {result.asset.type}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Manufacturing Date</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(
                    result.asset.manufacturingDate
                  ).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Last Transfer</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(result.asset.lastTransfer).toLocaleDateString()}
                </p>
              </div>
            </div>

            <Separator />

            <div>
              <p className="text-sm font-medium mb-2">Properties</p>
              <div className="space-y-2">
                {Object.entries(result.asset.properties).map(([key, value]) => (
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

      <div className="flex gap-4">
        <Button className="flex-1" asChild>
          <Link href={`/asset/${result.asset.id}`}>
            View Full Details
            <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => window.print()}
        >
          Download Report
        </Button>
      </div>
    </div>
  );
}
