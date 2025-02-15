import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { VerifyDialog } from "@/app/dashboard/verify-dialog";

export function Hero() {
  return (
    <section className="w-full py-12 md:py-16 bg-gradient-to-b from-background to-muted md:pl-16">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Blockchain Powered Product Authentication & Tracing
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Create digital identities for your products, track every
                transaction, and verify authenticity with blockchain technology.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" asChild>
                <Link href="/login">
                  Register Your Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <VerifyDialog />
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Image
              alt="Product Verification"
              className="aspect-auto overflow-hidden rounded-xl object-cover"
              height="400"
              src="/trustimage.png"
              width="600"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
