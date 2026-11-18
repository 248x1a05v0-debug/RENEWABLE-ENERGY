import {
  ApplianceEntry,
  FeedbackSubmission,
  FieldPhotoSlot,
  QuizAttempt,
} from '../types/energy';

const STORAGE_KEYS = {
  APPLIANCES: 'greenpower_user_appliances_v1',
  QUIZ_ATTEMPTS: 'greenpower_quiz_attempts_v1',
  FEEDBACKS: 'greenpower_community_feedbacks_v1',
  FIELD_PHOTOS: 'greenpower_csp_field_photos_v1',
  DEMO_TOGGLE: 'greenpower_show_demo_data_v1',
};

export const DEFAULT_USER_APPLIANCES: ApplianceEntry[] = [
  {
    id: 'app-1',
    name: 'Ceiling Fan (Standard)',
    watts: 75,
    quantity: 3,
    hoursPerDay: 10,
    daysPerMonth: 30,
    category: 'cooling',
  },
  {
    id: 'app-2',
    name: 'Traditional Bulb / Tube',
    watts: 40,
    quantity: 4,
    hoursPerDay: 5,
    daysPerMonth: 30,
    category: 'lighting',
  },
  {
    id: 'app-3',
    name: 'LED Television',
    watts: 65,
    quantity: 1,
    hoursPerDay: 4,
    daysPerMonth: 30,
    category: 'other',
  },
  {
    id: 'app-4',
    name: 'Refrigerator (Double/Single)',
    watts: 150,
    quantity: 1,
    hoursPerDay: 12,
    daysPerMonth: 30,
    category: 'kitchen',
  },
];

export const DEFAULT_FIELD_PHOTOS: FieldPhotoSlot[] = [
  {
    id: 'photo-1',
    title: {
      en: 'CSP Awareness & LED Demonstration',
      te: 'CSP అవగాహన & LED దీపాల ప్రదర్శన',
    },
    caption: {
      en: 'Community discussion in Srinivasaraopeta explaining 9W LED savings and solar lanterns to village families.',
      te: 'శ్రీనివాసరావుపేట కుటుంబాలకు 9W LED ఆదా మరియు సోలార్ లాంతర్లపై అవగాహన కార్యక్రమం.',
    },
    location: 'Srinivasaraopeta, Guntur District',
    imageUrl: '/src/assets/images/csp_field_awareness_1794934117087.jpg',
    isCustom: false,
  },
  {
    id: 'photo-2',
    title: {
      en: 'Rural Rooftop Solar Opportunity',
      te: 'గ్రామీణ ఇంటి పైకప్పు సోలార్ నమూనా',
    },
    caption: {
      en: 'Evaluating sunny concrete and tiled rooftops around Srinivasaraopeta for 1–2 kW solar panel feasibility.',
      te: 'శ్రీనివాసరావుపేటలోని ఇళ్ల పైకప్పులపై 1–2 kW సోలార్ ప్యానెల్స్ ఏర్పాటు అవకాశాల పరిశీలన.',
    },
    location: 'Srinivasaraopeta Residential Area',
    imageUrl: '/src/assets/images/hero_rural_solar_1794934114943.jpg',
    isCustom: false,
  },
  {
    id: 'photo-3',
    title: {
      en: 'Agricultural Paddy Straw & Biogas',
      te: 'వ్యవసాయ వరి గడ్డి & బయోగ్యాస్ పరిశీలన',
    },
    caption: {
      en: 'Documenting post-harvest paddy residue and dairy dung potential for clean community biogas digestion.',
      te: 'పొలాల్లో వరి గడ్డి మరియు పశువుల పేడతో బయోగ్యాస్ ఉత్పత్తి అవకాశాల అధ్యయనం.',
    },
    location: 'Srinivasaraopeta Farmlands',
    imageUrl: '/src/assets/images/biomass_agriculture_1794934115525.jpg',
    isCustom: false,
  },
];

// Clearly marked Demonstration Sample Data (never mixed invisibly with real user submissions)
export const DEMO_QUIZ_ATTEMPTS: QuizAttempt[] = [
  {
    id: 'demo-quiz-1',
    score: 18,
    totalQuestions: 22,
    percentage: 82,
    completedAt: '2026-10-12T10:30:00Z',
    language: 'te',
    isDemo: true,
  },
  {
    id: 'demo-quiz-2',
    score: 15,
    totalQuestions: 22,
    percentage: 68,
    completedAt: '2026-10-14T15:15:00Z',
    language: 'en',
    isDemo: true,
  },
];

export const DEMO_FEEDBACK_SUBMISSIONS: FeedbackSubmission[] = [
  {
    id: 'demo-fb-1',
    name: 'Sample Household Survey (Demo)',
    communityCategory: 'Household',
    awarenessLevel: 'Basic',
    suggestions: 'Need simple Telugu pamphlets on 9W LED and PM Surya Ghar subsidy steps.',
    message: 'Demonstration entry: Families in Srinivasaraopeta found the monthly kWh calculator helpful for spotting old fan power costs.',
    submittedAt: '2026-10-11T09:15:00Z',
    isDemo: true,
  },
  {
    id: 'demo-fb-2',
    name: 'Sample Farmer Input (Demo)',
    communityCategory: 'Farmer / Agriculture',
    awarenessLevel: 'Moderate',
    suggestions: 'Share contact guidance for solar irrigation pumps and community biogas slurry use.',
    message: 'Demonstration entry: Converting paddy straw into biogas instead of burning is practical if shredder support is shared.',
    submittedAt: '2026-10-13T16:40:00Z',
    isDemo: true,
  },
];

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export const storageService = {
  isFirebaseConfigured(): boolean {
    return Boolean(import.meta.env.VITE_FIREBASE_API_KEY && import.meta.env.VITE_FIREBASE_PROJECT_ID);
  },

  loadAppliances(): ApplianceEntry[] {
    return safeParse<ApplianceEntry[]>(
      localStorage.getItem(STORAGE_KEYS.APPLIANCES),
      DEFAULT_USER_APPLIANCES
    );
  },

  saveAppliances(appliances: ApplianceEntry[]): void {
    localStorage.setItem(STORAGE_KEYS.APPLIANCES, JSON.stringify(appliances));
  },

  loadQuizAttempts(): QuizAttempt[] {
    return safeParse<QuizAttempt[]>(
      localStorage.getItem(STORAGE_KEYS.QUIZ_ATTEMPTS),
      []
    );
  },

  saveQuizAttempt(attempt: QuizAttempt): QuizAttempt[] {
    const existing = this.loadQuizAttempts();
    const updated = [attempt, ...existing].slice(0, 50);
    localStorage.setItem(STORAGE_KEYS.QUIZ_ATTEMPTS, JSON.stringify(updated));
    return updated;
  },

  loadFeedbacks(): FeedbackSubmission[] {
    return safeParse<FeedbackSubmission[]>(
      localStorage.getItem(STORAGE_KEYS.FEEDBACKS),
      []
    );
  },

  saveFeedback(feedback: FeedbackSubmission): FeedbackSubmission[] {
    const existing = this.loadFeedbacks();
    const updated = [feedback, ...existing].slice(0, 100);
    localStorage.setItem(STORAGE_KEYS.FEEDBACKS, JSON.stringify(updated));
    return updated;
  },

  loadFieldPhotos(): FieldPhotoSlot[] {
    return safeParse<FieldPhotoSlot[]>(
      localStorage.getItem(STORAGE_KEYS.FIELD_PHOTOS),
      DEFAULT_FIELD_PHOTOS
    );
  },

  saveFieldPhotos(photos: FieldPhotoSlot[]): void {
    localStorage.setItem(STORAGE_KEYS.FIELD_PHOTOS, JSON.stringify(photos));
  },

  loadShowDemoData(): boolean {
    return safeParse<boolean>(
      localStorage.getItem(STORAGE_KEYS.DEMO_TOGGLE),
      false
    );
  },

  saveShowDemoData(show: boolean): void {
    localStorage.setItem(STORAGE_KEYS.DEMO_TOGGLE, JSON.stringify(show));
  },
};
