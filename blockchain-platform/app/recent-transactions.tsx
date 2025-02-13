"use client";
import { contract } from "@/lib/client";
import { ArrowUpRight, CheckCircle2, Clock, XCircle } from "lucide-react";
import Link from "next/link";
import { prepareEvent } from "thirdweb";
import { useContractEvents } from "thirdweb/react";

export function RecentTransactions() {
  const preparedEvent = prepareEvent({
    signature:
      "event AssetActivity(uint256 indexed assetId, address indexed actor, string transactionType, string data)",
  });

  const { data: event } = useContractEvents({
    contract: contract,
    events: [preparedEvent],
  });

  if (!event || event.length < 1) {
    return <p>No recent transactions</p>;
  }

  const transactions = [
    {
      id: event[0].address,
      transaction: event[0].transactionHash,
      type: event[0].args.transactionType,
      asset: `Asset #${event[0].args.assetId.toString()}`,
      from: event[0].args.actor,
      to: event[0].args.data,
      status: "Completed",
      timestamp: "10 minutes ago",
    },
    {
      id: "tx2",
      type: "Update",
      asset: "Asset #0002",
      from: "Quality Control",
      to: "N/A",
      status: "Pending",
      timestamp: "25 minutes ago",
    },
    {
      id: "tx3",
      type: "Transfer",
      asset: "Asset #0003",
      from: "Warehouse A",
      to: "Warehouse B",
      status: "Failed",
      timestamp: "1 hour ago",
    },
  ];

  return (
    <div className="space-y-8">
      {transactions.map((tx) => (
        <div key={tx.id} className="flex items-center">
          <div
            className={`
            rounded-full p-2
            ${tx.status === "Completed" ? "bg-green-100" : ""}
            ${tx.status === "Pending" ? "bg-yellow-100" : ""}
            ${tx.status === "Failed" ? "bg-red-100" : ""}
          `}
          >
            {tx.status === "Completed" && (
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            )}
            {tx.status === "Pending" && (
              <Clock className="h-4 w-4 text-yellow-600" />
            )}
            {tx.status === "Failed" && (
              <XCircle className="h-4 w-4 text-red-600" />
            )}
          </div>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {tx.type} - {tx.asset}
            </p>
            {tx.type === "Transfer" && (
              <p className="text-sm text-muted-foreground">
                From: {tx.from} {tx.to !== "N/A" && `→ To: ${tx.to}`}
              </p>
            )}
            <p className="text-xs text-muted-foreground">{tx.timestamp}</p>
          </div>
          <div className="ml-auto">
            <Link
              href={`https://sepolia.etherscan.io/tx/${tx.transaction}`}
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
