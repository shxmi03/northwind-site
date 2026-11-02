import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { SocialProof } from "@/components/sections/SocialProof";
import { Features } from "@/components/sections/Features";
import { McpSection } from "@/components/sections/McpSection";
import { Explore } from "@/components/sections/Explore";
import { Brokers } from "@/components/sections/Brokers";
import { Pricing } from "@/components/sections/Pricing";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1">
        {/* 2 */} <Hero />
        {/* 3 */} <SocialProof />
        {/* 4 */} <Features />
        {/* 5 */} <McpSection />
        {/* 6 */} <Explore />
        {/* 7 */} <Brokers />
        {/* 8 */} <Pricing />
        {/* 9 */} <Faq />
        {/* 10 */} <FinalCta />
      </main>
      <Footer />
    </>
  );
}
