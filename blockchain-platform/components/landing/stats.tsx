import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function Stats() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted md:pl-16">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle>10M+</CardTitle>
              <CardDescription>Products Registered</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>1000+</CardTitle>
              <CardDescription>Active Producers</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>50M+</CardTitle>
              <CardDescription>Verifications</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>100K+</CardTitle>
              <CardDescription>Daily Transactions</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );
}
