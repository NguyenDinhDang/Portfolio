import { useTheme } from './hooks/useTheme';
import { Header } from './components/Header';
import { TimelineSection } from './components/TimelineSection';
import { WorkSection } from './components/WorkSection';
import { BlogSection } from './components/BlogSection';
import { SkillsSection } from './components/SkillsSection';
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
        {/* Timeline học vấn & kinh nghiệm */}
        <TimelineSection />

        {/* Work projects section */}
        <WorkSection />

        {/* Blog and working experiences section */}
        <BlogSection />

        {/* Skills section */}
        <SkillsSection />


        {/* Contact section */}
        <ContactSection />
      </main>

      {/* Footer section */}
      <Footer />
    </div>
  );
}
