export type Language = 'en' | 'te';

export type PageId =
  | 'home'
  | 'calculator'
  | 'solar'
  | 'biomass'
  | 'recommendations'
  | 'learning'
  | 'telugu'
  | 'quiz'
  | 'feedback'
  | 'dashboard';

export interface BilingualText {
  en: string;
  te: string;
}

export interface ApplianceEntry {
  id: string;
  name: string;
  watts: number;
  quantity: number;
  hoursPerDay: number;
  daysPerMonth: number;
  category: 'lighting' | 'cooling' | 'kitchen' | 'agriculture' | 'other';
}

export interface ApplianceCalculation extends ApplianceEntry {
  dailyKwh: number;
  monthlyKwh: number;
  estimatedMonthlyCostInr: number;
  potentialMonthlySavingsKwh: number;
  potentialMonthlySavingsInr: number;
}

export interface EnergySummary {
  totalDailyKwh: number;
  totalMonthlyKwh: number;
  estimatedMonthlyCostInr: number;
  potentialMonthlySavingsKwh: number;
  potentialMonthlySavingsInr: number;
  estimatedCo2KgPerMonth: number;
  effectiveRatePerKwh: number;
  applianceBreakdown: ApplianceCalculation[];
  suggestions: {
    id: string;
    title: BilingualText;
    description: BilingualText;
    estimatedSavingText: BilingualText;
  }[];
}

export interface SolarEstimateResult {
  monthlyKwh: number;
  recommendedKw: number;
  estimatedMonthlyGenKwh: number;
  estimatedRoofAreaSqFt: number;
  estimatedMonthlyBillSavingsInr: number;
  estimatedAnnualCo2SavedKg: number;
  suitableSystemType: BilingualText;
}

export type RecommendationCategory = 'household' | 'agriculture' | 'school' | 'business';

export interface QuizQuestion {
  id: number;
  topic: 'solar' | 'biomass' | 'conservation' | 'renewable';
  question: BilingualText;
  options: BilingualText[];
  correctIndex: number;
  explanation: BilingualText;
}

export interface QuizAttempt {
  id: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  completedAt: string;
  language: Language;
  isDemo?: boolean;
}

export type CommunityCategory =
  | 'Household'
  | 'Farmer / Agriculture'
  | 'Student / Youth'
  | 'School / Educator'
  | 'Small Business';

export type AwarenessLevel = 'Beginner' | 'Basic' | 'Moderate' | 'Well Aware';

export interface FeedbackSubmission {
  id: string;
  name: string;
  email?: string;
  communityCategory: CommunityCategory;
  awarenessLevel: AwarenessLevel;
  suggestions: string;
  message: string;
  submittedAt: string;
  isDemo?: boolean;
}

export interface FieldPhotoSlot {
  id: string;
  title: BilingualText;
  caption: BilingualText;
  location: string;
  imageUrl: string;
  isCustom?: boolean;
}
