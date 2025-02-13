"use client";
import { chain, client } from "@/lib/client";
import React from "react";
import { useActiveAccount, ConnectButton, lightTheme } from "thirdweb/react";

function SignIn() {
  return <div style={{ padding: "2rem" }}>Sign In Component</div>;
}

export default function AccountPage() {
  const account = useActiveAccount();

  if (!account) {
    return (
      <div style={{ width: "100vw", height: "100vh" }}>
        <div className="flex justify-center">
          <ConnectButton
            client={client}
            chain={chain}
            appMetadata={{
              name: "Example App",
              url: "https://example.com",
            }}
            theme={lightTheme()}
            connectButton={{
              style: {
                backgroundColor: "transparent",
                color: "#fff",
              },
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>Account Page</h1>
    </div>
  );
}
