import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  CheckCircle2,
  RotateCcw,
  XCircle,
} from 'lucide-react';
import { useAppContext } from '../hooks/useAppContext';
import { QUIZ_QUESTIONS } from '../data/learningData';
import { t } from '../data/translations';

export function QuizPage() {
  const { language, recordQuizAttempt, navigateTo } = useAppContext();

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentQuestion = QUIZ_QUESTIONS[currentIdx];
  const totalQuestions = QUIZ_QUESTIONS.length;
  const selectedOption = selectedAnswers[currentQuestion.id];

  const answeredCount = Object.keys(selectedAnswers).length;
  const score = QUIZ_QUESTIONS.reduce((acc, q) => {
    return acc + (selectedAnswers[q.id] === q.correctIndex ? 1 : 0);
  }, 0);

  const handleSelectOption = (optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionIndex,
    }));
  };

  const handleFinishQuiz = () => {
    setIsSubmitted(true);
    const percentage = Math.round((score / totalQuestions) * 100);
    recordQuizAttempt({
      id: `quiz-${Date.now()}`,
      score,
      totalQuestions,
      percentage,
      completedAt: new Date().toISOString(),
      language,
    });
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setCurrentIdx(0);
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    const percentage = Math.round((score / totalQuestions) * 100);
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
            <Award className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-emerald-950">
            {language === 'te' ? 'క్విజ్ పూర్తయింది!' : 'Quiz Completed!'}
          </h1>
          <p className="text-4xl font-extrabold text-emerald-800 font-mono-tabular">
            {score} / {totalQuestions} ({percentage}%)
          </p>
          <p className="text-sm text-slate-600 max-w-lg mx-auto">
            {percentage >= 80
              ? language === 'te'
                ? 'అద్భుతం! పునరుత్పాదక శక్తి మరియు విద్యుత్ ఆదాపై మీకు గొప్ప అవగాహన ఉంది.'
                : 'Excellent work! You have strong practical knowledge of solar, biomass, and electricity conservation.'
              : language === 'te'
                ? 'మంచి ప్రయత్నం! క్రింద ఉన్న సమాధాన వివరణలు చదివి మళ్లీ ప్రయత్నించండి.'
                : 'Good effort! Review the answer explanations below to strengthen your clean-energy knowledge.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleRestart}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{language === 'te' ? 'మళ్లీ క్విజ్ ప్రారంభించండి' : 'Restart Quiz'}</span>
            </button>
            <button
              type="button"
              onClick={() => navigateTo('dashboard')}
              className="px-5 py-2.5 text-sm font-semibold text-emerald-900 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100"
            >
              {language === 'te' ? 'డాష్‌బోర్డ్‌లో ఫలితాలు చూడండి' : 'View in Solution Dashboard'}
            </button>
          </div>
        </div>

        {/* Full Answer Review */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-emerald-950">
            {language === 'te' ? 'సమాధానాలు & వివరణలు' : 'Answer Key & Explanations'}
          </h2>
          {QUIZ_QUESTIONS.map((q, idx) => {
            const userChoice = selectedAnswers[q.id];
            const isCorrect = userChoice === q.correctIndex;
            return (
              <div
                key={q.id}
                className="bg-white border border-slate-200 rounded-xl p-5 space-y-2.5"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-bold text-slate-900">
                    {idx + 1}. {t(q.question, language)}
                  </p>
                  {isCorrect ? (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                      {language === 'te' ? 'సరైనది' : 'Correct'}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-700 shrink-0">
                      <XCircle className="w-4 h-4" />
                      {language === 'te' ? 'తప్పు' : 'Incorrect'}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600">
                  <strong>{language === 'te' ? 'సరైన సమాధానం: ' : 'Correct Answer: '}</strong>
                  <span className="text-emerald-800 font-semibold">
                    {t(q.options[q.correctIndex], language)}
                  </span>
                </p>

                <p className="text-xs text-slate-600 bg-slate-50 border border-slate-100 rounded-lg p-3 leading-relaxed">
                  {t(q.explanation, language)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="space-y-1.5">
          <p className="text-xs font-semibold text-emerald-700">
            {language === 'te' ? 'జ్ఞాన పరీక్ష · 22 ప్రశ్నలు' : 'Interactive Assessment · 22 Questions'}
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-emerald-950">
            {language === 'te' ? 'గ్రీన్ ఎనర్జీ అవగాహన క్విజ్' : 'Interactive Green Energy Quiz'}
          </h1>
        </div>
        <div className="text-sm font-mono-tabular font-semibold text-slate-700">
          {language === 'te'
            ? `ప్రశ్న ${currentIdx + 1} / ${totalQuestions}`
            : `Question ${currentIdx + 1} of ${totalQuestions}`}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-emerald-700 transition-all duration-200"
          style={{ width: `${((currentIdx + 1) / totalQuestions) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="space-y-2">
          <p className="text-xs font-medium text-sky-800 uppercase tracking-wide">
            {currentQuestion.topic}
          </p>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
            {t(currentQuestion.question, language)}
          </h2>
        </div>

        <div className="space-y-3">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQuestion.correctIndex;
            const showFeedback = selectedOption !== undefined;

            let optionClasses =
              'border-slate-200 bg-white hover:border-emerald-700/50 text-slate-800';
            if (showFeedback) {
              if (isCorrect) {
                optionClasses = 'border-emerald-600 bg-emerald-50 text-emerald-950 font-semibold';
              } else if (isSelected && !isCorrect) {
                optionClasses = 'border-red-500 bg-red-50 text-red-950';
              }
            } else if (isSelected) {
              optionClasses = 'border-emerald-700 bg-emerald-50 text-emerald-950 font-semibold';
            }

            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectOption(idx)}
                className={`w-full text-left p-4 rounded-xl border transition-colors flex items-center justify-between gap-3 ${optionClasses}`}
              >
                <span className="text-sm sm:text-base">
                  <span className="font-mono-tabular font-semibold mr-2.5 text-slate-500">
                    {String.fromCharCode(65 + idx)}.
                  </span>
                  {t(option, language)}
                </span>
                {showFeedback && isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                )}
                {showFeedback && isSelected && !isCorrect && (
                  <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Immediate Answer Explanation */}
        {selectedOption !== undefined && (
          <div className="p-4 bg-sky-50 border border-sky-200 rounded-xl text-sm text-sky-950 leading-relaxed">
            <strong>{language === 'te' ? 'వివరణ: ' : 'Explanation: '}</strong>
            {t(currentQuestion.explanation, language)}
          </div>
        )}

        {/* Navigation Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
          <button
            type="button"
            disabled={currentIdx === 0}
            onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === 'te' ? 'మునుపటిది' : 'Previous'}</span>
          </button>

          <span className="text-xs text-slate-500 font-mono-tabular">
            {language === 'te'
              ? `సమాధానం ఇచ్చినవి: ${answeredCount}/${totalQuestions}`
              : `Answered: ${answeredCount}/${totalQuestions}`}
          </span>

          {currentIdx < totalQuestions - 1 ? (
            <button
              type="button"
              onClick={() => setCurrentIdx((i) => Math.min(totalQuestions - 1, i + 1))}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg"
            >
              <span>{language === 'te' ? 'తర్వాతి ప్రశ్న' : 'Next'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinishQuiz}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg"
            >
              <span>{language === 'te' ? 'ఫలితం చూడండి' : 'Finish & Calculate Score'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
