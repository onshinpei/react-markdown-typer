import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ApiTable, RefMethodTable, ComparisonTable, FormulaTypeTable, CodeExample, BestPracticesList, PluginSection } from './components';

// 动态导入数据
import * as apiDataZh from './apiDataZh';
import * as apiDataEn from './apiDataEn';

// API文档组件
const ApiDocumentation: React.FC = () => {
  const { language, t } = useLanguage();

  // 根据语言选择对应的数据
  const apiData = language === 'zh' ? apiDataZh : apiDataEn;

  return (
    <section id="api" className="section">
      <h2>{t('api.title')}</h2>

      {/* Props 属性 */}
      <ApiTable data={apiData.propsData} title={t('api.props')} />

      {/* Ref 方法 */}
      <RefMethodTable data={apiData.dsMarkdownMethods} title={t('api.dsMarkdownMethods')} />
      <RefMethodTable data={apiData.markdownCMDMethods} title={t('api.markdownCMDMethods')} />

      {/* 类型定义 */}
      <h3>{t('api.typeDefinitions')}</h3>
      <ApiTable data={apiData.iTypedCharData} title="ITypedChar" />
      <ApiTable data={apiData.iBeforeTypedCharData} title="IBeforeTypedChar" />
      <ApiTable data={apiData.iMarkdownMathData} title="IMarkdownMath" />
      <ApiTable data={apiData.iMarkdownPluginData} title="IMarkdownPlugin" />

      {/* 定时器模式对比 */}
      <ComparisonTable data={apiData.timerComparisonData} title={t('api.timerComparison')} />

      {/* 数学公式分隔符说明 */}
      <FormulaTypeTable data={apiData.formulaTypesData} title={t('api.formulaDelimiters')} />

      {/* 最佳实践建议 */}
      <BestPracticesList practices={apiData.bestPractices} title={t('api.bestPractices')} />
    </section>
  );
};

export default ApiDocumentation;
