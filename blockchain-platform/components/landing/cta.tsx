import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { VerifyDialog } from "@/app/dashboard/verify-dialog";

export function CTA() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-primary md:pl-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center text-primary-foreground">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Ready to Get Started?
            </h2>
            <p className="mx-auto max-w-[600px] text-primary-foreground/90 md:text-xl">
              Join TrustChain today and ensure the authenticity of your products
              with blockchain technology
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/login">
                Register as Producer
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <VerifyDialog />
          </div>
        </div>
      </div>
    </section>
  );
}
