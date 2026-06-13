import { createFileRoute } from "@tanstack/react-router";
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
import { LoadingScreen } from "@/components/LoadingScreen";
import { SmoothScroll } from "@/components/SmoothScroll";
import { GoldenDust } from "@/components/GoldenDust";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vysai Digital Media — Building brands that demand attention" },
      {
        name: "description",
        content:
          "Vysai is an independent creative & growth studio crafting brand strategy, performance marketing, cinematic reels and editorial-grade websites.",
      },
      {
        property: "og:title",
        content: "Vysai Digital Media — Building brands that demand attention",
      },
      {
        property: "og:description",
        content:
          "Strategy. Creative. Advertising. Engineering. A studio built for the new shape of brands.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,300;1,9..144,400&family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen overflow-x-clip">
      <LoadingScreen />
      <SmoothScroll />
      <GoldenDust />
      <Navbar />
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
      <Footer />
    </main>
  );
}
