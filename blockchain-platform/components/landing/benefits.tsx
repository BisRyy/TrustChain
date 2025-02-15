import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Benefits() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 md:pl-16" id="benefits">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Why Choose TrustChain
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl">
              Benefits for producers, retailers, and consumers
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>For Producers</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Protect your brand from counterfeits</li>
                <li>Track product distribution</li>
                <li>Build consumer trust</li>
                <li>Manage product lifecycle</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>For Retailers</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Verify product authenticity</li>
                <li>Track inventory movement</li>
                <li>Ensure product quality</li>
                <li>Improve customer confidence</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>For Consumers</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Verify product authenticity</li>
                <li>Access product history</li>
                <li>Ensure product safety</li>
                <li>Make informed purchases</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
