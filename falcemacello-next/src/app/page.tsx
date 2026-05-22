import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { NewsTicker } from "@/components/ui/NewsTicker";

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-dark text-white selection:bg-brand-red selection:text-white">
      <Hero />
      <NewsTicker />
      <Manifesto />
      <About />
      <Contact />
    </main>
  );
}
