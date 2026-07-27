import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { Ticker } from "@/components/Ticker";
import { Services } from "@/components/Services";
import { Gallery } from "@/components/Gallery";
import { About } from "@/components/About";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { SiteFooter } from "@/components/SiteFooter";

function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:rounded-sm focus:bg-foreground focus:px-5 focus:py-3 focus:font-bold focus:text-background"
      >
        Skip to main content
      </a>

      <SiteHeader />

      <main id="main">
        <Hero />
        <Ticker />
        <Services />
        <Gallery />
        <About />
        <Testimonials />
        <Contact />
      </main>

      <SiteFooter />
    </>
  );
}

export default App;
