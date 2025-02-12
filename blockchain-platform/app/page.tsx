import {
  ArrowRight,
  BarChart2,
  Building2,
  CheckCircle,
  Globe2,
  Lock,
  Shield,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LandingPage() {
  return (
    <div className="container m-auto flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background pb-16 pt-24 md:pb-24 md:pt-32 lg:pb-32 lg:pt-40">
        <div className="container relative z-10">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Secure Digital Asset Management on the{" "}
                  <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    Blockchain
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground md:text-xl">
                  Track, transfer, and manage your digital assets with complete
                  transparency and security. Built for enterprises and
                  individuals alike.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button size="lg" asChild>
                  <Link href="/login">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg">
                  Watch Demo
                </Button>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Enterprise Ready</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>ISO 27001 Certified</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 blur-3xl" />
              <div className="relative aspect-square overflow-hidden rounded-lg border bg-background/50 shadow-xl">
                <Image
                  src="/placeholder.svg"
                  alt="Platform Dashboard"
                  width={600}
                  height={600}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-[url(/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </section>

      {/* Stats Section */}
      <section className="border-t bg-secondary/10">
        <div className="container py-12 md:py-16 lg:py-20">
          <div className="grid gap-8 text-center sm:grid-cols-2 md:grid-cols-4">
            <div className="space-y-2">
              <h3 className="text-4xl font-bold">100K+</h3>
              <p className="text-sm text-muted-foreground">Assets Registered</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-bold">50+</h3>
              <p className="text-sm text-muted-foreground">
                Enterprise Clients
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-bold">1M+</h3>
              <p className="text-sm text-muted-foreground">Transactions</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-bold">99.9%</h3>
              <p className="text-sm text-muted-foreground">Uptime</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container space-y-12 py-16 md:py-24">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Everything you need to manage digital assets
          </h2>
          <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground">
            Our platform provides comprehensive tools for asset registration,
            tracking, and transfer with enterprise-grade security and
            scalability.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <Shield className="h-10 w-10 text-primary" />
              <CardTitle>Enterprise Security</CardTitle>
              <CardDescription>
                Bank-grade security with multi-signature support and role-based
                access control.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-2 pl-4 text-sm text-muted-foreground">
                <li>Multi-factor authentication</li>
                <li>Hardware security module support</li>
                <li>Regular security audits</li>
                <li>Encrypted data storage</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Globe2 className="h-10 w-10 text-primary" />
              <CardTitle>Global Compliance</CardTitle>
              <CardDescription>
                Stay compliant with regulatory requirements across different
                jurisdictions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-2 pl-4 text-sm text-muted-foreground">
                <li>GDPR compliance</li>
                <li>KYC/AML integration</li>
                <li>Audit trail and reporting</li>
                <li>Regulatory updates</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Zap className="h-10 w-10 text-primary" />
              <CardTitle>Real-time Updates</CardTitle>
              <CardDescription>
                Get instant notifications and updates on your asset transactions
                and changes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-2 pl-4 text-sm text-muted-foreground">
                <li>Push notifications</li>
                <li>Email alerts</li>
                <li>Webhook integration</li>
                <li>Activity dashboard</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Lock className="h-10 w-10 text-primary" />
              <CardTitle>Access Control</CardTitle>
              <CardDescription>
                Granular control over who can view, transfer, and manage assets.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-2 pl-4 text-sm text-muted-foreground">
                <li>Role-based access</li>
                <li>Custom permissions</li>
                <li>Activity logging</li>
                <li>User management</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Building2 className="h-10 w-10 text-primary" />
              <CardTitle>Enterprise Integration</CardTitle>
              <CardDescription>
                Seamlessly integrate with your existing enterprise systems and
                workflows.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-2 pl-4 text-sm text-muted-foreground">
                <li>API access</li>
                <li>SSO integration</li>
                <li>Custom workflows</li>
                <li>Data migration tools</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <BarChart2 className="h-10 w-10 text-primary" />
              <CardTitle>Analytics & Reporting</CardTitle>
              <CardDescription>
                Comprehensive analytics and reporting tools for better decision
                making.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-2 pl-4 text-sm text-muted-foreground">
                <li>Custom reports</li>
                <li>Data visualization</li>
                <li>Export capabilities</li>
                <li>Trend analysis</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="border-t bg-secondary/10">
        <div className="container py-16 md:py-24">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Trusted by Industry Leaders
            </h2>
            <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground">
              See what our enterprise clients have to say about our platform.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                quote:
                  "The platform has revolutionized how we manage our digital assets. The security features and ease of use are unmatched.",
                author: "Sarah Chen",
                role: "CTO, TechCorp Global",
              },
              {
                quote:
                  "Implementation was smooth and the support team was exceptional. We've seen significant improvements in our asset tracking efficiency.",
                author: "Michael Rodriguez",
                role: "Head of Operations, LogiTech Solutions",
              },
              {
                quote:
                  "The analytics and reporting capabilities have given us valuable insights into our asset utilization and transfer patterns.",
                author: "Emma Thompson",
                role: "Director of Finance, Enterprise Co.",
              },
            ].map((testimonial, i) => (
              <Card key={i} className="relative overflow-hidden">
                <CardContent className="mt-6 space-y-4">
                  <p className="text-muted-foreground">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t">
        <div className="container py-16 md:py-24">
          <div className="relative overflow-hidden rounded-lg bg-primary p-8 md:p-12">
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
                Ready to get started?
              </h2>
              <p className="mt-4 text-lg text-primary-foreground/90">
                Join thousands of organizations already using our platform to
                manage their digital assets.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/dashboard">Get Started</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/20 text-primary-foreground"
                >
                  Contact Sales
                </Button>
              </div>
            </div>
            <div className="absolute inset-0 bg-[url(/grid.svg)] bg-center opacity-10" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-secondary/10">
        <div className="container py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Features</li>
                <li>Security</li>
                <li>Enterprise</li>
                <li>Pricing</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>About</li>
                <li>Careers</li>
                <li>Blog</li>
                <li>Press</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Documentation</li>
                <li>API Reference</li>
                <li>Support</li>
                <li>Status</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Privacy</li>
                <li>Terms</li>
                <li>Security</li>
                <li>Compliance</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Asset Management Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
