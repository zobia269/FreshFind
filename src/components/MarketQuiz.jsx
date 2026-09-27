import React, { useState } from 'react';
import { Trophy, CheckCircle2, XCircle, ArrowRight, RotateCcw, Award, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { QUIZ_QUESTIONS } from '../data/quizData';

export default function MarketQuiz() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (index) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    if (index === currentQ.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
      // Trigger festive confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  const getBadgeTitle = (finalScore) => {
    if (finalScore >= 9) return { title: 'Master of Brix & Foraging', emoji: '👑', desc: 'Elite Agronomic Expert! You know your heirlooms from your F1 hybrids and could run a Michelin-starred farm-to-table kitchen.' };
    if (finalScore >= 7) return { title: 'Artisanal Market Forager', emoji: '🌿', desc: 'Seasoned Shopper! You spot the ripest melons, dry-farmed tomatoes, and wild alliums with ease.' };
    if (finalScore >= 5) return { title: 'Farmers Market Regular', emoji: '🧺', desc: 'Good Eye! You know the market basics and know how to avoid premature non-climacteric fruit.' };
    return { title: 'Market Apprentice', emoji: '🌱', desc: 'A promising start! Use the FreshFind dictionary to master your sensory tests and ripeness cues.' };
  };

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Quiz Header */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
          <Trophy className="w-3.5 h-3.5 text-amber-600" />
          Interactive Market Challenge
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 font-serif">
          The Farmers Market Master Quiz
        </h2>
        <p className="text-sm text-slate-600">
          Test your knowledge of rare heirlooms, Brix sweetness science, wild foraging safety, and sensory ripeness cues.
        </p>
      </div>

      {!quizFinished ? (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-md space-y-6">
          
          {/* Progress Header */}
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold border-b border-slate-100 pb-4">
            <span>Question {currentIdx + 1} of {QUIZ_QUESTIONS.length}</span>
            <span className="text-emerald-700">Current Score: {score}</span>
          </div>

          {/* Progress Bar */}
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 transition-all duration-300"
              style={{ width: `${((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
            />
          </div>

          {/* Question Text */}
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-serif leading-snug">
            {currentQ.question}
          </h3>

          {/* Options Grid */}
          <div className="space-y-3">
            {currentQ.options.map((opt, idx) => {
              let btnStyle = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-emerald-50 hover:border-emerald-300';
              
              if (isAnswered) {
                if (idx === currentQ.correctAnswer) {
                  btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-300';
                } else if (idx === selectedOption) {
                  btnStyle = 'bg-rose-100 border-rose-500 text-rose-950 font-bold ring-2 ring-rose-300';
                } else {
                  btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {isAnswered && idx === currentQ.correctAnswer && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {isAnswered && idx === selectedOption && idx !== currentQ.correctAnswer && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Callout */}
          {isAnswered && (
            <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-950 space-y-1 animate-in fade-in">
              <strong className="font-bold block text-emerald-900">
                {selectedOption === currentQ.correctAnswer ? '🎉 Spot On!' : '💡 Agricultural Fact:'}
              </strong>
              <p className="leading-relaxed">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Next Button */}
          {isAnswered && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
              >
                <span>{currentIdx < QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'View Results'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      ) : (
        /* Quiz Finished Screen */
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl text-center space-y-6">
          <div className="w-24 h-24 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto text-5xl shadow-inner">
            {getBadgeTitle(score).emoji}
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
              Quiz Completed
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
              You Scored {score} / {QUIZ_QUESTIONS.length}
            </h3>
            <p className="text-lg font-bold text-emerald-800 font-serif">
              Badge Earned: {getBadgeTitle(score).title}
            </p>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              {getBadgeTitle(score).desc}
            </p>
          </div>

          <div className="pt-4 flex justify-center gap-4">
            <button
              onClick={handleRestart}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Quiz</span>
            </button>
          </div>
        </div>
      )}

    </section>
  );
}
