
'use client';

import { useLanguage } from '../context/LanguageContext';

export default function BottomBar() {
  const { t } = useLanguage();

  return (
    <div className="portfolio-container">
      <footer style={{
        textAlign: 'center',
        marginTop: '3rem',
        padding: '1rem',
        borderTop: 'var(--border)'
      }}>
        <p>{t('footer.copyright')}</p>
      </footer>
    </div>
  );
}
