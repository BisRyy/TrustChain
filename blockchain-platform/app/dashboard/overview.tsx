"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Box, ArrowUpRight, BarChart3, CircleDollarSign } from "lucide-react";
import React from "react";
import { RecentTransactions } from "../recent-transactions";
import { useContractEvents } from "thirdweb/react";
import { contract } from "@/lib/client";
import { prepareEvent } from "thirdweb";
import Link from "next/link";

export default function Overview() {
  const preparedEvent = prepareEvent({
    signature:
      "event AssetActivity(uint256 indexed assetId, address indexed actor, string transactionType, string data)",
  });

  const { data: event } = useContractEvents({
    contract: contract,
    events: [preparedEvent],
  });

  console.log(event, "event");

  return (
    <div className="space-y-4">
      {/* <div>
        {event ? (
          <div>
            <p>Recent Activity</p>
            <div>
              {event.map((e) => (
                <div key={e.address}>
                  <p>Address - {e.address}</p>
                  <p>
                    Asset #{e.args.assetId.toString()} -{" "}
                    {e.args.transactionType}
                  </p>
                  <p>Actor - {e.args.actor}</p>
                  <p>AssetId - {Number(e.args.assetId)}</p>
                  <p>Data - {e.args.data}</p>
                  <p>Hash - {e.transactionHash}</p>
                  <p>Index - {e.transactionIndex}</p>
                  ------------------------------
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>No recent activity</p>
        )}
      </div> */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
            <Box className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,284</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Transfers
            </CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              +12 pending approval
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Transaction Volume
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <p className="text-xs text-muted-foreground">+201 this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Value Locked
            </CardTitle>
            <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12.4M</div>
            <p className="text-xs text-muted-foreground">
              +7.4% from last month
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your asset activity across all registered products
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentTransactions />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Latest Assets</CardTitle>
            <CardDescription>
              Recently registered or updated assets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {[1, 2, 3].map((i) => (
                <div className="flex items-center" key={i}>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Asset #{String(i).padStart(4, "0")}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Updated 2 hours ago
                    </p>
                  </div>
                  <div className="ml-auto font-medium">
                    <Link
                      href={`/asset/000${i}`}
                      className="flex items-center text-blue-600"
                    >
                      View Details
                      <ArrowUpRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
