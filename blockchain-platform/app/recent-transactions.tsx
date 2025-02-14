"use client";
import { contract } from "@/lib/client";
import { formatAddress } from "@/lib/utils";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  LoaderCircleIcon,
  PlusCircle,
  SendIcon,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { prepareEvent } from "thirdweb";
import { useActiveAccount, useContractEvents } from "thirdweb/react";

export function RecentTransactions() {
  const account = useActiveAccount();

  const preparedEvent = prepareEvent({
    signature:
      "event AssetActivity(uint256 indexed assetId, address indexed actor, string transactionType, string data)",
  });

  const { data: event, isPending } = useContractEvents({
    contract: contract,
    events: [preparedEvent],
  });

  if (isPending) {
    return (
      <div className="flex items-center space-x-2">
        <Clock className="h-4 w-4" />
        <p>Loading recent transactions...</p>
      </div>
    );
  }

  if (!event || event.length < 1) {
    return <p>No recent transactions</p>;
  }

  return (
    <div className="space-y-8">
      {event
        .filter(
          (e) =>
            e.args.actor.toLocaleLowerCase().toString() ==
              account?.address.toLocaleLowerCase().toString() ||
            e.args.data.toLocaleLowerCase().toString() ==
              account?.address.toLocaleLowerCase().toString()
        )
        .map((tx) => (
          <div key={tx.address} className="flex items-center">
            <div
              className={`
            rounded-full p-2
            ${tx.args.transactionType === "CREATE" ? "bg-green-100" : ""}
            ${
              tx.args.transactionType === "PROPERTY_UPDATE"
                ? "bg-yellow-100"
                : ""
            }
            ${tx.args.transactionType === "TRANSFER" ? "bg-red-100" : ""}
          `}
            >
              {/* "CREATE", "TRANSFER", "PROPERTY_UPDATE" */}
              {tx.args.transactionType === "PROPERTY_UPDATE" ? (
                <LoaderCircleIcon className="h-4 w-4 text-yellow-600" />
              ) : tx.args.transactionType === "TRANSFER" ? (
                <SendIcon className="h-4 w-4 text-red-600" />
              ) : (
                <PlusCircle className="h-4 w-4 text-green-600" />
              )}
            </div>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                {tx.args.transactionType} - ASSET #00
                {tx.args.assetId.toString()}
              </p>
              {tx.args.transactionType === "TRANSFER" && (
                <p className="text-sm text-muted-foreground">
                  From: {formatAddress(tx.args.actor)}{" "}
                  {tx.data.toString() !== "N/A" &&
                    `→ To: ${formatAddress(tx.args.data.toString())}`}
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                {tx.transactionHash.toString()}
              </p>
            </div>
            <div className="ml-auto">
              <Link
                href={`https://sepolia.etherscan.io/tx/${tx.transactionHash}`}
                className="flex items-center text-blue-600"
                rel="noopener noreferrer"
                target="_blank"
              >
                View
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
}
