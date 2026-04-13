window.DEMO_DATA = {
  marketOverview: {
    niftyBias: "Bullish pullback",
    niftyBiasReason: "Momentum remains positive while price holds above the recent swing support and breadth improves.",
    bankNiftyTone: "Neutral to bullish",
    bankNiftyReason: "Private lenders are resilient, but PSU banks remain mixed.",
    breadthValue: "64%",
    breadthReason: "Advancers are leading in IT, auto, and select financials.",
    eventRiskValue: "Elevated",
    eventRiskReason: "Global rate commentary, energy headlines, and policy remarks may move intraday sentiment.",
    patternRead: "NIFTY is tracking inside a rising channel with a visible accumulation shelf.",
    volatilityRead: "Weekly options may react sharply if macro headlines hit during the afternoon session.",
    projection: [21860, 21910, 21890, 21960, 22040, 22010, 22090, 22140, 22110, 22190, 22250, 22210]
  },
  stocks: [
    { symbol: "RELIANCE", name: "Reliance Industries", sector: "Energy", bias: "bullish", score: 84, sentiment: 72, pattern: "Ascending triangle", price: 2958, buyRange: "2930 - 2960", exitRange: "3035 - 3080", thesis: "Breakout pressure building with positive sentiment around refining margins and retail traction.", fundamentals: "High cash generation, diversified earnings, stable institutional interest.", optionIdea: "Near OTM call spread", optionBias: "call", optionRange: "Entry premium 28 - 34, target 48 - 56", risk: "Invalidate below 2910", chart: [42, 48, 46, 52, 58, 61, 64] },
    { symbol: "HDFCBANK", name: "HDFC Bank", sector: "Financials", bias: "bullish", score: 79, sentiment: 66, pattern: "Cup and handle", price: 1684, buyRange: "1665 - 1690", exitRange: "1728 - 1750", thesis: "Steady accumulation with improving trend structure and supportive banking tone.", fundamentals: "Quality balance sheet, margin stability, strong franchise quality.", optionIdea: "ATM call", optionBias: "call", optionRange: "Entry premium 22 - 27, target 35 - 41", risk: "Invalidate below 1655", chart: [38, 40, 41, 46, 49, 53, 57] },
    { symbol: "TCS", name: "Tata Consultancy Services", sector: "IT", bias: "neutral", score: 68, sentiment: 58, pattern: "Range compression", price: 4018, buyRange: "3980 - 4020", exitRange: "4090 - 4130", thesis: "Stability play with gradual rotation into defensive large-cap technology.", fundamentals: "Strong cash flows, quality return profile, steady guidance perception.", optionIdea: "Short strangle hedge watch", optionBias: "neutral", optionRange: "Entry after range confirmation", risk: "Break of 3950 expands downside", chart: [54, 53, 52, 55, 56, 58, 57] },
    { symbol: "TATASTEEL", name: "Tata Steel", sector: "Metals", bias: "bearish", score: 71, sentiment: 44, pattern: "Head and shoulders", price: 152, buyRange: "149 - 151 (put view)", exitRange: "142 - 145", thesis: "Weak metal tone and pattern breakdown raise probability of downside continuation.", fundamentals: "Cyclical earnings pressure and headline sensitivity to global demand.", optionIdea: "Slight OTM put", optionBias: "put", optionRange: "Entry premium 4.2 - 4.8, target 6.3 - 7.1", risk: "Invalidate above 155", chart: [67, 63, 61, 58, 55, 50, 47] },
    { symbol: "SBIN", name: "State Bank of India", sector: "Financials", bias: "bullish", score: 76, sentiment: 63, pattern: "Trendline rebound", price: 782, buyRange: "774 - 783", exitRange: "804 - 818", thesis: "Public sector banking momentum remains constructive with healthy participation.", fundamentals: "Earnings support and strong trading liquidity.", optionIdea: "Bull call spread", optionBias: "call", optionRange: "Entry premium 12 - 15, target 21 - 25", risk: "Invalidate below 768", chart: [31, 34, 36, 39, 43, 48, 51] },
    { symbol: "INFY", name: "Infosys", sector: "IT", bias: "bearish", score: 73, sentiment: 47, pattern: "Falling channel", price: 1452, buyRange: "1455 - 1468 (put view)", exitRange: "1405 - 1420", thesis: "Short-term pressure persists despite quality fundamentals, making it suitable for tactical puts.", fundamentals: "Strong franchise, but near-term sentiment remains cautious.", optionIdea: "ATM put", optionBias: "put", optionRange: "Entry premium 20 - 24, target 31 - 36", risk: "Invalidate above 1482", chart: [62, 61, 59, 56, 53, 51, 48] }
  ],
  catalysts: [
    { title: "Energy prices and shipping risk remain key watchpoints", impact: "Mixed to bearish for import-sensitive sectors", summary: "Rising geopolitical stress around shipping and crude can pressure paint, aviation, and downstream margins.", strength: 64 },
    { title: "Domestic policy commentary remains supportive for infrastructure", impact: "Bullish for capital goods and PSU-linked themes", summary: "Public statements around capex momentum tend to support industrial and construction names.", strength: 71 },
    { title: "Global rate language is slowing risk appetite", impact: "Volatility risk for banks and high-beta stocks", summary: "Hawkish international remarks can trigger short-lived risk-off rotation in emerging markets.", strength: 68 }
  ],
  social: {
    marketPulse: [
      { label: "Retail bullishness", value: 69, note: "Dip-buying tone is strong in large-cap discussions." },
      { label: "Bearish warnings", value: 41, note: "Short sellers are active in metals and selected IT names." },
      { label: "Volatility chatter", value: 76, note: "Traders expect rapid premium swings around headlines." },
      { label: "Policy optimism", value: 63, note: "Infrastructure and financial inclusion themes are positive." }
    ],
    leaderImpact: [
      { person: "Global central bank officials", angle: "Rate path comments", effect: "Can pressure emerging market risk appetite and temporarily strengthen defensive sectors." },
      { person: "Indian policy leadership", angle: "Capex and manufacturing remarks", effect: "Usually supports infra, capital goods, logistics, and select PSU names." },
      { person: "Energy-producing nation leaders", angle: "Supply and sanctions language", effect: "Moves oil expectations and affects refining, chemicals, and transport-heavy businesses." }
    ]
  }
};
