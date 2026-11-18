import React from 'react';
import { Database } from 'lucide-react';
import { useAppContext } from '../hooks/useAppContext';
import { NAV_LABELS, t } from '../data/translations';

export function Footer() {
  const { language, navigateTo, setIsFirebaseGuideOpen } = useAppContext();

  return (
    <footer className="bg-emerald-950 text-emerald-50 border-t border-emerald-900 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-3">
            <h2 className="text-lg font-extrabold tracking-tight text-white">
              GREENPOWER
            </h2>
            <p className="text-sm text-emerald-100/80 leading-relaxed max-w-sm">
              {language === 'te'
                ? 'కమ్యూనిటీ సర్వీస్ ప్రాజెక్ట్: పునరుత్పాదక శక్తి మరియు వనరులు – స్వచ్ఛమైన విద్యుత్, ఉజ్వల భవిష్యత్తు. శ్రీనివాసరావుపేట, గుంటూరు జిల్లా, ఆంధ్రప్రదేశ్.'
                : 'Community Service Project: Renewable Energy and Resources – Clean Power, Bright Future. Developed for Srinivasaraopeta, Guntur District, Andhra Pradesh.'}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white">
              {language === 'te' ? 'ముఖ్య విభాగాలు' : 'Platform Modules'}
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm text-emerald-100/80">
              <button
                type="button"
                onClick={() => navigateTo('calculator')}
                className="text-left hover:text-white transition-colors"
              >
                {t(NAV_LABELS.calculator, language)}
              </button>
              <button
                type="button"
                onClick={() => navigateTo('solar')}
                className="text-left hover:text-white transition-colors"
              >
                {t(NAV_LABELS.solar, language)}
              </button>
              <button
                type="button"
                onClick={() => navigateTo('biomass')}
                className="text-left hover:text-white transition-colors"
              >
                {t(NAV_LABELS.biomass, language)}
              </button>
              <button
                type="button"
                onClick={() => navigateTo('learning')}
                className="text-left hover:text-white transition-colors"
              >
                {t(NAV_LABELS.learning, language)}
              </button>
              <button
                type="button"
                onClick={() => navigateTo('telugu')}
                className="text-left hover:text-white transition-colors"
              >
                {t(NAV_LABELS.telugu, language)}
              </button>
              <button
                type="button"
                onClick={() => navigateTo('quiz')}
                className="text-left hover:text-white transition-colors"
              >
                {t(NAV_LABELS.quiz, language)}
              </button>
              <button
                type="button"
                onClick={() => navigateTo('feedback')}
                className="text-left hover:text-white transition-colors"
              >
                {t(NAV_LABELS.feedback, language)}
              </button>
              <button
                type="button"
                onClick={() => navigateTo('dashboard')}
                className="text-left hover:text-white transition-colors"
              >
                {t(NAV_LABELS.dashboard, language)}
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white">
              {language === 'te' ? 'డేటా & ఫైర్‌బేస్ మార్గదర్శి' : 'Cloud Persistence & Setup'}
            </h3>
            <p className="text-sm text-emerald-100/80 leading-relaxed">
              {language === 'te'
                ? 'అన్ని లెక్కలు, క్విజ్ ఫలితాలు మరియు అభిప్రాయాలు ప్రస్తుతం మీ బ్రౌజర్‌లో భద్రపరచబడతాయి. ఫైర్‌బేస్ సెటప్ వివరాలు ఇక్కడ చూడండి.'
                : 'All calculators, educational modules, quiz scores, and feedback work immediately via local storage. Open the guide below to connect Firebase Auth and Cloud Firestore.'}
            </p>
            <button
              type="button"
              onClick={() => setIsFirebaseGuideOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg border border-emerald-700 transition-colors"
            >
              <Database className="w-3.5 h-3.5" />
              <span>{t(NAV_LABELS.firebaseSetup, language)}</span>
            </button>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-emerald-900/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-emerald-200/70">
          <span>
            GREENPOWER – Smart Energy for a Sustainable Future · Srinivasaraopeta CSP
          </span>
          <span>
            {language === 'te'
              ? 'సౌర, బయోమాస్ మరియు విద్యుత్ పొదుపు అవగాహన వేదిక'
              : 'Solar, Biomass & Electricity Conservation Platform'}
          </span>
        </div>
      </div>
    </footer>
  );
}
