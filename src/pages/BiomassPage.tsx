import React from 'react';
import { ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useAppContext } from '../hooks/useAppContext';
import { BIOMASS_WASTE_TYPES } from '../data/learningData';
import { t } from '../data/translations';
import { ImageWithFallback } from '../components/ImageWithFallback';

export function BiomassPage() {
  const { language } = useAppContext();

  const processSteps = [
    {
      step: '01',
      title: { en: 'Collect & Segregate Waste', te: 'వ్యర్థాల సేకరణ & వేరు చేయడం' },
      desc: {
        en: 'Gather cattle dung, shredded paddy straw, or wet farm waste—strictly removing plastics, stones, and metals.',
        te: 'పశువుల పేడ, తరిగిన వరి గడ్డి, తడి వ్యవసాయ వ్యర్థాలను సేకరించి ప్లాస్టిక్, రాళ్లను వేరు చేయాలి.',
      },
    },
    {
      step: '02',
      title: { en: 'Mix with Water in Inlet Tank', te: 'నీటితో కలిపి ప్లాంట్‌లోకి పంపడం' },
      desc: {
        en: 'Blend organic waste with equal parts water to form a smooth slurry and feed it into the airtight underground digester.',
        te: 'పేడ మరియు నీటిని సమానంగా కలిపి గాలి చొరబడని బయోగ్యాస్ ట్యాంకులోకి పంపాలి.',
      },
    },
    {
      step: '03',
      title: { en: 'Anaerobic Digestion (Biogas)', te: 'మీథేన్ వాయువు ఉత్పత్తి' },
      desc: {
        en: 'Natural bacteria ferment the slurry without oxygen, releasing methane-rich biogas stored in the dome for cooking or generators.',
        te: 'గాలి లేని వాతావరణంలో సూక్ష్మజీవులు దానిని కుళ్ళబెట్టి వంట గ్యాస్‌ను ఉత్పత్తి చేస్తాయి.',
      },
    },
    {
      step: '04',
      title: { en: 'Organic Bio-Slurry for Crops', te: 'పంటలకు సేంద్రీయ ఎరువు' },
      desc: {
        en: 'Nutrient-dense digested slurry exits the outlet tank ready to enrich Srinivasaraopeta paddy, cotton, and vegetable soils.',
        te: 'మిగిలిన స్లర్రీని పొలాల్లో సహజ ఎరువుగా వాడితే రసాయన ఎరువుల ఖర్చు తగ్గుతుంది.',
      },
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14">
      {/* Intro Split */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-7 flex flex-col justify-center space-y-4">
          <p className="text-xs font-semibold text-emerald-700">
            {language === 'te' ? 'రైతులు & గ్రామీణ శక్తి' : 'Agricultural Community Energy'}
          </p>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-emerald-950">
            {language === 'te'
              ? 'వ్యవసాయ బయోమాస్ పరిష్కారాలు'
              : 'Agricultural Biomass Solutions'}
          </h1>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            {language === 'te'
              ? 'బయోమాస్ శక్తి అంటే పంట వ్యర్థాలు, వరి పొట్టు, పత్తి కట్టెలు మరియు పశువుల పేడ వంటి సేంద్రీయ పదార్థాలను వంట గ్యాస్, విద్యుత్ మరియు సేంద్రీయ ఎరువుగా మార్చడం. రైతులు గడ్డిని పొలంలో కాల్చకుండా దీనిని ఆదాయ వనరుగా మార్చుకోవచ్చు.'
              : 'Biomass energy converts organic farm residues—paddy straw, cotton stalks, groundnut shells, and cattle dung—into clean cooking biogas, electricity, and rich organic fertilizer. Instead of burning crop residue in open fields, farmers can turn agricultural waste into reliable rural energy.'}
          </p>
        </div>

        <div className="lg:col-span-5 min-h-[260px] rounded-2xl overflow-hidden border border-slate-200">
          <ImageWithFallback
            src="/src/assets/images/biomass_agriculture_1794934115525.jpg"
            alt="Paddy straw bales and community biogas dome next to green farmland"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Agricultural Waste Types */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-emerald-950">
            {language === 'te'
              ? 'బయోమాస్‌కు ఉపయోగపడే వ్యవసాయ వ్యర్థాలు'
              : 'Types of Agricultural Waste Used for Biomass Energy'}
          </h2>
          <p className="text-sm text-slate-600">
            {language === 'te'
              ? 'గుంటూరు జిల్లాలో సాధారణంగా లభించే పంట వ్యర్థాలు మరియు వాటి శక్తి ఉపయోగాలు.'
              : 'Locally available crop and livestock residues in Srinivasaraopeta and Guntur District.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BIOMASS_WASTE_TYPES.map((item, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-xl p-6 space-y-2.5">
              <p className="text-xs font-medium text-sky-800">{t(item.source, language)}</p>
              <h3 className="text-lg font-bold text-slate-900">{t(item.name, language)}</h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                <strong>{language === 'te' ? 'వినియోగం: ' : 'Energy Output: '}</strong>
                {t(item.energyUse, language)}
              </p>
              <p className="text-xs text-emerald-800 font-medium pt-1">
                {t(item.localNote, language)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Biomass Energy Generation Process */}
      <section className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
        <h2 className="text-2xl font-bold text-emerald-950">
          {language === 'te'
            ? 'బయోగ్యాస్ & బయోమాస్ శక్తి ఉత్పత్తి విధానం'
            : 'Biomass & Biogas Energy Generation Process'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {processSteps.map((s) => (
            <div key={s.step} className="bg-white border border-slate-200 rounded-xl p-5 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono-tabular font-semibold text-emerald-700">
                <span>Step {s.step}</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <h3 className="text-base font-bold text-slate-900">{t(s.title, language)}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{t(s.desc, language)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Practical Examples, Benefits, and Safe Practices */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-bold text-emerald-950">
            {language === 'te'
              ? 'రైతులకు ఆర్థిక & పర్యావరణ ప్రయోజనాలు'
              : 'Farmer & Environmental Benefits'}
          </h2>
          <ul className="space-y-3 text-sm text-slate-700 leading-relaxed">
            {[
              {
                en: 'Practical Dairy Example: A farm household with 3 buffaloes or cows produces ~30–40 kg of dung daily—enough for a 2 cubic meter biogas plant supplying clean cooking gas every day.',
                te: 'ప్రాక్టికల్ ఉదాహరణ: 3 గేదెలు లేదా ఆవులు ఉన్న రైతు కుటుంబానికి రోజుకు 30–40 కిలోల పేడ లభిస్తుంది. దీనితో 2 క్యూబిక్ మీటర్ల బయోగ్యాస్ ప్లాంట్ నడిపి రోజూ వంట గ్యాస్ పొందవచ్చు.',
              },
              {
                en: 'Paddy & Cotton Farmers: Chopping crop stalks into biomass pellets or supplying local biomass power plants earns extra income per ton instead of burning fields.',
                te: 'వరి & పత్తి రైతులు: కట్టెలను కాల్చకుండా బయోమాస్ పెల్లెట్స్ లేదా పవర్ ప్లాంట్లకు అందిస్తే అదనపు ఆదాయం వస్తుంది.',
              },
              {
                en: 'Cleaner Air & Health: Eliminates firewood kitchen smoke and stops hazy winter smoke over village roads.',
                te: 'పొగ లేని వంటగది వల్ల మహిళలు, పిల్లల ఊపిరితిత్తుల ఆరోగ్యం మెరుగుపడుతుంది; గ్రామంలో వాయు కాలుష్యం తగ్గుతుంది.',
              },
            ].map((b, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-1" />
                <span>{t(b, language)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-bold text-amber-950 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-700" />
            <span>
              {language === 'te'
                ? 'సురక్షిత & బాధ్యతాయుత బయోమాస్ పద్ధతులు'
                : 'Safe & Responsible Biomass Practices'}
            </span>
          </h2>
          <ul className="space-y-3 text-sm text-slate-800 leading-relaxed">
            <li>
              <strong>1. {language === 'te' ? 'ప్లాస్టిక్ వేయవద్దు:' : 'Keep Plastics & Chemicals Out:'}</strong>{' '}
              {language === 'te'
                ? 'బయోగ్యాస్ ట్యాంకులోకి ప్లాస్టిక్, సబ్బు నీరు లేదా రసాయన మందులు వేయకండి—ఇవి మంచి బ్యాక్టీరియాను చంపుతాయి.'
                : 'Never dump plastics, detergents, or pesticide containers into a digester; they kill gas-producing microbes.'}
            </li>
            <li>
              <strong>2. {language === 'te' ? 'వంటగదిలో గాలి ప్రసరణ:' : 'Proper Kitchen Ventilation:'}</strong>{' '}
              {language === 'te'
                ? 'గ్యాస్ పైపులు మరియు వాల్వ్‌లను సబ్బు నీటితో తరచుగా తనిఖీ చేయండి; ఎప్పుడూ అగ్గిపుల్లతో పరీక్షించకండి.'
                : 'Check gas pipe joints with soapy water only (never open flames) and keep kitchen windows ventilated.'}
            </li>
            <li>
              <strong>3. {language === 'te' ? 'పంట అవశేషాలను తగులబెట్టకండి:' : 'Zero Open Stubble Burning:'}</strong>{' '}
              {language === 'te'
                ? 'ఎండిన గడ్డిని మల్చింగ్, కంపోస్ట్ లేదా బయోమాస్ ఇంధనంగా మాత్రమే వినియోగించండి.'
                : 'Preserve topsoil nutrients by composting, mulching, or supplying crop residue to biomass units rather than burning.'}
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
