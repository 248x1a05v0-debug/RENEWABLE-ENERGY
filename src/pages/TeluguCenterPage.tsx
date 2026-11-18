import React from 'react';
import { Calculator, HelpCircle, Sun } from 'lucide-react';
import { useAppContext } from '../hooks/useAppContext';
import { TELUGU_AWARENESS_SECTIONS } from '../data/learningData';

export function TeluguCenterPage() {
  const { navigateTo } = useAppContext();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="bg-emerald-950 text-white rounded-2xl p-6 sm:p-10 space-y-4">
        <p className="text-xs font-semibold text-sky-300">
          శ్రీనివాసరావుపేట కమ్యూనిటీ సర్వీస్ ప్రాజెక్ట్ · Bilingual Telugu & English Center
        </p>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug">
          తెలుగు పునరుత్పాదక శక్తి & విద్యుత్ ఆదా అవగాహన కేంద్రం
        </h1>
        <p className="text-sm sm:text-base text-emerald-100/90 max-w-3xl leading-relaxed">
          గ్రామీణ కుటుంబాలు, రైతులు మరియు విద్యార్థులు సులభంగా చదివి అర్థం చేసుకునేలా సౌర శక్తి, బయోమాస్, కరెంట్ ఆదా మరియు పర్యావరణ పరిరక్షణ సమాచారం తెలుగు మరియు ఆంగ్లం (English) రెండు భాషల్లో ఇవ్వబడింది.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigateTo('calculator')}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold bg-white text-emerald-950 rounded-lg hover:bg-emerald-50"
          >
            <Calculator className="w-4 h-4" />
            <span>విద్యుత్ బిల్లు లెక్కించండి (Calculator)</span>
          </button>
          <button
            type="button"
            onClick={() => navigateTo('solar')}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold bg-emerald-800 text-white border border-emerald-700 rounded-lg hover:bg-emerald-700"
          >
            <Sun className="w-4 h-4" />
            <span>సోలార్ అంచనా (Solar Guide)</span>
          </button>
          <button
            type="button"
            onClick={() => navigateTo('quiz')}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold bg-sky-700 text-white rounded-lg hover:bg-sky-600"
          >
            <HelpCircle className="w-4 h-4" />
            <span>గ్రీన్ ఎనర్జీ క్విజ్ ఆడండి</span>
          </button>
        </div>
      </div>

      {/* Side-by-side Telugu & English Awareness Cards */}
      <div className="space-y-8">
        {TELUGU_AWARENESS_SECTIONS.map((section) => (
          <section
            key={section.id}
            className="bg-white border border-slate-200 rounded-2xl overflow-hidden"
          >
            <div className="bg-sky-50/70 border-b border-slate-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h2 className="text-lg sm:text-xl font-bold text-emerald-950">
                {section.titleTe}
              </h2>
              <span className="text-xs font-semibold text-sky-900">
                {section.titleEn}
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {section.points.map((pt, idx) => (
                <div
                  key={idx}
                  className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8"
                >
                  <p className="text-base text-slate-900 leading-relaxed font-medium">
                    {pt.te}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {pt.en}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Quick Practical Conservation Checklist */}
      <section className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 className="text-xl font-bold text-emerald-950">
          రోజువారీ ఆదా సూత్రాలు · Practical Daily Energy-Saving Checklist
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="bg-white border border-emerald-100 rounded-xl p-4 space-y-1">
            <p className="font-bold text-emerald-900">
              1. పసుపు బల్బుల స్థానంలో 9W LED బల్బులు వేయండి
            </p>
            <p className="text-slate-600">
              Replace old 60W bulbs with 9W LED bulbs to cut lighting electricity by 85%.
            </p>
          </div>
          <div className="bg-white border border-emerald-100 rounded-xl p-4 space-y-1">
            <p className="font-bold text-emerald-900">
              2. గదిలో లేనప్పుడు ఫ్యాన్లు, లైట్లు వెంటనే ఆపండి
            </p>
            <p className="text-slate-600">
              Switch off fans and lights whenever stepping out of a room.
            </p>
          </div>
          <div className="bg-white border border-emerald-100 rounded-xl p-4 space-y-1">
            <p className="font-bold text-emerald-900">
              3. పంట గడ్డిని కాల్చకండి — బయోగ్యాస్/కంపోస్ట్ చేయండి
            </p>
            <p className="text-slate-600">
              Never burn paddy straw in fields; use it for biogas or organic compost.
            </p>
          </div>
          <div className="bg-white border border-emerald-100 rounded-xl p-4 space-y-1">
            <p className="font-bold text-emerald-900">
              4. కొత్త ఫ్యాన్ కొనేటప్పుడు 28W BLDC ఫ్యాన్ ఎంచుకోండి
            </p>
            <p className="text-slate-600">
              Choose 28W BLDC ceiling fans or BEE 5-Star appliances when upgrading.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
