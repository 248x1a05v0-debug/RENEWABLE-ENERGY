import React, { useRef, useState } from 'react';
import {
  ArrowRight,
  Calculator,
  Camera,
  Check,
  Leaf,
  Pencil,
  RotateCcw,
  Sun,
  Wind,
} from 'lucide-react';
import { useAppContext } from '../hooks/useAppContext';
import {
  COMMUNITY_PROBLEMS,
  DAILY_SAVING_TIPS,
  HOME_COPY,
  t,
} from '../data/translations';
import { ImageWithFallback } from '../components/ImageWithFallback';

export function HomePage() {
  const {
    language,
    navigateTo,
    fieldPhotos,
    updateFieldPhoto,
    resetFieldPhotos,
  } = useAppContext();

  const [editingPhotoId, setEditingPhotoId] = useState<string | null>(null);
  const [editCaption, setEditCaption] = useState('');
  const [editLocation, setEditLocation] = useState('');
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const startEditingPhoto = (id: string, currentCaption: string, currentLocation: string) => {
    setEditingPhotoId(id);
    setEditCaption(currentCaption);
    setEditLocation(currentLocation);
  };

  const savePhotoEdit = (id: string) => {
    updateFieldPhoto(id, {
      caption: {
        en: editCaption,
        te: editCaption,
      },
      location: editLocation,
    });
    setEditingPhotoId(null);
  };

  const handlePhotoUpload = (id: string, file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        updateFieldPhoto(id, {
          imageUrl: reader.result,
          isCustom: true,
        });
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-20 pb-8">
      {/* Hero Section: Two-column balanced split */}
      <section className="bg-gradient-to-b from-sky-50/70 via-white to-white border-b border-emerald-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
              <p className="text-xs font-semibold tracking-wide text-emerald-800">
                {t(HOME_COPY.cspSubtitle, language)}
              </p>

              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-emerald-950 leading-[1.12]"
                style={{ textWrap: 'balance' }}
              >
                {t(HOME_COPY.heroHeading, language)}
              </h1>

              <p className="text-base text-slate-700 leading-relaxed max-w-xl">
                {t(HOME_COPY.heroSubheading, language)}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => navigateTo('recommendations')}
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors whitespace-nowrap"
                >
                  <span>{t(HOME_COPY.exploreSolutionsCta, language)}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => navigateTo('calculator')}
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-emerald-900 bg-white border border-emerald-800/25 hover:bg-emerald-50 rounded-lg transition-colors whitespace-nowrap"
                >
                  <Calculator className="w-4 h-4 text-emerald-700" />
                  <span>{t(HOME_COPY.openCalculatorCta, language)}</span>
                </button>

                <button
                  type="button"
                  onClick={() => navigateTo('solar')}
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-sky-900 bg-sky-50 border border-sky-200 hover:bg-sky-100 rounded-lg transition-colors whitespace-nowrap"
                >
                  <Sun className="w-4 h-4 text-sky-700" />
                  <span>{t(HOME_COPY.openSolarGuideCta, language)}</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="h-full min-h-[280px] sm:min-h-[360px] rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 relative">
                <ImageWithFallback
                  src="/src/assets/images/hero_rural_solar_1794934114943.jpg"
                  alt="Solar panels on a rural home surrounded by green paddy fields in Andhra Pradesh"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent p-6 text-white">
                  <p className="text-xs font-medium text-sky-200">
                    {language === 'te'
                      ? 'పునరుత్పాదక శక్తి మరియు వనరులు – స్వచ్ఛమైన విద్యుత్, ఉజ్వల భవిష్యత్తు'
                      : 'Renewable Energy and Resources – Clean Power, Bright Future'}
                  </p>
                  <p className="text-sm font-semibold mt-1">
                    {language === 'te'
                      ? 'సౌర, బయోమాస్ మరియు ఇంటి విద్యుత్ ఆదాతో గ్రామీణ ఆర్థికాభివృద్ధి'
                      : 'Practical clean energy & electricity conservation for rural households and farms'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick-access 4-column Strip below Hero */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
            <button
              type="button"
              onClick={() => navigateTo('calculator')}
              className="text-left p-5 bg-white border border-slate-200 rounded-xl hover:border-emerald-700/40 transition-colors"
            >
              <Calculator className="w-5 h-5 text-emerald-700 mb-2.5" />
              <h3 className="text-sm font-bold text-slate-900">
                {language === 'te' ? 'విద్యుత్ వినియోగ కాలిక్యులేటర్' : 'Smart Bill Calculator'}
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {language === 'te'
                  ? 'ప్రతి పరికరం వాడే యూనిట్లు, ఖర్చు మరియు ఆదా లెక్కించండి.'
                  : 'Measure appliance kWh, monthly INR cost, and instant LED/BLDC savings.'}
              </p>
            </button>

            <button
              type="button"
              onClick={() => navigateTo('solar')}
              className="text-left p-5 bg-white border border-slate-200 rounded-xl hover:border-sky-600/40 transition-colors"
            >
              <Sun className="w-5 h-5 text-sky-700 mb-2.5" />
              <h3 className="text-sm font-bold text-slate-900">
                {language === 'te' ? 'సోలార్ పరిమాణ అంచనా' : 'Rooftop Solar Estimator'}
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {language === 'te'
                  ? 'నెలవారీ కరెంట్‌కు సరిపడే kW సోలార్ సిస్టమ్ తెలుసుకోండి.'
                  : 'Find indicative solar kW capacity, roof space, and subsidy guidance.'}
              </p>
            </button>

            <button
              type="button"
              onClick={() => navigateTo('biomass')}
              className="text-left p-5 bg-white border border-slate-200 rounded-xl hover:border-emerald-700/40 transition-colors"
            >
              <Leaf className="w-5 h-5 text-emerald-700 mb-2.5" />
              <h3 className="text-sm font-bold text-slate-900">
                {language === 'te' ? 'వ్యవసాయ బయోమాస్' : 'Farm Biomass Solutions'}
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {language === 'te'
                  ? 'వరి గడ్డి, పేడతో బయోగ్యాస్ మరియు సేంద్రీయ ఎరువు తయారీ.'
                  : 'Turn paddy straw and cattle dung into clean gas and rich bio-slurry.'}
              </p>
            </button>

            <button
              type="button"
              onClick={() => navigateTo('telugu')}
              className="text-left p-5 bg-white border border-slate-200 rounded-xl hover:border-sky-600/40 transition-colors"
            >
              <Wind className="w-5 h-5 text-sky-700 mb-2.5" />
              <h3 className="text-sm font-bold text-slate-900">
                {language === 'te' ? 'తెలుగు అవగాహన కేంద్రం' : 'Telugu Awareness Center'}
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {language === 'te'
                  ? 'గ్రామ ప్రజలందరికీ అర్థమయ్యే సరళమైన తెలుగులో మార్గదర్శి.'
                  : 'Clear bilingual Telugu & English guides built for local families.'}
              </p>
            </button>
          </div>
        </div>
      </section>

      {/* Community Problems & Direct Solutions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-3xl space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-emerald-950">
            {t(HOME_COPY.problemsTitle, language)}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {t(HOME_COPY.problemsSubtitle, language)}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COMMUNITY_PROBLEMS.map((item) => (
            <div
              key={item.number}
              className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <div className="text-xs font-mono-tabular font-semibold text-sky-800">
                  {language === 'te' ? `సమస్య ${item.number}` : `Challenge ${item.number}`}
                </div>
                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {t(item.problem, language)}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {t(item.solution, language)}
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigateTo(item.targetPage)}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-800 hover:text-emerald-950 transition-colors self-start"
              >
                <span>{t(item.actionLabel, language)}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Renewable Energy Awareness & Daily Conservation Tips */}
      <section className="bg-slate-50 border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-emerald-950">
                {t(HOME_COPY.tipsTitle, language)}
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                {language === 'te'
                  ? 'చిన్న అలవాట్ల మార్పుతోనే ప్రతి నెల కరెంట్ బిల్లులో తక్షణ ఆదా.'
                  : 'Small daily habits that cut electricity waste immediately with zero or minimal cost.'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigateTo('learning')}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-emerald-900 bg-white border border-slate-300 rounded-lg hover:bg-emerald-50 transition-colors self-start whitespace-nowrap"
            >
              <span>
                {language === 'te'
                  ? '8 పునరుత్పాదక శక్తి వనరులు చూడండి'
                  : 'Explore All 8 Renewable Sources'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {DAILY_SAVING_TIPS.map((tip, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-xl p-5 space-y-3"
              >
                <p className="text-xs font-semibold text-emerald-700">
                  {t(tip.impact, language)}
                </p>
                <h3 className="text-base font-bold text-slate-900">
                  {t(tip.title, language)}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {t(tip.detail, language)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Environmental Awareness Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-950 text-white rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 flex flex-col justify-center space-y-5">
            <p className="text-xs font-semibold tracking-wide text-sky-300">
              {language === 'te'
                ? 'పర్యావరణ & ఆరోగ్య పరిరక్షణ'
                : 'Environmental Stewardship'}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold leading-tight">
              {t(HOME_COPY.environmentTitle, language)}
            </h2>
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
              {t(HOME_COPY.environmentBody, language)}
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={() => navigateTo('quiz')}
                className="px-4 py-2.5 text-sm font-semibold bg-white text-emerald-950 rounded-lg hover:bg-emerald-50 transition-colors"
              >
                {language === 'te' ? '22-ప్రశ్నల గ్రీన్ క్విజ్ ఆడండి' : 'Take the 22-Question Green Quiz'}
              </button>
              <button
                type="button"
                onClick={() => navigateTo('feedback')}
                className="px-4 py-2.5 text-sm font-semibold bg-emerald-800 text-white border border-emerald-700 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                {language === 'te' ? 'గ్రామ అభిప్రాయం పంపండి' : 'Submit Community Feedback'}
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 min-h-[240px]">
            <ImageWithFallback
              src="/src/assets/images/renewable_learning_landscape_1794934117474.jpg"
              alt="Clean wind turbines and solar farm beside river and green hills"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Editable CSP Field Visit Photo Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <h2 className="text-2xl font-bold text-emerald-950">
              {t(HOME_COPY.fieldGalleryTitle, language)}
            </h2>
            <p className="text-sm text-slate-600">
              {t(HOME_COPY.fieldGallerySubtitle, language)}
            </p>
          </div>
          <button
            type="button"
            onClick={resetFieldPhotos}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 self-start"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{language === 'te' ? 'డిఫాల్ట్ చిత్రాలు పునరుద్ధరించు' : 'Reset Default Photos'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {fieldPhotos.map((slot) => {
            const isEditing = editingPhotoId === slot.id;
            return (
              <div
                key={slot.id}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                    <ImageWithFallback
                      src={slot.imageUrl}
                      alt={t(slot.title, language)}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5 space-y-2">
                    <p className="text-xs font-medium text-sky-800">{slot.location}</p>
                    <h3 className="text-base font-bold text-slate-900">
                      {t(slot.title, language)}
                    </h3>
                    {isEditing ? (
                      <div className="space-y-2 pt-1">
                        <input
                          type="text"
                          value={editLocation}
                          onChange={(e) => setEditLocation(e.target.value)}
                          placeholder="Location"
                          className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg"
                        />
                        <textarea
                          rows={2}
                          value={editCaption}
                          onChange={(e) => setEditCaption(e.target.value)}
                          className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => savePhotoEdit(slot.id)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-emerald-800 text-white rounded-lg"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>{language === 'te' ? 'సేవ్ చేయండి' : 'Save Note'}</span>
                        </button>
                      </div>
                    ) : (
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {t(slot.caption, language)}
                      </p>
                    )}
                  </div>
                </div>

                <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/70 flex items-center justify-between gap-2">
                  <input
                    ref={(el) => {
                      fileInputRefs.current[slot.id] = el;
                    }}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handlePhotoUpload(slot.id, e.target.files?.[0])}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRefs.current[slot.id]?.click()}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>{language === 'te' ? 'ఫోటో మార్చండి' : 'Upload Field Photo'}</span>
                  </button>

                  {!isEditing && (
                    <button
                      type="button"
                      onClick={() =>
                        startEditingPhoto(slot.id, t(slot.caption, language), slot.location)
                      }
                      className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-slate-900"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      <span>{language === 'te' ? 'వివరం మార్చు' : 'Edit Caption'}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
