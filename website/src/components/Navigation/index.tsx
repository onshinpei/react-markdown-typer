import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

// Navigation 组件
const Navigation: React.FC = () => {
  const { t } = useLanguage();

  const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string): void => {
    e.preventDefault();
    scrollToSection(sectionId);
  };

  return (
    <nav className="nav">
      <div className="container">
        <ul className="nav-list">
          <li>
            <a href="#installation" onClick={(e) => handleNavClick(e, 'installation')}>
              {t('nav.installation')}
            </a>
          </li>
          <li>
            <a href="#basic-usage" onClick={(e) => handleNavClick(e, 'basic-usage')}>
              {t('nav.basicUsage')}
            </a>
          </li>
          <li>
            <a href="#math-support" onClick={(e) => handleNavClick(e, 'math-support')}>
              {t('nav.mathSupport')}
            </a>
          </li>
          <li>
            <a href="#typing-animation" onClick={(e) => handleNavClick(e, 'typing-animation')}>
              {t('nav.typingAnimation')}
            </a>
          </li>
          <li>
            <a href="#themes" onClick={(e) => handleNavClick(e, 'themes')}>
              {t('nav.themes')}
            </a>
          </li>
          <li>
            <a href="#streaming" onClick={(e) => handleNavClick(e, 'streaming')}>
              {t('nav.streaming')}
            </a>
          </li>
          <li>
            <a href="#api" onClick={(e) => handleNavClick(e, 'api')}>
              {t('nav.api')}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
