import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { AlertCircle, Calculator, HelpCircle, MessageSquare } from 'lucide-react';
import { useAppContext } from '../hooks/useAppContext';
import {
  DEMO_FEEDBACK_SUBMISSIONS,
  DEMO_QUIZ_ATTEMPTS,
} from '../services/storageService';
import { estimateSolarSystem } from '../utils/energyCalculations';
import { t } from '../data/translations';

const PIE_COLORS = ['#15803d', '#0284c7', '#0d9488', '#d97706', '#6366f1'];

export function DashboardPage() {
  const {
    language,
    energySummary,
    quizAttempts,
    feedbacks,
    showDemoData,
    setShowDemoData,
    navigateTo,
  } = useAppContext();

  const displayedQuizAttempts = showDemoData
    ? [...quizAttempts, ...DEMO_QUIZ_ATTEMPTS]
    : quizAttempts;

  const displayedFeedbacks = showDemoData
    ? [...feedbacks, ...DEMO_FEEDBACK_SUBMISSIONS]
    : feedbacks;

  const latestQuiz = displayedQuizAttempts[0] || null;
  const averageQuizPct =
    displayedQuizAttempts.length > 0
      ? Math.round(
          displayedQuizAttempts.reduce((acc, q) => acc + q.percentage, 0) /
            displayedQuizAttempts.length
        )
      : 0;

  const solarRecommendation = estimateSolarSystem(energySummary.totalMonthlyKwh);

  // Aggregate feedback by category
  const feedbackByCategoryMap = new Map<string, number>();
  displayedFeedbacks.forEach((fb) => {
    feedbackByCategoryMap.set(
      fb.communityCategory,
      (feedbackByCategoryMap.get(fb.communityCategory) || 0) + 1
    );
  });
  const feedbackChartData = Array.from(feedbackByCategoryMap.entries()).map(
    ([category, count]) => ({
      category,
      count,
    })
  );

  // Appliance chart data
  const applianceChartData = energySummary.applianceBreakdown.map((item) => ({
    name: item.name.length > 14 ? `${item.name.slice(0, 12)}…` : item.name,
    monthlyKwh: item.monthlyKwh,
    savingsKwh: item.potentialMonthlySavingsKwh,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header + Transparent Data Mode Toggle */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div className="space-y-1.5">
          <p className="text-xs font-semibold text-emerald-700">
            {language === 'te' ? 'సమగ్ర విశ్లేషణ కేంద్రం' : 'Live Community & Household Analytics'}
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-emerald-950">
            {language === 'te' ? 'GREENPOWER పరిష్కార డాష్‌బోర్డ్' : 'Solution Dashboard'}
          </h1>
          <p className="text-sm text-slate-600">
            {language === 'te'
              ? 'మీరు నమోదు చేసిన విద్యుత్ లెక్కలు, క్విజ్ స్కోర్లు మరియు కమ్యూనిటీ అభిప్రాయాల ప్రత్యక్ష సారాంశం.'
              : 'Real-time summary of your entered electricity load, estimated expenses, potential savings, quiz performance, and community feedback.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl p-3 self-start">
          <label className="inline-flex items-center gap-2.5 text-xs font-semibold text-slate-800 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showDemoData}
              onChange={(e) => setShowDemoData(e.target.checked)}
              className="w-4 h-4 accent-emerald-700 rounded"
            />
            <span>
              {language === 'te'
                ? 'నమూనా ప్రదర్శన డేటాను (Demo) చూపించు'
                : 'Include Labeled Demonstration Sample Data'}
            </span>
          </label>
        </div>
      </div>

      {/* Data Provenance Notice */}
      <div className="flex items-start gap-2.5 p-4 bg-sky-50 border border-sky-200 rounded-xl text-xs text-sky-950">
        <AlertCircle className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
        <p>
          {showDemoData
            ? language === 'te'
              ? 'ప్రదర్శన మోడ్ ఆన్‌లో ఉంది: నిజమైన వినియోగదారు ఎంట్రీలతో పాటు స్పష్టంగా "(Demo)" అని గుర్తించబడిన నమూనా డేటా కూడా చూపబడుతోంది.'
              : 'Demonstration Sample Data is enabled alongside your real user submissions. Demo entries are explicitly marked "(Demo)" and can be turned off above.'
            : language === 'te'
              ? `ప్రస్తుతం కేవలం మీరు నమోదు చేసిన నిజమైన డేటా మాత్రమే చూపబడుతోంది (${quizAttempts.length} క్విజ్ ప్రయత్నాలు, ${feedbacks.length} అభిప్రాయాలు).`
              : `Showing strictly your real user-entered data (${quizAttempts.length} quiz attempts, ${feedbacks.length} feedback submissions). No fabricated statistics are shown.`}
        </p>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-1">
          <p className="text-xs font-medium text-slate-500">
            {language === 'te' ? 'నమోదు చేసిన నెలవారీ వినియోగం' : 'Entered Monthly Usage'}
          </p>
          <p className="text-2xl font-bold text-emerald-950 font-mono-tabular">
            {energySummary.totalMonthlyKwh} kWh
          </p>
          <p className="text-xs text-slate-500">
            {energySummary.totalDailyKwh} kWh / {language === 'te' ? 'రోజుకు' : 'day'}
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-1">
          <p className="text-xs font-medium text-slate-500">
            {language === 'te' ? 'అంచనా నెలవారీ ఖర్చు' : 'Estimated Monthly Expense'}
          </p>
          <p className="text-2xl font-bold text-sky-950 font-mono-tabular">
            ₹{energySummary.estimatedMonthlyCostInr}
          </p>
          <p className="text-xs text-slate-500">
            {language === 'te'
              ? `సూచించిన సోలార్: ${solarRecommendation.recommendedKw} kW`
              : `Suggested solar offset: ${solarRecommendation.recommendedKw} kW`}
          </p>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 space-y-1">
          <p className="text-xs font-semibold text-emerald-800">
            {language === 'te' ? 'సంభావ్య నెలవారీ ఆదా' : 'Potential Energy Savings'}
          </p>
          <p className="text-2xl font-bold text-emerald-950 font-mono-tabular">
            ₹{energySummary.potentialMonthlySavingsInr}
          </p>
          <p className="text-xs text-emerald-800 font-mono-tabular">
            {energySummary.potentialMonthlySavingsKwh} kWh / mo
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-1">
          <p className="text-xs font-medium text-slate-500">
            {language === 'te' ? 'క్విజ్ & అభిప్రాయ గణాంకాలు' : 'Quiz & Feedback Activity'}
          </p>
          <p className="text-2xl font-bold text-slate-900 font-mono-tabular">
            {displayedQuizAttempts.length > 0 ? `${averageQuizPct}%` : '—'}
          </p>
          <p className="text-xs text-slate-500">
            {displayedQuizAttempts.length} {language === 'te' ? 'క్విజ్' : 'quizzes'} ·{' '}
            {displayedFeedbacks.length} {language === 'te' ? 'అభిప్రాయాలు' : 'feedbacks'}
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">
              {language === 'te'
                ? 'నమోదు చేసిన పరికరాల వినియోగం & ఆదా (kWh)'
                : 'Entered Appliances: Usage vs. Potential Savings (kWh)'}
            </h2>
            <button
              type="button"
              onClick={() => navigateTo('calculator')}
              className="text-xs font-semibold text-emerald-800 hover:underline inline-flex items-center gap-1"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>{language === 'te' ? 'మార్చు' : 'Edit Load'}</span>
            </button>
          </div>

          {applianceChartData.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-sm text-slate-500 border border-dashed border-slate-200 rounded-xl">
              <p>No appliances entered yet.</p>
              <button
                type="button"
                onClick={() => navigateTo('calculator')}
                className="mt-2 px-3 py-1.5 text-xs font-semibold bg-emerald-800 text-white rounded-lg"
              >
                Open Calculator
              </button>
            </div>
          ) : (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={applianceChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar
                    dataKey="monthlyKwh"
                    name={language === 'te' ? 'వినియోగం (kWh)' : 'Monthly kWh'}
                    fill="#15803d"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="savingsKwh"
                    name={language === 'te' ? 'ఆదా అవకాశం (kWh)' : 'Saveable kWh'}
                    fill="#0284c7"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">
              {language === 'te'
                ? 'కమ్యూనిటీ అభిప్రాయాల విభజన'
                : 'Community Feedback by Category'}
            </h2>
            <button
              type="button"
              onClick={() => navigateTo('feedback')}
              className="text-xs font-semibold text-sky-800 hover:underline inline-flex items-center gap-1"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{language === 'te' ? 'కొత్తది జతచేయి' : 'Add Feedback'}</span>
            </button>
          </div>

          {feedbackChartData.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center p-4 text-sm text-slate-500 border border-dashed border-slate-200 rounded-xl space-y-2">
              <p>
                {language === 'te'
                  ? 'ఇప్పటివరకు నిజమైన అభిప్రాయాలు లేవు. అభిప్రాయం సమర్పించండి లేదా పైన Demo డేటా ఆన్ చేయండి.'
                  : 'No user-submitted feedback yet. Submit feedback or enable Demonstration Sample Data above.'}
              </p>
              <button
                type="button"
                onClick={() => navigateTo('feedback')}
                className="px-3 py-1.5 text-xs font-semibold bg-sky-700 text-white rounded-lg"
              >
                {language === 'te' ? 'అభిప్రాయం పంపండి' : 'Submit Feedback'}
              </button>
            </div>
          ) : (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={feedbackChartData}
                    dataKey="count"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, value }) => `${name ?? ''}: ${value ?? 0}`}
                  >
                    {feedbackChartData.map((_, idx) => (
                      <Cell
                        key={`fb-cell-${idx}`}
                        fill={PIE_COLORS[idx % PIE_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Split: Renewable Recommendations + Quiz History */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <h2 className="text-base font-bold text-slate-900">
            {language === 'te'
              ? 'మీ వినియోగానికి తగిన పునరుత్పాదక శక్తి సూచనలు'
              : 'Active Renewable & Conservation Recommendations'}
          </h2>

          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
            <p className="text-xs font-semibold text-emerald-800">
              {language === 'te' ? 'సోలార్ అంచనా సారాంశం' : 'Solar System Match'}
            </p>
            <p className="text-sm font-bold text-emerald-950">
              {solarRecommendation.recommendedKw} kW · ~{solarRecommendation.estimatedMonthlyGenKwh} kWh/month
            </p>
            <p className="text-xs text-slate-700">
              {t(solarRecommendation.suitableSystemType, language)}
            </p>
          </div>

          <ul className="space-y-2.5">
            {energySummary.suggestions.slice(0, 3).map((sug) => (
              <li
                key={sug.id}
                className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-0.5"
              >
                <p className="text-sm font-semibold text-slate-900">
                  {t(sug.title, language)}
                </p>
                <p className="text-xs text-emerald-800 font-medium">
                  {t(sug.estimatedSavingText, language)}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">
              {language === 'te' ? 'క్విజ్ పనితీరు చరిత్ర' : 'Quiz Performance History'}
            </h2>
            <button
              type="button"
              onClick={() => navigateTo('quiz')}
              className="text-xs font-semibold text-emerald-800 hover:underline inline-flex items-center gap-1"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{language === 'te' ? 'క్విజ్ ఆడండి' : 'Take Quiz'}</span>
            </button>
          </div>

          {displayedQuizAttempts.length === 0 ? (
            <div className="py-10 text-center text-sm text-slate-500 border border-dashed border-slate-200 rounded-xl space-y-2">
              <p>
                {language === 'te'
                  ? 'ఇంకా క్విజ్ ప్రయత్నాలు లేవు. మీ స్కోర్ నమోదు చేయడానికి క్విజ్ పూర్తి చేయండి.'
                  : 'No quiz attempts recorded yet. Complete the Green Energy Quiz to see your score here.'}
              </p>
              <button
                type="button"
                onClick={() => navigateTo('quiz')}
                className="px-4 py-2 text-xs font-semibold bg-emerald-800 text-white rounded-lg"
              >
                {language === 'te' ? 'క్విజ్ ప్రారంభించండి' : 'Start Quiz'}
              </button>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {latestQuiz && (
                <div className="pb-3 text-xs text-slate-600">
                  {language === 'te' ? 'తాజా స్కోర్: ' : 'Latest Score: '}
                  <strong className="text-emerald-900 font-mono-tabular">
                    {latestQuiz.score}/{latestQuiz.totalQuestions} ({latestQuiz.percentage}%)
                  </strong>
                </div>
              )}
              {displayedQuizAttempts.slice(0, 6).map((attempt) => (
                <div
                  key={attempt.id}
                  className="py-3 flex items-center justify-between gap-4 text-sm"
                >
                  <div>
                    <p className="font-semibold text-slate-900 font-mono-tabular">
                      {attempt.score} / {attempt.totalQuestions} ({attempt.percentage}%)
                      {attempt.isDemo ? ' (Demo)' : ''}
                    </p>
                    <p className="text-xs text-slate-500">
                      {new Date(attempt.completedAt).toLocaleDateString()} ·{' '}
                      {attempt.language === 'te' ? 'Telugu' : 'English'}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-semibold ${
                      attempt.percentage >= 70 ? 'text-emerald-700' : 'text-amber-700'
                    }`}
                  >
                    {attempt.percentage >= 70
                      ? language === 'te'
                        ? 'ఉత్తీర్ణత'
                        : 'Strong'
                      : language === 'te'
                        ? 'సమీక్షించండి'
                        : 'Review'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
