
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from '../i18n.js';

const AnimatedSection = ({ children, id, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return React.createElement(
    'section',
    {
      id: id,
      ref: sectionRef,
      className: `py-20 md:py-28 px-6 container mx-auto overflow-hidden ${className} ${isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'}`,
    },
    children
  );
};

export const HeroSection = () => {
  const { t } = useTranslation();
  return React.createElement(
    AnimatedSection,
    { id: 'home', className: 'pt-24 md:pt-32' },
    React.createElement(
      'div',
      { className: 'grid md:grid-cols-2 gap-12 items-center' },
      React.createElement(
        'div',
        { className: 'text-center md:text-left' },
        React.createElement('h1', {
          className: 'text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 text-gray-900 dark:text-white leading-tight',
          dangerouslySetInnerHTML: { __html: t('hero.title') },
        }),
        React.createElement('p', { className: 'text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8' }, t('hero.subtitle')),
        React.createElement(
          'div',
          { className: 'flex justify-center md:justify-start space-x-4' },
          React.createElement(
            'a',
            { href: '#contact', className: 'px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 duration-300' },
            t('hero.cta')
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'flex justify-center' },
        React.createElement('img', {
          src: 'https://picsum.photos/350/700?random=1',
          alt: "Capture d'écran de l'application mobile",
          className: 'rounded-3xl shadow-2xl max-w-xs w-full object-cover transform transition-transform duration-500 hover:scale-105',
        })
      )
    )
  );
};

export const VisionSection = () => {
  const { t } = useTranslation();
  return React.createElement(
    AnimatedSection,
    { id: 'vision', className: 'bg-gray-50 dark:bg-gray-800/50' },
    React.createElement(
      'div',
      { className: 'text-center' },
      React.createElement('h2', { className: 'text-3xl md:text-4xl font-bold mb-4' }, t('vision.title')),
      React.createElement('p', { className: 'text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12' }, t('vision.subtitle')),
      React.createElement(
        'div',
        { className: 'grid md:grid-cols-3 gap-8' },
        React.createElement(
          'div',
          { className: 'bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg transform transition-transform duration-300 hover:-translate-y-2' },
          React.createElement('h3', { className: 'text-2xl font-semibold mb-3 text-indigo-600 dark:text-indigo-400' }, t('vision.phase1.title')),
          React.createElement('p', { className: 'text-gray-600 dark:text-gray-400' }, t('vision.phase1.description'))
        ),
        React.createElement(
          'div',
          { className: 'bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg transform transition-transform duration-300 hover:-translate-y-2' },
          React.createElement('h3', { className: 'text-2xl font-semibold mb-3 text-indigo-600 dark:text-indigo-400' }, t('vision.phase2.title')),
          React.createElement('p', { className: 'text-gray-600 dark:text-gray-400' }, t('vision.phase2.description'))
        ),
        React.createElement(
          'div',
          { className: 'bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg transform transition-transform duration-300 hover:-translate-y-2' },
          React.createElement('h3', { className: 'text-2xl font-semibold mb-3 text-indigo-600 dark:text-indigo-400' }, t('vision.phase3.title')),
          React.createElement('p', { className: 'text-gray-600 dark:text-gray-400' }, t('vision.phase3.description'))
        )
      )
    )
  );
};

export const ContactSection = () => {
  const { t } = useTranslation();
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(t('contact.form.successAlert'));
  };

  return React.createElement(
    AnimatedSection,
    { id: 'contact' },
    React.createElement(
      'div',
      { className: 'text-center' },
      React.createElement('h2', { className: 'text-3xl md:text-4xl font-bold mb-4' }, t('contact.title')),
      React.createElement('p', { className: 'text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12' }, t('contact.subtitle'))
    ),
    React.createElement(
      'div',
      { className: 'max-w-xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg' },
      React.createElement(
        'form',
        { onSubmit: handleSubmit, className: 'space-y-6' },
        React.createElement(
          'div',
          null,
          React.createElement('label', { htmlFor: 'name', className: 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1' }, t('contact.form.name.label')),
          React.createElement('input', { type: 'text', id: 'name', name: 'name', required: true, className: 'w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow', placeholder: t('contact.form.name.placeholder') })
        ),
        React.createElement(
          'div',
          null,
          React.createElement('label', { htmlFor: 'email', className: 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1' }, t('contact.form.email.label')),
          React.createElement('input', { type: 'email', id: 'email', name: 'email', required: true, className: 'w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow', placeholder: t('contact.form.email.placeholder') })
        ),
        React.createElement(
          'div',
          null,
          React.createElement('label', { htmlFor: 'message', className: 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1' }, t('contact.form.message.label')),
          React.createElement('textarea', { id: 'message', name: 'message', rows: 4, required: true, className: 'w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow', placeholder: t('contact.form.message.placeholder') })
        ),
        React.createElement(
          'div',
          { className: 'text-center' },
          React.createElement(
            'button',
            { type: 'submit', className: 'w-full md:w-auto px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 duration-300' },
            t('contact.form.submit')
          )
        )
      )
    )
  );
};

export const PolicySection = ({ id, title, content }) =>
  React.createElement(
    AnimatedSection,
    { id: id, className: 'bg-gray-50 dark:bg-gray-800/50' },
    React.createElement(
      'div',
      { className: 'max-w-4xl mx-auto' },
      React.createElement('h2', { className: 'text-3xl md:text-4xl font-bold mb-8 text-center' }, title),
      React.createElement('div', {
        className: 'prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300',
        dangerouslySetInnerHTML: { __html: content },
      })
    )
  );
