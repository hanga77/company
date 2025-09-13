
import React from 'react';
import { useTranslation } from '../i18n';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-6 py-8 text-center text-gray-600 dark:text-gray-400">
        <div className="mb-4">
          <a href="#terms" className="mx-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">{t('footer.terms')}</a>
          <span className="text-gray-400 dark:text-gray-600">|</span>
          <a href="#privacy" className="mx-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">{t('footer.privacy')}</a>
        </div>
        <p>{t('footer.copyright', { year: new Date().getFullYear(), companyName: t('companyName') })}</p>
        <p className="text-sm mt-2">{t('footer.disclaimer')}</p>
      </div>
    </footer>
  );
};

export default Footer;
