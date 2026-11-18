import React, { useState } from 'react';
import {
  ChevronDown,
  Globe,
  Menu,
  X,
} from 'lucide-react';
import { useAppContext } from '../hooks/useAppContext';
import { NAV_LABELS, t } from '../data/translations';
import { PageId } from '../types/energy';

export function Navbar() {
  const { language, toggleLanguage, currentPage, navigateTo } = useAppContext();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<'solutions' | 'learn' | null>(null);

  const handleNav = (page: PageId) => {
    navigateTo(page);
    setMobileOpen(false);
    setOpenDropdown(null);
  };

  const isSolutionsActive =
    currentPage === 'solar' ||
    currentPage === 'biomass' ||
    currentPage === 'recommendations';
  const isLearnActive =
    currentPage === 'learning' ||
    currentPage === 'telugu' ||
    currentPage === 'quiz';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <button
          type="button"
          onClick={() => handleNav('home')}
          className="text-lg font-extrabold tracking-tight text-emerald-950 whitespace-nowrap shrink-0 flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-emerald-700 rounded-md"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="text-emerald-700 shrink-0"
          >
            <path
              d="M12 2C7.03 2 3 6.03 3 11c0 4.5 3.3 8.23 7.6 8.9V22h2.8v-2.1c4.3-.67 7.6-4.4 7.6-8.9 0-4.97-4.03-9-9-9Z"
              fill="currentColor"
              fillOpacity="0.16"
            />
            <path
              d="M13.5 6.5 8.5 13h4l-1 4.5 5-6.5h-4l1-4.5Z"
              fill="currentColor"
            />
          </svg>
          <span>{NAV_LABELS.brand}</span>
        </button>

        {/* Zone 2: Concise single-line desktop navigation */}
        <nav
          aria-label="Main Navigation"
          className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-700"
        >
          <button
            type="button"
            onClick={() => handleNav('home')}
            className={`py-1 whitespace-nowrap shrink-0 border-b-2 transition-colors ${
              currentPage === 'home'
                ? 'text-emerald-900 border-emerald-700 font-semibold'
                : 'border-transparent hover:text-emerald-900'
            }`}
          >
            {t(NAV_LABELS.home, language)}
          </button>

          <button
            type="button"
            onClick={() => handleNav('calculator')}
            className={`py-1 whitespace-nowrap shrink-0 border-b-2 transition-colors ${
              currentPage === 'calculator'
                ? 'text-emerald-900 border-emerald-700 font-semibold'
                : 'border-transparent hover:text-emerald-900'
            }`}
          >
            {t(NAV_LABELS.calculator, language)}
          </button>

          {/* Solutions Dropdown */}
          <div
            className="relative"
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button
              type="button"
              onClick={() =>
                setOpenDropdown(openDropdown === 'solutions' ? null : 'solutions')
              }
              className={`py-1 whitespace-nowrap shrink-0 border-b-2 flex items-center gap-1 transition-colors ${
                isSolutionsActive
                  ? 'text-emerald-900 border-emerald-700 font-semibold'
                  : 'border-transparent hover:text-emerald-900'
              }`}
              aria-expanded={openDropdown === 'solutions'}
            >
              <span>{t(NAV_LABELS.solutions, language)}</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {openDropdown === 'solutions' && (
              <div className="absolute left-0 top-full pt-2 w-56 z-50">
                <div className="bg-white border border-slate-200 rounded-xl shadow-lg py-1.5">
                  <button
                    type="button"
                    onClick={() => handleNav('solar')}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                      currentPage === 'solar'
                        ? 'bg-emerald-50 text-emerald-900 font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {t(NAV_LABELS.solar, language)}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNav('biomass')}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                      currentPage === 'biomass'
                        ? 'bg-emerald-50 text-emerald-900 font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {t(NAV_LABELS.biomass, language)}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNav('recommendations')}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                      currentPage === 'recommendations'
                        ? 'bg-emerald-50 text-emerald-900 font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {t(NAV_LABELS.recommendations, language)}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Learn Dropdown */}
          <div
            className="relative"
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button
              type="button"
              onClick={() =>
                setOpenDropdown(openDropdown === 'learn' ? null : 'learn')
              }
              className={`py-1 whitespace-nowrap shrink-0 border-b-2 flex items-center gap-1 transition-colors ${
                isLearnActive
                  ? 'text-emerald-900 border-emerald-700 font-semibold'
                  : 'border-transparent hover:text-emerald-900'
              }`}
              aria-expanded={openDropdown === 'learn'}
            >
              <span>{t(NAV_LABELS.learn, language)}</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {openDropdown === 'learn' && (
              <div className="absolute left-0 top-full pt-2 w-56 z-50">
                <div className="bg-white border border-slate-200 rounded-xl shadow-lg py-1.5">
                  <button
                    type="button"
                    onClick={() => handleNav('learning')}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                      currentPage === 'learning'
                        ? 'bg-emerald-50 text-emerald-900 font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {t(NAV_LABELS.learning, language)}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNav('telugu')}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                      currentPage === 'telugu'
                        ? 'bg-emerald-50 text-emerald-900 font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {t(NAV_LABELS.telugu, language)}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNav('quiz')}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                      currentPage === 'quiz'
                        ? 'bg-emerald-50 text-emerald-900 font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {t(NAV_LABELS.quiz, language)}
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => handleNav('feedback')}
            className={`py-1 whitespace-nowrap shrink-0 border-b-2 transition-colors ${
              currentPage === 'feedback'
                ? 'text-emerald-900 border-emerald-700 font-semibold'
                : 'border-transparent hover:text-emerald-900'
            }`}
          >
            {t(NAV_LABELS.feedback, language)}
          </button>
        </nav>

        {/* Zone 3: Language Switch + Primary Dashboard CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={toggleLanguage}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-sky-900 bg-sky-50 border border-sky-200 rounded-lg hover:bg-sky-100 transition-colors whitespace-nowrap shrink-0"
            aria-label="Switch Language between English and Telugu"
          >
            <Globe className="w-3.5 h-3.5 text-sky-700" />
            <span>{language === 'en' ? 'తెలుగు' : 'English'}</span>
          </button>

          <button
            type="button"
            onClick={() => handleNav('dashboard')}
            className="hidden sm:inline-flex items-center px-4 py-2 text-xs font-semibold text-white bg-emerald-800 rounded-lg hover:bg-emerald-900 transition-colors whitespace-nowrap shrink-0"
          >
            {t(NAV_LABELS.dashboard, language)}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
          {(
            [
              ['home', NAV_LABELS.home],
              ['calculator', NAV_LABELS.calculator],
              ['solar', NAV_LABELS.solar],
              ['biomass', NAV_LABELS.biomass],
              ['recommendations', NAV_LABELS.recommendations],
              ['learning', NAV_LABELS.learning],
              ['telugu', NAV_LABELS.telugu],
              ['quiz', NAV_LABELS.quiz],
              ['feedback', NAV_LABELS.feedback],
              ['dashboard', NAV_LABELS.dashboard],
            ] as Array<[PageId, { en: string; te: string }]>
          ).map(([pageId, label]) => (
            <button
              key={pageId}
              type="button"
              onClick={() => handleNav(pageId)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                currentPage === pageId
                  ? 'bg-emerald-50 text-emerald-900 font-semibold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {t(label, language)}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
