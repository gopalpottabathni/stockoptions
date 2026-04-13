(function () {
  const state = {
    mode: localStorage.getItem("signal-deck-mode") || "demo",
    stocks: [...window.DEMO_DATA.stocks],
    filters: { bias: "all", sector: "all" },
    config: JSON.parse(localStorage.getItem("signal-deck-config") || "{}"),
    liveData: null
  };

  const refs = {
    dataModeLabel: document.getElementById("dataModeLabel"),
    refreshButton: document.getElementById("refreshButton"),
    toggleModeButton: document.getElementById("toggleModeButton"),
    niftyBias: document.getElementById("niftyBias"),
    niftyBiasReason: document.getElementById("niftyBiasReason"),
    bankNiftyTone: document.getElementById("bankNiftyTone"),
    bankNiftyReason: document.getElementById("bankNiftyReason"),
    breadthValue: document.getElementById("breadthValue"),
    breadthReason: document.getElementById("breadthReason"),
    eventRiskValue: document.getElementById("eventRiskValue"),
    eventRiskReason: document.getElementById("eventRiskReason"),
    patternRead: document.getElementById("patternRead"),
    volatilityRead: document.getElementById("volatilityRead"),
    topIdeas: document.getElementById("topIdeas"),
    scannerTable: document.getElementById("scannerTable"),
    optionsIdeas: document.getElementById("optionsIdeas"),
    catalystFeed: document.getElementById("catalystFeed"),
    socialSummary: document.getElementById("socialSummary"),
    leaderImpact: document.getElementById("leaderImpact"),
    xCards: document.getElementById("xCards"),
    sectorFilter: document.getElementById("sectorFilter"),
    biasFilter: document.getElementById("biasFilter"),
    configForm: document.getElementById("configForm"),
    configStatus: document.getElementById("configStatus"),
    marketEndpoint: document.getElementById("marketEndpoint"),
    newsEndpoint: document.getElementById("newsEndpoint"),
    socialEndpoint: document.getElementById("socialEndpoint"),
    indexChart: document.getElementById("indexChart")
  };

  function signalClass(value) {
    return `signal-tag signal-${value}`;
  }

  function computeHeadline(stock) {
    if (stock.bias === "bullish") {
      return `${stock.symbol} shows relative strength with ${stock.pattern.toLowerCase()} confirmation.`;
    }
    if (stock.bias === "bearish") {
      return `${stock.symbol} remains weak as ${stock.pattern.toLowerCase()} pressure stays active.`;
    }
    return `${stock.symbol} is in compression and may need a catalyst for directional follow-through.`;
  }

  function rankedStocks() {
    return [...state.stocks]
      .sort((a, b) => b.score - a.score)
      .filter((stock) => state.filters.bias === "all" || stock.bias === state.filters.bias)
      .filter((stock) => state.filters.sector === "all" || stock.sector === state.filters.sector);
  }

  function renderOverview() {
    const overview = state.liveData?.marketOverview || window.DEMO_DATA.marketOverview;
    refs.dataModeLabel.textContent = state.mode === "demo" ? "Demo intelligence stream" : "Live-ready endpoint mode";
    refs.toggleModeButton.textContent = state.mode === "demo" ? "Switch to live-ready mode" : "Use demo stream";
    refs.niftyBias.textContent = overview.niftyBias;
    refs.niftyBiasReason.textContent = overview.niftyBiasReason;
    refs.bankNiftyTone.textContent = overview.bankNiftyTone;
    refs.bankNiftyReason.textContent = overview.bankNiftyReason;
    refs.breadthValue.textContent = overview.breadthValue;
    refs.breadthReason.textContent = overview.breadthReason;
    refs.eventRiskValue.textContent = overview.eventRiskValue;
    refs.eventRiskReason.textContent = overview.eventRiskReason;
    refs.patternRead.textContent = overview.patternRead;
    refs.volatilityRead.textContent = overview.volatilityRead;
    drawProjectionChart(overview.projection);
  }

  function drawProjectionChart(points) {
    const width = 720;
    const height = 260;
    const padding = 24;
    const min = Math.min(...points);
    const max = Math.max(...points);
    const stepX = (width - padding * 2) / (points.length - 1);
    const scaleY = (height - padding * 2) / ((max - min) || 1);
    const linePath = points.map((point, index) => {
      const x = padding + index * stepX;
      const y = height - padding - (point - min) * scaleY;
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    }).join(" ");
    const areaPath = `${linePath} L ${padding + (points.length - 1) * stepX} ${height - padding} L ${padding} ${height - padding} Z`;

    refs.indexChart.innerHTML = `
      <defs>
        <linearGradient id="areaFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="rgba(20,135,100,0.35)"></stop>
          <stop offset="100%" stop-color="rgba(20,135,100,0.02)"></stop>
        </linearGradient>
      </defs>
      <g opacity="0.14" stroke="#7f6d57">
        <line x1="24" x2="696" y1="36" y2="36"></line>
        <line x1="24" x2="696" y1="130" y2="130"></line>
        <line x1="24" x2="696" y1="224" y2="224"></line>
      </g>
      <path d="${areaPath}" fill="url(#areaFill)"></path>
      <path d="${linePath}" fill="none" stroke="#0e7a5f" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path>
    `;
  }

  function renderTopIdeas() {
    refs.topIdeas.innerHTML = rankedStocks().slice(0, 3).map((stock) => `
      <article class="idea-item">
        <div class="idea-head">
          <div><strong>${stock.symbol}</strong><p class="muted">${stock.name}</p></div>
          <span class="${signalClass(stock.bias)}">${stock.bias}</span>
        </div>
        <p>${computeHeadline(stock)}</p>
        <p class="muted">Buy zone: ${stock.buyRange} | Exit zone: ${stock.exitRange}</p>
      </article>
    `).join("");
  }

  function renderScanner() {
    refs.scannerTable.innerHTML = rankedStocks().map((stock) => `
      <tr>
        <td><strong>${stock.symbol}</strong><br><span class="muted">${stock.price.toLocaleString("en-IN")} INR</span></td>
        <td>${stock.sector}</td>
        <td><span class="${signalClass(stock.bias)}">${stock.bias}</span><br><span class="muted">Score ${stock.score}/100</span></td>
        <td>${stock.pattern}</td>
        <td>${stock.sentiment}/100</td>
        <td>${stock.buyRange}</td>
        <td>${stock.exitRange}</td>
      </tr>
    `).join("");
  }

  function renderOptions() {
    refs.optionsIdeas.innerHTML = rankedStocks().filter((stock) => stock.optionBias !== "neutral").slice(0, 4).map((stock) => `
      <article class="stack-item">
        <div class="stack-row">
          <strong>${stock.symbol} ${stock.optionBias.toUpperCase()} idea</strong>
          <span class="${signalClass(stock.optionBias === "call" ? "bullish" : "bearish")}">${stock.optionIdea}</span>
        </div>
        <p>${stock.thesis}</p>
        <p class="muted">Probable range: ${stock.optionRange}</p>
        <p class="muted">Risk line: ${stock.risk}</p>
      </article>
    `).join("");
  }

  function renderCatalysts() {
    const catalysts = state.liveData?.catalysts || window.DEMO_DATA.catalysts;
    refs.catalystFeed.innerHTML = catalysts.map((item) => `
      <article class="stack-item">
        <strong>${item.title}</strong>
        <p>${item.summary}</p>
        <p class="muted">Impact: ${item.impact}</p>
        <div class="bar"><div class="bar-fill" style="width:${item.strength}%"></div></div>
      </article>
    `).join("");
  }

  function renderSocial() {
    const social = state.liveData?.social || window.DEMO_DATA.social;
    refs.socialSummary.innerHTML = social.marketPulse.map((item) => `
      <article class="social-card">
        <p class="card-label">${item.label}</p>
        <strong>${item.value}/100</strong>
        <p class="muted">${item.note}</p>
        <div class="bar"><div class="bar-fill" style="width:${item.value}%"></div></div>
      </article>
    `).join("");
    refs.leaderImpact.innerHTML = social.leaderImpact.map((item) => `
      <article class="stack-item">
        <strong>${item.person}</strong>
        <p>${item.angle}</p>
        <p class="muted">${item.effect}</p>
      </article>
    `).join("");
  }

  function miniChart(points, bias) {
    const width = 220;
    const height = 100;
    const padding = 10;
    const min = Math.min(...points);
    const max = Math.max(...points);
    const stepX = (width - padding * 2) / (points.length - 1);
    const scaleY = (height - padding * 2) / ((max - min) || 1);
    const path = points.map((point, index) => {
      const x = padding + index * stepX;
      const y = height - padding - (point - min) * scaleY;
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    }).join(" ");
    const color = bias === "bearish" ? "#a33d2d" : "#0e7a5f";
    return `<path d="${path}" fill="none" stroke="${color}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path>`;
  }

  function renderXCards() {
    refs.xCards.innerHTML = rankedStocks().slice(0, 3).map((stock) => `
      <article class="x-card">
        <p class="card-label">${stock.sector}</p>
        <strong>${stock.symbol}</strong>
        <p>${stock.thesis}</p>
        <svg class="chart chart-mini" viewBox="0 0 220 100" preserveAspectRatio="none">${miniChart(stock.chart, stock.bias)}</svg>
        <p class="muted">Buy: ${stock.buyRange}</p>
        <p class="muted">Exit: ${stock.exitRange}</p>
      </article>
    `).join("");
  }

  function populateSectorFilter() {
    const sectors = ["all", ...new Set(window.DEMO_DATA.stocks.map((stock) => stock.sector))];
    refs.sectorFilter.innerHTML = sectors.map((sector) => `<option value="${sector}">${sector === "all" ? "All sectors" : sector}</option>`).join("");
  }

  function randomizeScores() {
    state.stocks = state.stocks.map((stock) => {
      const drift = Math.floor((Math.random() - 0.5) * 6);
      const sentimentDrift = Math.floor((Math.random() - 0.5) * 8);
      return { ...stock, score: Math.max(50, Math.min(92, stock.score + drift)), sentiment: Math.max(30, Math.min(85, stock.sentiment + sentimentDrift)) };
    });
  }

  function renderAll() {
    renderOverview();
    renderTopIdeas();
    renderScanner();
    renderOptions();
    renderCatalysts();
    renderSocial();
    renderXCards();
  }

  refs.refreshButton.addEventListener("click", () => {
    if (state.mode === "live") {
      loadLiveData();
      return;
    }
    randomizeScores();
    renderAll();
  });

  refs.toggleModeButton.addEventListener("click", () => {
    state.mode = state.mode === "demo" ? "live" : "demo";
    localStorage.setItem("signal-deck-mode", state.mode);
    if (state.mode === "live") {
      loadLiveData();
    } else {
      state.liveData = null;
      refs.configStatus.textContent = "Demo mode active. The dashboard is using bundled sample market intelligence.";
      renderAll();
    }
  });

  refs.biasFilter.addEventListener("change", (event) => {
    state.filters.bias = event.target.value;
    renderAll();
  });

  refs.sectorFilter.addEventListener("change", (event) => {
    state.filters.sector = event.target.value;
    renderAll();
  });

  refs.configForm.addEventListener("submit", (event) => {
    event.preventDefault();
    state.config = {
      marketEndpoint: refs.marketEndpoint.value.trim(),
      newsEndpoint: refs.newsEndpoint.value.trim(),
      socialEndpoint: refs.socialEndpoint.value.trim()
    };
    localStorage.setItem("signal-deck-config", JSON.stringify(state.config));
    refs.configStatus.textContent = "Endpoints saved locally. Switch to live-ready mode and press refresh to pull from your own APIs.";
  });

  async function readJson(url) {
    if (!url) {
      return null;
    }
    const response = await fetch(url, { headers: { Accept: "application/json" } });
    if (!response.ok) {
      throw new Error(`Request failed for ${url}`);
    }
    return response.json();
  }

  async function loadLiveData() {
    if (!state.config.marketEndpoint && !state.config.newsEndpoint && !state.config.socialEndpoint) {
      refs.configStatus.textContent = "Add at least one endpoint in Setup before using live-ready mode.";
      renderAll();
      return;
    }

    refs.configStatus.textContent = "Fetching live-ready JSON feeds...";

    try {
      const [marketData, newsData, socialData] = await Promise.all([
        readJson(state.config.marketEndpoint),
        readJson(state.config.newsEndpoint),
        readJson(state.config.socialEndpoint)
      ]);

      state.liveData = {
        marketOverview: marketData?.marketOverview || window.DEMO_DATA.marketOverview,
        catalysts: newsData?.catalysts || window.DEMO_DATA.catalysts,
        social: socialData?.social || window.DEMO_DATA.social
      };

      if (Array.isArray(marketData?.stocks) && marketData.stocks.length) {
        state.stocks = marketData.stocks;
      }

      refs.configStatus.textContent = "Live-ready feeds loaded. Results depend on the freshness and quality of your connected APIs.";
      renderAll();
    } catch (error) {
      state.liveData = null;
      refs.configStatus.textContent = "Live fetch failed. Check your endpoint URLs, JSON format, and CORS settings. Demo data is still available.";
      renderAll();
    }
  }

  refs.marketEndpoint.value = state.config.marketEndpoint || "";
  refs.newsEndpoint.value = state.config.newsEndpoint || "";
  refs.socialEndpoint.value = state.config.socialEndpoint || "";

  populateSectorFilter();
  renderAll();

  if (state.mode === "live") {
    loadLiveData();
  } else {
    refs.configStatus.textContent = "Demo mode active. Add your APIs in Setup when you are ready for live feeds.";
  }
})();
