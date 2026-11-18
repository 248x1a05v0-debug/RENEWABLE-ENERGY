import {
  ApplianceCalculation,
  ApplianceEntry,
  EnergySummary,
  SolarEstimateResult,
} from '../types/energy';

/**
 * Estimates domestic electricity bill in Andhra Pradesh (APCPDCL/APSPDCL indicative slab model).
 * Uses progressive domestic slabs so rural & semi-urban users get realistic cost feedback.
 */
export function calculateElectricityCostInr(monthlyKwh: number): number {
  if (monthlyKwh <= 0) return 0;

  let remaining = monthlyKwh;
  let cost = 0;

  // Indicative domestic slab tiers (INR per kWh / unit)
  const slabs: Array<{ limit: number; rate: number }> = [
    { limit: 30, rate: 1.9 },
    { limit: 45, rate: 3.0 }, // 31 to 75
    { limit: 50, rate: 4.5 }, // 76 to 125
    { limit: 100, rate: 6.0 }, // 126 to 225
    { limit: 175, rate: 8.75 }, // 226 to 400
    { limit: Infinity, rate: 9.75 }, // > 400
  ];

  for (const slab of slabs) {
    if (remaining <= 0) break;
    const unitsInSlab = Math.min(remaining, slab.limit);
    cost += unitsInSlab * slab.rate;
    remaining -= unitsInSlab;
  }

  // Add modest fixed/customer charge typical for domestic connection
  const fixedCharge = monthlyKwh > 0 ? 35 : 0;
  return Math.round(cost + fixedCharge);
}

export function calculateEnergySummary(appliances: ApplianceEntry[]): EnergySummary {
  const validItems = appliances.filter(
    (item) => item.watts > 0 && item.quantity > 0 && item.hoursPerDay > 0 && item.daysPerMonth > 0
  );

  const preliminary = validItems.map((item) => {
    const dailyKwh = (item.watts * item.quantity * item.hoursPerDay) / 1000;
    const monthlyKwh = dailyKwh * item.daysPerMonth;

    // Conservative realistic saving factor per category
    let savingFactor = 0.15;
    if (item.category === 'lighting' && item.watts >= 20) {
      savingFactor = 0.65; // Replacing incandescent/CFL with 9W LED
    } else if (item.category === 'cooling' && item.watts >= 65) {
      savingFactor = 0.35; // Replacing standard 75W fan with 28W BLDC or reducing idle hours
    } else if (item.category === 'agriculture') {
      savingFactor = 0.2; // Drip/timer scheduling + capacitor bank / efficient pump
    } else if (item.hoursPerDay >= 10) {
      savingFactor = 0.22;
    }

    return {
      ...item,
      dailyKwh,
      monthlyKwh,
      potentialMonthlySavingsKwh: monthlyKwh * savingFactor,
    };
  });

  const totalDailyKwh = preliminary.reduce((sum, x) => sum + x.dailyKwh, 0);
  const totalMonthlyKwh = preliminary.reduce((sum, x) => sum + x.monthlyKwh, 0);
  const potentialMonthlySavingsKwh = preliminary.reduce(
    (sum, x) => sum + x.potentialMonthlySavingsKwh,
    0
  );

  const estimatedMonthlyCostInr = calculateElectricityCostInr(totalMonthlyKwh);
  const reducedMonthlyCostInr = calculateElectricityCostInr(
    Math.max(0, totalMonthlyKwh - potentialMonthlySavingsKwh)
  );
  const potentialMonthlySavingsInr = Math.max(0, estimatedMonthlyCostInr - reducedMonthlyCostInr);
  const effectiveRatePerKwh =
    totalMonthlyKwh > 0 ? estimatedMonthlyCostInr / totalMonthlyKwh : 0;

  const applianceBreakdown: ApplianceCalculation[] = preliminary.map((item) => ({
    ...item,
    dailyKwh: Number(item.dailyKwh.toFixed(2)),
    monthlyKwh: Number(item.monthlyKwh.toFixed(2)),
    estimatedMonthlyCostInr: Math.round(item.monthlyKwh * effectiveRatePerKwh),
    potentialMonthlySavingsKwh: Number(item.potentialMonthlySavingsKwh.toFixed(2)),
    potentialMonthlySavingsInr: Math.round(item.potentialMonthlySavingsKwh * effectiveRatePerKwh),
  }));

  // India central electricity grid emission factor ~ 0.82 kg CO2 per kWh
  const estimatedCo2KgPerMonth = Number((totalMonthlyKwh * 0.82).toFixed(1));

  // Personalized recommendations derived directly from user's entered appliances
  const suggestions: EnergySummary['suggestions'] = [];

  const hasHighWattLighting = validItems.some(
    (i) => i.category === 'lighting' || i.name.toLowerCase().includes('bulb') || i.name.toLowerCase().includes('tube')
  );
  const hasHighWattFans = validItems.some(
    (i) => i.category === 'cooling' || i.name.toLowerCase().includes('fan')
  );
  const hasAgriPump = validItems.some(
    (i) => i.category === 'agriculture' || i.name.toLowerCase().includes('pump') || i.name.toLowerCase().includes('motor')
  );
  const hasLongRunAppliances = validItems.some((i) => i.hoursPerDay >= 8);

  if (hasHighWattLighting) {
    suggestions.push({
      id: 'led-upgrade',
      title: {
        en: 'Replace traditional bulbs with 9W LED bulbs',
        te: 'పాత బల్బుల స్థానంలో 9W LED బల్బులను వాడండి',
      },
      description: {
        en: 'Switching from 40W–60W incandescent or older tube lights to 9W LEDs cuts lighting electricity consumption by up to 75% with brighter illumination.',
        te: '40W–60W పాత బల్బులకు బదులుగా 9W LED బల్బులు వాడితే లైటింగ్ విద్యుత్ ఖర్చు 75% వరకు తగ్గుతుంది.',
      },
      estimatedSavingText: {
        en: 'Saves 60%–75% on lighting units',
        te: 'లైటింగ్ విద్యుత్‌లో 60%–75% ఆదా',
      },
    });
  }

  if (hasHighWattFans) {
    suggestions.push({
      id: 'fan-bldc',
      title: {
        en: 'Reduce unnecessary fan usage & consider BLDC fans',
        te: 'అనవసరమైన ఫ్యాన్ వాడకం తగ్గించండి & BLDC ఫ్యాన్లు వాడండి',
      },
      description: {
        en: 'Turn off ceiling fans when leaving rooms, clean blades for better airflow, and replace aging 75W fans with 28W BLDC motors.',
        te: 'గదిలో ఎవరూ లేనప్పుడు ఫ్యాన్లు ఆపివేయండి. పాత 75W ఫ్యాన్లకు బదులుగా 28W BLDC ఫ్యాన్లు వాడితే సగానికి పైగా విద్యుత్ ఆదా అవుతుంది.',
      },
      estimatedSavingText: {
        en: 'Saves ~35–55% on cooling load',
        te: 'ఫ్యాన్ విద్యుత్‌లో ~35–55% ఆదా',
      },
    });
  }

  if (hasAgriPump) {
    suggestions.push({
      id: 'agri-pump',
      title: {
        en: 'Schedule irrigation pumps & evaluate solar water pumping',
        te: 'వ్యవసాయ పంపుల సమయపాలన & సోలార్ పంపుల పరిశీలన',
      },
      description: {
        en: 'Water fields during early morning or evening to minimize evaporation, maintain foot-valves, and explore PM-KUSUM solar pump subsidies.',
        te: 'ఉదయం లేదా సాయంత్రం వేళల్లో నీరు పెట్టండి. ఫుట్-వాల్వ్ తనిఖీ చేసి, PM-KUSUM సోలార్ పంపు సబ్సిడీని పరిశీలించండి.',
      },
      estimatedSavingText: {
        en: 'Saves 15%–25% pump energy',
        te: 'పంపు విద్యుత్‌లో 15%–25% ఆదా',
      },
    });
  }

  if (hasLongRunAppliances || suggestions.length < 3) {
    suggestions.push({
      id: 'switch-off-standby',
      title: {
        en: 'Switch off unused appliances at the wall socket',
        te: 'వాడని ఉపకరణాలను మెయిన్ స్విచ్ వద్దే ఆపివేయండి',
      },
      description: {
        en: 'TVs, set-top boxes, phone chargers, and stabilizers continue drawing standby phantom load even when switched off by remote.',
        te: 'టీవీ, సెటాప్ బాక్స్, ఛార్జర్లు రిమోట్‌తో ఆపినా విద్యుత్ ఖర్చు అవుతూనే ఉంటుంది. వాల్ స్విచ్ ఆఫ్ చేయడం అలవాటు చేసుకోండి.',
      },
      estimatedSavingText: {
        en: 'Cuts 5%–10% hidden standby waste',
        te: '5%–10% వృథా విద్యుత్ నివారణ',
      },
    });
  }

  suggestions.push({
    id: 'bee-star-equipment',
    title: {
      en: 'Use BEE 5-Star energy-efficient electrical equipment',
      te: 'BEE 5-స్టార్ సామర్థ్యం గల విద్యుత్ పరికరాలను ఎంచుకోండి',
    },
    description: {
      en: 'When replacing refrigerators, coolers, or motors, choose BEE 4-Star or 5-Star rated appliances to lower monthly electricity bills for 10+ years.',
      te: 'కొత్త ఫ్రిజ్, కూలర్ లేదా మోటారు కొనేటప్పుడు BEE 5-స్టార్ రేటింగ్ ఉన్నవి ఎంచుకుంటే దీర్ఘకాలంలో కరెంట్ బిల్లు గణనీయంగా తగ్గుతుంది.',
    },
    estimatedSavingText: {
      en: 'Long-term 20%–30% bill reduction',
      te: 'దీర్ఘకాలంలో 20%–30% బిల్లు తగ్గింపు',
    },
  });

  return {
    totalDailyKwh: Number(totalDailyKwh.toFixed(2)),
    totalMonthlyKwh: Number(totalMonthlyKwh.toFixed(2)),
    estimatedMonthlyCostInr,
    potentialMonthlySavingsKwh: Number(potentialMonthlySavingsKwh.toFixed(2)),
    potentialMonthlySavingsInr,
    estimatedCo2KgPerMonth,
    effectiveRatePerKwh: Number(effectiveRatePerKwh.toFixed(2)),
    applianceBreakdown,
    suggestions,
  };
}

/**
 * Indicative rooftop solar system sizing for Guntur / Andhra Pradesh irradiance.
 * Average peak sun generation ~ 4.0 to 4.5 kWh per kW per day (approx. 120 kWh/month per 1 kW).
 */
export function estimateSolarSystem(monthlyKwh: number): SolarEstimateResult {
  const safeKwh = Math.max(0, monthlyKwh);
  if (safeKwh === 0) {
    return {
      monthlyKwh: 0,
      recommendedKw: 0,
      estimatedMonthlyGenKwh: 0,
      estimatedRoofAreaSqFt: 0,
      estimatedMonthlyBillSavingsInr: 0,
      estimatedAnnualCo2SavedKg: 0,
      suitableSystemType: {
        en: 'Enter monthly electricity consumption (kWh) to calculate.',
        te: 'అంచనా కోసం మీ నెలవారీ విద్యుత్ వినియోగం (kWh) నమోదు చేయండి.',
      },
    };
  }

  // 1 kW in Guntur district yields ~120 kWh/month on average across the year
  const rawKw = safeKwh / 120;
  // Snap to practical residential/farm inverter sizes (0.5, 1, 1.5, 2, 3, 5, etc.)
  const recommendedKw = Math.max(0.5, Math.ceil(rawKw * 2) / 2);
  const estimatedMonthlyGenKwh = Math.round(recommendedKw * 120);
  const estimatedRoofAreaSqFt = Math.round(recommendedKw * 100);
  const currentBill = calculateElectricityCostInr(safeKwh);
  const remainingKwh = Math.max(0, safeKwh - estimatedMonthlyGenKwh);
  const newBill = remainingKwh > 0 ? calculateElectricityCostInr(remainingKwh) : 35;
  const estimatedMonthlyBillSavingsInr = Math.max(0, currentBill - newBill);
  const estimatedAnnualCo2SavedKg = Math.round(estimatedMonthlyGenKwh * 12 * 0.82);

  let suitableSystemType = {
    en: 'On-Grid Rooftop Solar with Net Metering (or Hybrid with Battery Backup for areas with power cuts)',
    te: 'నెట్ మీటరింగ్‌తో ఆన్-గ్రిడ్ రూఫ్‌టాప్ సోలార్ (లేదా కరెంట్ కోతలు ఉంటే బ్యాటరీతో హైబ్రిడ్ సిస్టమ్)',
  };

  if (recommendedKw <= 1) {
    suitableSystemType = {
      en: 'Compact 1 kW Rooftop Solar / DC Solar Home Lighting & Fan Kit',
      te: 'చిన్న 1 kW రూఫ్‌టాప్ సోలార్ / సోలార్ లైటింగ్ మరియు ఫ్యాన్ కిట్',
    };
  } else if (recommendedKw >= 5) {
    suitableSystemType = {
      en: '3-Phase On-Grid Rooftop Solar / Agricultural Solar Pumping System',
      te: '3-ఫేజ్ ఆన్-గ్రిడ్ రూఫ్‌టాప్ సోలార్ / వ్యవసాయ సోలార్ పంపు సిస్టమ్',
    };
  }

  return {
    monthlyKwh: safeKwh,
    recommendedKw,
    estimatedMonthlyGenKwh,
    estimatedRoofAreaSqFt,
    estimatedMonthlyBillSavingsInr,
    estimatedAnnualCo2SavedKg,
    suitableSystemType,
  };
}
