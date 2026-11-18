import React, { useState } from 'react';
import { CheckCircle2, Database, Send } from 'lucide-react';
import { useAppContext } from '../hooks/useAppContext';
import {
  AwarenessLevel,
  CommunityCategory,
  FeedbackSubmission,
} from '../types/energy';

const CATEGORIES: CommunityCategory[] = [
  'Household',
  'Farmer / Agriculture',
  'Student / Youth',
  'School / Educator',
  'Small Business',
];

const AWARENESS_LEVELS: AwarenessLevel[] = [
  'Beginner',
  'Basic',
  'Moderate',
  'Well Aware',
];

export function FeedbackPage() {
  const {
    language,
    feedbacks,
    addFeedback,
    isFirebaseConfigured,
    setIsFirebaseGuideOpen,
  } = useAppContext();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [communityCategory, setCommunityCategory] =
    useState<CommunityCategory>('Household');
  const [awarenessLevel, setAwarenessLevel] = useState<AwarenessLevel>('Basic');
  const [suggestions, setSuggestions] = useState('');
  const [message, setMessage] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRecord, setSubmittedRecord] = useState<FeedbackSubmission | null>(
    null
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (name.trim().length < 2) {
      setError(
        language === 'te'
          ? 'దయచేసి మీ పేరు (కనీసం 2 అక్షరాలు) నమోదు చేయండి.'
          : 'Please enter your name (at least 2 characters).'
      );
      return;
    }

    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError(
        language === 'te'
          ? 'దయచేసి సరైన ఈమెయిల్ చిరునామా ఇవ్వండి లేదా ఖాళీగా ఉంచండి.'
          : 'Please enter a valid email address or leave the email field blank.'
      );
      return;
    }

    if (message.trim().length < 5) {
      setError(
        language === 'te'
          ? 'దయచేసి మీ అభిప్రాయాన్ని కనీసం 5 అక్షరాలలో నమోదు చేయండి.'
          : 'Please write a feedback message (at least 5 characters).'
      );
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const entry: FeedbackSubmission = {
        id: `fb-${Date.now()}`,
        name: name.trim(),
        email: email.trim() || undefined,
        communityCategory,
        awarenessLevel,
        suggestions: suggestions.trim(),
        message: message.trim(),
        submittedAt: new Date().toISOString(),
        isDemo: false,
      };

      addFeedback(entry);
      setSubmittedRecord(entry);
      setName('');
      setEmail('');
      setSuggestions('');
      setMessage('');
      setIsSubmitting(false);
    }, 250);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div className="space-y-2 max-w-2xl">
          <p className="text-xs font-semibold text-emerald-700">
            {language === 'te' ? 'సమాజ భాగస్వామ్యం' : 'Srinivasaraopeta Community Input'}
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-emerald-950">
            {language === 'te' ? 'కమ్యూనిటీ అభిప్రాయ పత్రం' : 'Community Feedback'}
          </h1>
          <p className="text-sm text-slate-600">
            {language === 'te'
              ? 'సౌర, బయోమాస్ మరియు విద్యుత్ పొదుపు కార్యక్రమాలపై మీ అభిప్రాయాలు మరియు సూచనలను పంచుకోండి.'
              : 'Share your electricity challenges, renewable energy awareness level, and suggestions for Srinivasaraopeta.'}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsFirebaseGuideOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-sky-900 bg-sky-50 border border-sky-200 rounded-lg hover:bg-sky-100 self-start"
        >
          <Database className="w-3.5 h-3.5 text-sky-700" />
          <span>
            {isFirebaseConfigured
              ? 'Firestore Connected'
              : language === 'te'
                ? 'ఫైర్‌బేస్ సెటప్ వివరాలు'
                : 'Configure Cloud Firestore'}
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-5"
        >
          {submittedRecord && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div className="text-sm text-emerald-950">
                <p className="font-bold">
                  {language === 'te'
                    ? 'ధన్యవాదాలు! మీ అభిప్రాయం విజయవంతంగా నమోదైంది.'
                    : 'Thank you! Your community feedback has been saved.'}
                </p>
                <p className="text-xs text-emerald-800 mt-1">
                  {language === 'te'
                    ? 'మీ సూచన డాష్‌బోర్డ్ గణాంకాలలో జతచేయబడింది.'
                    : 'Your submission is now reflected in the Community Feedback list and Solution Dashboard.'}
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {language === 'te' ? 'మీ పేరు *' : 'Full Name *'}
              </label>
              <input
                type="text"
                required
                maxLength={100}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={language === 'te' ? 'ఉదా: రమేష్' : 'e.g., Ramesh Naidu'}
                className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-700"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {language === 'te' ? 'ఈమెయిల్ (ఐచ్ఛికం)' : 'Email (Optional)'}
              </label>
              <input
                type="email"
                maxLength={120}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-700"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {language === 'te' ? 'వర్గం *' : 'Community Category *'}
              </label>
              <select
                value={communityCategory}
                onChange={(e) => setCommunityCategory(e.target.value as CommunityCategory)}
                className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:border-emerald-700"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {language === 'te' ? 'అవగాహన స్థాయి *' : 'Current Awareness Level *'}
              </label>
              <select
                value={awarenessLevel}
                onChange={(e) => setAwarenessLevel(e.target.value as AwarenessLevel)}
                className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:border-emerald-700"
              >
                {AWARENESS_LEVELS.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              {language === 'te'
                ? 'మీ సూచనలు (ఉదా: సోలార్ లేదా బయోమాస్ శిక్షణ)'
                : 'Suggestions for Community Improvement'}
            </label>
            <input
              type="text"
              maxLength={300}
              value={suggestions}
              onChange={(e) => setSuggestions(e.target.value)}
              placeholder={
                language === 'te'
                  ? 'ఉదా: గ్రామంలో సోలార్ సబ్సిడీపై అవగాహన సభ పెట్టాలి'
                  : 'e.g., Organize a village workshop on rooftop solar subsidies'
              }
              className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-700"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              {language === 'te' ? 'అభిప్రాయం / సందేశం *' : 'Feedback Message *'}
            </label>
            <textarea
              rows={4}
              required
              maxLength={1500}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={
                language === 'te'
                  ? 'ఈ వేదిక మీకు ఎలా ఉపయోగపడిందో తెలియజేయండి...'
                  : 'Share how GREENPOWER helped your household, school, or farm...'
              }
              className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-700"
            />
          </div>

          {error && (
            <p className="text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            <span>
              {isSubmitting
                ? language === 'te'
                  ? 'నమోదు అవుతోంది...'
                  : 'Submitting...'
                : language === 'te'
                  ? 'అభిప్రాయం పంపండి'
                  : 'Submit Feedback'}
            </span>
          </button>
        </form>

        {/* Submitted User Feedback List */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">
              {language === 'te' ? 'నమోదైన వినియోగదారు అభిప్రాయాలు' : 'Submitted User Feedback'}
            </h2>
            <span className="text-xs font-mono-tabular text-slate-500">
              {feedbacks.length} {language === 'te' ? 'ఎంట్రీలు' : 'entries'}
            </span>
          </div>

          {feedbacks.length === 0 ? (
            <div className="py-8 text-center text-sm text-slate-500">
              {language === 'te'
                ? 'ఇప్పటివరకు నిజమైన అభిప్రాయాలు నమోదు కాలేదు. మొదటి అభిప్రాయాన్ని పంపండి!'
                : 'No user feedback submitted yet. Submit the form to record the first real community response.'}
            </div>
          ) : (
            <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
              {feedbacks.map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5"
                >
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-500">
                    <span className="font-semibold text-emerald-900">{item.name}</span>
                    <span>
                      {item.communityCategory} · {item.awarenessLevel}
                    </span>
                  </div>
                  <p className="text-sm text-slate-800 leading-relaxed">{item.message}</p>
                  {item.suggestions && (
                    <p className="text-xs text-sky-900">
                      <strong>{language === 'te' ? 'సూచన: ' : 'Suggestion: '}</strong>
                      {item.suggestions}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
