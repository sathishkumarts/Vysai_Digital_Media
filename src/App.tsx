import { Navbar } from "@/components/Navbar";
import { AntiGravityHero } from "@/components/AntiGravityHero";
import { Marquee } from "@/components/Marquee";
import { Portfolio } from "@/components/Portfolio";
import { PosterGallery } from "@/components/PosterGallery";
import { Reels } from "@/components/Reels";
import { StoryScroll } from "@/components/StoryScroll";
import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Packages } from "@/components/Packages";
import { LeadForm } from "@/components/LeadForm";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { LoadingScreen } from "@/components/LoadingScreen";
import { SmoothScroll } from "@/components/SmoothScroll";
import { GoldenDust } from "@/components/GoldenDust";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="relative min-h-screen overflow-x-clip">
        <LoadingScreen />
        <SmoothScroll />
        <GoldenDust />
        <AntiGravityHero />
        <Marquee />
        <Portfolio />
        <Reels />
        <PosterGallery />
        <StoryScroll />
        <Services />
        <Testimonials />
        <FAQ />
        <Packages />
        <LeadForm />
        <Footer />
        <WhatsAppFloat />
      </main>
    </>
  );
}
