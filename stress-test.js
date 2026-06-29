import autocannon from "autocannon";

const BASE = "http://localhost:8080";

// Stress test - much higher concurrency
const stressEndpoints = [
  { name: "STRESS Homepage (500 conn)", path: "/", method: "GET", connections: 500 },
  { name: "STRESS Favicon (500 conn)", path: "/favicon.svg", method: "GET", connections: 500 },
  { name: "STRESS Shop (500 conn)", path: "/shop", method: "GET", connections: 500 },
  { name: "STRESS Admin (500 conn)", path: "/admin", method: "GET", connections: 500 },
];

async function runStress(endpoint) {
  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`  💥 STRESS TEST: ${endpoint.name}`);
  console.log(`  Connections: ${endpoint.connections} | Duration: 30s`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);

  return new Promise((resolve, reject) => {
    const instance = autocannon({
      url: `${BASE}${endpoint.path}`,
      connections: endpoint.connections,
      pipelining: 1,
      duration: 30,
      method: endpoint.method,
      headers: { "User-Agent": "PeachCraft-Benchmark/1.0" },
      title: endpoint.name,
    }, (err, result) => {
      if (err) { reject(err); return; }
      resolve({ ...result, name: endpoint.name, path: endpoint.path });
    });
    autocannon.track(instance, { renderProgressBar: true, renderResultsTable: false });
  });
}

async function main() {
  console.log(`========================================`);
  console.log(`  💥 PEACH CRAFT - STRESS TEST (500 concurrent connections)`);
  console.log(`========================================`);

  const results = [];
  for (const ep of stressEndpoints) {
    try {
      const r = await runStress(ep);
      results.push(r);
    } catch (err) {
      console.error(`  ❌ ${ep.name}: ${err.message}`);
    }
    await new Promise((r) => setTimeout(r, 5000));
  }

  console.log(`\n\n========================================`);
  console.log(`  STRESS TEST RESULTS (500 concurrent)`);
  console.log(`========================================`);
  console.log(`  ${"Endpoint".padEnd(30)} ${"Req/s".padEnd(10)} ${"Avg (ms)".padEnd(10)} ${"p99 (ms)".padEnd(10)} ${"Errors".padEnd(8)} ${"Timeouts".padEnd(10)}`);
  console.log(`  ${"─".repeat(68)}`);
  for (const r of results) {
    const name = `${r.name}`.padEnd(30);
    const rps = `${r.requests.average.toFixed(1)}`.padEnd(10);
    const avg = `${r.latency.average.toFixed(2)}`.padEnd(10);
    const p99 = `${r.latency.p99.toFixed(2)}`.padEnd(10);
    const errs = `${r.errors}`.padEnd(8);
    const tos = `${r.timeouts}`.padEnd(10);
    console.log(`  ${name} ${rps} ${avg} ${p99} ${errs} ${tos}`);
  }

  // Drain target for analysis
  console.log(`\n\n========================================`);
  console.log(`  DRAIN ANALYSIS (max concurrency capacity)`);
  console.log(`========================================`);
  for (const r of results) {
    const errors = r.errors;
    const timeouts = r.timeouts;
    const total = r.requests.total;
    const errorRate = total > 0 ? ((errors + timeouts) / total * 100).toFixed(2) : "N/A";
    const isBroke = errors > 0 || timeouts > 0;
    console.log(`  ${r.name.padEnd(35)} ${errorRate}% errors  ${isBroke ? "💔 BROKE" : "✅ SURVIVED"}`);
  }

  console.log(`\n`);
}

main().catch(console.error);
