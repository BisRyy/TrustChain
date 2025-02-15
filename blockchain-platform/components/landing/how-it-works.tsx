import { CheckCircle, FileCheck, QrCode, Truck } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function HowItWorks() {
  return (
    <section
      className="w-full py-12 md:py-24 lg:py-32 md:pl-16"
      id="how-it-works"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              How TrustChain Works
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl">
              Simple steps to ensure product authenticity and traceability
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  1
                </span>
                <CardTitle>Register</CardTitle>
              </div>
              <CardDescription>
                Create digital identities for your products
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FileCheck className="h-16 w-16 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                Register your products with detailed information and
                specifications
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  2
                </span>
                <CardTitle>Track</CardTitle>
              </div>
              <CardDescription>
                Monitor product movement and transfers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Truck className="h-16 w-16 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                Track every transaction and transfer throughout the supply chain
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  3
                </span>
                <CardTitle>Verify</CardTitle>
              </div>
              <CardDescription>Authenticate products instantly</CardDescription>
            </CardHeader>
            <CardContent>
              <QrCode className="h-16 w-16 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                Scan QR codes or enter product IDs to verify authenticity
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  4
                </span>
                <CardTitle>Trust</CardTitle>
              </div>
              <CardDescription>Build consumer confidence</CardDescription>
            </CardHeader>
            <CardContent>
              <CheckCircle className="h-16 w-16 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                Provide transparency and build trust with verified product
                information
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
