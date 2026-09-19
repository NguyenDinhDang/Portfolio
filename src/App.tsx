import { useTheme } from './hooks/useTheme';
import { Header } from './components/Header';
import { LogoCarousel } from './components/LogoCarousel';
import { WorkSection } from './components/WorkSection';
import { BlogSection } from './components/BlogSection';
import { SkillsSection } from './components/SkillsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-bg-primary text-body font-sans transition-colors duration-300">
      {/* Header hero with integrated navbar */}
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
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

      {/* Footer section */}
      <Footer theme={theme} onToggleTheme={toggleTheme} />
    </div>
  );
}
