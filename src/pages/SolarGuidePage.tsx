import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, ChevronDown, ChevronUp, Sun } from 'lucide-react';
import { useAppContext } from '../hooks/useAppContext';
import { estimateSolarSystem } from '../utils/energyCalculations';
import { SOLAR_COMPONENTS, SOLAR_FAQS } from '../data/learningData';
import { t } from '../data/translations';
import { ImageWithFallback } from '../components/ImageWithFallback';

export function SolarGuidePage() {
  const { language, energySummary } = useAppContext();
  const [monthlyInput, setMonthlyInput] = useState<string>(
    String(Math.max(120, Math.round(energySummary.totalMonthlyKwh || 180)))
  );
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const parsedMonthlyKwh = Number(monthlyInput) || 0;
  const estimate = estimateSolarSystem(parsedMonthlyKwh);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14">
      {/* Header + Photo */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-7 flex flex-col justify-center space-y-4">
          <p className="text-xs font-semibold text-sky-800">
            {language === 'te' ? 'సౌర శక్తి పరిష్కార మార్గదర్శి' : 'Practical Solar Awareness & Sizing'}
          </p>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-emerald-950">
            {language === 'te'
              ? 'సోలార్ ఎనర్జీ సొల్యూషన్ గైడ్'
              : 'Solar Energy Solution Guide'}
          </h1>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            {language === 'te'
              ? 'సూర్యరశ్మిని సోలార్ ఫోటోవోల్టాయిక్ (PV) ప్యానెల్స్ ద్వారా స్వచ్ఛమైన విద్యుత్‌గా మార్చవచ్చు. గుంటూరు జిల్లాలోని శ్రీనివాసరావుపేట వంటి గ్రామాల్లో ఏడాదికి 300+ రోజులు ఎండ లభించడం వల్ల ఇంటి పైకప్పు సోలార్ అత్యంత అనుకూలమైనది.'
              : 'Solar energy captures abundant sunlight using rooftop photovoltaic (PV) panels to generate clean electricity without fuel costs. With 300+ sunny days annually in Guntur District, rooftop solar directly lowers household grid dependence.'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-4 bg-sky-50 border border-sky-200 rounded-xl">
              <p className="text-xs text-sky-900 font-medium">
                {language === 'te' ? 'ప్యానెల్ మన్నిక' : 'Panel Lifespan'}
              </p>
              <p className="text-lg font-bold text-sky-950 font-mono-tabular mt-0.5">25+ Years</p>
            </div>
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
              <p className="text-xs text-emerald-900 font-medium">
                {language === 'te' ? '1 kW నెలవారీ ఉత్పత్తి' : '1 kW Monthly Yield'}
              </p>
              <p className="text-lg font-bold text-emerald-950 font-mono-tabular mt-0.5">~120 kWh</p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <p className="text-xs text-slate-700 font-medium">
                {language === 'te' ? '1 kW పైకప్పు స్థలం' : '1 kW Roof Space'}
              </p>
              <p className="text-lg font-bold text-slate-900 font-mono-tabular mt-0.5">~100 sq ft</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 min-h-[260px] rounded-2xl overflow-hidden border border-slate-200">
          <ImageWithFallback
            src="/src/assets/images/solar_rooftop_guide_1794934114994.jpg"
            alt="Rooftop monocrystalline solar panels and inverter on a village home"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Interactive Solar Estimator Tool */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-emerald-950 flex items-center gap-2">
              <Sun className="w-5 h-5 text-amber-500" />
              <span>
                {language === 'te'
                  ? 'సోలార్ సిస్టమ్ సామర్థ్య అంచనా సాధనం'
                  : 'Indicative Rooftop Solar System Estimator'}
              </span>
            </h2>
            <p className="text-sm text-slate-600">
              {language === 'te'
                ? 'మీ నెలవారీ విద్యుత్ వినియోగాన్ని (యూనిట్లు/kWh) నమోదు చేయండి.'
                : 'Enter your approximate monthly electricity consumption in kWh (units) or import from your calculator.'}
            </p>
          </div>
          {energySummary.totalMonthlyKwh > 0 && (
            <button
              type="button"
              onClick={() => setMonthlyInput(String(Math.round(energySummary.totalMonthlyKwh)))}
              className="px-4 py-2 text-xs font-semibold text-emerald-900 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 self-start whitespace-nowrap"
            >
              {language === 'te'
                ? `నా కాలిక్యులేటర్ విలువ (${Math.round(energySummary.totalMonthlyKwh)} kWh) వాడండి`
                : `Use My Calculator Value (${Math.round(energySummary.totalMonthlyKwh)} kWh)`}
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-4">
            <label className="block text-sm font-semibold text-slate-800">
              {language === 'te'
                ? 'నెలవారీ విద్యుత్ వినియోగం (kWh / Units)'
                : 'Approximate Monthly Electricity Usage (kWh / Units)'}
            </label>
            <input
              type="number"
              min="0"
              max="10000"
              value={monthlyInput}
              onChange={(e) => setMonthlyInput(e.target.value)}
              className="w-full px-4 py-3 text-lg font-mono-tabular font-semibold border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-700"
            />
            <input
              type="range"
              min="30"
              max="1000"
              step="10"
              value={Math.min(1000, parsedMonthlyKwh)}
              onChange={(e) => setMonthlyInput(e.target.value)}
              className="w-full accent-emerald-700"
              aria-label="Monthly kWh slider"
            />
            <div className="flex justify-between text-xs text-slate-500 font-mono-tabular">
              <span>30 kWh</span>
              <span>300 kWh</span>
              <span>600 kWh</span>
              <span>1000+ kWh</span>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                <p className="text-xs font-medium text-emerald-800">
                  {language === 'te' ? 'సూచించిన సోలార్ సిస్టమ్' : 'Recommended System Size'}
                </p>
                <p className="text-2xl font-bold text-emerald-950 font-mono-tabular mt-1">
                  {estimate.recommendedKw} kW
                </p>
              </div>
              <div className="p-4 bg-sky-50 border border-sky-200 rounded-xl">
                <p className="text-xs font-medium text-sky-800">
                  {language === 'te' ? 'అంచనా నెలవారీ ఉత్పత్తి' : 'Indicative Monthly Generation'}
                </p>
                <p className="text-2xl font-bold text-sky-950 font-mono-tabular mt-1">
                  ~{estimate.estimatedMonthlyGenKwh} kWh
                </p>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <p className="text-xs font-medium text-slate-600">
                  {language === 'te' ? 'అవసరమైన పైకప్పు స్థలం' : 'Shade-Free Roof Area Needed'}
                </p>
                <p className="text-xl font-bold text-slate-900 font-mono-tabular mt-1">
                  ~{estimate.estimatedRoofAreaSqFt} sq ft
                </p>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <p className="text-xs font-medium text-slate-600">
                  {language === 'te' ? 'అంచనా నెలవారీ బిల్లు ఆదా' : 'Estimated Monthly Bill Offset'}
                </p>
                <p className="text-xl font-bold text-emerald-900 font-mono-tabular mt-1">
                  ~₹{estimate.estimatedMonthlyBillSavingsInr} / mo
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800">
              <span className="font-semibold">
                {language === 'te' ? 'తగిన సిస్టమ్ రకం: ' : 'Suggested Setup: '}
              </span>
              {t(estimate.suitableSystemType, language)}
            </div>

            <div className="flex items-start gap-2.5 p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-950 leading-relaxed">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <p>
                {language === 'te'
                  ? 'ముఖ్య గమనిక: ఇది ప్రాథమిక అవగాహన కోసం ఇచ్చిన అంచనా మాత్రమే. అసలైన సిస్టమ్ సామర్థ్యం, ఇంటి పైకప్పు బలం, నీడ మరియు ఖచ్చితమైన ఖర్చు కోసం అధీకృత సోలార్ నిపుణుల క్షేత్రస్థాయి తనిఖీ తప్పనిసరి.'
                  : 'Important Disclaimer: These figures are indicative estimates for community awareness. Actual system sizing, roof structural capacity, shading analysis, and final installation cost require an on-site professional engineering assessment.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How Rooftop Solar Works & Basic Components */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-bold text-emerald-950">
            {language === 'te' ? 'పైకప్పు సోలార్ ఎలా పనిచేస్తుంది?' : 'How Rooftop Solar Systems Work'}
          </h2>
          <ol className="space-y-3 text-sm text-slate-700 leading-relaxed list-decimal list-inside">
            <li>
              {language === 'te'
                ? 'సూర్యరశ్మి పైకప్పుపై ఉన్న సోలార్ PV ప్యానెల్స్‌పై పడి DC విద్యుత్ ఉత్పత్తి అవుతుంది.'
                : 'Sunlight strikes silicon solar cells on the roof, generating Direct Current (DC) electricity.'}
            </li>
            <li>
              {language === 'te'
                ? 'ఇన్వర్టర్ ఈ DC విద్యుత్‌ను ఇంట్లో వాడుకునే 230V AC విద్యుత్‌గా మారుస్తుంది.'
                : 'The solar inverter converts DC into standard 230V Alternating Current (AC) for fans, lights, TVs, and pumps.'}
            </li>
            <li>
              {language === 'te'
                ? 'ఇంట్లో వాడగా మిగిలిన విద్యుత్ నెట్ మీటర్ ద్వారా గ్రిడ్‌కు వెళ్లి రాత్రి వాడే బిల్లులో సర్దుబాటు అవుతుంది.'
                : 'Daytime appliances run on solar first; surplus units flow via a bi-directional net meter to offset evening grid usage.'}
            </li>
          </ol>

          <h3 className="text-base font-bold text-slate-900 pt-2">
            {language === 'te' ? 'గ్రామీణ కుటుంబాలకు ప్రధాన ఉపయోగాలు' : 'Suitable Rural Household Applications'}
          </h3>
          <ul className="space-y-2 text-sm text-slate-700">
            {[
              {
                en: '1–2 kW On-Grid Rooftop Systems for homes with monthly bills above ₹600–₹800',
                te: 'నెల బిల్లు ₹600 దాటిన ఇళ్లకు 1–2 kW ఆన్-గ్రిడ్ సోలార్ సిస్టమ్',
              },
              {
                en: 'Solar DC Home Lighting & Fan Kits for uninterrupted study hours during power cuts',
                te: 'కరెంట్ కోతల సమయంలో విద్యార్థుల చదువు కోసం సోలార్ లైట్ & ఫ్యాన్ కిట్లు',
              },
              {
                en: 'Solar Water Heaters & Agricultural Irrigation Pumps reducing diesel/grid expense',
                te: 'డీజిల్ మరియు కరెంట్ ఖర్చు తగ్గించే సోలార్ నీటి పంపులు & వాటర్ హీటర్లు',
              },
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>{t(item, language)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-bold text-emerald-950">
            {language === 'te' ? 'సోలార్ సిస్టమ్ ముఖ్య భాగాలు' : 'Basic Components of a Solar System'}
          </h2>
          <div className="divide-y divide-slate-100">
            {SOLAR_COMPONENTS.map((comp, idx) => (
              <div key={idx} className="py-3 first:pt-0 last:pb-0">
                <h3 className="text-sm font-bold text-slate-900">{t(comp.name, language)}</h3>
                <p className="text-sm text-slate-600 mt-0.5 leading-relaxed">
                  {t(comp.role, language)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Basic Installation Guidance & FAQs */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 bg-sky-50/70 border border-sky-200 rounded-xl p-6 space-y-4 self-start">
          <h2 className="text-xl font-bold text-sky-950">
            {language === 'te' ? 'సోలార్ ఏర్పాటుకు ప్రాథమిక మార్గదర్శకాలు' : 'Basic Installation Guidance'}
          </h2>
          <ul className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <li>
              <strong>1. {language === 'te' ? 'నీడ లేని పైకప్పు:' : 'Shade-Free Roof:'}</strong>{' '}
              {language === 'te'
                ? 'ఉదయం 9 నుండి సాయంత్రం 4 వరకు చెట్లు లేదా ట్యాంకుల నీడ పడని దక్షిణ దిశ స్థలాన్ని ఎంచుకోండి.'
                : 'Choose a roof area facing South with zero tree or water-tank shadows between 9 AM and 4 PM.'}
            </li>
            <li>
              <strong>2. {language === 'te' ? 'దృఢమైన స్టాండ్:' : 'Wind-Safe Mounting:'}</strong>{' '}
              {language === 'te'
                ? 'తుఫాను గాలులను తట్టుకునేలా గ్యాల్వనైజ్డ్ ఇనుముతో దృఢంగా అమర్చాలి.'
                : 'Use corrosion-resistant galvanized structures anchored safely to withstand coastal Guntur winds.'}
            </li>
            <li>
              <strong>3. {language === 'te' ? 'డిస్కమ్ అనుమతి & సబ్సిడీ:' : 'DISCOM & Subsidy Check:'}</strong>{' '}
              {language === 'te'
                ? 'APCPDCL నమోదిత వెండర్ ద్వారా మాత్రమే పీఎం సూర్య ఘర్ సబ్సిడీ మరియు నెట్ మీటరింగ్ కోసం దరఖాస్తు చేయండి.'
                : 'Apply through authorized APCPDCL-empaneled vendors for official net metering and PM Surya Ghar subsidy eligibility.'}
            </li>
          </ul>
        </div>

        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-bold text-emerald-950">
            {language === 'te' ? 'తరచుగా అడిగే ప్రశ్నలు (FAQs)' : 'Solar Energy FAQs'}
          </h2>
          <div className="divide-y divide-slate-200">
            {SOLAR_FAQS.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div key={idx} className="py-3.5">
                  <button
                    type="button"
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between gap-4 text-left font-semibold text-sm text-slate-900"
                  >
                    <span>{t(faq.q, language)}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                      {t(faq.a, language)}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
