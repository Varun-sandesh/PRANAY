import React, { useState } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface QuizQuestion {
  id: string;
  translationKey: string;
  options: { value: string; translationKey: string }[];
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    translationKey: 'q1',
    options: [
      { value: 'rarely', translationKey: 'rarely' },
      { value: 'sometimes', translationKey: 'sometimes' },
      { value: 'often', translationKey: 'often' },
      { value: 'always', translationKey: 'always' },
    ],
  },
  {
    id: 'q2',
    translationKey: 'q2',
    options: [
      { value: 'good', translationKey: 'good' },
      { value: 'average', translationKey: 'average' },
      { value: 'poor', translationKey: 'poor' },
    ],
  },
  {
    id: 'q3',
    translationKey: 'q3',
    options: [
      { value: 'yes', translationKey: 'yes' },
      { value: 'sometimes', translationKey: 'sometimes' },
      { value: 'no', translationKey: 'no' },
    ],
  },
  {
    id: 'q4',
    translationKey: 'q4',
    options: [
      { value: 'rarely', translationKey: 'rarely' },
      { value: 'sometimes', translationKey: 'sometimes' },
      { value: 'often', translationKey: 'often' },
      { value: 'always', translationKey: 'always' },
    ],
  },
  {
    id: 'q5',
    translationKey: 'q5',
    options: [
      { value: 'yes', translationKey: 'yes' },
      { value: 'sometimes', translationKey: 'sometimes' },
      { value: 'no', translationKey: 'no' },
    ],
  },
];

interface QuizProps {
  onQuizComplete: (score: number, condition: string) => void;
}

const Quiz: React.FC<QuizProps> = ({ onQuizComplete }) => {
  const { language, translations } = useLanguage();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentStep, setCurrentStep] = useState(0);

  if (!translations || !language) return null;

  const getTranslation = (key: string, fallback: string): string =>
    translations[key]?.[language] || fallback;

  const handleSelectOption = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const isCurrentQuestionAnswered = () => {
    return answers[quizQuestions[currentStep].id] !== undefined;
  };

  const handleNext = () => {
    if (currentStep < quizQuestions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      analyzeQuiz();
    }
  };

  const analyzeQuiz = () => {
    let score = 0;

    Object.values(answers).forEach(value => {
      if (value === 'always' || value === 'poor' || value === 'no') {
        score += 3;
      } else if (value === 'often' || value === 'sometimes') {
        score += 2;
      } else {
        score += 1;
      }
    });

    const conditionKey =
      score >= 12
        ? 'highStressCondition'
        : score >= 8
        ? 'moderateStressCondition'
        : 'lowStressCondition';

    const condition = getTranslation(conditionKey, 'You’re doing okay!');

    onQuizComplete(score, condition);
  };

  return (
<section id="quiz" className="min-h-screen bg-[#F4F6FC] py-16 px-4">
      <div className="container mx-auto px-4 max-w-3xl">
      <h2 className="text-4xl font-semibold text-center mb-10 text-indigo-700">
          {getTranslation('quizTitle', 'Wellness Quiz')}
        </h2>

        <div className="mb-8 overflow-hidden bg-indigo-50 h-2 rounded-full">
          <div
            className="h-full bg-gradient-to-r from-indigo-400 to-cyan-400 transition-all duration-500 ease-out rounded-full"
            style={{ width: `${((currentStep + 1) / quizQuestions.length) * 100}%` }}
          ></div>
        </div>

        <div className="card-container">
          {quizQuestions.map((q, index) => (
            <div
              key={q.id}
              className={`transition-all duration-500 ease-in-out transform ${
                index === currentStep
                  ? 'opacity-100 translate-x-0'
                  : index < currentStep
                  ? 'opacity-0 -translate-x-full hidden'
                  : 'opacity-0 translate-x-full hidden'
              }`}
            >
              <div className="quiz-card">
                <h3 className="text-xl font-medium text-indigo-800 mb-6">
                  {getTranslation(q.translationKey, 'Question')}
                </h3>

                <div className="space-y-3">
                  {q.options.map(option => (
                    <button
                      key={option.value}
                      onClick={() => handleSelectOption(q.id, option.value)}
                      className={`option-btn ${
                        answers[q.id] === option.value ? 'selected' : ''
                      }`}
                    >
                      <span>
                        {getTranslation(option.translationKey, option.value)}
                      </span>
                      {answers[q.id] === option.value && (
                        <CheckCircle className="h-5 w-5" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}

          <div className="mt-8 flex justify-end">
            <button
              onClick={handleNext}
              disabled={!isCurrentQuestionAnswered()}
              className={`btn-primary flex items-center ${
                !isCurrentQuestionAnswered() ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <span>
                {currentStep < quizQuestions.length - 1
                  ? getTranslation('next', 'Next')
                  : getTranslation('seeResults', 'See Results')}
              </span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Quiz;
