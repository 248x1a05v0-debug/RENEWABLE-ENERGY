import React, { useState } from 'react';
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
import { Plus, RotateCcw, Trash2 } from 'lucide-react';
import { useAppContext } from '../hooks/useAppContext';
import { ApplianceEntry } from '../types/energy';
import { t } from '../data/translations';

const PRESET_APPLIANCES: Array<{
  name: string;
  watts: number;
  hours: number;
  category: ApplianceEntry['category'];
}> = [
  { name: 'LED Bulb (9W)', watts: 9, hours: 6, category: 'lighting' },
  { name: 'Old Incandescent Bulb (60W)', watts: 60, hours: 5, category: 'lighting' },
  { name: 'BLDC Ceiling Fan (28W)', watts: 28, hours: 10, category: 'cooling' },
  { name: 'Standard Ceiling Fan (75W)', watts: 75, hours: 10, category: 'cooling' },
  { name: 'Water Motor / Borewell (750W)', watts: 750, hours: 2, category: 'agriculture' },
  { name: 'Electric Iron (1000W)', watts: 1000, hours: 0.5, category: 'other' },
  { name: 'Desert Air Cooler (180W)', watts: 180, hours: 6, category: 'cooling' },
];

const CHART_COLORS = ['#15803d', '#0284c7', '#0d9488', '#d97706', '#4f46e5', '#166534'];

export function CalculatorPage() {
  const { language, appliances, setAppliances, resetAppliances, energySummary, navigateTo } =
    useAppContext();

  const [name, setName] = useState('');
  const [watts, setWatts] = useState('60');
  const [quantity, setQuantity] = useState('1');
  const [hoursPerDay, setHoursPerDay] = useState('5');
  const [daysPerMonth, setDaysPerMonth] = useState('30');
  const [category, setCategory] = useState<ApplianceEntry['category']>('other');
  const [formError, setFormError] = useState<string | null>(null);

  const handleAddAppliance = (e: React.FormEvent) => {
    e.preventDefault();
    const w = Number(watts);
    const q = Number(quantity);
    const h = Number(hoursPerDay);
    const d = Number(daysPerMonth);

    if (!name.trim()) {
      setFormError(
        language === 'te' ? 'దయచేసి పరికరం పేరు నమోదు చేయండి.' : 'Please enter an appliance name.'
      );
      return;
    }
    if (w <= 0 || q <= 0 || h <= 0 || h > 24 || d <= 0 || d > 31) {
      setFormError(
        language === 'te'
          ? 'సరైన వాట్స్, సంఖ్య, గంటలు (1–24) మరియు రోజులు (1–31) ఇవ్వండి.'
          : 'Enter valid positive numbers (hours 0.1–24, days 1–31).'
      );
      return;
    }

    const newItem: ApplianceEntry = {
      id: `app-${Date.now()}`,
      name: name.trim(),
      watts: w,
      quantity: q,
      hoursPerDay: h,
      daysPerMonth: d,
      category,
    };

    setAppliances([...appliances, newItem]);
    setName('');
    setFormError(null);
  };

  const applyPreset = (preset: (typeof PRESET_APPLIANCES)[number]) => {
    setName(preset.name);
    setWatts(String(preset.watts));
    setQuantity('1');
    setHoursPerDay(String(preset.hours));
    setDaysPerMonth('30');
    setCategory(preset.category);
    setFormError(null);
  };

  const removeAppliance = (id: string) => {
    setAppliances(appliances.filter((a) => a.id !== id));
  };

  const chartData = energySummary.applianceBreakdown.map((item) => ({
    name: item.name.length > 18 ? `${item.name.slice(0, 16)}…` : item.name,
    monthlyKwh: item.monthlyKwh,
    potentialSavingsKwh: item.potentialMonthlySavingsKwh,
    costInr: item.estimatedMonthlyCostInr,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div className="space-y-2 max-w-2xl">
          <p className="text-xs font-semibold text-emerald-700">
            {language === 'te' ? 'స్మార్ట్ విద్యుత్ విశ్లేషణ' : 'Smart Electricity Analysis'}
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-emerald-950">
            {language === 'te'
              ? 'విద్యుత్ వినియోగ & ఆదా కాలిక్యులేటర్'
              : 'Smart Energy Consumption Calculator'}
          </h1>
          <p className="text-sm text-slate-600">
            {language === 'te'
              ? 'మీ ఇంట్లో లేదా పొలంలో వాడే ఉపకరణాల వివరాలు నమోదు చేసి రోజువారీ, నెలవారీ యూనిట్లు (kWh), బిల్లు మరియు ఆదా తెలుసుకోండి.'
              : 'Enter your appliances, wattage, quantity, daily hours, and usage days to compute real kWh consumption, estimated AP tariff cost, and personalized savings.'}
          </p>
        </div>

        <button
          type="button"
          onClick={resetAppliances}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 self-start"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{language === 'te' ? 'నమూనా జాబితా పునరుద్ధరించు' : 'Reset Default Household'}</span>
        </button>
      </div>

      {/* KPI Metrics Summary Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <p className="text-xs font-medium text-slate-500">
            {language === 'te' ? 'రోజువారీ వినియోగం' : 'Daily Consumption'}
          </p>
          <p className="text-2xl font-bold text-slate-900 mt-1 font-mono-tabular">
            {energySummary.totalDailyKwh} <span className="text-sm font-normal text-slate-500">kWh/day</span>
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <p className="text-xs font-medium text-slate-500">
            {language === 'te' ? 'నెలవారీ వినియోగం' : 'Monthly Consumption'}
          </p>
          <p className="text-2xl font-bold text-emerald-900 mt-1 font-mono-tabular">
            {energySummary.totalMonthlyKwh} <span className="text-sm font-normal text-slate-500">kWh (Units)</span>
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <p className="text-xs font-medium text-slate-500">
            {language === 'te' ? 'అంచనా నెలవారీ బిల్లు' : 'Estimated Monthly Cost'}
          </p>
          <p className="text-2xl font-bold text-sky-900 mt-1 font-mono-tabular">
            ₹{energySummary.estimatedMonthlyCostInr}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            {language === 'te'
              ? `అంచనా CO₂: ${energySummary.estimatedCo2KgPerMonth} kg/నెల`
              : `Est. footprint: ${energySummary.estimatedCo2KgPerMonth} kg CO₂/mo`}
          </p>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
          <p className="text-xs font-semibold text-emerald-800">
            {language === 'te' ? 'సంభావ్య నెలవారీ ఆదా' : 'Potential Monthly Savings'}
          </p>
          <p className="text-2xl font-bold text-emerald-950 mt-1 font-mono-tabular">
            {energySummary.potentialMonthlySavingsKwh} kWh · ₹{energySummary.potentialMonthlySavingsInr}
          </p>
          <p className="text-xs text-emerald-800 mt-1">
            {language === 'te'
              ? 'LED & BLDC మార్పుల ద్వారా అంచనా'
              : 'Via LED, BLDC & standby control'}
          </p>
        </div>
      </div>

      {/* Input Form + Quick Presets */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <form
          onSubmit={handleAddAppliance}
          className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 space-y-4 self-start"
        >
          <h2 className="text-lg font-bold text-slate-900">
            {language === 'te' ? 'పరికరాన్ని జోడించండి' : 'Add Electrical Appliance'}
          </h2>

          <div>
            <p className="text-xs font-medium text-slate-500 mb-2">
              {language === 'te' ? 'త్వరిత ఎంపికలు (క్లిక్ చేసి లోడ్ చేయండి):' : 'Quick presets (click to fill):'}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {PRESET_APPLIANCES.map((p) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => applyPreset(p)}
                  className="px-2.5 py-1 text-xs font-medium bg-slate-100 hover:bg-sky-50 hover:text-sky-900 text-slate-700 rounded-md transition-colors"
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {language === 'te' ? 'పరికరం పేరు' : 'Appliance Name'}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={language === 'te' ? 'ఉదా: సీలింగ్ ఫ్యాన్' : 'e.g., Ceiling Fan'}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-700"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {language === 'te' ? 'పవర్ (Watts)' : 'Power (Watts)'}
                </label>
                <input
                  type="number"
                  min="1"
                  max="15000"
                  value={watts}
                  onChange={(e) => setWatts(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg font-mono-tabular focus:outline-none focus:border-emerald-700"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {language === 'te' ? 'పరికరాల సంఖ్య' : 'No. of Appliances'}
                </label>
                <input
                  type="number"
                  min="1"
                  max="200"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg font-mono-tabular focus:outline-none focus:border-emerald-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {language === 'te' ? 'రోజువారీ గంటలు' : 'Daily Usage Hours'}
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="0.5"
                  max="24"
                  value={hoursPerDay}
                  onChange={(e) => setHoursPerDay(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg font-mono-tabular focus:outline-none focus:border-emerald-700"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {language === 'te' ? 'నెలలో రోజులు' : 'Usage Days / Month'}
                </label>
                <input
                  type="number"
                  min="1"
                  max="31"
                  value={daysPerMonth}
                  onChange={(e) => setDaysPerMonth(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg font-mono-tabular focus:outline-none focus:border-emerald-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {language === 'te' ? 'విభాగం' : 'Category'}
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ApplianceEntry['category'])}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:border-emerald-700"
              >
                <option value="lighting">{language === 'te' ? 'లైటింగ్' : 'Lighting'}</option>
                <option value="cooling">{language === 'te' ? 'ఫ్యాన్ / కూలింగ్' : 'Cooling & Fans'}</option>
                <option value="kitchen">{language === 'te' ? 'వంటగది / ఫ్రిజ్' : 'Kitchen & Refrigerator'}</option>
                <option value="agriculture">{language === 'te' ? 'వ్యవసాయం / మోటార్' : 'Agriculture / Pump'}</option>
                <option value="other">{language === 'te' ? 'ఇతర పరికరాలు' : 'Other Electronics'}</option>
              </select>
            </div>
          </div>

          {formError && (
            <p className="text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {formError}
            </p>
          )}

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>{language === 'te' ? 'జాబితాకు జతచేయండి' : 'Add to Calculation'}</span>
          </button>
        </form>

        {/* Appliance Table + Charts */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900">
                {language === 'te' ? 'నమోదు చేసిన పరికరాల వివరాలు' : 'Entered Appliances Breakdown'}
              </h2>
              <span className="text-xs font-mono-tabular text-slate-500">
                {appliances.length} {language === 'te' ? 'పరికరాలు' : 'items'}
              </span>
            </div>

            {energySummary.applianceBreakdown.length === 0 ? (
              <div className="p-8 text-center text-sm text-slate-500">
                {language === 'te'
                  ? 'లెక్కల కోసం ఎడమవైపు నుండి కనీసం ఒక పరికరాన్ని జతచేయండి.'
                  : 'No appliances added yet. Add an appliance on the left to calculate electricity usage.'}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-xs text-slate-600 border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4 font-semibold">
                        {language === 'te' ? 'పరికరం' : 'Appliance'}
                      </th>
                      <th className="py-3 px-3 font-semibold text-right">Watts × Qty</th>
                      <th className="py-3 px-3 font-semibold text-right">Hrs × Days</th>
                      <th className="py-3 px-3 font-semibold text-right">kWh/Mo</th>
                      <th className="py-3 px-3 font-semibold text-right">Est. ₹/Mo</th>
                      <th className="py-3 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {energySummary.applianceBreakdown.map((row) => (
                      <tr key={row.id} className="hover:bg-slate-50/70">
                        <td className="py-3 px-4 font-medium text-slate-900">{row.name}</td>
                        <td className="py-3 px-3 text-right font-mono-tabular text-slate-700">
                          {row.watts}W × {row.quantity}
                        </td>
                        <td className="py-3 px-3 text-right font-mono-tabular text-slate-700">
                          {row.hoursPerDay}h × {row.daysPerMonth}d
                        </td>
                        <td className="py-3 px-3 text-right font-mono-tabular font-semibold text-emerald-900">
                          {row.monthlyKwh}
                        </td>
                        <td className="py-3 px-3 text-right font-mono-tabular text-slate-900">
                          ₹{row.estimatedMonthlyCostInr}
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            type="button"
                            onClick={() => removeAppliance(row.id)}
                            className="p-1.5 text-slate-400 hover:text-red-700 rounded-md"
                            aria-label={`Remove ${row.name}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Interactive Recharts Visualizations */}
          {chartData.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-200 rounded-xl p-5">
                <h3 className="text-sm font-bold text-slate-900 mb-4">
                  {language === 'te'
                    ? 'నెలవారీ వినియోగం vs ఆదా సామర్థ్యం (kWh)'
                    : 'Monthly Usage vs. Saving Potential (kWh)'}
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Bar
                        dataKey="monthlyKwh"
                        name={language === 'te' ? 'వినియోగం (kWh)' : 'Current (kWh)'}
                        fill="#15803d"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        dataKey="potentialSavingsKwh"
                        name={language === 'te' ? 'ఆదా అవకాశం (kWh)' : 'Saveable (kWh)'}
                        fill="#0284c7"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-5">
                <h3 className="text-sm font-bold text-slate-900 mb-4">
                  {language === 'te'
                    ? 'పరికరాల వారీగా ఖర్చు వాటా (₹)'
                    : 'Monthly Cost Share by Appliance (₹)'}
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        dataKey="costInr"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={78}
                        label={({ name, value }) => `${name}: ₹${value}`}
                      >
                        {chartData.map((_, idx) => (
                          <Cell
                            key={`cell-${idx}`}
                            fill={CHART_COLORS[idx % CHART_COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip formatter={(val) => `₹${val ?? 0}`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Personalized Conservation Suggestions */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 className="text-xl font-bold text-emerald-950">
            {language === 'te'
              ? 'మీ పరికరాల ఆధారంగా వ్యక్తిగత ఆదా సూచనలు'
              : 'Personalized Energy-Saving Suggestions'}
          </h2>
          <button
            type="button"
            onClick={() => navigateTo('solar')}
            className="text-sm font-semibold text-sky-800 hover:text-sky-950 self-start"
          >
            {language === 'te'
              ? `${energySummary.totalMonthlyKwh} kWh కోసం సోలార్ అంచనా చూడండి →`
              : `Estimate Solar System for ${energySummary.totalMonthlyKwh} kWh →`}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {energySummary.suggestions.map((sug) => (
            <div
              key={sug.id}
              className="bg-white border border-slate-200 rounded-xl p-5 space-y-2"
            >
              <p className="text-xs font-semibold text-emerald-700">
                {t(sug.estimatedSavingText, language)}
              </p>
              <h3 className="text-base font-bold text-slate-900">
                {t(sug.title, language)}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t(sug.description, language)}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
