import { TracingBeam } from "@/components/ui/tracing-beam";
import { Hero } from "@/components/sections/hero";
import { ClientsBar } from "@/components/sections/clients-bar";
import { ServicesOverview } from "@/components/sections/services-overview";
import { FeaturedWork } from "@/components/sections/featured-work";
import { CTASection } from "@/components/sections/cta-section";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <TracingBeam>
        <ClientsBar />
        <ServicesOverview />
        <FeaturedWork />
        <CTASection />
      </TracingBeam>
      <Footer />
    </main>
  );
}
