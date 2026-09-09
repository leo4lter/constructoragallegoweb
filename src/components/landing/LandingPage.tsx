import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import About from '@/components/landing/About';
import WorkAreas from '@/components/landing/WorkAreas';
import Capacity from '@/components/landing/Capacity';
import Gallery from '@/components/landing/Gallery';
import Footer from '@/components/landing/Footer';

export default function LandingPage({ onGoAdmin }: { onGoAdmin?: () => void }) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar onGoAdmin={onGoAdmin} />
      <main>
        <Hero />
        <About />
        <WorkAreas />
        <Capacity />
        <Gallery />
      </main>
      <Footer onGoAdmin={onGoAdmin} />
    </div>
  );
}
