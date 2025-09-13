
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from '../i18n';

// Reusable component for scroll animations
interface AnimatedSectionProps {
  children: React.ReactNode;
  id: string;
  className?: string;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, id, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      id={id} 
      ref={sectionRef} 
      className={`py-20 md:py-28 px-6 container mx-auto overflow-hidden ${className} ${isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'}`}
    >
      {children}
    </section>
  );
};


// Hero Section
export const HeroSection: React.FC = () => {
    const { t } = useTranslation();
    return (
        <AnimatedSection id="home" className="pt-24 md:pt-32">
            <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
                <h1 
                    className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 text-gray-900 dark:text-white leading-tight"
                    dangerouslySetInnerHTML={{ __html: t('hero.title') }}
                />
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
                    {t('hero.subtitle')}
                </p>
                <div className="flex justify-center md:justify-start space-x-4">
                <a href="#contact" className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 duration-300">
                    {t('hero.cta')}
                </a>
                </div>
            </div>
            <div className="flex justify-center">
                <img 
                src="https://picsum.photos/350/700?random=1" 
                alt="Capture d'écran de l'application mobile" 
                className="rounded-3xl shadow-2xl max-w-xs w-full object-cover transform transition-transform duration-500 hover:scale-105"
                />
            </div>
            </div>
        </AnimatedSection>
    );
};

// Vision Section
export const VisionSection: React.FC = () => {
    const { t } = useTranslation();
    return (
        <AnimatedSection id="vision" className="bg-gray-50 dark:bg-gray-800/50">
            <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('vision.title')}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
                {t('vision.subtitle')}
            </p>
            <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg transform transition-transform duration-300 hover:-translate-y-2">
                <h3 className="text-2xl font-semibold mb-3 text-indigo-600 dark:text-indigo-400">{t('vision.phase1.title')}</h3>
                <p className="text-gray-600 dark:text-gray-400">{t('vision.phase1.description')}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg transform transition-transform duration-300 hover:-translate-y-2">
                <h3 className="text-2xl font-semibold mb-3 text-indigo-600 dark:text-indigo-400">{t('vision.phase2.title')}</h3>
                <p className="text-gray-600 dark:text-gray-400">{t('vision.phase2.description')}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg transform transition-transform duration-300 hover:-translate-y-2">
                <h3 className="text-2xl font-semibold mb-3 text-indigo-600 dark:text-indigo-400">{t('vision.phase3.title')}</h3>
                <p className="text-gray-600 dark:text-gray-400">{t('vision.phase3.description')}</p>
                </div>
            </div>
            </div>
        </AnimatedSection>
    );
};

// Contact Section
export const ContactSection: React.FC = () => {
    const { t } = useTranslation();
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(t('contact.form.successAlert'));
    };

    return (
        <AnimatedSection id="contact">
            <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('contact.title')}</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">
                    {t('contact.subtitle')}
                </p>
            </div>
            <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('contact.form.name.label')}</label>
                        <input type="text" id="name" name="name" required className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow" placeholder={t('contact.form.name.placeholder')} />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('contact.form.email.label')}</label>
                        <input type="email" id="email" name="email" required className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow" placeholder={t('contact.form.email.placeholder')} />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('contact.form.message.label')}</label>
                        <textarea id="message" name="message" rows={4} required className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow" placeholder={t('contact.form.message.placeholder')}></textarea>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="w-full md:w-auto px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 duration-300">
                            {t('contact.form.submit')}
                        </button>
                    </div>
                </form>
            </div>
        </AnimatedSection>
    );
};

// Reusable Policy Section
interface PolicySectionProps {
    id: string;
    title: string;
    content: string;
}

export const PolicySection: React.FC<PolicySectionProps> = ({ id, title, content }) => (
    <AnimatedSection id={id} className="bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">{title}</h2>
            <div 
                className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300"
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </div>
    </AnimatedSection>
);
