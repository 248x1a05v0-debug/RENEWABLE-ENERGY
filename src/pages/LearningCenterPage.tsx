import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useAppContext } from '../hooks/useAppContext';
import { RENEWABLE_SOURCES } from '../data/learningData';
import { t } from '../data/translations';
import { ImageWithFallback } from '../components/ImageWithFallback';

export function LearningCenterPage() {
  const { language } = useAppContext();
  const [selectedId, setSelectedId] = useState<string>(RENEWABLE_SOURCES[0].id);

  const activeSource =
    RENEWABLE_SOURCES.find((s) => s.id === selectedId) || RENEWABLE_SOURCES[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Banner */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-6 flex flex-col justify-center space-y-4">
          <p className="text-xs font-semibold text-emerald-700">
            {language === 'te' ? 'సంపూర్ణ అభ్యాస కేంద్రం' : '8 Clean Energy Technologies'}
          </p>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-emerald-950">
            {language === 'te'
              ? 'పునరుత్పాదక శక్తి అభ్యాస కేంద్రం'
              : 'Renewable Energy Learning Center'}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {language === 'te'
              ? 'సౌర, పవన, జల, బయోమాస్, భూతాప, ఆటుపోట్ల, తరంగ మరియు హైడ్రోజన్ శక్తి వనరుల నిర్వచనం, పనితీరు, ప్రయోజనాలు మరియు ఉపయోగాలను వివరంగా తెలుసుకోండి.'
              : 'Explore all eight major renewable energy technologies—how each works, real-world applications, environmental benefits, and local relevance to Andhra Pradesh.'}
          </p>
        </div>

        <div className="lg:col-span-6 min-h-[220px] rounded-2xl overflow-hidden border border-slate-200">
          <ImageWithFallback
            src="/src/assets/images/renewable_learning_landscape_1794934117474.jpg"
            alt="Wind turbines, river hydro corridor, and solar farm landscape"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Interactive 8-Source Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-3 space-y-1">
          {RENEWABLE_SOURCES.map((source) => {
            const isSelected = source.id === activeSource.id;
            return (
              <button
                key={source.id}
                type="button"
                onClick={() => setSelectedId(source.id)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                  isSelected
                    ? 'bg-emerald-800 text-white'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-emerald-900'
                }`}
              >
                {t(source.name, language)}
              </button>
            );
          })}
        </div>

        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-100 pb-4 space-y-2">
            <h2 className="text-2xl font-bold text-emerald-950">
              {t(activeSource.name, language)}
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {t(activeSource.definition, language)}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-bold text-sky-900">
              {language === 'te' ? 'ఇది ఎలా పనిచేస్తుంది?' : 'How It Works'}
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              {t(activeSource.howItWorks, language)}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-emerald-900">
                {language === 'te' ? 'ప్రధాన ప్రయోజనాలు' : 'Key Advantages'}
              </h3>
              <ul className="space-y-2 text-sm text-slate-700">
                {activeSource.advantages.map((adv, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>{t(adv, language)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-bold text-sky-900">
                {language === 'te' ? 'ముఖ్య ఉపయోగాలు' : 'Practical Applications'}
              </h3>
              <ul className="space-y-2 text-sm text-slate-700">
                {activeSource.applications.map((app, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                    <span>{t(app, language)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1">
              <h4 className="text-xs font-bold text-emerald-900">
                {language === 'te' ? 'పర్యావరణ ప్రయోజనం' : 'Environmental Benefits'}
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed">
                {t(activeSource.environmentalBenefits, language)}
              </p>
            </div>
            <div className="p-4 bg-sky-50/70 border border-sky-200 rounded-xl space-y-1">
              <h4 className="text-xs font-bold text-sky-900">
                {language === 'te' ? 'మన ప్రాంతానికి సంబంధం' : 'Andhra Pradesh / Local Context'}
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed">
                {t(activeSource.relevanceToGuntur, language)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
