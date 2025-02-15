import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function WhyBlockchain() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 md:pl-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Why Choose Blockchain?
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl">
              TrustChain leverages blockchain technology to provide unmatched
              security and transparency
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Immutable Records</CardTitle>
              <CardDescription>
                Once recorded on the blockchain, product information cannot be
                altered or tampered with
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Permanent digital records</li>
                <li>Tamper-proof history</li>
                <li>Verifiable authenticity</li>
                <li>Secure data storage</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Decentralized Trust</CardTitle>
              <CardDescription>
                No single point of control means greater security and
                reliability
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Distributed verification</li>
                <li>No central authority</li>
                <li>Consensus-based validation</li>
                <li>Enhanced security</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Cost Effective</CardTitle>
              <CardDescription>
                Reduce costs associated with fraud, verification, and supply
                chain management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Lower verification costs</li>
                <li>Reduced fraud expenses</li>
                <li>Automated compliance</li>
                <li>Efficient processes</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Easy Integration</CardTitle>
              <CardDescription>
                Simple integration with existing systems and processes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>API-first approach</li>
                <li>Flexible implementation</li>
                <li>Scalable solution</li>
                <li>Quick deployment</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

