import React, { createContext, useContext, useMemo, useState } from 'react';
import {
  ApplianceEntry,
  EnergySummary,
  FeedbackSubmission,
  FieldPhotoSlot,
  Language,
  PageId,
  QuizAttempt,
} from '../types/energy';
import {
  DEFAULT_FIELD_PHOTOS,
  DEFAULT_USER_APPLIANCES,
  storageService,
} from '../services/storageService';
import { calculateEnergySummary } from '../utils/energyCalculations';

interface AppContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  currentPage: PageId;
  navigateTo: (page: PageId) => void;
  appliances: ApplianceEntry[];
  setAppliances: (items: ApplianceEntry[]) => void;
  resetAppliances: () => void;
  energySummary: EnergySummary;
  quizAttempts: QuizAttempt[];
  recordQuizAttempt: (attempt: QuizAttempt) => void;
  feedbacks: FeedbackSubmission[];
  addFeedback: (entry: FeedbackSubmission) => void;
  fieldPhotos: FieldPhotoSlot[];
  updateFieldPhoto: (id: string, patch: Partial<FieldPhotoSlot>) => void;
  resetFieldPhotos: () => void;
  showDemoData: boolean;
  setShowDemoData: (show: boolean) => void;
  isFirebaseGuideOpen: boolean;
  setIsFirebaseGuideOpen: (open: boolean) => void;
  isFirebaseConfigured: boolean;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [appliances, setAppliancesState] = useState<ApplianceEntry[]>(() =>
    storageService.loadAppliances()
  );
  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>(() =>
    storageService.loadQuizAttempts()
  );
  const [feedbacks, setFeedbacks] = useState<FeedbackSubmission[]>(() =>
    storageService.loadFeedbacks()
  );
  const [fieldPhotos, setFieldPhotos] = useState<FieldPhotoSlot[]>(() =>
    storageService.loadFieldPhotos()
  );
  const [showDemoData, setShowDemoDataState] = useState<boolean>(() =>
    storageService.loadShowDemoData()
  );
  const [isFirebaseGuideOpen, setIsFirebaseGuideOpen] = useState<boolean>(false);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'te' : 'en'));
  };

  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setAppliances = (items: ApplianceEntry[]) => {
    setAppliancesState(items);
    storageService.saveAppliances(items);
  };

  const resetAppliances = () => {
    setAppliances(DEFAULT_USER_APPLIANCES);
  };

  const recordQuizAttempt = (attempt: QuizAttempt) => {
    const updated = storageService.saveQuizAttempt(attempt);
    setQuizAttempts(updated);
  };

  const addFeedback = (entry: FeedbackSubmission) => {
    const updated = storageService.saveFeedback(entry);
    setFeedbacks(updated);
  };

  const updateFieldPhoto = (id: string, patch: Partial<FieldPhotoSlot>) => {
    const updated = fieldPhotos.map((slot) =>
      slot.id === id ? { ...slot, ...patch } : slot
    );
    setFieldPhotos(updated);
    storageService.saveFieldPhotos(updated);
  };

  const resetFieldPhotos = () => {
    setFieldPhotos(DEFAULT_FIELD_PHOTOS);
    storageService.saveFieldPhotos(DEFAULT_FIELD_PHOTOS);
  };

  const setShowDemoData = (show: boolean) => {
    setShowDemoDataState(show);
    storageService.saveShowDemoData(show);
  };

  const energySummary = useMemo(
    () => calculateEnergySummary(appliances),
    [appliances]
  );

  const isFirebaseConfigured = storageService.isFirebaseConfigured();

  const value: AppContextValue = {
    language,
    setLanguage,
    toggleLanguage,
    currentPage,
    navigateTo,
    appliances,
    setAppliances,
    resetAppliances,
    energySummary,
    quizAttempts,
    recordQuizAttempt,
    feedbacks,
    addFeedback,
    fieldPhotos,
    updateFieldPhoto,
    resetFieldPhotos,
    showDemoData,
    setShowDemoData,
    isFirebaseGuideOpen,
    setIsFirebaseGuideOpen,
    isFirebaseConfigured,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useAppContext must be used inside AppProvider');
  }
  return ctx;
}
