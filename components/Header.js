
import React, { useState } from 'react';
import { useTranslation } from '../i18n.js';

const SunIcon = () => React.createElement(
    "svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
    React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" })
);

const MoonIcon = () => React.createElement(
    "svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
    React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" })
);

const LanguageSwitcher = () => {
    const { locale, setLocale } = useTranslation();

    const handleLocaleChange = (newLocale) => {
        setLocale(newLocale);
    };

    return React.createElement(
        "div", { className: "flex items-center border border-gray-200 dark:border-gray-700 rounded-full" },
        React.createElement(
            "button", { onClick: () => handleLocaleChange('fr'), className: `px-3 py-1 text-sm font-semibold rounded-full transition-colors duration-200 ${locale === 'fr' ? 'bg-indigo-600 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`, "aria-pressed": locale === 'fr' },
            "FR"
        ),
        React.createElement(
            "button", { onClick: () => handleLocaleChange('en'), className: `px-3 py-1 text-sm font-semibold rounded-full transition-colors duration-200 ${locale === 'en' ? 'bg-indigo-600 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`, "aria-pressed": locale === 'en' },
            "EN"
        )
    );
};

const Header = ({ theme, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();

  const navLinks = [
    { href: '#home', label: t('header.home') },
    { href: '#vision', label: t('header.vision') },
    { href: '#contact', label: t('header.contact') },
  ];

  const handleNavClick = (event) => {
    event.preventDefault();
    const href = event.currentTarget.getAttribute('href');
    if (!href) return;
    
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const headerElement = document.querySelector('header');
      const headerHeight = headerElement ? headerElement.offsetHeight : 72; 
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleMobileLinkClick = (event) => {
    handleNavClick(event);
    setIsMenuOpen(false);
  };

  return React.createElement(
    "header", { className: "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50 shadow-md dark:shadow-gray-800 transition-colors duration-300" },
    React.createElement(
      "div", { className: "container mx-auto px-6 py-4 flex justify-between items-center" },
      React.createElement(
        "a", { href: "#home", onClick: handleNavClick, className: "text-2xl font-bold text-indigo-600 dark:text-indigo-400 cursor-pointer" },
        t('header.logo')
      ),
      React.createElement(
        "nav", { className: "hidden md:flex items-center space-x-6" },
        ...navLinks.map((link) => React.createElement(
          "a", { key: link.href, href: link.href, onClick: handleNavClick, className: "text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 font-medium cursor-pointer" },
          link.label
        )),
        React.createElement("div", { className: "w-px h-6 bg-gray-200 dark:bg-gray-700" }),
        React.createElement(LanguageSwitcher, null),
        React.createElement(
          "button", { onClick: toggleTheme, "aria-label": "Changer de thème", className: "p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200" },
          theme === 'light' ? React.createElement(MoonIcon, null) : React.createElement(SunIcon, null)
        )
      ),
      React.createElement(
        "div", { className: "md:hidden flex items-center space-x-2" },
        React.createElement(LanguageSwitcher, null),
        React.createElement(
          "button", { onClick: toggleTheme, "aria-label": "Changer de thème", className: "p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200" },
          theme === 'light' ? React.createElement(MoonIcon, null) : React.createElement(SunIcon, null)
        ),
        React.createElement(
          "button", { onClick: () => setIsMenuOpen(!isMenuOpen), className: "text-gray-600 dark:text-gray-300 focus:outline-none", "aria-label": "Ouvrir le menu" },
          React.createElement(
            "svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7" })
          )
        )
      )
    ),
    isMenuOpen && React.createElement(
      "div", { className: "md:hidden bg-white dark:bg-gray-900" },
      React.createElement(
        "nav", { className: "px-6 pt-2 pb-4 flex flex-col space-y-2" },
        ...navLinks.map((link) => React.createElement(
          "a", { key: link.href, href: link.href, onClick: handleMobileLinkClick, className: "block py-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 font-medium cursor-pointer" },
          link.label
        ))
      )
    )
  );
};

export default Header;
