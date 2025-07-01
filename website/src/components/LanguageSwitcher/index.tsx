import React from 'react';
import { useLanguage, Language } from '../../contexts/LanguageContext';
import './style.css';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = event.target.value as Language;
    setLanguage(newLanguage);
  };

  return (
    <div className="language-switcher">
      <span className="language-label">{t('language.switch')}</span>
      <div className="language-select-wrapper">
        <select className="language-select" value={language} onChange={handleLanguageChange} aria-label="Select Language">
          <option value="zh">🇨🇳 {t('language.chinese')}</option>
          <option value="en">🇺🇸 {t('language.english')}</option>
        </select>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
