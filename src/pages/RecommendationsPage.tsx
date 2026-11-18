import React, { useState } from 'react';
import { Building2, GraduationCap, Home, Tractor } from 'lucide-react';
import { useAppContext } from '../hooks/useAppContext';
import { CATEGORY_RECOMMENDATIONS } from '../data/learningData';
import { RecommendationCategory } from '../types/energy';
import { t } from '../data/translations';

const CATEGORIES: Array<{
  id: RecommendationCategory;
  label: { en: string; te: string };
  icon: React.ComponentType<{ className?: string }>;
}> = [
  { id: 'household', label: { en: 'Household', te: 'గృహ వినియోగం' }, icon: Home },
  { id: 'agriculture', label: { en: 'Agriculture', te: 'వ్యవసాయం' }, icon: Tractor },
  { id: 'school', label: { en: 'School', te: 'పాఠశాల' }, icon: GraduationCap },
  { id: 'business', label: { en: 'Small Business', te: 'చిన్న వ్యాపారం' }, icon: Building2 },
];

export function RecommendationsPage() {
  const { language, navigateTo } = useAppContext();
  const [selectedCategory, setSelectedCategory] =
    useState<RecommendationCategory>('household');

  const plan = CATEGORY_RECOMMENDATIONS[selectedCategory];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="space-y-2 max-w-3xl border-b border-slate-200 pb-6">
        <p className="text-xs font-semibold text-emerald-700">
          {language === 'te' ? 'వర్గాల వారీ కార్యాచరణ ప్రణాళిక' : 'Tailored Action Plans'}
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold text-emerald-950">
          {language === 'te'
            ? 'వ్యక్తిగత విద్యుత్ ఆదా సూచనలు'
            : 'Personalized Energy-Saving Recommendations'}
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          {language === 'te'
            ? 'మీ వర్గాన్ని ఎంచుకుని వెంటనే అమలు చేయగల విద్యుత్ ఆదా మరియు స్వచ్ఛమైన శక్తి చర్యలను చూడండి.'
            : 'Select your community category to receive practical electricity-saving and clean-energy actions suited to your daily operations.'}
        </p>
      </div>

      {/* Category Filter Selector */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`p-4 rounded-xl border text-left transition-colors flex items-center gap-3 ${
                isActive
                  ? 'bg-emerald-800 border-emerald-800 text-white'
                  : 'bg-white border-slate-200 text-slate-800 hover:border-emerald-700/40 hover:bg-emerald-50/40'
              }`}
            >
              <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-sky-200' : 'text-emerald-700'}`} />
              <span className="text-sm font-bold whitespace-nowrap">{t(cat.label, language)}</span>
            </button>
          );
        })}
      </div>

      {/* Active Category Banner */}
      <div className="bg-sky-50/70 border border-sky-200 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-2xl">
          <h2 className="text-xl sm:text-2xl font-bold text-emerald-950">
            {t(plan.title, language)}
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            {t(plan.summary, language)}
          </p>
        </div>
        <div className="bg-white border border-sky-200 rounded-xl px-5 py-3 shrink-0 self-start md:self-center">
          <p className="text-xs text-slate-500 font-medium">
            {language === 'te' ? 'అంచనా ఆదా సామర్థ్యం' : 'Estimated Reduction'}
          </p>
          <p className="text-base font-bold text-emerald-800 mt-0.5">
            {t(plan.potentialBillReduction, language)}
          </p>
        </div>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plan.items.map((item, idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="font-semibold text-sky-800">
                  {t(item.priority, language)}
                </span>
                <span className="font-mono-tabular font-semibold text-emerald-800">
                  {t(item.estimatedSaving, language)}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {t(item.title, language)}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t(item.action, language)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Next step CTA */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            {language === 'te'
              ? 'మీ ఖచ్చితమైన నెలవారీ ఆదాను లెక్కించాలనుకుంటున్నారా?'
              : 'Want to measure exact Rupee savings for your appliances?'}
          </h3>
          <p className="text-sm text-slate-600 mt-0.5">
            {language === 'te'
              ? 'మా స్మార్ట్ కాలిక్యులేటర్ లేదా సోలార్ అంచనా సాధనాన్ని ప్రయత్నించండి.'
              : 'Test your own appliance wattage and hours in the Smart Energy Calculator.'}
          </p>
        </div>
        <div className="flex flex-wrap gap-3 shrink-0">
          <button
            type="button"
            onClick={() => navigateTo('calculator')}
            className="px-4 py-2 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors"
          >
            {language === 'te' ? 'కాలిక్యులేటర్ తెరవండి' : 'Open Calculator'}
          </button>
          <button
            type="button"
            onClick={() => navigateTo('solar')}
            className="px-4 py-2 text-sm font-semibold text-emerald-900 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 rounded-lg transition-colors"
          >
            {language === 'te' ? 'సోలార్ గైడ్' : 'Solar Estimator'}
          </button>
        </div>
      </div>
    </div>
  );
}
