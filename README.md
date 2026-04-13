# NSE Signal Deck

A hostable stock intelligence dashboard for Indian markets built with plain HTML, CSS, and JavaScript so it can be deployed on free static hosting.

## What is included

- Light-theme dashboard for NSE market monitoring
- Multi-factor stock scanner with demo rankings
- Options radar with probable entry and exit ranges
- News and social impact panels
- X-ready stock idea cards
- Local settings for plugging in your own live API endpoints
- Netlify config for static hosting

## How to run

Open `index.html` in a browser.

## How to host for free

### Netlify

1. Create a new site from this folder.
2. Keep the publish directory as the project root.
3. No build command is required.

### GitHub Pages or Cloudflare Pages

Upload the same files. This app is static and does not need a build step.

## Important limitation

This version is a ready-made website application, but the live parts you requested need external data services:

- Live NSE cash prices
- Live NSE F&O chain and option analytics
- Real-time news ingestion
- Social media sentiment collection
- Automatic unattended scoring and storage

Static hosting alone cannot reliably do all of that. For full automation you should add:

- A backend or serverless layer
- Scheduled refresh jobs
- A database or cached JSON snapshots
- API keys for market, news, and sentiment providers

## Expected live JSON shape

### Market endpoint

```json
{
  "marketOverview": {
    "niftyBias": "Bullish pullback",
    "niftyBiasReason": "Reason text",
    "bankNiftyTone": "Neutral",
    "bankNiftyReason": "Reason text",
    "breadthValue": "61%",
    "breadthReason": "Reason text",
    "eventRiskValue": "Elevated",
    "eventRiskReason": "Reason text",
    "patternRead": "Reason text",
    "volatilityRead": "Reason text",
    "projection": [21860, 21910, 21890]
  },
  "stocks": []
}
```

### News endpoint

```json
{
  "catalysts": [
    {
      "title": "Headline",
      "impact": "Bullish for banks",
      "summary": "Why it matters",
      "strength": 72
    }
  ]
}
```

### Social endpoint

```json
{
  "social": {
    "marketPulse": [
      {
        "label": "Retail bullishness",
        "value": 68,
        "note": "Short explanation"
      }
    ],
    "leaderImpact": [
      {
        "person": "Leader or institution",
        "angle": "Topic",
        "effect": "Expected market effect"
      }
    ]
  }
}
```

## Hosting note

- Netlify can host the frontend perfectly.
- The app does not work only after hosting on Netlify. It can open locally and can also be hosted on other static platforms.
- If you want automatic unattended updates, hosting alone is not enough. You also need scheduled backend jobs and live data sources.
