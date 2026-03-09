import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import About from "../../components/About";
import Experience from "../../components/Experience";
import Projects from "../../components/Projects";
import Skills from "../../components/Skills";
import Contact from "../../components/Contact";

export default function Home() {
  return (
    <div className="min-h-screen text-white">
      <Navbar />
      <main>
        <Hero />
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="h-px w-full bg-white/10" />
        </div>
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}
