
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import { HeroSection, VisionSection, ContactSection, PolicySection } from './components/sections';
import Footer from './components/Footer';
import { Theme } from './types';
import { useTranslation } from './i18n';

function App() {
  const { t } = useTranslation();
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen font-sans transition-colors duration-300">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main>
        <HeroSection />
        <VisionSection />
        <ContactSection />
        <PolicySection 
          id="terms"
          title={t('policy.terms.title')}
          content={t('policy.terms.content')}
        />
        <PolicySection 
          id="privacy"
          title={t('policy.privacy.title')}
          content={t('policy.privacy.content')}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
