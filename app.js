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
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}

async function loadLiveData(config) {
  const endpoints = [
    { key: "stats", url: config.statsUrl },
    { key: "regions", url: config.regionsUrl },
    { key: "pipeline", url: config.pipelineUrl },
    { key: "risk", url: config.riskUrl },
    { key: "health", url: config.healthUrl },
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

  results.forEach((result, index) => {
    const endpoint = endpoints[index];
    if (result.status === "fulfilled") {
      liveSuccessCount += 1;
      endpointStatus.push(`${endpoint.key}: live (${endpoint.url})`);

      if (endpoint.key === "stats") {
        const payload = result.value || {};
        data.stats = {
          nodesOnline: payload.nodesOnline || payload.nodes_online || data.stats.nodesOnline,
          flRound: payload.flRound || payload.fl_round || data.stats.flRound,
          complianceScore:
            payload.complianceScore || payload.compliance_score || data.stats.complianceScore,
          tokenRate: payload.tokenRate || payload.token_rate || data.stats.tokenRate,
        };
      }

      if (endpoint.key === "regions" && Array.isArray(result.value)) {
        data.regions = result.value;
      }

      if (endpoint.key === "pipeline") {
        if (Array.isArray(result.value)) {
          data.pipeline = result.value;
        } else if (Array.isArray(result.value.events)) {
          data.pipeline = result.value.events;
        }
      }

      if (endpoint.key === "risk") {
        if (Array.isArray(result.value)) {
          data.risk = result.value;
        } else if (Array.isArray(result.value.events)) {
          data.risk = result.value.events;
        }
      }

      if (endpoint.key === "health" && Array.isArray(result.value.services)) {
        result.value.services.forEach((service) => {
          endpointStatus.push(`service ${service.name}: ${service.status}`);
        });
      }
      return;
    }

    endpointStatus.push(
      `${endpoint.key}: simulated fallback (${endpoint.url}) - ${result.reason?.message || "unavailable"}`
    );
  });

  const mode = liveSuccessCount > 0 ? "Hybrid (Live + Simulation)" : "Supply Chain Simulation";
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
