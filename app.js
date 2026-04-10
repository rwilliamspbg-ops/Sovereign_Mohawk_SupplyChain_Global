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

function nowIso() {
  return new Date().toISOString();
}

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

function appendOperatorLog(message) {
  const list = document.getElementById("operatorLog");
  if (!list) {
    return;
  }
  const item = document.createElement("li");
  item.textContent = `${nowIso()} | ${message}`;
  list.prepend(item);
  while (list.children.length > 8) {
    list.removeChild(list.lastChild);
  }
}

function togglePanel(panelId) {
  const panelIds = ["governancePanel", "dpiaPanel", "exportPanel"];
  panelIds.forEach((id) => {
    const panel = document.getElementById(id);
    if (!panel) {
      return;
    }
    panel.classList.toggle("hidden", id !== panelId);
  });
}

function buildOperatorSuggestions(mode, stats, operatorState) {
  const suggestions = [];

  if (!operatorState.governanceCompleted) {
    suggestions.push({
      title: "Complete governance checklist before rerouting simulations.",
      note: "Mandatory sign-off is still pending.",
      action: "governance",
    });
  }

  if (!operatorState.dpiaGenerated) {
    suggestions.push({
      title: "Run DPIA generation for new telemetry classes and trade routes.",
      note: "No DPIA artifact recorded in this session.",
      action: "dpia",
    });
  }

  if (!operatorState.evidenceExported) {
    suggestions.push({
      title: "Export round-level attestation and compliance evidence pack.",
      note: "Evidence export has not been generated yet.",
      action: "export",
    });
  }

  if (mode !== "Live Production Feed") {
    suggestions.push({
      title: "Validate endpoint readiness before policy-sensitive actions.",
      note: `Current mode is ${mode}.`,
      action: "none",
    });
  }

  if (Number(stats.complianceScore || 0) < 95) {
    suggestions.push({
      title: "Review policy-gate exceptions and recover compliance score.",
      note: `Compliance is ${stats.complianceScore || 0}% (target >= 95%).`,
      action: "governance",
    });
  }

  return suggestions.slice(0, 5);
}

function renderOperatorSuggestions(suggestions, onActionClick) {
  const list = document.getElementById("operatorSuggestions");
  if (!list) {
    return;
  }

  list.innerHTML = "";

  if (suggestions.length === 0) {
    const item = document.createElement("li");
    item.textContent = "No suggestions. Workflow checks are complete.";
    list.appendChild(item);
    return;
  }

  suggestions.forEach((suggestion) => {
    const item = document.createElement("li");
    item.className = "suggestion-item";

    const title = document.createElement("span");
    title.textContent = suggestion.title;
    item.appendChild(title);

    const note = document.createElement("span");
    note.className = "suggestion-note";
    note.textContent = suggestion.note;
    item.appendChild(note);

    if (suggestion.action !== "none") {
      const action = document.createElement("button");
      action.type = "button";
      action.className = "suggestion-action";
      action.textContent = "Open";
      action.addEventListener("click", () => onActionClick(suggestion.action));
      item.appendChild(action);
    }

    list.appendChild(item);
  });
}

function setupOperatorActions(stats, mode) {
  const governanceActionBtn = document.getElementById("governanceActionBtn");
  const dpiaActionBtn = document.getElementById("dpiaActionBtn");
  const exportEvidenceBtn = document.getElementById("exportEvidenceBtn");
  const refreshSuggestionsBtn = document.getElementById("refreshSuggestionsBtn");

  const finalizeGovernanceBtn = document.getElementById("finalizeGovernanceBtn");
  const governanceStatus = document.getElementById("governanceStatus");

  const generateDpiaBtn = document.getElementById("generateDpiaBtn");
  const telemetryClassInput = document.getElementById("telemetryClassInput");
  const tradeRouteInput = document.getElementById("tradeRouteInput");
  const dpiaOutput = document.getElementById("dpiaOutput");

  const downloadEvidenceBtn = document.getElementById("downloadEvidenceBtn");
  const exportSummary = document.getElementById("exportSummary");

  const operatorState = {
    governanceCompleted: false,
    dpiaGenerated: false,
    evidenceExported: false,
  };

  const openSuggestedAction = (actionKey) => {
    if (actionKey === "governance") {
      togglePanel("governancePanel");
      appendOperatorLog("Suggestion opened governance panel.");
      return;
    }
    if (actionKey === "dpia") {
      togglePanel("dpiaPanel");
      appendOperatorLog("Suggestion opened DPIA panel.");
      return;
    }
    if (actionKey === "export") {
      togglePanel("exportPanel");
      appendOperatorLog("Suggestion opened evidence export panel.");
    }
  };

  const refreshSuggestions = () => {
    const suggestions = buildOperatorSuggestions(mode, stats, operatorState);
    renderOperatorSuggestions(suggestions, openSuggestedAction);
  };

  if (!governanceActionBtn || !dpiaActionBtn || !exportEvidenceBtn) {
    return;
  }

  governanceActionBtn.addEventListener("click", () => {
    togglePanel("governancePanel");
    appendOperatorLog("Governance checklist opened.");
  });

  dpiaActionBtn.addEventListener("click", () => {
    togglePanel("dpiaPanel");
    appendOperatorLog("DPIA generator opened.");
  });

  exportEvidenceBtn.addEventListener("click", () => {
    togglePanel("exportPanel");
    appendOperatorLog("Evidence export panel opened.");
  });

  if (refreshSuggestionsBtn) {
    refreshSuggestionsBtn.addEventListener("click", () => {
      refreshSuggestions();
      appendOperatorLog("Suggestions refreshed.");
    });
  }

  if (finalizeGovernanceBtn && governanceStatus) {
    finalizeGovernanceBtn.addEventListener("click", () => {
      const checks = Array.from(document.querySelectorAll(".governance-check"));
      const selected = checks.filter((check) => check.checked);
      const allComplete = selected.length === checks.length && checks.length > 0;
      governanceStatus.textContent = allComplete
        ? "Status: Reviewed and ready for rerouting simulation prompts."
        : `Status: ${selected.length}/${checks.length} checklist items complete.`;
      operatorState.governanceCompleted = allComplete;
      appendOperatorLog(
        allComplete
          ? "Governance checklist completed and signed off."
          : "Governance checklist attempted with pending items."
      );
      refreshSuggestions();
    });
  }

  if (generateDpiaBtn && telemetryClassInput && tradeRouteInput && dpiaOutput) {
    generateDpiaBtn.addEventListener("click", () => {
      const telemetryClass = telemetryClassInput.value.trim();
      const tradeRoute = tradeRouteInput.value.trim();
      if (!telemetryClass || !tradeRoute) {
        dpiaOutput.textContent = "Provide both telemetry class and trade route.";
        appendOperatorLog("DPIA generation blocked: missing telemetry class or trade route.");
        return;
      }

      const dpia = {
        generated_at: nowIso(),
        telemetry_class: telemetryClass,
        trade_route: tradeRoute,
        risk_level: "medium",
        controls: [
          "Regional policy gate validation",
          "Signed model update enforcement",
          "Attestation requirement for transfer",
          "Evidence retention for 12 months",
        ],
      };
      dpiaOutput.textContent = JSON.stringify(dpia, null, 2);
      operatorState.dpiaGenerated = true;
      appendOperatorLog(`DPIA generated for ${telemetryClass} on route ${tradeRoute}.`);
      refreshSuggestions();
    });
  }

  if (downloadEvidenceBtn && exportSummary) {
    downloadEvidenceBtn.addEventListener("click", () => {
      const evidencePack = {
        generated_at: nowIso(),
        round: stats.flRound,
        nodes_online: stats.nodesOnline,
        compliance_score: stats.complianceScore,
        attestation: {
          tpm_required: true,
          zk_snark_verified: true,
          pqc_transport: true,
        },
        pipeline_events: simulatedPipelineFeed.slice(0, 3),
        risk_events: simulatedRiskFeed.slice(0, 3),
      };

      const blob = new Blob([JSON.stringify(evidencePack, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `supplychain_evidence_round_${stats.flRound}.json`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(url);

      operatorState.evidenceExported = true;
      exportSummary.textContent = `Export created for round ${stats.flRound} with attestation and compliance summary.`;
      appendOperatorLog(`Evidence pack exported for round ${stats.flRound}.`);
      refreshSuggestions();
    });
  }

  refreshSuggestions();
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
  setupOperatorActions(data.stats, mode);
}

initDashboard();
