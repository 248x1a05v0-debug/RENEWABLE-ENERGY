import React from 'react';
import { Check, Copy, Database, X } from 'lucide-react';
import { useAppContext } from '../hooks/useAppContext';

const ENV_SNIPPET = `VITE_FIREBASE_API_KEY="your-api-key"
VITE_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="your-project-id"
VITE_FIREBASE_STORAGE_BUCKET="your-project.appspot.com"
VITE_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
VITE_FIREBASE_APP_ID="your-app-id"`;

const RULES_SNIPPET = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /communityFeedback/{docId} {
      allow create: if request.resource.data.keys().hasAll(['name', 'communityCategory', 'awarenessLevel', 'message', 'submittedAt'])
        && request.resource.data.name is string && request.resource.data.name.size() <= 100
        && request.resource.data.message is string && request.resource.data.message.size() <= 1500;
      allow read: if request.auth != null;
    }
    match /users/{userId}/{collection}/{docId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}`;

export function FirebaseGuideModal() {
  const { isFirebaseGuideOpen, setIsFirebaseGuideOpen, language } = useAppContext();
  const [copiedKey, setCopiedKey] = React.useState<'env' | 'rules' | null>(null);

  if (!isFirebaseGuideOpen) return null;

  const copyText = async (text: string, type: 'env' | 'rules') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(type);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      // Clipboard fallback not critical
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="firebase-guide-title"
    >
      <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full max-h-[88vh] overflow-y-auto shadow-xl">
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Database className="w-5 h-5 text-emerald-700" />
            <h2 id="firebase-guide-title" className="text-lg font-bold text-slate-900">
              {language === 'te'
                ? 'ఫైర్‌బేస్ ఆథెంటికేషన్ & క్లౌడ్ ఫైర్‌స్టోర్ సెటప్ మార్గదర్శి'
                : 'Firebase Authentication & Cloud Firestore Setup Guide'}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setIsFirebaseGuideOpen(false)}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 text-sm text-slate-700 leading-relaxed">
          <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 text-sky-950">
            <p className="font-semibold">
              {language === 'te'
                ? 'ముఖ్య గమనిక: ప్రస్తుతం అన్ని ఫీచర్లు బ్రౌజర్ లోకల్ స్టోరేజ్ ద్వారా పూర్తిగా పనిచేస్తున్నాయి.'
                : 'Works Out-of-the-Box: All calculators, guides, quizzes, and feedback currently work using local browser persistence.'}
            </p>
            <p className="mt-1 text-xs text-sky-900">
              {language === 'te'
                ? 'మీరు మీ కళాశాల CSP ప్రదర్శన కోసం క్లౌడ్ డేటాబేస్ జత చేయాలనుకుంటే ఈ క్రింది దశలను అనుసరించండి.'
                : 'Follow these steps whenever you are ready to connect your own Firebase project for multi-device cloud storage.'}
            </p>
          </div>

          <ol className="space-y-3 list-decimal list-inside">
            <li>
              <strong>Create a Firebase Project:</strong> Open the{' '}
              <span className="font-semibold text-emerald-800">Firebase Console</span>, click
              &ldquo;Add project&rdquo;, and name it <code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded">greenpower-csp</code>.
            </li>
            <li>
              <strong>Enable Authentication:</strong> Go to <em>Build → Authentication → Sign-in method</em> and enable <strong>Google</strong> sign-in.
            </li>
            <li>
              <strong>Create Cloud Firestore:</strong> Go to <em>Build → Firestore Database → Create database</em> and pick the Mumbai (<code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded">asia-south1</code>) region.
            </li>
            <li>
              <strong>Register a Web App & Add Environment Variables:</strong> Copy your web app keys into a local <code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded">.env</code> file:
            </li>
          </ol>

          <div className="bg-slate-900 text-slate-100 rounded-xl p-4 relative">
            <button
              type="button"
              onClick={() => copyText(ENV_SNIPPET, 'env')}
              className="absolute right-3 top-3 inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 rounded-md text-slate-200"
            >
              {copiedKey === 'env' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'env' ? 'Copied' : 'Copy'}</span>
            </button>
            <pre className="font-mono text-xs overflow-x-auto pr-16">{ENV_SNIPPET}</pre>
          </div>

          <div>
            <p className="font-semibold text-slate-900 mb-2">
              5. Recommended Firestore Security Rules (<code className="font-mono text-xs">firestore.rules</code>):
            </p>
            <div className="bg-slate-900 text-slate-100 rounded-xl p-4 relative">
              <button
                type="button"
                onClick={() => copyText(RULES_SNIPPET, 'rules')}
                className="absolute right-3 top-3 inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 rounded-md text-slate-200"
              >
                {copiedKey === 'rules' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'rules' ? 'Copied' : 'Copy'}</span>
              </button>
              <pre className="font-mono text-xs overflow-x-auto pr-16">{RULES_SNIPPET}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
