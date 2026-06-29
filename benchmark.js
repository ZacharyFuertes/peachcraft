import autocannon from "autocannon";

const BASE = "http://localhost:8080";
const CONNECTIONS = 50;
const PIPELINING = 1;
const DURATION = 30;

const endpoints = [
  { name: "Homepage (/)", path: "/", method: "GET" },
  { name: "Shop (/shop)", path: "/shop", method: "GET" },
  { name: "Admin redirect (/admin)", path: "/admin", method: "GET" },
  { name: "Favicon (/favicon.svg)", path: "/favicon.svg", method: "GET" },
  { name: "Styles (CSS)", path: "/src/styles.css", method: "GET" },
  { name: "Signup page (/signup)", path: "/signup", method: "GET" },
  { name: "Login page (/login)", path: "/login", method: "GET" },
];

async function runBenchmark(endpoint) {
  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`  Benchmarking: ${endpoint.name}`);
  console.log(`  ${endpoint.method} ${endpoint.path}`);
  console.log(`  Connections: ${CONNECTIONS} | Duration: ${DURATION}s`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);

  return new Promise((resolve, reject) => {
    const instance = autocannon({
      url: `${BASE}${endpoint.path}`,
      connections: CONNECTIONS,
      pipelining: PIPELINING,
      duration: DURATION,
      method: endpoint.method,
      headers: { "User-Agent": "PeachCraft-Benchmark/1.0" },
      title: endpoint.name,
    }, (err, result) => {
      if (err) {
        console.error(`  ❌ Error: ${err.message}`);
        reject(err);
        return;
      }

      const avgLatency = result.latency.average;
      const p99Latency = result.latency.p99;
      const maxLatency = result.latency.max;
      const reqPerSec = result.requests.average;
      const totalRequests = result.requests.total;
      const totalErrors = result.errors;
      const non2xx = result.non2xx;
      const timeouts = result.timeouts;
      const throughputAvg = result.throughput.average;

      console.log(`  ── Results ──`);
      console.log(`  Requests:       ${totalRequests.toLocaleString()} total (${reqPerSec.toFixed(1)}/sec)`);
      console.log(`  Latency (avg):  ${avgLatency.toFixed(2)} ms`);
      console.log(`  Latency (p99):  ${p99Latency.toFixed(2)} ms`);
      console.log(`  Latency (max):  ${maxLatency.toFixed(2)} ms`);
      console.log(`  Throughput:     ${(throughputAvg / 1024).toFixed(2)} KB/sec`);
      console.log(`  Errors:         ${totalErrors}`);
      console.log(`  Timeouts:       ${timeouts}`);
      console.log(`  Non-2xx:        ${non2xx}`);

      resolve({ ...result, name: endpoint.name, path: endpoint.path });
    });

    // Track progress
    autocannon.track(instance, { renderProgressBar: true, renderResultsTable: false });
  });
}

async function main() {
  console.log(`========================================`);
  console.log(`  PEACH CRAFT - LOAD BENCHMARK`);
  console.log(`  Target: ${BASE}`);
  console.log(`  Connections: ${CONNECTIONS}`);
  console.log(`  Duration: ${DURATION}s per test`);
  console.log(`========================================`);

  const results = [];

  for (const endpoint of endpoints) {
    try {
      const result = await runBenchmark(endpoint);
      results.push(result);
    } catch (err) {
      console.log(`  Skipping ${endpoint.name} due to error`);
    }

    // Brief cooldown between tests
    console.log(`  Cooling down...`);
    await new Promise((r) => setTimeout(r, 3000));
  }

  console.log(`\n\n========================================`);
  console.log(`  FINAL COMPARISON`);
  console.log(`========================================`);
  console.log(`  ${"Endpoint".padEnd(30)} ${"Req/s".padEnd(10)} ${"Avg (ms)".padEnd(10)} ${"p99 (ms)".padEnd(10)} ${"Errors".padEnd(8)}`);
  console.log(`  ${"─".repeat(68)}`);
  
  for (const r of results) {
    const name = `${r.name}`.padEnd(30);
    const rps = `${r.requests.average.toFixed(1)}`.padEnd(10);
    const avg = `${r.latency.average.toFixed(2)}`.padEnd(10);
    const p99 = `${r.latency.p99.toFixed(2)}`.padEnd(10);
    const errs = `${r.errors}`.padEnd(8);
    console.log(`  ${name} ${rps} ${avg} ${p99} ${errs}`);
  }

  console.log(`\n`);
}

main().catch(console.error);
