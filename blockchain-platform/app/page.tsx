import { Header } from "../components/landing/header";
import { Hero } from "../components/landing/hero";
import { ImpactSection } from "../components/landing/impact-section";
import { WhyBlockchain } from "../components/landing/why-blockchain";
import { Features } from "../components/landing/features";
import { HowItWorks } from "../components/landing/how-it-works";
import { Stats } from "../components/landing/stats";
import { Benefits } from "../components/landing/benefits";
import { CTA } from "../components/landing/cta";
import { Footer } from "../components/landing/footer";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="max-w-full">
        <Hero />
        <ImpactSection />
        <WhyBlockchain />
        <Features />
        <HowItWorks />
        {/* <Stats /> */}
        <Benefits />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
