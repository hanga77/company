
import React from 'react';
import { useTranslation } from '../i18n.js';

const Footer = () => {
  const { t } = useTranslation();

  return React.createElement(
    'footer',
    { className: 'bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700' },
    React.createElement(
      'div',
      { className: 'container mx-auto px-6 py-8 text-center text-gray-600 dark:text-gray-400' },
      React.createElement(
        'div',
        { className: 'mb-4' },
        React.createElement('a', { href: '#terms', className: 'mx-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200' }, t('footer.terms')),
        React.createElement('span', { className: 'text-gray-400 dark:text-gray-600' }, '|'),
        React.createElement('a', { href: '#privacy', className: 'mx-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200' }, t('footer.privacy'))
      ),
      React.createElement('p', null, t('footer.copyright', { year: new Date().getFullYear(), companyName: t('companyName') })),
      React.createElement('p', { className: 'text-sm mt-2' }, t('footer.disclaimer'))
    )
  );
};

export default Footer;
