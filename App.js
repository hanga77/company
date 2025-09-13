
import React, { useState, useEffect } from 'react';
import Header from './components/Header.js';
import { HeroSection, VisionSection, ContactSection, PolicySection } from './components/sections.js';
import Footer from './components/Footer.js';
import { useTranslation } from './i18n.js';

function App() {
  const { t } = useTranslation();
  const [theme, setTheme] = useState('light');

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

  return React.createElement(
    'div',
    { className: 'bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen font-sans transition-colors duration-300' },
    React.createElement(Header, { theme: theme, toggleTheme: toggleTheme }),
    React.createElement(
      'main',
      null,
      React.createElement(HeroSection, null),
      React.createElement(VisionSection, null),
      React.createElement(ContactSection, null),
      React.createElement(PolicySection, {
        id: 'terms',
        title: t('policy.terms.title'),
        content: t('policy.terms.content'),
      }),
      React.createElement(PolicySection, {
        id: 'privacy',
        title: t('policy.privacy.title'),
        content: t('policy.privacy.content'),
      })
    ),
    React.createElement(Footer, null)
  );
}

export default App;
