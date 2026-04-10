const simulatedStats = {
  nodesOnline: 33801,
  flRound: 621,
  complianceScore: 97,
  tokenRate: 1580,
};

const simulatedRegions = [
  {
    name: "Trans-Atlantic Corridor",
    zoneType: "Trade Corridor",
    riskSignal: "Port congestion escalation risk",
    modelConvergence: "95.2%",
    carbonSignal: "Maritime route intensity elevated",
  },
  {
    name: "South China Manufacturing Arc",
    zoneType: "Factory Cluster",
    riskSignal: "Supplier concentration stress",
    modelConvergence: "94.7%",
    carbonSignal: "Grid-carbon variability increasing",
  },
  {
    name: "Mediterranean Port Mesh",
    zoneType: "Port System",
    riskSignal: "Geopolitical reroute pressure",
    modelConvergence: "96.1%",
    carbonSignal: "Fuel-switch transition in progress",
  },
  {
    name: "Pan-American Last-Mile Grid",
    zoneType: "Logistics Zone",
    riskSignal: "Cross-border customs latency spikes",
    modelConvergence: "95.4%",
    carbonSignal: "Urban freight emissions trend down",
  },
  {
    name: "Indian Ocean Freight Ring",
    zoneType: "Ocean Route",
    riskSignal: "Weather-linked disruption probability rising",
    modelConvergence: "94.9%",
    carbonSignal: "Route decarbonization pressure elevated",
  },
  {
    name: "North Sea Energy-Supply Hub",
    zoneType: "Critical Infrastructure Zone",
    riskSignal: "Energy throughput fragility",
    modelConvergence: "96.3%",
    carbonSignal: "Hydrogen lane expansion underway",
  },
];

const simulatedPipelineFeed = [
  "Round 621: 33,801 nodes submitted signed supply updates.",
  "Byzantine guards rejected 0.31% anomalous contributions.",
  "Streaming aggregation finalized across 6 logistics quorums.",
  "zk-SNARK verification mean latency: 10.7 ms.",
  "PQC transport policy active for all cross-border channels.",
];

const simulatedRiskFeed = [
  "Disruption model elevated risk for 8 major corridors.",
  "Inventory model flagged stockout pressure in 14 clusters.",
  "Carbon-routing model identified 11 high-impact optimization lanes.",
  "Counterfeit-risk classifier raised alerts in 5 customs zones.",
  "Rerouting simulator reduced projected delay by 9% in stressed routes.",
];

function setText(id, text) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = text;
  }
}

function setDataMode(modeLabel) {
  setText("dataMode", `Data Mode: ${modeLabel}`);
}

function renderStats(stats) {
  setText("nodesOnline", Number(stats.nodesOnline || 0).toLocaleString());
  setText("flRound", String(stats.flRound || 0));
  setText("complianceScore", `${stats.complianceScore || 0}%`);
  setText("tokenRate", `${stats.tokenRate || 0} MHC/min`);
}

function renderRegions(regions) {
  const container = document.getElementById("regionGrid");
  const details = document.getElementById("regionDetails");
  if (!container || !details) {
    return;
  }

  container.innerHTML = "";

  regions.forEach((region) => {
    const button = document.createElement("button");
    button.className = "region-btn";
    button.type = "button";
    button.innerHTML = `<strong>${region.name}</strong><br/><small>${region.zoneType}</small>`;
    button.addEventListener("click", () => {
      details.innerHTML = `
        <strong>${region.name}</strong><br/>
        Zone type: ${region.zoneType}<br/>
        Risk signal: ${region.riskSignal}<br/>
        Convergence: ${region.modelConvergence}<br/>
        Carbon signal: ${region.carbonSignal}
      `;
    });
    container.appendChild(button);
  });
}

function renderFeed(listId, items) {
  const list = document.getElementById(listId);
  if (!list) {
    return;
  }

  list.innerHTML = "";

  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });
}

function renderEndpointStatus(statusItems) {
  renderFeed("endpointStatus", statusItems);
}

function getConfig() {
  const override = window.SUPPLYCHAIN_DASHBOARD_CONFIG || {};
  return {
    timeoutMs: Number(override.timeoutMs || 3000),
    statsUrl: override.statsUrl || "/api/supplychain/stats",
    regionsUrl: override.regionsUrl || "/api/supplychain/regions",
    pipelineUrl: override.pipelineUrl || "/api/supplychain/pipeline",
    riskUrl: override.riskUrl || "/api/supplychain/risk",
    healthUrl: override.healthUrl || "/api/supplychain/health",
  };
}

async function fetchJson(url, timeoutMs) {
  const controller = new AbortController();
  const start = performance.now();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const payload = await response.json();
    const latencyMs = Math.round(performance.now() - start);
    return { payload, status: response.status, latencyMs };
  } finally {
    clearTimeout(timer);
  }
}

async function loadLiveData(config) {
  const endpoints = [
    { key: "stats", url: config.statsUrl, required: true },
    { key: "regions", url: config.regionsUrl, required: true },
    { key: "pipeline", url: config.pipelineUrl, required: true },
    { key: "risk", url: config.riskUrl, required: true },
    { key: "health", url: config.healthUrl, required: false },
  ];

  const results = await Promise.allSettled(
    endpoints.map((endpoint) => fetchJson(endpoint.url, config.timeoutMs))
  );

  const data = {
    stats: { ...simulatedStats },
    regions: [...simulatedRegions],
    pipeline: [...simulatedPipelineFeed],
    risk: [...simulatedRiskFeed],
  };
  const endpointStatus = [];
  let liveSuccessCount = 0;
  let requiredSuccessCount = 0;

  results.forEach((result, index) => {
    const endpoint = endpoints[index];
    if (result.status === "fulfilled") {
      const response = result.value;
      const payload = response.payload;
      liveSuccessCount += 1;
      if (endpoint.required) {
        requiredSuccessCount += 1;
      }
      endpointStatus.push(
        `${endpoint.key}: live (${endpoint.url}) status ${response.status} latency ${response.latencyMs}ms`
      );

      if (endpoint.key === "stats") {
        const statsPayload = payload || {};
        data.stats = {
          nodesOnline:
            statsPayload.nodesOnline || statsPayload.nodes_online || data.stats.nodesOnline,
          flRound: statsPayload.flRound || statsPayload.fl_round || data.stats.flRound,
          complianceScore:
            statsPayload.complianceScore ||
            statsPayload.compliance_score ||
            data.stats.complianceScore,
          tokenRate: statsPayload.tokenRate || statsPayload.token_rate || data.stats.tokenRate,
        };
      }

      if (endpoint.key === "regions" && Array.isArray(payload)) {
        data.regions = payload;
      }

      if (endpoint.key === "pipeline") {
        if (Array.isArray(payload)) {
          data.pipeline = payload;
        } else if (payload && Array.isArray(payload.events)) {
          data.pipeline = payload.events;
        }
      }

      if (endpoint.key === "risk") {
        if (Array.isArray(payload)) {
          data.risk = payload;
        } else if (payload && Array.isArray(payload.events)) {
          data.risk = payload.events;
        }
      }

      if (endpoint.key === "health" && payload && Array.isArray(payload.services)) {
        payload.services.forEach((service) => {
          const latency = service.latencyMs || service.latency_ms;
          const throughput = service.throughputRps || service.throughput_rps;
          const parts = [`service ${service.name}: ${service.status}`];
          if (latency !== undefined) {
            parts.push(`latency ${latency}ms`);
          }
          if (throughput !== undefined) {
            parts.push(`throughput ${throughput} rps`);
          }
          endpointStatus.push(parts.join(" | "));
        });
      }
      return;
    }

    endpointStatus.push(
      `${endpoint.key}: simulated fallback (${endpoint.url}) - ${result.reason?.message || "unavailable"}`
    );
  });

  endpointStatus.unshift(
    `summary: ${liveSuccessCount}/${endpoints.length} endpoints live | required ${requiredSuccessCount}/4`
  );

  let mode = "Supply Chain Simulation";
  if (requiredSuccessCount === 4) {
    mode = "Live Production Feed";
  } else if (liveSuccessCount > 0) {
    mode = "Hybrid (Live + Simulation)";
  }

  return { data, endpointStatus, mode };
}

async function initDashboard() {
  const config = getConfig();
  const { data, endpointStatus, mode } = await loadLiveData(config);
  setDataMode(mode);
  renderStats(data.stats);
  renderRegions(data.regions);
  renderFeed("pipelineFeed", data.pipeline);
  renderFeed("riskFeed", data.risk);
  renderEndpointStatus(endpointStatus);
}

initDashboard();
