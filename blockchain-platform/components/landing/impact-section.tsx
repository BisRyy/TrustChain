"use client";

import { DollarSign, Package, ShieldX, TrendingDown } from "lucide-react";
import { useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Import Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export function ImpactSection() {
  const countUpRefs = {
    losses: useRef(null),
    jobs: useRef(null),
    health: useRef(null),
  };

  useEffect(() => {
    // Animate numbers on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            const value = Number.parseInt(
              target.getAttribute("data-value") || "0"
            );
            let current = 0;
            const increment = value / 50;
            const timer = setInterval(() => {
              current += increment;
              if (current >= value) {
                target.textContent = value.toLocaleString();
                clearInterval(timer);
              } else {
                target.textContent = Math.round(current).toLocaleString();
              }
            }, 20);
          }
        });
      },
      { threshold: 0.1 }
    );

    Object.values(countUpRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []); // Removed countUpRefs from dependencies

  // Chart data
  const economicImpactData = {
    labels: [
      "Electronics",
      "Pharmaceuticals",
      "Luxury Goods",
      "Automotive",
      "Food & Beverage",
    ],
    datasets: [
      {
        label: "Annual Losses (Billion USD)",
        data: [100, 200, 150, 80, 40],
        backgroundColor: "rgba(220, 38, 38, 0.5)",
        borderColor: "rgba(220, 38, 38, 1)",
        borderWidth: 1,
      },
    ],
  };

  const counterfeitDistributionData = {
    labels: ["Authentic Products", "Counterfeit Products"],
    datasets: [
      {
        data: [65, 35],
        backgroundColor: ["rgba(34, 197, 94, 0.5)", "rgba(220, 38, 38, 0.5)"],
        borderColor: ["rgba(34, 197, 94, 1)", "rgba(220, 38, 38, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-destructive/5  md:pl-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              The Cost of Counterfeiting
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl">
              Understanding the global impact of counterfeit products and
              illegal trade
            </p>
          </div>
        </div>

        <div className="grid gap-6 mt-8 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Annual Global Losses
              </CardTitle>
              <DollarSign className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                $
                <span ref={countUpRefs.losses} data-value="500">
                  0
                </span>
                B+
              </div>
              <p className="text-xs text-muted-foreground">
                Lost revenue due to counterfeit goods
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Jobs Lost</CardTitle>
              <TrendingDown className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <span ref={countUpRefs.jobs} data-value="2500000">
                  0
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Employment impact worldwide
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Health Incidents
              </CardTitle>
              <ShieldX className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <span ref={countUpRefs.health} data-value="1500000">
                  0
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Annual cases from fake products
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Seized Products
              </CardTitle>
              <Package className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47%</div>
              <p className="text-xs text-muted-foreground">
                Of global trade is counterfeit
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 mt-8 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Economic Impact by Industry</CardTitle>
              <CardDescription>
                Annual losses due to counterfeit products (Billion USD)
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <Bar
                data={economicImpactData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Global Trade Distribution</CardTitle>
              <CardDescription>
                Proportion of authentic vs counterfeit products
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex items-center justify-center">
                <div className="w-[300px]">
                  <Doughnut
                    data={counterfeitDistributionData}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: "bottom",
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 space-y-4 text-center">
          <h3 className="text-2xl font-bold">How TrustChain Helps</h3>
          <p className="mx-auto max-w-[600px] text-muted-foreground">
            Our blockchain-based solution provides end-to-end product
            verification and tracking, helping to eliminate counterfeits and
            protect businesses and consumers alike.
          </p>
        </div>
      </div>
    </section>
  );
}
