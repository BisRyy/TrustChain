import { Box, Link2, Shield } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function Features() {
  return (
    <section
      className="w-full py-12 md:py-24 lg:py-32 bg-muted md:pl-16"
      id="features"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Platform Features
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl">
              Comprehensive blockchain solutions for product authentication and
              supply chain transparency
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <Box className="h-10 w-10 text-primary" />
              <CardTitle>Digital Product Identity</CardTitle>
              <CardDescription>
                Create immutable digital records for your products on the
                blockchain
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Unique blockchain identifiers</li>
                <li>Secure product information</li>
                <li>Customizable properties</li>
                <li>QR code generation</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Link2 className="h-10 w-10 text-primary" />
              <CardTitle>Transaction Tracking</CardTitle>
              <CardDescription>
                Monitor every movement and transfer in the supply chain
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Real-time tracking</li>
                <li>Transfer history</li>
                <li>Ownership verification</li>
                <li>Chain of custody</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Shield className="h-10 w-10 text-primary" />
              <CardTitle>Verification System</CardTitle>
              <CardDescription>
                Instant product authentication and origin verification
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>QR code scanning</li>
                <li>Origin verification</li>
                <li>Authenticity checks</li>
                <li>Status monitoring</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
