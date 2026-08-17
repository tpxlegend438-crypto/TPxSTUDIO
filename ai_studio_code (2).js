// ==========================================
// 1. DYNAMIC GOLD WEAVE CANVAS BACKGROUND
// ==========================================
const canvas = document.getElementById('gold-weave-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let width, height;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize, { passive: true });
  resize();

  let t = 0;

  function drawFlowingRibbon(startX, startY, endX, endY, c1x, c1y, c2x, c2y, lineCount, timeOffset) {
    for (let i = 0; i < lineCount; i++) {
      const offset = (i - lineCount / 2) * 2.8;
      const distFromCenter = Math.abs(i - lineCount / 2) / (lineCount / 2);
      const alpha = (1 - distFromCenter * distFromCenter * 0.8) * 0.85;

      ctx.beginPath();

      const grad = ctx.createLinearGradient(startX, startY, endX, endY);
      grad.addColorStop(0, `rgba(184, 134, 11, ${alpha * 0.2})`);
      grad.addColorStop(0.3, `rgba(212, 162, 40, ${alpha * 0.85})`);
      grad.addColorStop(0.65, `rgba(246, 234, 216, ${alpha * 0.95})`);
      grad.addColorStop(1, `rgba(197, 146, 30, ${alpha * 0.25})`);

      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.25;

      const steps = 60;
      for (let s = 0; s <= steps; s++) {
        const u = s / steps;

        const bx = Math.pow(1 - u, 3) * startX + 3 * Math.pow(1 - u, 2) * u * c1x + 3 * (1 - u) * Math.pow(u, 2) * c2x + Math.pow(u, 3) * endX;
        const by = Math.pow(1 - u, 3) * startY + 3 * Math.pow(1 - u, 2) * u * c1y + 3 * (1 - u) * Math.pow(u, 2) * c2y + Math.pow(u, 3) * endY;

        const waveX = Math.sin(u * Math.PI * 2.2 + timeOffset) * 28;
        const waveY = Math.cos(u * Math.PI * 2.2 + timeOffset) * 28;

        const px = bx + offset + waveX * (offset / lineCount);
        const py = by + offset + waveY * (offset / lineCount);

        if (s === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    t += 0.009;

    const tl_startX = width * -0.15;
    const tl_startY = height * 0.2;
    const tl_endX = width * 0.45;
    const tl_endY = height * -0.15;
    const tl_c1x = width * 0.35 + Math.sin(t * 0.6) * 30;
    const tl_c1y = height * 0.52 + Math.cos(t * 0.5) * 25;
    const tl_c2x = width * 0.48 + Math.cos(t * 0.4) * 20;
    const tl_c2y = height * 0.12 + Math.sin(t * 0.7) * 18;

    drawFlowingRibbon(tl_startX, tl_startY, tl_endX, tl_endY, tl_c1x, tl_c1y, tl_c2x, tl_c2y, 32, t * 1.2);

    const br_startX = width * 0.48;
    const br_startY = height * 1.15;
    const br_endX = width * 1.15;
    const br_endY = height * 0.5;
    const br_c1x = width * 0.55 + Math.cos(t * 0.5) * 35;
    const br_c1y = height * 0.48 + Math.sin(t * 0.6) * 30;
    const br_c2x = width * 0.9 + Math.sin(t * 0.7) * 25;
    const br_c2y = height * 0.58 + Math.cos(t * 0.4) * 20;

    drawFlowingRibbon(br_startX, br_startY, br_endX, br_endY, br_c1x, br_c1y, br_c2x, br_c2y, 36, t * 1.1 + 2.5);

    requestAnimationFrame(animate);
  }

  animate();
}

// ==========================================
// 2. POLYGLOT CODE STUDIO SNIPPETS ENGINE
// ==========================================
const codeSnippets = {
  typescript: {
    file: "tpx-client.ts",
    code: `<span class="syn-kw">import</span> { <span class="syn-type">TPXStudioClient</span>, <span class="syn-type">NodeConfig</span> } <span class="syn-kw">from</span> <span class="syn-str">'@tpxstudio/core'</span>;

<span class="syn-cm">// Initialize TPX Studio API & Node Engine</span>
<span class="syn-kw">const</span> <span class="syn-prop">client</span> = <span class="syn-kw">new</span> <span class="syn-type">TPXStudioClient</span>({
  <span class="syn-prop">apiKey</span>: <span class="syn-prop">process</span>.<span class="syn-prop">env</span>.<span class="syn-prop">TPX_SECRET_KEY</span>,
  <span class="syn-prop">environment</span>: <span class="syn-str">'production'</span>
});

<span class="syn-kw">async function</span> <span class="syn-fn">deployAppCluster</span>() {
  <span class="syn-kw">const</span> <span class="syn-prop">node</span> = <span class="syn-kw">await</span> <span class="syn-prop">client</span>.<span class="syn-prop">nodes</span>.<span class="syn-fn">deploy</span>({
    <span class="syn-prop">region</span>: <span class="syn-str">'in-mumbai-01'</span>,
    <span class="syn-prop">cpuCores</span>: <span class="syn-num">8</span>,
    <span class="syn-prop">ddosMitigation</span>: <span class="syn-kw">true</span>,
    <span class="syn-prop">autoDeploy</span>: <span class="syn-kw">true</span>
  });

  <span class="syn-prop">console</span>.<span class="syn-fn">log</span>(<span class="syn-str">\`[TPX] Node Active at \${node.ip} - Ping: &lt;12ms\`</span>);
}

<span class="syn-fn">deployAppCluster</span>();`
  },
  python: {
    file: "tpx_ai_pipeline.py",
    code: `<span class="syn-kw">import</span> asyncio
<span class="syn-kw">from</span> tpx_studio <span class="syn-kw">import</span> <span class="syn-type">StudioClient</span>, <span class="syn-type">AIWorkflow</span>

<span class="syn-cm"># Deploy Intelligent AI Agents & Vector Workflows</span>
<span class="syn-kw">async def</span> <span class="syn-fn">main</span>():
    client = <span class="syn-type">StudioClient</span>(api_key=<span class="syn-str">"tpx_live_token"</span>)
    
    agent = <span class="syn-kw">await</span> client.ai.<span class="syn-fn">create_agent</span>(
        model=<span class="syn-str">"tpx-llm-v4"</span>,
        system_prompt=<span class="syn-str">"You are an elite web architect."</span>,
        temperature=<span class="syn-num">0.2</span>
    )
    
    response = <span class="syn-kw">await</span> agent.<span class="syn-fn">query</span>(<span class="syn-str">"Generate landing page schema"</span>)
    <span class="syn-fn">print</span>(<span class="syn-str">f"[TPX AI] Status: {response.status} | Tokens: {response.usage}"</span>)

<span class="syn-kw">if</span> __name__ == <span class="syn-str">"__main__"</span>:
    asyncio.<span class="syn-fn">run</span>(<span class="syn-fn">main</span>())`
  },
  rust: {
    file: "tpx_engine.rs",
    code: `<span class="syn-kw">use</span> tpx_engine::{<span class="syn-type">Cluster</span>, <span class="syn-type">NodeConfig</span>, <span class="syn-type">Protocol</span>};

<span class="syn-cm">// Ultra-Low Latency & High-Throughput Engine</span>
<span class="syn-kw">#[tokio::main]</span>
<span class="syn-kw">async fn</span> <span class="syn-fn">main</span>() -> <span class="syn-type">Result</span>&lt;(), <span class="syn-type">Box</span>&lt;<span class="syn-kw">dyn</span> std::error::<span class="syn-type">Error</span>&gt;&gt; {
    <span class="syn-kw">let</span> cluster = <span class="syn-type">Cluster</span>::<span class="syn-fn">connect</span>(<span class="syn-str">"wss://matrix.tpxstudio.app"</span>).<span class="syn-kw">await</span>?;
    
    <span class="syn-kw">let</span> node = cluster.<span class="syn-fn">spawn</span>(<span class="syn-type">NodeConfig</span> {
        bandwidth_gbps: <span class="syn-num">10</span>,
        auto_ddos_guard: <span class="syn-kw">true</span>,
        protocol: <span class="syn-type">Protocol</span>::LowLatencyUdp,
    }).<span class="syn-kw">await</span>?;

    <span class="syn-fn">println!</span>(<span class="syn-str">"[TPX Rust] High-FPS Node Cluster initialized: {:?}"</span>, node.cluster_id);
    <span class="syn-type">Ok</span>(())
}`
  },
  go: {
    file: "main.go",
    code: `<span class="syn-kw">package</span> main

<span class="syn-kw">import</span> (
    <span class="syn-str">"context"</span>
    <span class="syn-str">"fmt"</span>
    <span class="syn-str">"github.com/tpxstudio/sdk-go/client"</span>
)

<span class="syn-cm">// Microservices & Instant BaaS Query Engine</span>
<span class="syn-kw">func</span> <span class="syn-fn">main</span>() {
    ctx := context.<span class="syn-fn">Background</span>()
    tpx := client.<span class="syn-fn">New</span>(<span class="syn-str">"tpx_live_token"</span>)

    resp, err := tpx.BaaS.<span class="syn-fn">Query</span>(ctx, <span class="syn-str">\`query { activeNodes { id latencyMs } }\`</span>)
    <span class="syn-kw">if</span> err != <span class="syn-kw">nil</span> {
        <span class="syn-fn">panic</span>(err)
    }

    fmt.<span class="syn-fn">Printf</span>(<span class="syn-str">"[TPX Go] Nodes Connected. Latency: %vms\\n"</span>, resp.Data.LatencyMs)
}`
  },
  java: {
    file: "TPXPlugin.java",
    code: `<span class="syn-kw">package</span> app.tpx.studio;

<span class="syn-kw">import</span> com.tpxstudio.core.TPXManager;
<span class="syn-kw">import</span> com.tpxstudio.models.VoxelAsset;

<span class="syn-cm">// Minecraft Game Server Java Plugin Integration</span>
<span class="syn-kw">public class</span> <span class="syn-type">TPXPlugin</span> {
    <span class="syn-kw">public static void</span> <span class="syn-fn">main</span>(<span class="syn-type">String</span>[] args) {
        <span class="syn-type">TPXManager</span> manager = <span class="syn-kw">new</span> <span class="syn-type">TPXManager</span>(<span class="syn-str">"tpx_secret_key"</span>);
        <span class="syn-type">VoxelAsset</span> pack = manager.<span class="syn-fn">loadVoxelPack</span>(<span class="syn-str">"engine-props-v4"</span>);
        
        pack.<span class="syn-fn">injectToWorld</span>(<span class="syn-str">"world_arena"</span>);
        <span class="syn-type">System</span>.out.<span class="syn-fn">println</span>(<span class="syn-str">"[TPX Java] Voxel Pack injected with 60+ FPS guarantee."</span>);
    }
}`
  },
  dart: {
    file: "main.dart",
    code: `<span class="syn-kw">import</span> <span class="syn-str">'package:flutter/material.dart'</span>;
<span class="syn-kw">import</span> <span class="syn-str">'package:tpx_flutter_sdk/tpx_flutter_sdk.dart'</span>;

<span class="syn-cm">// Cross-Platform Flutter Media & Entertainment Engine</span>
<span class="syn-kw">void</span> <span class="syn-fn">main</span>() <span class="syn-kw">async</span> {
  <span class="syn-type">WidgetsFlutterBinding</span>.<span class="syn-fn">ensureInitialized</span>();
  <span class="syn-kw">final</span> tpx = <span class="syn-type">TPXStudio</span>(apiKey: <span class="syn-str">'tpx_public_key'</span>);
  <span class="syn-kw">await</span> tpx.<span class="syn-fn">initStreamEngine</span>(channel: <span class="syn-str">'zigo-series-feed'</span>);
  
  <span class="syn-fn">runApp</span>(<span class="syn-kw">const</span> <span class="syn-type">TPXStudioApp</span>());
}`
  },
  csharp: {
    file: "Program.cs",
    code: `<span class="syn-kw">using</span> System;
<span class="syn-kw">using</span> System.Threading.Tasks;
<span class="syn-kw">using</span> TPXStudio.SDK;

<span class="syn-cm">// Automated Checkout & Discord OAuth2 Integration</span>
<span class="syn-kw">class</span> <span class="syn-type">Program</span> {
    <span class="syn-kw">static async</span> <span class="syn-type">Task</span> <span class="syn-fn">Main</span>() {
        <span class="syn-kw">var</span> tpx = <span class="syn-kw">new</span> <span class="syn-type">TPXClient</span>(<span class="syn-str">"tpx_secure_token"</span>);
        <span class="syn-kw">var</span> payment = <span class="syn-kw">await</span> tpx.Checkout.<span class="syn-fn">CreateSessionAsync</span>(<span class="syn-kw">new</span> <span class="syn-type">CheckoutRequest</span> {
            Amount = <span class="syn-num">4999</span>,
            Currency = <span class="syn-str">"INR"</span>,
            SyncDiscordRole = <span class="syn-kw">true</span>
        });
        <span class="syn-type">Console</span>.<span class="syn-fn">WriteLine</span>(<span class="syn-str">$"[TPX .NET] Gateway Active: {payment.CheckoutUrl}"</span>);
    }
}`
  }
};

function switchCodeLang(lang) {
  document.querySelectorAll('#code-engine .stylish-tab').forEach(btn => btn.className = 'stylish-tab');
  const activeBtn = document.getElementById('codetab-' + lang);
  if (activeBtn) activeBtn.className = 'stylish-tab active-gold';

  const output = document.getElementById('code-output');
  const filename = document.getElementById('code-filename');

  if (codeSnippets[lang]) {
    output.innerHTML = codeSnippets[lang].code;
    filename.innerText = codeSnippets[lang].file;
  }
}

function copyCodeSnippet() {
  const textToCopy = document.getElementById('code-output').innerText;
  navigator.clipboard.writeText(textToCopy).then(() => {
    const btn = document.getElementById('btn-copy-code');
    btn.innerHTML = '<span class="material-symbols-outlined text-xs">check</span> <span>COPIED!</span>';
    setTimeout(() => {
      btn.innerHTML = '<span class="material-symbols-outlined text-xs">content_copy</span> <span>COPY CODE</span>';
    }, 2000);
  });
}

// Initialize Default Code Snippet
switchCodeLang('typescript');

// ==========================================
// 3. UI/UX ARCHITECTURE SUB-TAB ENGINE
// ==========================================
const webTabContent = {
  landing: `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
      <div>
        <div class="inline-block px-2.5 py-0.5 rounded-full bg-gold-primary/10 border border-gold-primary/30 text-gold-primary font-mono text-[10px] mb-2 font-bold">100/100 LIGHTHOUSE SCORE</div>
        <h3 class="font-display text-xl sm:text-2xl font-bold text-white mb-2">High-Conversion Landing Pages</h3>
        <p class="mb-4 text-gray-300 text-xs sm:text-sm leading-relaxed">Precision-crafted single-page architectures built on React & Next.js. Engineered with conversion psychology, smooth micro-interactions, responsive typography, and sub-second load times.</p>
        <ul class="space-y-1.5 font-mono text-xs text-text-dim mb-4">
          <li class="flex items-center gap-2 text-gold-light"><span class="material-symbols-outlined text-sm text-gold-primary">check_circle</span> Dynamic Scroll-Triggered Animations</li>
          <li class="flex items-center gap-2 text-gold-light"><span class="material-symbols-outlined text-sm text-gold-primary">check_circle</span> Automated Lead Capture & Webhooks</li>
        </ul>
        <a href="https://wa.me/917047336254?text=Hi%20TPX%20STUDIO,%20I%20want%20to%20order%20a%20High-Conversion%20Landing%20Page." target="_blank" class="inline-flex items-center gap-1.5 font-display text-xs bg-gold-primary text-black px-5 py-2.5 rounded-full font-bold hover:glow-gold transition-all">ORDER LANDING PAGE <span class="material-symbols-outlined text-sm">arrow_forward</span></a>
      </div>
      <div class="glass-card p-5 rounded-2xl border-gold-primary/30 text-xs font-mono">
        <div class="text-gold-primary font-bold mb-2">// Speed & SEO Metrics</div>
        <div class="space-y-2 text-gray-300">
          <div class="flex justify-between border-b border-white/10 pb-1"><span>First Contentful Paint</span><span class="text-green-400">0.3s</span></div>
          <div class="flex justify-between border-b border-white/10 pb-1"><span>Speed Index</span><span class="text-green-400">0.6s</span></div>
          <div class="flex justify-between border-b border-white/10 pb-1"><span>Total Blocking Time</span><span class="text-green-400">0ms</span></div>
          <div class="flex justify-between"><span>SEO & Accessibility</span><span class="text-gold-primary">100/100</span></div>
        </div>
      </div>
    </div>`,
  multipage: `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
      <div>
        <div class="inline-block px-2.5 py-0.5 rounded-full bg-gold-metallic/10 border border-gold-metallic/30 text-gold-metallic font-mono text-[10px] mb-2 font-bold">FULL-STACK READY</div>
        <h3 class="font-display text-xl sm:text-2xl font-bold text-white mb-2">Full-Stack Web Applications</h3>
        <p class="mb-4 text-gray-300 text-xs sm:text-sm leading-relaxed">Enterprise-grade multi-page web applications with complete routing, server-side rendering, user authentication, role-based permissions, and custom API backends.</p>
        <ul class="space-y-1.5 font-mono text-xs text-text-dim mb-4">
          <li class="flex items-center gap-2 text-gold-light"><span class="material-symbols-outlined text-sm text-gold-metallic">check_circle</span> OAuth2, Discord & JWT Auth Handlers</li>
          <li class="flex items-center gap-2 text-gold-light"><span class="material-symbols-outlined text-sm text-gold-metallic">check_circle</span> Next.js App Router Architecture</li>
        </ul>
        <a href="https://wa.me/917047336254?text=Hi%20TPX%20STUDIO,%20I%20want%20a%20Full-Stack%20Web%20App." target="_blank" class="inline-flex items-center gap-1.5 font-display text-xs bg-gold-metallic text-black px-5 py-2.5 rounded-full font-bold hover:glow-amber transition-all">BUILD WEB APP <span class="material-symbols-outlined text-sm">arrow_forward</span></a>
      </div>
      <div class="glass-card p-5 rounded-2xl border-gold-metallic/30 text-xs font-mono">
        <div class="text-gold-metallic font-bold mb-2">// Modular Architecture</div>
        <div class="text-gray-300 space-y-1">
          <div>&lt;AppRoot layout="Default"&gt;</div>
          <div class="pl-4">&lt;AuthGuard role="Admin" /&gt;</div>
          <div class="pl-4">&lt;DataGrid api="/v1/analytics" /&gt;</div>
          <div class="pl-4">&lt;RealtimeSocket url="wss://" /&gt;</div>
          <div>&lt;/AppRoot&gt;</div>
        </div>
      </div>
    </div>`,
  ecommerce: `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
      <div>
        <div class="inline-block px-2.5 py-0.5 rounded-full bg-gold-light/10 border border-gold-light/30 text-gold-light font-mono text-[10px] mb-2 font-bold">SECURE CHECKOUT</div>
        <h3 class="font-display text-xl sm:text-2xl font-bold text-white mb-2">E-Commerce & Digital Storefronts</h3>
        <p class="mb-4 text-gray-300 text-xs sm:text-sm leading-relaxed">High-converting online webstores with frictionless checkout flows, Razorpay/Stripe automated gateways, inventory synchronization, and instant automated digital delivery.</p>
        <ul class="space-y-1.5 font-mono text-xs text-text-dim mb-4">
          <li class="flex items-center gap-2 text-gold-light"><span class="material-symbols-outlined text-sm text-gold-light">check_circle</span> Automated Discord Rank & Role Delivery</li>
          <li class="flex items-center gap-2 text-gold-light"><span class="material-symbols-outlined text-sm text-gold-light">check_circle</span> Instant UPI, Credit Cards & Global Gateways</li>
        </ul>
        <a href="https://wa.me/917047336254?text=Hi%20TPX%20STUDIO,%20I%20want%20an%20E-Commerce%20Store." target="_blank" class="inline-flex items-center gap-1.5 font-display text-xs bg-gold-light text-black px-5 py-2.5 rounded-full font-bold transition-all">LAUNCH STOREFRONT <span class="material-symbols-outlined text-sm">arrow_forward</span></a>
      </div>
      <div class="glass-card p-5 rounded-2xl border-gold-light/30 text-xs font-mono">
        <div class="text-gold-light font-bold mb-2">// Checkout Gateway Engine</div>
        <div class="space-y-2 text-gray-300">
          <div class="flex justify-between border-b border-white/10 pb-1"><span>Payment Security</span><span class="text-gold-primary">PCI-DSS / 256-Bit</span></div>
          <div class="flex justify-between border-b border-white/10 pb-1"><span>Digital Delivery</span><span class="text-green-400">Instant Automated</span></div>
          <div class="flex justify-between"><span>Abandoned Cart Recovery</span><span class="text-gold-primary">Built-in</span></div>
        </div>
      </div>
    </div>`,
  saas: `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
      <div>
        <div class="inline-block px-2.5 py-0.5 rounded-full bg-gold-amber/10 border border-gold-amber/30 text-gold-amber font-mono text-[10px] mb-2 font-bold">ANALYTICS & METRICS</div>
        <h3 class="font-display text-xl sm:text-2xl font-bold text-white mb-2">SaaS Dashboards & Admin Portals</h3>
        <p class="mb-4 text-gray-300 text-xs sm:text-sm leading-relaxed">Interactive analytical dashboards featuring real-time data streaming, dynamic chart visualizations, filter pipelines, and customizable control panels.</p>
        <ul class="space-y-1.5 font-mono text-xs text-text-dim mb-4">
          <li class="flex items-center gap-2 text-gold-light"><span class="material-symbols-outlined text-sm text-gold-amber">check_circle</span> Chart.js & Recharts Data Visuals</li>
          <li class="flex items-center gap-2 text-gold-light"><span class="material-symbols-outlined text-sm text-gold-amber">check_circle</span> Multi-Tenant Organization Views</li>
        </ul>
        <a href="https://wa.me/917047336254?text=Hi%20TPX%20STUDIO,%20I%20want%20a%20SaaS%20Dashboard." target="_blank" class="inline-flex items-center gap-1.5 font-display text-xs bg-gold-amber text-black px-5 py-2.5 rounded-full font-bold transition-all">BUILD SAAS DASHBOARD <span class="material-symbols-outlined text-sm">arrow_forward</span></a>
      </div>
      <div class="glass-card p-5 rounded-2xl border-gold-amber/30 text-xs font-mono">
        <div class="text-gold-amber font-bold mb-2">// Metrics Feed</div>
        <div class="space-y-2 text-gray-300">
          <div class="flex justify-between border-b border-white/10 pb-1"><span>Telemetry Frequency</span><span class="text-green-400">100ms Live</span></div>
          <div class="flex justify-between border-b border-white/10 pb-1"><span>Active Nodes Monitored</span><span class="text-gold-primary">64 Nodes</span></div>
          <div class="flex justify-between"><span>User Role Guard</span><span class="text-gold-light">SuperAdmin</span></div>
        </div>
      </div>
    </div>`,
  designsystem: `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
      <div>
        <div class="inline-block px-2.5 py-0.5 rounded-full bg-gold-primary/10 border border-gold-primary/30 text-gold-primary font-mono text-[10px] mb-2 font-bold">FIGMA TO PRODUCTION</div>
        <h3 class="font-display text-xl sm:text-2xl font-bold text-white mb-2">Design Systems & Brand UI</h3>
        <p class="mb-4 text-gray-300 text-xs sm:text-sm leading-relaxed">Comprehensive component token libraries, typography scales, accessibility guidelines, and dark luxury interface kits built for cohesive brand identity across all platforms.</p>
        <ul class="space-y-1.5 font-mono text-xs text-text-dim mb-4">
          <li class="flex items-center gap-2 text-gold-light"><span class="material-symbols-outlined text-sm text-gold-primary">check_circle</span> Reusable Tailwind & Shadcn Components</li>
          <li class="flex items-center gap-2 text-gold-light"><span class="material-symbols-outlined text-sm text-gold-primary">check_circle</span> Pixel-Perfect Figma Files Included</li>
        </ul>
        <a href="https://wa.me/917047336254?text=Hi%20TPX%20STUDIO,%20I%20want%20a%20Design%20System." target="_blank" class="inline-flex items-center gap-1.5 font-display text-xs bg-gold-primary text-black px-5 py-2.5 rounded-full font-bold hover:glow-gold transition-all">GET DESIGN SYSTEM <span class="material-symbols-outlined text-sm">arrow_forward</span></a>
      </div>
      <div class="glass-card p-5 rounded-2xl border-gold-primary/30 text-xs font-mono">
        <div class="text-gold-primary font-bold mb-2">// Token Scales</div>
        <div class="space-y-2 text-gray-300">
          <div class="flex justify-between border-b border-white/10 pb-1"><span>Color Tokens</span><span class="text-gold-light">Gold, Amber, Obsidian</span></div>
          <div class="flex justify-between border-b border-white/10 pb-1"><span>Typography</span><span class="text-gold-light">Space Grotesk & JetBrains</span></div>
          <div class="flex justify-between"><span>Micro-Interactions</span><span class="text-green-400">GPU Accelerated</span></div>
        </div>
      </div>
    </div>`,
  mobile: `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
      <div>
        <div class="inline-block px-2.5 py-0.5 rounded-full bg-gold-metallic/10 border border-gold-metallic/30 text-gold-metallic font-mono text-[10px] mb-2 font-bold">TOUCH OPTIMIZED</div>
        <h3 class="font-display text-xl sm:text-2xl font-bold text-white mb-2">Mobile & Responsive Interfaces</h3>
        <p class="mb-4 text-gray-300 text-xs sm:text-sm leading-relaxed">Fluid layouts engineered for smartphones, tablets, laptops, and ultra-wide displays. Built with progressive web app (PWA) offline support and native-feeling touch gestures.</p>
        <ul class="space-y-1.5 font-mono text-xs text-text-dim mb-4">
          <li class="flex items-center gap-2 text-gold-light"><span class="material-symbols-outlined text-sm text-gold-metallic">check_circle</span> Seamless Swipe & Pull Gestures</li>
          <li class="flex items-center gap-2 text-gold-light"><span class="material-symbols-outlined text-sm text-gold-metallic">check_circle</span> Zero Breakpoint Layout Shift</li>
        </ul>
        <a href="https://wa.me/917047336254?text=Hi%20TPX%20STUDIO,%20I%20want%20Mobile%20UI%20Architecture." target="_blank" class="inline-flex items-center gap-1.5 font-display text-xs bg-gold-metallic text-black px-5 py-2.5 rounded-full font-bold hover:glow-amber transition-all">ORDER RESPONSIVE UI <span class="material-symbols-outlined text-sm">arrow_forward</span></a>
      </div>
      <div class="glass-card p-5 rounded-2xl border-gold-metallic/30 text-xs font-mono">
        <div class="text-gold-metallic font-bold mb-2">// Breakpoints Supported</div>
        <div class="space-y-2 text-gray-300">
          <div class="flex justify-between border-b border-white/10 pb-1"><span>Mobile (iOS / Android)</span><span class="text-green-400">320px – 480px</span></div>
          <div class="flex justify-between border-b border-white/10 pb-1"><span>Tablet & Foldables</span><span class="text-green-400">768px – 1024px</span></div>
          <div class="flex justify-between"><span>Retina & UltraWide</span><span class="text-green-400">1440px – 4K</span></div>
        </div>
      </div>
    </div>`
};

function switchWebTab(tabName) {
  document.querySelectorAll('#web-design .stylish-tab').forEach(btn => btn.className = 'stylish-tab');
  const activeBtn = document.getElementById('webtab-' + tabName);
  if (activeBtn) activeBtn.className = 'stylish-tab active-gold';

  const panel = document.getElementById('web-content-panel');
  if (panel && webTabContent[tabName]) {
    panel.innerHTML = webTabContent[tabName];
  }
}

switchWebTab('landing');

// ==========================================
// 4. CLIENT STORIES CAROUSEL (< > NAVIGATION)
// ==========================================
let currentStoryIndex = 0;
const storyCards = document.querySelectorAll('.story-card');
const totalStories = storyCards.length;

function updateStoryDisplay() {
  storyCards.forEach((card, index) => {
    if (index === currentStoryIndex) {
      card.classList.remove('hidden');
      card.classList.add('block');
    } else {
      card.classList.remove('block');
      card.classList.add('hidden');
    }
  });
  const counter = document.getElementById('story-counter');
  if (counter) counter.innerText = `${currentStoryIndex + 1} / ${totalStories}`;
}

function nextStory() {
  currentStoryIndex = (currentStoryIndex + 1) % totalStories;
  updateStoryDisplay();
}

function prevStory() {
  currentStoryIndex = (currentStoryIndex - 1 + totalStories) % totalStories;
  updateStoryDisplay();
}

// ==========================================
// 5. ACCORDION FAQ TOGGLE
// ==========================================
function toggleFaq(num) {
  const ans = document.getElementById('faq-ans-' + num);
  const icon = document.getElementById('faq-icon-' + num);
  if (ans) {
    if (ans.classList.contains('hidden')) {
      ans.classList.remove('hidden');
      if (icon) icon.textContent = 'remove';
    } else {
      ans.classList.add('hidden');
      if (icon) icon.textContent = 'add';
    }
  }
}

// ==========================================
// 6. PROJECT BUILDER ONBOARDING (WHATSAPP DISPATCH)
// ==========================================
function launchProjectBuilder() {
  const service = document.getElementById('builder-service').value;
  const budget = document.getElementById('builder-budget').value;
  const nameInput = document.getElementById('builder-name').value.trim();
  const timeline = document.getElementById('builder-timeline').value;
  const clientName = nameInput ? nameInput : 'Client';

  const msg = encodeURIComponent(`Hi TPX STUDIO,\n\nI am ${clientName} and would like to initiate a new project protocol:\n\n• Service: ${service}\n• Budget: ${budget}\n• Timeline: ${timeline}\n\nPlease share the proposal and next steps!`);
  window.open(`https://wa.me/917047336254?text=${msg}`, '_blank');
}

// ==========================================
// 7. MULTILINGUAL TRANSLATION (i18n) ENGINE
// ==========================================
const i18nData = {
  en: {
    nav_build: "BUILD TOGETHER",
    dock_about: "About",
    dock_services: "Services",
    dock_projects: "Projects",
    dock_showcase: "Showcase",
    dock_stories: "Stories",
    dock_stack: "Stack",
    hero_badge: "TPX STUDIO — DIGITAL ARCHITECTURE & GAME MEDIA STUDIO",
    hero_title_1: "DOMINATE THE",
    hero_title_2: "DIGITAL VOID",
    hero_btn_build: "LET'S BUILD TOGETHER",
    hero_btn_portfolio: "VIEW PORTFOLIO",
    about_tag: "/// STUDIO OVERVIEW",
    about_title: "TP x STUDIO DIGITAL STUDIO",
    about_desc: "End-to-end technical, creative, and server infrastructure services engineered for peak performance:",
    about_card1_t: "1. Web Architecture",
    about_card2_t: "2. Viral Media Production",
    about_card3_t: "3. 3D Voxel Assets",
    about_card4_t: "4. Game Server Hub",
    services_tag: "/// COMPREHENSIVE CAPABILITIES",
    services_title_1: "OUR",
    services_title_2: "SERVICES",
    services_desc: "Engineering high-speed web architecture, AI integrations, BaaS infrastructure, 3D voxel game assets, game servers, and cinematic video editing.",
    pillar1_t: "Uncompromising Dedication",
    pillar1_d: "24/7 sprint delivery, strict QA reviews, and persistent iteration until your vision exceeds expectations.",
    pillar2_t: "Signature Precision Style",
    pillar2_d: "Immersive dark layouts, luxury gold accents, micro-interactions, and 100/100 Lighthouse performance.",
    pillar3_t: "Production-Grade Engineering",
    pillar3_d: "Full source code ownership, zero cloud lock-in, automated CI/CD pipelines, and 30-day post-launch support.",
    srv1_t: "Custom Web Architecture & SaaS Portals",
    srv1_d: "High-performance, conversion-driven web applications built on React and Next.js. Engineered for lightning speeds, high SEO rankings, and seamless user experiences starting at ₹4,999.",
    srv1_btn: "BUILD WEBSITE PROTOCOL",
    srv2_t: "Open-Source AI & Workflow Automation",
    srv2_d: "Integrate cutting-edge AI models directly into your platform. From fine-tuned LLM chatbots to intelligent automated workflows and open-source code assistants.",
    srv2_btn: "INTEGRATE AI WORKFLOW",
    srv3_t: "Self-Hostable Backend as a Service",
    srv3_d: "Ship apps 10x faster with a white-label, production-grade backend engine equipped with a visual DB designer, auto APIs, and self-hosting support ($0 cloud bills).",
    srv3_btn: "CONNECT BAAS PLATFORM",
    srv4_t: "3D Voxel Models & Engine Assets",
    srv4_d: "40+ production-grade Blockbench JSON 3D models engineered for Minecraft server maps and sandbox game worlds. High FPS polycount optimization included.",
    srv4_btn: "SECURE VOXEL PACK",
    srv5_t: "Low-Latency Game Server Hub",
    srv5_d: "High-clock frequency CPU game servers hosted in low-ping India datacenters. Equipped with DDoS mitigation shields and instant auto-deployment starting @ ₹79/mo.",
    srv5_btn: "DEPLOY GAME SERVER",
    srv6_t: "Viral Shorts & Cinema Video Edits",
    srv6_d: "Viral short-form edits designed for high audience retention on Instagram Reels, YouTube Shorts, and TikTok. Includes SFX sound design, dynamic captions, and gaming cinema edits.",
    srv6_btn: "ORDER MEDIA EDIT",
    projects_tag: "/// FEATURED CREATIONS & PARTNERS",
    projects_title_1: "OUR",
    projects_title_2: "PROJECTS",
    projects_desc: "Discover our active digital platforms, partner creative studios, and production-grade applications.",
    proj1_d: "High-detail custom 2D/3D pixel art assets, game graphics, animated sprite sheets, voxel artwork, and custom digital illustrations engineered for indie creators and game developers.",
    proj1_btn: "EXPLORE PIXELCRAFT ART",
    proj2_d: "A high-performance media entertainment portal featuring an immersive dark interface, ultra-smooth stream catalog navigation, dynamic categories, and optimized cross-device responsiveness.",
    proj2_btn: "VISIT ZIGOSERIES.VERCEL.APP",
    showcase_tag: "/// VISUAL PORTFOLIO",
    showcase_title_1: "FEATURED",
    showcase_title_2: "PROJECT SHOWCASE",
    showcase_desc: "Explore production work across custom Web Apps, Game Datacenters, 3D Voxel Engine assets, and Media Cinema.",
    stories_tag: "/// REVIEWS & TESTIMONIALS",
    stories_title_1: "CLIENT",
    stories_title_2: "STORIES",
    story1_text: `"TPX STUDIO built our entire web portal, BaaS backend, and low-latency game server network. Delivered days ahead of deadline with clean architecture and zero bugs!"`,
    story2_text: `"The AI chatbot workflow and 3D Voxel assets completely transformed our community engagement. Communication on WhatsApp was prompt and super transparent throughout."`,
    story3_text: `"Our YouTube Shorts retention shot up by 45% within three weeks after switching to TPX's cinematic editing team. The SFX timing and dynamic text animations are unmatched."`,
    story4_text: `"Their self-hostable BaaS setup saved us thousands in recurring cloud bills. Clean database architecture and lightning-fast REST & GraphQL endpoints."`,
    story5_text: `"The landing page design helped us convert 3x more customers during our summer launch. The dark luxury aesthetic and responsive speed gave us an instant premium edge."`,
    stack_tag: "/// COMPREHENSIVE ARSENAL",
    stack_title_1: "OUR",
    stack_title_2: "STACK",
    pipe_tag: "/// WORKFLOW PIPELINE",
    pipe_title_1: "FROM IDEA TO",
    pipe_title_2: "LAUNCH",
    step1_t: "DISCOVERY",
    step1_d: "We analyze your goals, audience, and technical specs through a direct async questionnaire or call.",
    step2_t: "PROPOSAL",
    step2_d: "Transparent scope of work, deliverables, fixed pricing, and timeline delivered within 48 hours.",
    step3_t: "DESIGN",
    step3_d: "Figma UI mockups, 3D prototypes, and interactive layouts tailored to your exact aesthetic.",
    step4_t: "BUILD",
    step4_d: "Development sprint with real-time preview links and progress updates every 3–5 days.",
    step5_t: "LAUNCH",
    step5_d: "QA testing, full source code handover, server deployment, and 30 days post-launch support.",
    faq_tag: "/// KNOWLEDGE BASE",
    faq_title: "GOT QUESTIONS?",
    faq1_q: "1. What services does TP x STUDIO offer?",
    faq1_a: "We offer web design & development, open source AI coding, BaaS platforms, 3D Voxel Assets, game server hosting nodes, and video editing for social media & long-form content.",
    faq2_q: "2. How much does a website or game server node cost?",
    faq2_a: "Game Server nodes start at ₹79/mo, video edits from ₹500, landing pages from ₹4,999, and full-stack web platforms or custom BaaS setups are quoted based on specific project requirements.",
    faq3_q: "3. How long does it take to build a website or game server setup?",
    faq3_a: "Game Server nodes deploy instantly! Standard landing pages take 3–5 days. Custom multi-page sites and 3D Voxel packs take 1–2 weeks. Full Web Apps take 2–4 weeks.",
    faq4_q: "4. Do you work with international clients?",
    faq4_a: "Yes! We work with clients across India, US, UK, UAE, Japan, and Germany, communicating smoothly via WhatsApp, Discord, Email, and Slack.",
    onboard_badge: "PROJECT ONBOARDING",
    onboard_title: "LET'S BUILD TOGETHER",
    onboard_desc: "Configure your project specifications below for instant WhatsApp or email onboarding.",
    form_service: "SERVICE CATEGORY",
    form_budget: "ESTIMATED BUDGET",
    form_name: "YOUR NAME / HANDLE",
    form_timeline: "PROJECT TIMELINE",
    form_btn_wa: "INITIATE ON WHATSAPP",
    form_btn_dc: "JOIN DISCORD"
  },
  hi: {
    nav_build: "साथ काम करें",
    dock_about: "परिचय",
    dock_services: "सेवाएं",
    dock_projects: "प्रोजेक्ट्स",
    dock_showcase: "पोर्टफोलियो",
    dock_stories: "समीक्षाएं",
    dock_stack: "स्टैक",
    hero_badge: "TPX स्टूडियो — डिजिटल आर्किटेक्चर एवं गेम मीडिया स्टूडियो",
    hero_title_1: "डिजिटल दुनिया पर",
    hero_title_2: "राज करें",
    hero_btn_build: "साथ मिलकर बनाएं",
    hero_btn_portfolio: "पोर्टफोलियो देखें",
    about_tag: "/// स्टूडियो अवलोकन",
    about_title: "TP x STUDIO डिजिटल स्टूडियो",
    about_desc: "शीर्ष प्रदर्शन के लिए निर्मित तकनीकी, रचनात्मक और गेम सर्वर इंफ्रास्ट्रक्चर सेवाएं:",
    about_card1_t: "1. वेब आर्किटेक्चर",
    about_card2_t: "2. वायरल मीडिया प्रोडक्शन",
    about_card3_t: "3. 3D वोक्सेल एसेट्स",
    about_card4_t: "4. गेम सर्वर हब",
    services_tag: "/// संपूर्ण डिजिटल क्षमताएं",
    services_title_1: "हमारी",
    services_title_2: "सेवाएं",
    services_desc: "हाई-स्पीड वेब आर्किटेक्चर, AI इंटीग्रेशन, BaaS इंफ्रास्ट्रक्चर, 3D वोक्सेल गेम एसेट्स, और सिनेमैटिक वीडियो एडिटिंग।",
    pillar1_t: "अटूट समर्पण",
    pillar1_d: "24/7 स्प्रिंट डिलीवरी, सख्त QA समीक्षा और निरंतर सुधार जब तक आपका विजन पूरा न हो।",
    pillar2_t: "प्रीमियम डिज़ाइन स्टाइल",
    pillar2_d: "इमर्सिव डार्क लेआउट, लग्जरी गोल्ड एक्सेंट्स, स्मूथ माइक्रो-इंटरैक्शन और 100/100 स्पीड।",
    pillar3_t: "उत्पादन-स्तरीय इंजीनियरिंग",
    pillar3_d: "सोर्स कोड का पूर्ण स्वामित्व, ऑटोमेटेड CI/CD पाइपलाइन्स और 30 दिनों का सपोर्ट।",
    srv1_t: "कस्टम वेब आर्किटेक्चर और SaaS पोर्टल्स",
    srv1_d: "React और Next.js पर निर्मित उच्च-प्रदर्शन वाले वेब ऐप्स। बिजली जैसी गति, उच्च SEO रैंकिंग और शानदार अनुभव मात्र ₹4,999 से।",
    srv1_btn: "वेबसाइट प्रोटोकॉल बनाएं",
    srv2_t: "ओपन-सोर्स AI और वर्कफ़्लो ऑटोमेशन",
    srv2_d: "अपने प्लेटफ़ॉर्म में आधुनिक AI मॉडल्स जोड़ें। फाइन-ट्यून LLM चैटबॉट्स से लेकर स्मार्ट ऑटोमेशन बॉट्स तक।",
    srv2_btn: "AI वर्कफ़्लो जोड़ें",
    srv3_t: "सेल्फ-होस्टेबल बैकएंड एज़ अ सर्विस",
    srv3_d: "विज़ुअल DB डिज़ाइनर और ऑटो APIs से लैस बैकएंड इंजन के साथ ऐप्स 10x तेज़ी से बनाएं ($0 क्लाउड बिल)।",
    srv3_btn: "BaaS प्लेटफ़ॉर्म कनेक्ट करें",
    srv4_t: "3D वोक्सेल मॉडल्स और इंजन एसेट्स",
    srv4_d: "Minecraft और सैंडबॉक्स गेम वर्ल्ड्स के लिए 40+ हाई-FPS ऑप्टिमाइज़्ड Blockbench JSON 3D मॉडल्स।",
    srv4_btn: "वोक्सेल पैक प्राप्त करें",
    srv5_t: "लो-लेटेंसी गेम सर्वर हब",
    srv5_d: "भारत के डेटासेंटर्स में लो-पिंग, DDoS सुरक्षा और ऑटो-डिप्लॉयमेंट से लैस गेम सर्वर्स मात्र ₹79/माह से।",
    srv5_btn: "गेम सर्वर डिप्लॉय करें",
    srv6_t: "वायरल शॉर्ट्स और सिनेमा वीडियो एडिट्स",
    srv6_d: "Instagram Reels, YouTube Shorts के लिए हाई-रिटेंशन शॉर्ट्स, SFX साउंड डिज़ाइन और गेमिंग सिनेमा एडिट्स।",
    srv6_btn: "वीडियो एडिट ऑर्डर करें",
    projects_tag: "/// प्रमुख रचनाएं एवं पार्टनर्स",
    projects_title_1: "हमारे",
    projects_title_2: "प्रोजेक्ट्स",
    projects_desc: "हमारे सक्रिय डिजिटल प्लेटफ़ॉर्म्स, पार्टनर स्टूडियो और प्रोडक्शन-ग्रेड एप्लिकेशन्स देखें।",
    proj1_d: "इंडी क्रिएटर्स और गेम डेवलपर्स के लिए 2D/3D पिक्सेल आर्ट, गेम ग्राफ़िक्स, स्प्राइट शीट्स और वोक्सेल कला।",
    proj1_btn: "PIXELCRAFT ART देखें",
    proj2_d: "डार्क इंटरफ़ेस, स्मूथ कैटलॉग नेविगेशन और तेज़ परफॉर्मेंस वाला मीडिया स्ट्रीमिंग पोर्टल।",
    proj2_btn: "ZIGOSERIES देखें",
    showcase_tag: "/// विजुअल पोर्टफोलियो",
    showcase_title_1: "फीचर्ड",
    showcase_title_2: "प्रोजेक्ट शोकेस",
    showcase_desc: "कस्टम वेब ऐप्स, गेम डेटासेंटर्स, 3D वोक्सेल इंजन एसेट्स और मीडिया सिनेमा देखें।",
    stories_tag: "/// समीक्षाएं और ग्राहक अनुभव",
    stories_title_1: "क्लाइंट",
    stories_title_2: "स्टोरीज",
    story1_text: `"TPX STUDIO ने हमारा संपूर्ण वेब पोर्टल और लो-लेटेंसी गेम सर्वर नेटवर्क समय से पहले बिना किसी बग के तैयार किया!"`,
    story2_text: `"AI चैटबॉट और 3D वोक्सेल एसेट्स ने हमारे समुदाय का जुड़ाव तुरंत बढ़ा दिया। व्हाट्सएप पर संचार बहुत पारदर्शी था।"`,
    story3_text: `"TPX टीम के सिनेमैटिक वीडियो एडिटिंग के बाद हमारे YouTube Shorts का रिटेंशन 45% बढ़ गया।"`,
    story4_text: `"इनके BaaS सेटअप ने हमारे क्लाउड बिल में भारी बचत की। क्लीन कोड और सुपरफास्ट APIs।"`,
    story5_text: `"लैंडिंग पेज डिज़ाइन ने हमारे नए लॉन्च के दौरान ग्राहकों की संख्या 3 गुना बढ़ा दी। प्रीमियम डार्क गोल्ड लुक कमाल का है।"`,
    stack_tag: "/// तकनीकी कौशल",
    stack_title_1: "हमारा",
    stack_title_2: "टेक स्टैक",
    pipe_tag: "/// कार्यप्रणाली पाइपलाइन",
    pipe_title_1: "आइडिया से",
    pipe_title_2: "लॉन्च तक",
    step1_t: "खोज एवं विश्लेषण",
    step1_d: "हम सीधे बातचीत के माध्यम से आपके लक्ष्यों और तकनीकी आवश्यकताओं को समझते हैं।",
    step2_t: "प्रस्ताव",
    step2_d: "48 घंटों के भीतर स्पष्ट स्कोप, डिलीवरी विवरण, निश्चित मूल्य और समय-सीमा।",
    step3_t: "डिज़ाइन",
    step3_d: "Figma UI मॉकअप्स, 3D प्रोटोटाइप्स और आपकी पसंद के अनुसार इंटरैक्टिव लेआउट।",
    step4_t: "डेवलपमेंट",
    step4_d: "रियल-टाइम पूर्वावलोकन लिंक और हर 3-5 दिन में प्रगति अपडेट के साथ डेवलपमेंट स्प्रिंट।",
    step5_t: "लॉन्च",
    step5_d: "सख्त QA टेस्टिंग, पूरा सोर्स कोड हैंडओवर और 30 दिनों का पोस्ट-लॉन्च सपोर्ट।",
    faq_tag: "/// सामान्य प्रश्न",
    faq_title: "कोई सवाल है?",
    faq1_q: "1. TP x STUDIO क्या सेवाएं प्रदान करता है?",
    faq1_a: "हम वेब डेवलपमेंट, ओपन सोर्स AI कोडिंग, BaaS प्लेटफॉर्म, 3D वोक्सेल एसेट्स, गेम सर्वर होस्टिंग और वीडियो एडिटिंग सेवाएं देते हैं।",
    faq2_q: "2. वेबसाइट या गेम सर्वर की कीमत क्या है?",
    faq2_a: "गेम सर्वर ₹79/माह से, वीडियो एडिट ₹500 से, और लैंडिंग पेज ₹4,999 से शुरू होते हैं।",
    faq3_q: "3. प्रोजेक्ट पूरा होने में कितना समय लगता है?",
    faq3_a: "गेम सर्वर तुरंत शुरू होते हैं! लैंडिंग पेज 3-5 दिन और बड़े वेब ऐप्स 2-4 सप्ताह लेते हैं।",
    faq4_q: "4. क्या आप अंतरराष्ट्रीय ग्राहकों के साथ काम करते हैं?",
    faq4_a: "हाँ! हम भारत, अमेरिका, यूके, यूएई, जापान और जर्मनी के ग्राहकों के साथ काम करते हैं।",
    onboard_badge: "प्रोजेक्ट ऑनबोर्डिंग",
    onboard_title: "साथ मिलकर बनाएं",
    onboard_desc: "व्हाट्सएप या ईमेल द्वारा तुरंत प्रोजेक्ट शुरू करने के लिए नीचे विवरण चुनें।",
    form_service: "सेवा श्रेणी",
    form_budget: "अनुमानित बजट",
    form_name: "आपका नाम / हैंडल",
    form_timeline: "समय सीमा",
    form_btn_wa: "व्हाट्सएप पर शुरू करें",
    form_btn_dc: "डिस्कॉर्ड से जुड़ें"
  },
  ja: {
    nav_build: "共に構築しよう",
    dock_about: "概要",
    dock_services: "サービス",
    dock_projects: "プロジェクト",
    dock_showcase: "実績",
    dock_stories: "評判",
    dock_stack: "技術",
    hero_badge: "TPXスタジオ — デジタル建築＆ゲームメディアスタジオ",
    hero_title_1: "デジタル空間を",
    hero_title_2: "完全支配せよ",
    hero_btn_build: "共に構築しよう",
    hero_btn_portfolio: "実績を見る",
    about_tag: "/// スタジオ概要",
    about_title: "TP x STUDIO デジタルスタジオ",
    about_desc: "最高峰のパフォーマンスを誇る最先端のウェブ、クリエイティブ、サーバー開発：",
    about_card1_t: "1. ウェブアーキテクチャ",
    about_card2_t: "2. 映像メディア制作",
    about_card3_t: "3. 3Dボクセルアセット",
    about_card4_t: "4. ゲームサーバーハブ",
    services_tag: "/// 総合開発ソリューション",
    services_title_1: "提供",
    services_title_2: "サービス",
    services_desc: "超高速ウェブ開発、AI統合、BaaS構築、3Dボクセルアセット、ゲームサーバー運用、シネマティック映像編集。",
    pillar1_t: "妥協なき献身",
    pillar1_d: "24時間体制のスプリント、厳格な品質管理、期待を超える完成度まで追求。",
    pillar2_t: "洗練された美学",
    pillar2_d: "黒金の上質デザイン、高速マイクロインタラクション、Lighthouse 100点保証。",
    pillar3_t: "本番運用グレード設計",
    pillar3_d: "ソースコード完全譲渡、クラウドロックイン排除、30日間手厚いサポート。",
    srv1_t: "カスタムウェブ開発＆SaaSポータル",
    srv1_d: "Next.jsとReactを駆使した超高速ウェブアプリケーション。SEO上位表示と至高のUI/UX。",
    srv1_btn: "ウェブサイト構築",
    srv2_t: "AI開発＆自動化ワークフロー",
    srv2_d: "最新LLMチャットボットから業務自動化ボットまで、高度なAIモデルを直接統合。",
    srv2_btn: "AIワークフロー導入",
    srv3_t: "セルフホスト型 BaaS プラットフォーム",
    srv3_d: "ビジュアルDB設計と自動API生成により、10倍速でアプリ開発・低コスト運用。",
    srv3_btn: "BaaSを接続",
    srv4_t: "3Dボクセルモデル＆ゲームアセット",
    srv4_d: "Minecraftやサンドボックスゲームに最適化された40種以上の軽量Blockbench JSON 3Dモデル。",
    srv4_btn: "ボクセルパック購入",
    srv5_t: "超低遅延ゲームサーバーハブ",
    srv5_d: "DDoS防御と即時自動展開を備えた高クロックCPUサーバー（12ms以下の超低遅延）。",
    srv5_btn: "サーバーを即時起動",
    srv6_t: "ショート動画＆シネマティック編集",
    srv6_d: "Instagram Reels、YouTube Shorts向けの視聴維持率特化型動画編集と効果音デザイン。",
    srv6_btn: "動画編集を依頼",
    projects_tag: "/// 注目プロジェクト＆パートナー",
    projects_title_1: "公式",
    projects_title_2: "プロジェクト",
    projects_desc: "私たちが展開するデジタルプラットフォームと公式パートナースタジオ。",
    proj1_d: "インディーゲーム開発者向けの高品質2D/3Dドット絵、スプライトシート、ボクセルアート。",
    proj1_btn: "PIXELCRAFT ART を見る",
    proj2_d: "洗練されたダークUIと高速ストリーミング検索を備えたエンタメポータル。",
    proj2_btn: "ZIGOSERIES を見る",
    showcase_tag: "/// ビジュアルポートフォリオ",
    showcase_title_1: "主要",
    showcase_title_2: "制作実績",
    showcase_desc: "ウェブアプリ、データセンター、3Dボクセルアセット、映像制作の実績をご覧ください。",
    stories_tag: "/// クライアントの声",
    stories_title_1: "お客様の",
    stories_title_2: "ストーリー",
    story1_text: `「TPX STUDIOは私たちのポータルと低遅延サーバーをバグゼロかつ納期前倒しで完璧に構築してくれました！」`,
    story2_text: `「AIチャットボットと3Dボクセルアセットのおかげでコミュニティの熱量が圧倒的に高まりました。」`,
    story3_text: `「TPXの映像編集チームに切り替えてからYouTube Shortsの維持率が45%急上昇しました。」`,
    story4_text: `「セルフホストBaaSの導入で毎月のクラウド費用が大幅に削減できました。美しいコードです。」`,
    story5_text: `「ダークゴールドの高級感あふれるランディングページのおかげで成約率が3倍に伸びました。」`,
    stack_tag: "/// 開発技術スタック",
    stack_title_1: "開発",
    stack_title_2: "スタック",
    pipe_tag: "/// 制作パイプライン",
    pipe_title_1: "構想から",
    pipe_title_2: "ローンチまで",
    step1_t: "ヒアリング",
    step1_d: "要件と目標を綿密に分析し、最適なアーキテクチャを設計します。",
    step2_t: "ご提案",
    step2_d: "48時間以内に明確な仕様書、納期、固定見積をご案内します。",
    step3_t: "デザイン",
    step3_d: "Figma UIモックアップと3Dプロトタイプで理想のデザインを具現化。",
    step4_t: "開発スプリント",
    step4_d: "定期プレビューとリアルタイムな進捗共有を行いながら迅速に実装。",
    step5_t: "公開・納品",
    step5_d: "厳格な動作検証、ソースコード納品、30日間の安心保守サポート。",
    faq_tag: "/// よくあるご質問",
    faq_title: "ご不明な点はありますか？",
    faq1_q: "1. どのようなサービスを提供していますか？",
    faq1_a: "ウェブ開発、AIシステム構築、BaaS基盤、3Dボクセル制作、ゲームサーバー、映像編集を提供しています。",
    faq2_q: "2. 費用はどのくらいかかりますか？",
    faq2_a: "ゲームサーバーは月額₹79〜、動画編集は₹500〜、LP制作は₹4,999〜承っております。",
    faq3_q: "3. 納期はどのくらいですか？",
    faq3_a: "サーバーは即時起動、LPは3〜5日、大規模ウェブアプリは2〜4週間程度です。",
    faq4_q: "4. 海外からの依頼にも対応していますか？",
    faq4_a: "はい、日本、アメリカ、イギリス、UAE、ドイツなど世界中のクライアント様に対応しています。",
    onboard_badge: "プロジェクト開始",
    onboard_title: "共に構築しよう",
    onboard_desc: "ご希望の条件を選択し、WhatsAppまたはメールですぐにご相談いただけます。",
    form_service: "サービス種別",
    form_budget: "ご予算目安",
    form_name: "お名前 / アカウント名",
    form_timeline: "ご希望納期",
    form_btn_wa: "WhatsAppで相談する",
    form_btn_dc: "Discordに参加する"
  },
  es: {
    nav_build: "CONSTRUIR JUNTOS",
    dock_about: "Acerca",
    dock_services: "Servicios",
    dock_projects: "Proyectos",
    dock_showcase: "Portafolio",
    dock_stories: "Reseñas",
    dock_stack: "Stack",
    hero_badge: "TPX STUDIO — ARQUITECTURA DIGITAL Y ESTUDIO DE MEDIOS",
    hero_title_1: "DOMINA EL",
    hero_title_2: "VACÍO DIGITAL",
    hero_btn_build: "CONSTRUYAMOS JUNTOS",
    hero_btn_portfolio: "VER PORTAFOLIO",
    about_tag: "/// RESUMEN DEL ESTUDIO",
    about_title: "TP x STUDIO ESTUDIO DIGITAL",
    about_desc: "Servicios integrales técnicos, creativos y de infraestructura de servidores diseñados para el máximo rendimiento:",
    about_card1_t: "1. Arquitectura Web",
    about_card2_t: "2. Producción de Medios Virales",
    about_card3_t: "3. Activos Voxel 3D",
    about_card4_t: "4. Centro de Servidores de Juegos",
    services_tag: "/// CAPACIDADES INTEGRALES",
    services_title_1: "NUESTROS",
    services_title_2: "SERVICIOS",
    services_desc: "Ingeniería web ultrarrápida, integraciones de IA, infraestructura BaaS, activos 3D voxel, servidores de juegos y edición de video cinemático.",
    pillar1_t: "Dedicación Incondicional",
    pillar1_d: "Entrega continua, estricto control de calidad y revisiones hasta superar sus expectativas.",
    pillar2_t: "Estilo de Precisión Distintivo",
    pillar2_d: "Diseños oscuros inmersivos, detalles en oro, microinteracciones y rendimiento Lighthouse 100/100.",
    pillar3_t: "Ingeniería de Grado de Producción",
    pillar3_d: "Propiedad total del código, sin bloqueos de nube, CI/CD automatizado y 30 días de soporte.",
    srv1_t: "Arquitectura Web Personalizada y Portales SaaS",
    srv1_d: "Aplicaciones web de alto rendimiento construidas con React y Next.js. Máxima velocidad y SEO desde ₹4,999.",
    srv1_btn: "CONSTRUIR SITIO WEB",
    srv2_t: "IA de Código Abierto y Automatización",
    srv2_d: "Integre modelos de IA de última generación: chatbots LLM avanzados y flujos de trabajo inteligentes.",
    srv2_btn: "INTEGRAR IA",
    srv3_t: "Backend como Servicio Autohospedable",
    srv3_d: "Lance aplicaciones 10 veces más rápido con un motor backend completo con diseñador de BD y APIs automáticas.",
    srv3_btn: "CONECTAR BAAS",
    srv4_t: "Modelos Voxel 3D y Activos de Motor",
    srv4_d: "Más de 40 modelos 3D Blockbench JSON optimizados para alto rendimiento en Minecraft y mundos sandbox.",
    srv4_btn: "OBTENER PACK VOXEL",
    srv5_t: "Servidores de Juegos de Baja Latencia",
    srv5_d: "Servidores de alta frecuencia en centros de datos con protección DDoS y latencia inferior a 12 ms.",
    srv5_btn: "DESPLEGAR SERVIDOR",
    srv6_t: "Shorts Virales y Edición Cinemática",
    srv6_d: "Edición diseñada para alta retención en Instagram Reels, YouTube Shorts y TikTok con diseño de sonido SFX.",
    srv6_btn: "ORDENAR EDICIÓN",
    projects_tag: "/// CREACIONES DESTACADAS Y SOCIOS",
    projects_title_1: "NUESTROS",
    projects_title_2: "PROYECTOS",
    projects_desc: "Descubra nuestras plataformas digitales activas y estudios asociados.",
    proj1_d: "Pixel art 2D/3D personalizado, gráficos de juegos, hojas de sprites y modelos voxel.",
    proj1_btn: "EXPLORAR PIXELCRAFT ART",
    proj2_d: "Portal de entretenimiento multimedia con interfaz oscura inmersiva y navegación ultrarrápida.",
    proj2_btn: "VISITAR ZIGOSERIES",
    showcase_tag: "/// PORTAFOLIO VISUAL",
    showcase_title_1: "PROYECTOS",
    showcase_title_2: "DESTACADOS",
    showcase_desc: "Explore nuestro trabajo en aplicaciones web, servidores, activos 3D voxel y cine de medios.",
    stories_tag: "/// RESEÑAS Y TESTIMONIOS",
    stories_title_1: "HISTORIAS DE",
    stories_title_2: "CLIENTES",
    story1_text: `"¡TPX STUDIO construyó todo nuestro portal web y red de servidores sin errores y antes de la fecha límite!"`,
    story2_text: `"El flujo de trabajo con IA y los activos 3D transformaron nuestra comunidad. La comunicación fue excelente."`,
    story3_text: `"La retención de nuestros YouTube Shorts aumentó un 45% tras elegir al equipo de TPX."`,
    story4_text: `"Su arquitectura BaaS nos ahorró miles de dólares en costos de nube recurrentes."`,
    story5_text: `"El diseño de la landing page triplicó nuestras conversiones de clientes de inmediato."`,
    stack_tag: "/// ARSENAL TÉCNICO",
    stack_title_1: "NUESTRO",
    stack_title_2: "STACK",
    pipe_tag: "/// PROCESO DE TRABAJO",
    pipe_title_1: "DE LA IDEA AL",
    pipe_title_2: "LANZAMIENTO",
    step1_t: "DESCUBRIMIENTO",
    step1_d: "Analizamos sus objetivos y especificaciones técnicas en detalle.",
    step2_t: "PROPUESTA",
    step2_d: "Alcance transparente, precios fijos y cronograma en 48 horas.",
    step3_t: "DISEÑO",
    step3_d: "Mockups en Figma y prototipos 3D ajustados a su identidad.",
    step4_t: "CONSTRUCCIÓN",
    step4_d: "Sprint de desarrollo con enlaces de vista previa en tiempo real.",
    step5_t: "LANZAMIENTO",
    step5_d: "Pruebas QA, entrega total de código y 30 días de soporte.",
    faq_tag: "/// PREGUNTAS FRECUENTES",
    faq_title: "¿TIENE PREGUNTAS?",
    faq1_q: "1. ¿Qué servicios ofrece TP x STUDIO?",
    faq1_a: "Desarrollo web, IA, BaaS, activos 3D voxel, servidores de juegos y edición de video.",
    faq2_q: "2. ¿Cuánto cuesta un proyecto?",
    faq2_a: "Servidores desde ₹79/mes, videos desde ₹500 y landing pages desde ₹4,999.",
    faq3_q: "3. ¿Cuánto tiempo toma?",
    faq3_a: "Servidores instantáneos, landing pages en 3-5 días y apps completas en 2-4 semanas.",
    faq4_q: "4. ¿Trabajan con clientes internacionales?",
    faq4_a: "¡Sí! Trabajamos con clientes de España, EE. UU., México, Japón y todo el mundo.",
    onboard_badge: "INICIO DE PROYECTO",
    onboard_title: "CONSTRUYAMOS JUNTOS",
    onboard_desc: "Configure los parámetros de su proyecto para iniciar directamente vía WhatsApp o correo.",
    form_service: "CATEGORÍA DE SERVICIO",
    form_budget: "PRESUPUESTO ESTIMADO",
    form_name: "SU NOMBRE / USUARIO",
    form_timeline: "PLAZO ESTIMADO",
    form_btn_wa: "INICIAR POR WHATSAPP",
    form_btn_dc: "UNIRSE A DISCORD"
  },
  de: {
    nav_build: "GEMEINSAM BAUEN",
    dock_about: "Über uns",
    dock_services: "Services",
    dock_projects: "Projekte",
    dock_showcase: "Portfolio",
    dock_stories: "Kunden",
    dock_stack: "Stack",
    hero_badge: "TPX STUDIO — DIGITALE ARCHITEKTUR & MEDIENSTUDIO",
    hero_title_1: "BEHERRSCHE DIE",
    hero_title_2: "DIGITALE LEERE",
    hero_btn_build: "GEMEINSAM BAUEN",
    hero_btn_portfolio: "PORTFOLIO ANSEHEN",
    about_tag: "/// STUDIO-ÜBERSICHT",
    about_title: "TP x STUDIO DIGITALSTUDIO",
    about_desc: "Ganzheitliche technische, kreative und Server-Infrastrukturlösungen für Spitzenleistung:",
    about_card1_t: "1. Web-Architektur",
    about_card2_t: "2. Virale Medienproduktion",
    about_card3_t: "3. 3D-Voxel-Assets",
    about_card4_t: "4. Game-Server-Hub",
    services_tag: "/// UMFASSENDE KOMPETENZEN",
    services_title_1: "UNSERE",
    services_title_2: "SERVICES",
    services_desc: "Hochleistungs-Webarchitektur, KI-Integrationen, BaaS-Plattformen, 3D-Voxel-Modelle, Game-Server und filmische Videobearbeitung.",
    pillar1_t: "Kompromisslose Hingabe",
    pillar1_d: "Sprint-Lieferung rund um die Uhr, strenge QA-Tests und ständige Optimierung für Ihr Projekt.",
    pillar2_t: "Präziser Premium-Stil",
    pillar2_d: "Immersive dunkle Layouts, luxuriöse Goldakzente und 100/100 Lighthouse-Performance.",
    pillar3_t: "Production-Grade Engineering",
    pillar3_d: "Volle Quellcode-Eigentümerschaft, automatisierte CI/CD-Pipelines und 30 Tage Support.",
    srv1_t: "Maßgeschneiderte Web-Architektur & SaaS",
    srv1_d: "Leistungsstarke Webanwendungen auf React- und Next.js-Basis. Höchste Geschwindigkeit und SEO ab ₹4.999.",
    srv1_btn: "WEBSITE STARTEN",
    srv2_t: "Open-Source-KI & Workflow-Automation",
    srv2_d: "Integrieren Sie moderne KI-Modelle direkt in Ihre Plattform – von Chatbots bis zu Automatisierungs-Bots.",
    srv2_btn: "KI-WORKFLOW INTEGRIEREN",
    srv3_t: "Self-Hostable Backend as a Service",
    srv3_d: "10x schnellere App-Entwicklung mit vollwertiger Backend-Engine und automatischen APIs.",
    srv3_btn: "BAAS VERBINDEN",
    srv4_t: "3D-Voxel-Modelle & Engine-Assets",
    srv4_d: "Über 40 optimierte Blockbench JSON 3D-Modelle für Minecraft und Sandbox-Welten.",
    srv4_btn: "VOXEL-PACK SICHERN",
    srv5_t: "Low-Latency Game-Server-Hub",
    srv5_d: "Hochtakt-Server mit DDoS-Schutz und Latenzen unter 12 ms für maximale Performance.",
    srv5_btn: "SERVER STARTEN",
    srv6_t: "Virale Shorts & Filmische Edits",
    srv6_d: "Für maximale Wiedergabezeit optimierte Edits für Instagram Reels, YouTube Shorts und TikTok.",
    srv6_btn: "EDIT BESTELLEN",
    projects_tag: "/// AUSGEWÄHLTE PROJEKTE & PARTNER",
    projects_title_1: "UNSERE",
    projects_title_2: "PROJEKTE",
    projects_desc: "Entdecken Sie unsere aktiven Plattformen und Partnerstudios.",
    proj1_d: "Hochwertige 2D/3D-Pixel-Art, Spielgrafiken, Sprite-Sheets und Voxel-Designs für Indie-Entwickler.",
    proj1_btn: "PIXELCRAFT ART ANSEHEN",
    proj2_d: "Modernes Entertainment-Portal mit flüssiger Navigation und responsiver Performance.",
    proj2_btn: "ZIGOSERIES ANSEHEN",
    showcase_tag: "/// VISUELLES PORTFOLIO",
    showcase_title_1: "AKTUELLES",
    showcase_title_2: "PROJEKT-SHOWCASE",
    showcase_desc: "Entdecken Sie unsere Web-Apps, Server-Cluster, 3D-Voxel und Videoproduktionen.",
    stories_tag: "/// BEWERTUNGEN & KUNDENSTIMMEN",
    stories_title_1: "KUNDEN-",
    stories_title_2: "STIMMEN",
    story1_text: `"TPX STUDIO hat unser gesamtes Webportal und Servernetzwerk fehlerfrei und vor der Deadline geliefert!"`,
    story2_text: `"Die KI-Chatbots und 3D-Voxel haben unser Community-Engagement massiv gesteigert."`,
    story3_text: `"Unsere YouTube-Shorts-Zuschauerbindung stieg nach dem Wechsel zu TPX um 45%."`,
    story4_text: `"Das BaaS-Setup spart uns monatlich tausende Dollar an Cloud-Gebühren."`,
    story5_text: `"Das Landing-Page-Design hat unsere Conversions beim Launch verdreifacht."`,
    stack_tag: "/// TECHNISCHES ARSENAL",
    stack_title_1: "UNSER",
    stack_title_2: "STACK",
    pipe_tag: "/// WORKFLOW-PIPELINE",
    pipe_title_1: "VON DER IDEE ZUM",
    pipe_title_2: "LAUNCH",
    step1_t: "ANALYSE",
    step1_d: "Wir analysieren Ihre Ziele und technischen Vorgaben im Detail.",
    step2_t: "ANGEBOT",
    step2_d: "Transparenter Umfang, Festpreise und Zeitplan innerhalb von 48 Stunden.",
    step3_t: "DESIGN",
    step3_d: "Figma UI-Mockups und interaktive Prototypen nach Ihren Wünschen.",
    step4_t: "ENTWICKLUNG",
    step4_d: "Entwicklungs-Sprint mit regelmäßigen Vorschau-Links und Updates.",
    step5_t: "LAUNCH",
    step5_d: "Strenge QA-Prüfung, Quellcode-Übergabe und 30 Tage Support.",
    faq_tag: "/// WISSENSBASIS",
    faq_title: "FRAGEN?",
    faq1_q: "1. Welche Services bietet TP x STUDIO?",
    faq1_a: "Webentwicklung, KI-Integration, BaaS, 3D-Voxel-Assets, Game-Server und Videoschnitt.",
    faq2_q: "2. Wie hoch sind die Kosten?",
    faq2_a: "Server ab ₹79/Monat, Video-Edits ab ₹500 und Landing Pages ab ₹4.999.",
    faq3_q: "3. Wie lange dauert die Umsetzung?",
    faq3_a: "Server sofort, Landing Pages in 3–5 Tagen und Web-Apps in 2–4 Wochen.",
    faq4_q: "4. Arbeiten Sie mit internationalen Kunden?",
    faq4_a: "Ja! Wir arbeiten mit Kunden in Deutschland, den USA, Großbritannien, Japan und weltweit.",
    onboard_badge: "PROJEKT-ONBOARDING",
    onboard_title: "GEMEINSAM BAUEN",
    onboard_desc: "Konfigurieren Sie Ihr Projekt für den direkten Start via WhatsApp oder E-Mail.",
    form_service: "SERVICE-KATEGORIE",
    form_budget: "GESCHÄTZTES BUDGET",
    form_name: "NAME / HANDLE",
    form_timeline: "ZEITRAHMEN",
    form_btn_wa: "VIA WHATSAPP STARTEN",
    form_btn_dc: "DISCORD BEITRETEN"
  }
};

function setLanguage(lang) {
  if (!i18nData[lang]) return;

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.remove('active-lang');
    btn.classList.add('text-text-dim');
  });
  const activeBtn = document.getElementById('lang-' + lang);
  if (activeBtn) {
    activeBtn.classList.add('active-lang');
    activeBtn.classList.remove('text-text-dim');
  }

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (i18nData[lang][key]) {
      el.innerText = i18nData[lang][key];
    }
  });

  localStorage.setItem('tpx_lang', lang);
}

// ==========================================
// 8. SCROLL REVEAL OBSERVER
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  const savedLang = localStorage.getItem('tpx_lang');
  if (savedLang && i18nData[savedLang]) {
    setLanguage(savedLang);
  }
});

// ==========================================
// 9. TOP SCROLL PROGRESS BAR
// ==========================================
window.addEventListener('scroll', () => {
  const winScroll = document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  if (height > 0) {
    document.getElementById('scroll-progress-bar').style.width = ((winScroll / height) * 100) + '%';
  }
}, { passive: true });