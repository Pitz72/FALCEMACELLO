import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { NewsTicker } from "@/components/ui/NewsTicker";
import SEO from "@/components/ui/SEO";

export default function Home() {
  return (
    <>
      <SEO />
      <Hero />
      <NewsTicker />
      <Manifesto />
      <About />
      <Contact />
    </>
  );
}
