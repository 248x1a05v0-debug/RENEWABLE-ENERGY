import { BilingualText, Language } from '../types/energy';

export function t(text: BilingualText, lang: Language): string {
  return lang === 'te' ? text.te : text.en;
}

export const NAV_LABELS = {
  brand: 'GREENPOWER',
  home: { en: 'Home', te: 'హోమ్' },
  calculator: { en: 'Calculator', te: 'లెక్కలు' },
  solutions: { en: 'Solutions', te: 'పరిష్కారాలు' },
  solar: { en: 'Solar Guide', te: 'సోలార్ గైడ్' },
  biomass: { en: 'Biomass', te: 'బయోమాస్' },
  recommendations: { en: 'Tips by Role', te: 'సూచనలు' },
  learn: { en: 'Learn', te: 'అభ్యాసం' },
  learning: { en: '8 Energy Sources', te: '8 శక్తి వనరులు' },
  telugu: { en: 'Telugu Center', te: 'తెలుగు కేంద్రం' },
  quiz: { en: 'Green Quiz', te: 'క్విజ్' },
  feedback: { en: 'Feedback', te: 'అభిప్రాయం' },
  dashboard: { en: 'Dashboard', te: 'డాష్‌బోర్డ్' },
  firebaseSetup: { en: 'Firebase Setup', te: 'ఫైర్‌బేస్ సెటప్' },
};

export const HOME_COPY = {
  cspSubtitle: {
    en: 'Community Service Project · Srinivasaraopeta, Guntur District, Andhra Pradesh',
    te: 'కమ్యూనిటీ సర్వీస్ ప్రాజెక్ట్ · శ్రీనివాసరావుపేట, గుంటూరు జిల్లా, ఆంధ్రప్రదేశ్',
  },
  heroHeading: {
    en: 'Save Energy Today, Secure Tomorrow.',
    te: 'నేడు విద్యుత్ ఆదా చేయండి, రేపటి భవిష్యత్తును సురక్షితం చేయండి.',
  },
  heroSubheading: {
    en: 'A practical digital platform helping Srinivasaraopeta households, farmers, and schools analyze electricity bills, adopt affordable solar and agricultural biomass solutions, and cut unnecessary power waste.',
    te: 'శ్రీనివాసరావుపేటలోని కుటుంబాలు, రైతులు మరియు పాఠశాలలు కరెంట్ బిల్లులను అర్థం చేసుకోవడానికి, సోలార్ మరియు బయోమాస్ పరిష్కారాలను స్వీకరించడానికి మరియు విద్యుత్ వృథాను తగ్గించడానికి రూపొందించిన వేదిక.',
  },
  exploreSolutionsCta: {
    en: 'Explore Solutions',
    te: 'పరిష్కారాలు చూడండి',
  },
  openCalculatorCta: {
    en: 'Calculate Your Bill',
    te: 'బిల్లు లెక్కించండి',
  },
  openSolarGuideCta: {
    en: 'Solar System Guide',
    te: 'సోలార్ గైడ్ చూడండి',
  },
  problemsTitle: {
    en: 'Six Energy Challenges Identified in Srinivasaraopeta',
    te: 'శ్రీనివాసరావుపేటలో గుర్తించిన ఆరు ప్రధాన విద్యుత్ సమస్యలు',
  },
  problemsSubtitle: {
    en: 'Field observations from our Community Service Project ("Renewable Energy and Resources – Clean Power, Bright Future") highlighted six practical barriers—each paired here with a direct digital tool.',
    te: 'మా కమ్యూనిటీ సర్వీస్ ప్రాజెక్ట్ క్షేత్రస్థాయి పరిశీలనలో గుర్తించిన ఆరు సమస్యలు మరియు వాటికి ఈ వెబ్‌సైట్ అందించే ప్రత్యక్ష పరిష్కారాలు.',
  },
  quickToolsTitle: {
    en: 'Practical Tools for Immediate Action',
    te: 'తక్షణ వినియోగానికి ఉపయోగపడే సాధనాలు',
  },
  tipsTitle: {
    en: 'Daily Electricity Conservation Habits',
    te: 'రోజువారీ విద్యుత్ ఆదా అలవాట్లు',
  },
  environmentTitle: {
    en: 'Protecting Guntur Farmland & Local Air Quality',
    te: 'గుంటూరు వ్యవసాయ భూములు & స్వచ్ఛమైన గాలి పరిరక్షణ',
  },
  environmentBody: {
    en: 'Every 1 kWh saved reduces approximately 0.82 kg of CO₂ emissions from coal power plants. Converting paddy straw and farm residue into biogas instead of open-field burning keeps Srinivasaraopeta air clean and produces organic manure for crops.',
    te: 'మనం ఆదా చేసే ప్రతి 1 యూనిట్ (kWh) విద్యుత్ ద్వారా సుమారు 0.82 కిలోల కార్బన్ డయాక్సైడ్ ఉద్గారాలు తగ్గుతాయి. వరి గడ్డిని పొలంలో కాల్చకుండా బయోగ్యాస్‌గా మార్చడం వల్ల గాలి శుభ్రంగా ఉండి, పొలాలకు నాణ్యమైన సేంద్రీయ ఎరువు లభిస్తుంది.',
  },
  fieldGalleryTitle: {
    en: 'CSP Field Visit & Community Awareness Gallery',
    te: 'CSP క్షేత్రస్థాయి సందర్శన & అవగాహన చిత్రాలు',
  },
  fieldGallerySubtitle: {
    en: 'Editable placeholders ready for your Srinivasaraopeta field visit photographs. Upload real photos or edit captions directly.',
    te: 'శ్రీనివాసరావుపేట క్షేత్ర సందర్శన ఫోటోలను ఇక్కడ అప్‌లోడ్ చేయవచ్చు లేదా వివరాలు మార్చుకోవచ్చు.',
  },
};

export const COMMUNITY_PROBLEMS: Array<{
  number: string;
  problem: BilingualText;
  solution: BilingualText;
  targetPage: 'learning' | 'calculator' | 'solar' | 'biomass' | 'recommendations' | 'telugu';
  actionLabel: BilingualText;
}> = [
  {
    number: '01',
    problem: {
      en: 'Limited awareness of renewable energy sources',
      te: 'పునరుత్పాదక శక్తి వనరులపై తగిన అవగాహన లేకపోవడం',
    },
    solution: {
      en: 'Interactive 8-source Learning Center & simple Telugu guides tailored for rural readers.',
      te: '8 పునరుత్పాదక శక్తి వనరుల వివరణ మరియు సరళమైన తెలుగు అవగాహన కేంద్రం.',
    },
    targetPage: 'learning',
    actionLabel: { en: 'Open Learning Center', te: 'అభ్యాస కేంద్రం' },
  },
  {
    number: '02',
    problem: {
      en: 'High dependence on conventional grid electricity',
      te: 'సాంప్రదాయ థర్మల్ విద్యుత్‌పై అధిక ఆధారపడటం',
    },
    solution: {
      en: 'Rooftop solar estimator showing system size (kW), roof space, and monthly bill savings.',
      te: 'నెలవారీ వినియోగాన్ని బట్టి సోలార్ సిస్టమ్ పరిమాణం (kW) అంచనా వేసే సాధనం.',
    },
    targetPage: 'solar',
    actionLabel: { en: 'Estimate Solar Size', te: 'సోలార్ అంచనా' },
  },
  {
    number: '03',
    problem: {
      en: 'Lack of knowledge about solar and agricultural biomass energy',
      te: 'సోలార్ మరియు వ్యవసాయ బయోమాస్ శక్తిపై అవగాహన లోపం',
    },
    solution: {
      en: 'Dedicated guides on paddy-straw biogas, cattle dung digesters, and clean cooking.',
      te: 'వరి గడ్డి, పశువుల పేడతో బయోగ్యాస్ ఉత్పత్తిపై రైతుల కోసం ప్రత్యేక మార్గదర్శి.',
    },
    targetPage: 'biomass',
    actionLabel: { en: 'Explore Biomass Guide', te: 'బయోమాస్ గైడ్' },
  },
  {
    number: '04',
    problem: {
      en: 'Limited awareness of household electricity conservation',
      te: 'ఇళ్లలో విద్యుత్ పొదుపు పద్ధతులపై అవగాహన తక్కువగా ఉండటం',
    },
    solution: {
      en: 'Live Appliance Calculator identifying high-wattage culprits like old bulbs and fans.',
      te: 'పాత బల్బులు, ఫ్యాన్ల ఖర్చును చూపించే స్మార్ట్ విద్యుత్ లెక్కింపు యంత్రం.',
    },
    targetPage: 'calculator',
    actionLabel: { en: 'Run Consumption Check', te: 'వినియోగం లెక్కించండి' },
  },
  {
    number: '05',
    problem: {
      en: 'Insufficient information on financial & environmental benefits',
      te: 'ఆర్థిక మరియు పర్యావరణ ప్రయోజనాలపై స్పష్టమైన సమాచారం లేకపోవడం',
    },
    solution: {
      en: 'Visual dashboard translating kWh savings into monthly Rupees (₹) and kg CO₂ avoided.',
      te: 'ఆదా అయ్యే యూనిట్లు, రూపాయలు (₹) మరియు తగ్గే CO₂ వివరాలను చూపించే డాష్‌బోర్డ్.',
    },
    targetPage: 'telugu',
    actionLabel: { en: 'Read Telugu Guide', te: 'తెలుగులో చదవండి' },
  },
  {
    number: '06',
    problem: {
      en: 'Lack of practical step-by-step adoption guidance',
      te: 'స్వచ్ఛమైన శక్తిని అమలు చేయడంలో ఆచరణాత్మక మార్గదర్శకత్వం లోపించడం',
    },
    solution: {
      en: 'Role-based action plans for Households, Farmers, Schools, and Small Businesses.',
      te: 'కుటుంబాలు, రైతులు, పాఠశాలలు మరియు చిన్న వ్యాపారాలకు తగిన సూచనలు.',
    },
    targetPage: 'recommendations',
    actionLabel: { en: 'Get Action Plan', te: 'సూచనలు పొందండి' },
  },
];

export const DAILY_SAVING_TIPS: Array<{
  title: BilingualText;
  detail: BilingualText;
  impact: BilingualText;
}> = [
  {
    title: {
      en: 'Switch to 9W LED Bulbs',
      te: '9W LED బల్బులకు మారండి',
    },
    detail: {
      en: 'Replacing four 60W incandescent bulbs with 9W LEDs saves over 24 kWh every month.',
      te: 'నాలుగు 60W పాత బల్బుల స్థానంలో 9W LED బల్బులు వాడితే నెలకు 24 యూనిట్లకు పైగా ఆదా అవుతుంది.',
    },
    impact: { en: 'Up to 75% less lighting power', te: '75% వరకు లైటింగ్ విద్యుత్ ఆదా' },
  },
  {
    title: {
      en: 'Turn Off Idle Fans & Lights',
      te: 'ఖాళీ గదుల్లో ఫ్యాన్లు, లైట్లు ఆపండి',
    },
    detail: {
      en: 'Switching off one 75W ceiling fan for 4 extra hours daily saves 9 kWh per month.',
      te: 'ఒక 75W సీలింగ్ ఫ్యాన్‌ను రోజుకు 4 గంటలు అదనంగా ఆపితే నెలకు 9 యూనిట్లు ఆదా అవుతాయి.',
    },
    impact: { en: 'Immediate zero-cost saving', te: 'ఎలాంటి ఖర్చు లేని తక్షణ ఆదా' },
  },
  {
    title: {
      en: 'Use Natural Daylight & Cross-Ventilation',
      te: 'పగటి వెలుతురు & సహజ గాలిని వినియోగించండి',
    },
    detail: {
      en: 'Open windows during morning hours and keep light-colored curtains to avoid daytime lights.',
      te: 'ఉదయం పూట కిటికీలు తెరిచి సహజ వెలుతురును వాడుకోవడం వల్ల పగలు లైట్ల అవసరం ఉండదు.',
    },
    impact: { en: 'Cuts daytime cooling & lighting', te: 'పగటి కరెంట్ వాడకం తగ్గింపు' },
  },
  {
    title: {
      en: 'Unplug Chargers & Set-Top Boxes',
      te: 'ఛార్జర్లు, టీవీ మెయిన్ స్విచ్ ఆపండి',
    },
    detail: {
      en: 'Standby electronics quietly consume electricity 24/7 unless turned off at the socket.',
      te: 'వాడనప్పుడు మెయిన్ స్విచ్ వద్దే ఆపివేయడం ద్వారా నిరంతర వృథా విద్యుత్‌ను ఆపవచ్చు.',
    },
    impact: { en: '5%–10% lower monthly bill', te: 'నెల బిల్లులో 5%–10% తగ్గింపు' },
  },
];
