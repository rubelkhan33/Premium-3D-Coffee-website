import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { GrainOverlay } from './components/common/GrainOverlay';
import { CustomCursor } from './components/common/CustomCursor';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { OrderModal } from './components/common/OrderModal';
import { HeroSection } from './components/sections/HeroSection';
import { CraftSection } from './components/sections/CraftSection';
import { BeansSection } from './components/sections/BeansSection';
import { MenuSection } from './components/sections/MenuSection';
import { SignatureSection } from './components/sections/SignatureSection';
import { BeanToCupSection } from './components/sections/BeanToCupSection';
import { AtmosphereSection } from './components/sections/AtmosphereSection';
import { StorySection } from './components/sections/StorySection';
import { TestimonialsSection } from './components/sections/TestimonialsSection';
import { LocationSection } from './components/sections/LocationSection';
import { MenuItem } from './types';
import { MENU_ITEMS } from './data/coffeeContent';

export const App: React.FC = () => {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedOrderItem, setSelectedOrderItem] = useState<MenuItem | null>(null);

  // Pointer position for hero 3D cup and scenes (-1 to 1 normalized)
  const [pointerPos, setPointerPos] = useState({ x: 0, y: 0 });
  const [scrollYProgress, setScrollYProgress] = useState(0);

  // Initialize Lenis kinetic smooth scrolling
  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    const animId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animId);
      lenis.destroy();
    };
  }, []);

  // Global pointer move listener
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      setPointerPos({ x: nx, y: ny });
    };

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
      setScrollYProgress(progress);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleOpenOrder = (item?: MenuItem) => {
    setSelectedOrderItem(item || null);
    setIsOrderModalOpen(true);
  };

  const scrollTo = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-espresso-950 text-cream-100 selection:bg-amber-copper selection:text-espresso-950">
      {/* Analog film grain texture overlay */}
      <GrainOverlay />

      {/* Bespoke interactive desktop cursor */}
      <CustomCursor />

      {/* Sticky editorial navbar with sound toggle */}
      <Navbar onOpenOrder={() => handleOpenOrder()} />

      {/* Main Experience Layout */}
      <main>
        {/* 1. Hero Experience with 3D Ceramic Cup & Steam */}
        <HeroSection
          pointerPos={pointerPos}
          scrollYProgress={scrollYProgress}
          onExploreMenu={() => scrollTo('#menu')}
          onVisitCafe={() => scrollTo('#visit')}
        />

        {/* 2. The Craft (Good coffee takes time) */}
        <CraftSection />

        {/* 3. Interactive 3D Coffee Beans Field */}
        <BeansSection />

        {/* 4. Seasonal Coffee Menu */}
        <MenuSection onSelectItem={(item) => handleOpenOrder(item)} />

        {/* 5. Signature Drink 3D Experience */}
        <SignatureSection
          onOrderSignature={() => {
            const sig = MENU_ITEMS.find((m) => m.id === 'smoked-amber-tonic') || MENU_ITEMS[0];
            handleOpenOrder(sig);
          }}
        />

        {/* 6. From Bean to Cup (Horizontal Storytelling) */}
        <BeanToCupSection />

        {/* 7. Atmosphere & Tactile Sanctuary */}
        <AtmosphereSection />

        {/* 8. Our Story (Editorial Timeline) */}
        <StorySection />

        {/* 9. Voices & Testimonials */}
        <TestimonialsSection />

        {/* 10. Visit the Café & Location Map */}
        <LocationSection onOrderAhead={() => handleOpenOrder()} />
      </main>

      {/* 11. Minimal Luxury Footer */}
      <Footer />

      {/* Order Modal Drawer */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        initialItem={selectedOrderItem}
      />
    </div>
  );
};

export default App;
