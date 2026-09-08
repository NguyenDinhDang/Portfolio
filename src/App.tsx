import { useRef, useState } from 'react';
import { useTheme } from './hooks/useTheme';
import { Header } from './components/Header';
import { Nav } from './components/Nav';
import { LogoCarousel } from './components/LogoCarousel';
import { WorkSection } from './components/WorkSection';
import { BlogSection } from './components/BlogSection';
import { SkillsSection } from './components/SkillsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const menuBtnRef = useRef<HTMLButtonElement | null>(null);

  const handleToggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };

  const handleCloseNav = () => {
    setIsNavOpen(false);
  };

  return (
    <div className="min-h-screen bg-bg-primary text-body font-sans transition-colors duration-300">
      {/* Navigation overlay */}
      <Nav
        isOpen={isNavOpen}
        onClose={handleCloseNav}
        toggleBtnRef={menuBtnRef}
      />

      {/* Header hero */}
      <Header
        isNavOpen={isNavOpen}
        onToggleNav={handleToggleNav}
        menuBtnRef={menuBtnRef}
      />

      {/* Main content body with curved top overlap */}
      <main>
        {/* Logo Carousel - component có thể bật/tắt dễ dàng qua prop enabled */}
        <LogoCarousel enabled={true} />

        {/* Work projects section */}
        <WorkSection />

        {/* Blog and working experiences section */}
        <BlogSection />

        {/* Skills section */}
        <SkillsSection />

        {/* Testimonials section */}
        <TestimonialsSection />

        {/* Contact section */}
        <ContactSection />
      </main>

      {/* Footer section with theme toggle and copyright */}
      <Footer theme={theme} onToggleTheme={toggleTheme} />
    </div>
  );
}
