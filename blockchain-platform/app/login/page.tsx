"use client";
import { chain, client } from "@/lib/client";
import { redirect } from "next/navigation";
import React from "react";
import { useActiveAccount, ConnectButton } from "thirdweb/react";

function SignIn() {
  return <div style={{ padding: "2rem" }}>Sign In Component</div>;
}

export default function AccountPage() {
  const account = useActiveAccount();

  if (!account) {
    return (
      <div className="flex justify-center h-screen items-center">
        <ConnectButton
          client={client}
          chain={chain}
          appMetadata={{
            name: "Example App",
            url: "https://example.com",
          }}
        />
      </div>
    );
  }

  redirect("/dashboard");
}
