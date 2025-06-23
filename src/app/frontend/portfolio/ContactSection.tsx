'use client';

import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const ContactSection: React.FC = () => {
  const { t } = useLanguage();
  const contactItems = [
    { title: 'Email', link: 'mailto:florent.tapponnier@gmail.com', text: t('contact.email') },
    { title: 'GitHub', link: 'https://github.com/Flotapponnier/', text: '@Flotapponnier' },
    { title: 'LinkedIn', link: 'https://www.linkedin.com/in/florent-tapponnier-26324a17a/', text: 'Florent Tapponnier' },
    { title: 'Twitter', link: 'https://x.com/FlorentTppnr', text: '@FlorentTppnr' },
  ];

  return (
    <section id="contact">
      <h2>{t('contact.title')}</h2>
      <div className="contact-grid">
        {contactItems.map((item) => (
          <div key={item.title} className="contact-item">
            <h3>{item.title}</h3>
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              {item.text}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContactSection;