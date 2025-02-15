"use client";
import { redirect } from "next/navigation";
import React from "react";
import { useActiveAccount, ConnectButton } from "thirdweb/react";
import { Shield } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { chain, client } from "@/lib/client";
export default function SignIn() {
  const account = useActiveAccount();

  if (!account) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-b from-background to-muted relative overflow-hidden">
        {/* Header */}
        <header className="relative z-10 px-4 lg:px-6 h-14 flex items-center border-b bg-background/50 backdrop-blur-sm">
          <Link className="flex items-center justify-center" href="/">
            <Shield className="h-6 w-6" />
            <span className="ml-2 text-xl font-bold">TrustChain</span>
          </Link>
        </header>

        {/* Main content */}
        <main className="relative z-10 container max-w-screen-xl mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)]">
          <div className="w-full max-w-md mx-auto space-y-8 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Welcome to TrustChain
              </h1>
              <p className="text-muted-foreground md:text-lg">
                Connect your wallet or create account to start managing your
                products on the blockchain
              </p>
            </div>

            <div className="space-y-4 bg-card p-6 rounded-lg border shadow-lg backdrop-blur-sm">
              <ConnectButton
                client={client}
                chain={chain}
                appMetadata={{
                  name: "Example App",
                  url: "https://example.com",
                }}
              />
              <p className="text-sm text-muted-foreground">
                By connecting your wallet, you agree to our{" "}
                <Link
                  href="#"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="#"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Privacy Policy
                </Link>
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                New to blockchain?
              </p>
              <Button variant="link" asChild>
                <Link href="https://support.metamask.io/start/getting-started-with-metamask/">
                  Learn how to create a wallet
                </Link>
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  redirect("/dashboard");
}
