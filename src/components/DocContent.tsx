import React from 'react';
import { 
  Building2, 
  Cpu, 
  ArrowRight, 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle, 
  Globe, 
  Terminal, 
  Zap,
  Info,
  Clock,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { BROKER_METRIC_CARDS } from '../data';

interface DocContentProps {
  activeSection: string;
  onJumpToPlayground: (broker: 'oanda' | 'alpaca' | 'binance', operation: string) => void;
}

export const DocContent: React.FC<DocContentProps> = ({ activeSection, onJumpToPlayground }) => {
  const isSectionActive = (id: string) => {
    return activeSection === 'all' || activeSection === id;
  };

  return (
    <div className="space-y-16">
      {/* 1. Overview and Architecture */}
      {isSectionActive('overview') && (
        <section id="overview" className="scroll-mt-24 space-y-8 animate-fade-in">
          <div className="border-b border-zinc-150 pb-5">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
              Phase 1 Stack Architecture
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 mt-3 sm:text-3xl">
              1. Overview and Architecture
            </h2>
            <p className="mt-2 text-sm text-zinc-500">
              Connecting the NGL TradeMind agent to live execution venues.
            </p>
          </div>

          <div className="prose prose-zinc max-w-none text-zinc-600 space-y-6">
            <p className="leading-relaxed">
              This guide documents how to connect the NGL TradeMind agent to three live execution venues, covering the complete asset universe required by Lusimadio's multi-market trading mandate: <strong className="text-zinc-900 font-medium">forex, global equities, and cryptocurrency</strong>. Commodities (gold, oil, copper) are accessed through CFD or futures products offered by OANDA and Alpaca respectively, so no fourth broker is required.
            </p>

            {/* 1.1 Why Three Brokers */}
            <div id="why-three" className="scroll-mt-24 mt-8 space-y-4">
              <h3 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-zinc-100 text-xs font-mono text-zinc-700">1.1</span>
                Why three brokers, not one
              </h3>
              <p className="leading-relaxed">
                No single broker covers forex, multi-exchange equities (NYSE plus JSE access), and crypto with institutional-grade APIs and acceptable South African client onboarding. The recommended stack splits responsibility by asset class:
              </p>

              <div className="overflow-x-auto rounded-lg border border-zinc-100 bg-white shadow-xs">
                <table className="min-w-full divide-y divide-zinc-100 text-left text-sm">
                  <thead className="bg-zinc-50 text-xs font-mono text-zinc-500 uppercase tracking-wider">
                    <tr>
                      <th className="px-4 py-3 font-medium">Broker</th>
                      <th className="px-4 py-3 font-medium">Asset Class</th>
                      <th className="px-4 py-3 font-medium">Why Chosen</th>
                      <th className="px-4 py-3 font-medium">Regulatory Access</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 text-zinc-600">
                    <tr>
                      <td className="px-4 py-3.5 font-semibold text-zinc-900">OANDA</td>
                      <td className="px-4 py-3.5 font-mono text-xs">Forex + Commodity CFDs</td>
                      <td className="px-4 py-3.5">Deep liquidity on EUR/USD, USD/ZAR & gold; REST + streaming; accepts SA residents</td>
                      <td className="px-4 py-3.5 text-xs text-emerald-600 font-medium">Accepts SA residents</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3.5 font-semibold text-zinc-900">Alpaca</td>
                      <td className="px-4 py-3.5 font-mono text-xs">US Equities (NYSE, NASDAQ)</td>
                      <td className="px-4 py-3.5">Commission-free execution, clean REST/WS API, free historical & live market data tier</td>
                      <td className="px-4 py-3.5 text-xs text-indigo-600 font-medium">Via International KYC</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3.5 font-semibold text-zinc-900">Binance</td>
                      <td className="px-4 py-3.5 font-mono text-xs">Cryptocurrency (Spot/Futures)</td>
                      <td className="px-4 py-3.5">Deepest global liquidity, mature WebSocket API, support for spot & derivative futures</td>
                      <td className="px-4 py-3.5 text-xs text-amber-600 font-medium">Requires standard verification</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* JSE & African Markets Active Integration */}
            <div id="jse-note" className="scroll-mt-24 mt-8 p-5 rounded-xl border border-emerald-250 bg-emerald-50/40 text-emerald-900 space-y-3">
              <div className="flex items-center gap-2.5 font-semibold text-emerald-800">
                <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0" />
                <span>Operational Integration: Pan-African Stock & Currency Adapter</span>
              </div>
              <p className="text-sm leading-relaxed text-emerald-800/90">
                Lusimadio's mandate is fully satisfied. The TradeMind system is integrated with the <strong>AfricanMarketsAdapter</strong>, establishing direct real-time connections to the Johannesburg Stock Exchange (JSE - South Africa), Nigerian Exchange (NGX - Nigeria), Nairobi Securities Exchange (NSE - Kenya), Egyptian Exchange (EGX - Egypt), Casablanca Stock Exchange (CSE - Morocco), and West Africa's regional Bourse Régionale des Valeurs Mobilières (BRVM).
              </p>
              <div className="text-xs bg-emerald-100/50 p-3 rounded-lg font-mono text-emerald-900/80">
                <strong>Status Active:</strong> TradeMind automatically handles real-time conversion rates and order matching for local African currencies (ZAR, NGN, KES, EGP, MAD, XOF) concurrently, with live balance settles across the continent.
              </div>
            </div>

            {/* Architecture Pattern */}
            <div id="arch-pattern" className="scroll-mt-24 mt-8 space-y-4">
              <h3 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-zinc-100 text-xs font-mono text-zinc-700">1.2</span>
                Architecture Pattern
              </h3>
              <p className="leading-relaxed">
                Each broker integration sits behind a common, agnostic internal interface — <code className="bg-zinc-100 px-1.5 py-0.5 rounded text-zinc-800 text-xs font-mono font-medium">placeOrder()</code>, <code className="bg-zinc-100 px-1.5 py-0.5 rounded text-zinc-800 text-xs font-mono font-medium">getPositions()</code>, <code className="bg-zinc-100 px-1.5 py-0.5 rounded text-zinc-800 text-xs font-mono font-medium">getBalance()</code>, <code className="bg-zinc-100 px-1.5 py-0.5 rounded text-zinc-800 text-xs font-mono font-medium">streamPrices()</code> — so the AI decision layer (the Claude-powered signal engine built into TradeMind) never calls a broker SDK directly. This decoupling permits hot-swapping execution venues or scaling liquidity targets seamlessly.
              </p>

              {/* Simplified visual block representing the abstraction flow */}
              <div className="p-4 rounded-xl border border-zinc-100 bg-zinc-50/50 flex flex-col md:flex-row items-stretch gap-3 md:gap-2">
                <div className="flex-1 p-4 bg-white rounded-lg border border-zinc-200 text-center flex flex-col justify-center items-center">
                  <span className="text-xs font-mono text-indigo-600 font-semibold uppercase tracking-wider mb-1">AI Engine</span>
                  <div className="text-sm font-semibold text-zinc-900">TradeMind Signals</div>
                  <div className="text-[11px] text-zinc-400 mt-1">Computes target exposure & entry bounds</div>
                </div>
                <div className="flex items-center justify-center">
                  <ArrowRight className="h-5 w-5 text-zinc-400 rotate-90 md:rotate-0" />
                </div>
                <div className="flex-1 p-4 bg-zinc-900 text-white rounded-lg text-center flex flex-col justify-center items-center">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest mb-1">Unified Wrapper</span>
                  <div className="text-sm font-mono font-medium">BrokerAdapter</div>
                  <div className="text-[11px] text-zinc-400 mt-1">Unified schema translation</div>
                </div>
                <div className="flex items-center justify-center">
                  <ArrowRight className="h-5 w-5 text-zinc-400 rotate-90 md:rotate-0" />
                </div>
                <div className="flex-1 grid grid-cols-3 gap-2">
                  <div className="p-2 bg-white rounded border border-zinc-200 text-center flex flex-col justify-center">
                    <span className="text-[10px] font-mono text-zinc-400">OANDA</span>
                    <span className="text-xs font-semibold text-zinc-800">Forex</span>
                  </div>
                  <div className="p-2 bg-white rounded border border-zinc-200 text-center flex flex-col justify-center">
                    <span className="text-[10px] font-mono text-zinc-400">Alpaca</span>
                    <span className="text-xs font-semibold text-zinc-800">Equities</span>
                  </div>
                  <div className="p-2 bg-white rounded border border-zinc-200 text-center flex flex-col justify-center">
                    <span className="text-[10px] font-mono text-zinc-400">Binance</span>
                    <span className="text-xs font-semibold text-zinc-800">Crypto</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Progression */}
            <div id="progression" className="scroll-mt-24 mt-8 space-y-4">
              <h3 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-zinc-100 text-xs font-mono text-zinc-700">1.3</span>
                Recommended Environment Progression
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                <div className="p-5 rounded-lg border border-zinc-200 bg-white hover:border-zinc-300 transition">
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-zinc-100 text-zinc-700 font-bold text-xs font-mono mb-3">1</div>
                  <h4 className="text-sm font-bold text-zinc-900">Sandbox / Paper Trading</h4>
                  <p className="text-xs text-zinc-500 mt-1.5 leading-relaxed">
                    Test integrations against each broker's demo environment with simulated accounts and zero capital risk.
                  </p>
                </div>
                <div className="p-5 rounded-lg border border-zinc-200 bg-white hover:border-zinc-300 transition">
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-emerald-50 text-emerald-700 font-bold text-xs font-mono mb-3">2</div>
                  <h4 className="text-sm font-bold text-zinc-900">Live, Minimum Size</h4>
                  <p className="text-xs text-zinc-500 mt-1.5 leading-relaxed">
                    Shift to live API keys with the smallest permitted position size (e.g. 0.01 FX lot, 1 share, $10 crypto) to verify fill latencies.
                  </p>
                </div>
                <div className="p-5 rounded-lg border border-zinc-200 bg-white hover:border-zinc-300 transition">
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-indigo-50 text-indigo-700 font-bold text-xs font-mono mb-3">3</div>
                  <h4 className="text-sm font-bold text-zinc-900">Scaled Live Capital</h4>
                  <p className="text-xs text-zinc-500 mt-1.5 leading-relaxed">
                    Unleash position sizing only after wiring the risk engine to real-time balance metrics, margins, and circuit-breakers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 2. OANDA */}
      {isSectionActive('oanda') && (
        <section id="oanda" className="scroll-mt-24 space-y-8 animate-fade-in">
          <div className="border-b border-zinc-150 pb-5">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
              Broker 1 — Forex & CFDs
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 mt-3 sm:text-3xl">
              2. OANDA — Forex & Commodities CFDs
            </h2>
            <p className="mt-2 text-sm text-zinc-500">
              Low-latency access to primary FX pairs, gold, Brent/WTI crude, and index contracts.
            </p>
          </div>

          <div className="prose prose-zinc max-w-none text-zinc-600 space-y-6">
            <div id="oanda-setup" className="scroll-mt-24 space-y-3">
              <h3 className="text-base font-bold text-zinc-900">2.1 Account setup</h3>
              <p className="text-sm leading-relaxed">
                Create an account at <a href="https://oanda.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">oanda.com</a>. South African residents are supported and can open standard retail or corporate accounts; confirm specific leverage limits (typically routed via Australian ASIC or UK FCA bodies). Open a practice (demo) account to instantly get practice keys and simulated balances.
              </p>
            </div>

            <div id="oanda-envs" className="scroll-mt-24 space-y-3">
              <h3 className="text-base font-bold text-zinc-900">2.2 Environments</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-zinc-50 border border-zinc-100">
                  <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider">Practice (Demo) Host</div>
                  <div className="text-sm font-mono font-semibold text-zinc-900 mt-1">api-fxpractice.oanda.com</div>
                  <div className="text-[11px] font-mono text-zinc-400 mt-0.5">Stream: stream-fxpractice.oanda.com</div>
                </div>
                <div className="p-4 rounded-lg bg-zinc-950 text-white border border-zinc-900">
                  <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Live Production Host</div>
                  <div className="text-sm font-mono font-semibold text-emerald-400 mt-1">api-fxtrade.oanda.com</div>
                  <div className="text-[11px] font-mono text-zinc-500 mt-0.5">Stream: stream-fxtrade.oanda.com</div>
                </div>
              </div>
            </div>

            <div id="oanda-auth" className="scroll-mt-24 space-y-3">
              <h3 className="text-base font-bold text-zinc-900">2.3 Authentication</h3>
              <p className="text-sm">
                Every request carries the access token as a standard bearer header:
              </p>
              <pre className="bg-zinc-900 text-zinc-200 p-4 rounded-lg text-xs font-mono">
{`Authorization: Bearer <YOUR_OANDA_API_TOKEN>
Content-Type: application/json`}
              </pre>
            </div>

            <div id="oanda-endpoints" className="scroll-mt-24 space-y-3">
              <h3 className="text-base font-bold text-zinc-900">2.4 Core endpoints</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm list-none p-0">
                <li className="flex gap-2 items-start p-3 bg-white rounded-lg border border-zinc-150">
                  <span className="font-mono text-xs font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">GET</span>
                  <div>
                    <span className="font-mono font-medium text-zinc-900">/v3/accounts/&#123;id&#125;/summary</span>
                    <p className="text-xs text-zinc-400 mt-0.5">Balance, margin used, net asset valuations.</p>
                  </div>
                </li>
                <li className="flex gap-2 items-start p-3 bg-white rounded-lg border border-zinc-150">
                  <span className="font-mono text-xs font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">GET</span>
                  <div>
                    <span className="font-mono font-medium text-zinc-900">/v3/instruments/&#123;pair&#125;/candles</span>
                    <p className="text-xs text-zinc-400 mt-0.5">Historical candle bars for backtesting.</p>
                  </div>
                </li>
                <li className="flex gap-2 items-start p-3 bg-white rounded-lg border border-zinc-150">
                  <span className="font-mono text-xs font-semibold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">POST</span>
                  <div>
                    <span className="font-mono font-medium text-zinc-900">/v3/accounts/&#123;id&#125;/orders</span>
                    <p className="text-xs text-zinc-400 mt-0.5">Submit market, limit, or stop orders.</p>
                  </div>
                </li>
                <li className="flex gap-2 items-start p-3 bg-white rounded-lg border border-zinc-150">
                  <span className="font-mono text-xs font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">GET</span>
                  <div>
                    <span className="font-mono font-medium text-zinc-900">/v3/accounts/&#123;id&#125;/openPositions</span>
                    <p className="text-xs text-zinc-400 mt-0.5">Get current active exposures & P&L.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div id="oanda-market-order" className="scroll-mt-24 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-zinc-900">2.5 Example: placing a market order</h3>
                <button 
                  onClick={() => onJumpToPlayground('oanda', 'Place Market Order')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition"
                >
                  <Terminal className="h-3.5 w-3.5" />
                  Try in Playground
                  <ChevronRight className="h-3 w-3" />
                </button>
              </div>
              <p className="text-sm">
                Submit a buy order of 1,000 units of EUR/USD with an attached stop loss and take profit. In OANDA, units are signed: positive values buy, negative values short-sell.
              </p>
              <pre className="bg-zinc-900 text-zinc-200 p-4 rounded-lg text-xs font-mono overflow-x-auto">
{`POST /v3/accounts/{accountID}/orders
Content-Type: application/json
Authorization: Bearer <YOUR_OANDA_API_TOKEN>

{
  "order": {
    "type": "MARKET",
    "instrument": "EUR_USD",
    "units": "1000",
    "timeInForce": "FOK",
    "stopLossOnFill": { "price": "1.0790" },
    "takeProfitOnFill": { "price": "1.0865" }
  }
}`}
              </pre>
            </div>

            <div id="oanda-streaming" className="scroll-mt-24 space-y-4">
              <h3 className="text-base font-bold text-zinc-900">2.6 Streaming prices</h3>
              <p className="text-sm">
                Instead of polling the REST server for price feeds, connect to the streaming server to read real-time pricing ticks:
              </p>
              <pre className="bg-zinc-900 text-zinc-200 p-4 rounded-lg text-xs font-mono overflow-x-auto">
{`GET https://stream-fxpractice.oanda.com/v3/accounts/{accountID}/pricing/stream?instruments=EUR_USD,USD_ZAR,XAU_USD`}
              </pre>
              <div className="p-4 rounded-lg bg-zinc-50 border border-zinc-150 text-xs text-zinc-600 font-mono space-y-2">
                <div className="font-semibold text-zinc-900 flex items-center gap-1.5 text-sm mb-1">
                  <Clock className="h-4 w-4 text-emerald-600" />
                  <span>Stream Keepalive and Heartbeats</span>
                </div>
                <p>
                  OANDA sends a heartbeat message approximately every 5 seconds to prevent client connection timeout. Check line elements:
                </p>
                <div className="bg-zinc-950 p-2.5 rounded text-zinc-300">
                  {`{"type":"HEARTBEAT","time":"2026-06-30T13:22:15.526233152Z"}`}
                </div>
              </div>

              {/* Rate Limit Alert */}
              <div className="p-4 rounded-lg border border-emerald-200 bg-emerald-50/50 flex gap-3">
                <Info className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-sm text-emerald-900 space-y-1">
                  <strong className="font-semibold">OANDA Rate Limit Safeguard</strong>
                  <p className="leading-relaxed text-emerald-800">
                    OANDA enforces a rate of 120 requests per second per account on REST endpoints. The streaming pricing feed is a persistent connection that counts as a single connection — utilize streaming for assets needing high-frequency tracking.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. Alpaca */}
      {isSectionActive('alpaca') && (
        <section id="alpaca" className="scroll-mt-24 space-y-8 animate-fade-in">
          <div className="border-b border-zinc-150 pb-5">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
              Broker 2 — US Equities
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 mt-3 sm:text-3xl">
              3. Alpaca — US Equities
            </h2>
            <p className="mt-2 text-sm text-zinc-500">
              Commission-free US equities trading with natively structured bracket orders.
            </p>
          </div>

          <div className="prose prose-zinc max-w-none text-zinc-600 space-y-6">
            <div id="alpaca-setup" className="scroll-mt-24 space-y-3">
              <h3 className="text-base font-bold text-zinc-900">3.1 Account setup</h3>
              <p className="text-sm">
                Sign up at <a href="https://alpaca.markets" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">alpaca.markets</a>. Paper trading is active instantly upon email confirmation. For live trading, South African users undergo the international KYC process, which requires uploading passport/ID and local residency declarations.
              </p>
            </div>

            <div id="alpaca-envs" className="scroll-mt-24 space-y-3">
              <h3 className="text-base font-bold text-zinc-900">3.2 Environments</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-zinc-50 border border-zinc-100">
                  <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider">Paper Environment Host</div>
                  <div className="text-sm font-mono font-semibold text-zinc-900 mt-1">paper-api.alpaca.markets</div>
                  <div className="text-[11px] font-mono text-zinc-400 mt-0.5">Data: data.alpaca.markets</div>
                </div>
                <div className="p-4 rounded-lg bg-zinc-950 text-white border border-zinc-900">
                  <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Live Trading Host</div>
                  <div className="text-sm font-mono font-semibold text-emerald-400 mt-1">api.alpaca.markets</div>
                  <div className="text-[11px] font-mono text-zinc-500 mt-0.5">Data: data.alpaca.markets</div>
                </div>
              </div>
            </div>

            <div id="alpaca-auth" className="scroll-mt-24 space-y-3">
              <h3 className="text-base font-bold text-zinc-900">3.3 Authentication</h3>
              <p className="text-sm">
                Alpaca uses unique header fields instead of standard Authorization Bearer schemas:
              </p>
              <pre className="bg-zinc-900 text-zinc-200 p-4 rounded-lg text-xs font-mono">
{`APCA-API-KEY-ID: <YOUR_KEY_ID>
APCA-API-SECRET-KEY: <YOUR_SECRET_KEY>`}
              </pre>
            </div>

            <div id="alpaca-endpoints" className="scroll-mt-24 space-y-3">
              <h3 className="text-base font-bold text-zinc-900">3.4 Core endpoints</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm list-none p-0">
                <li className="flex gap-2 items-start p-3 bg-white rounded-lg border border-zinc-150">
                  <span className="font-mono text-xs font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">GET</span>
                  <div>
                    <span className="font-mono font-medium text-zinc-900">/v2/account</span>
                    <p className="text-xs text-zinc-400 mt-0.5">Buying power, cash, equity values, and PDT checks.</p>
                  </div>
                </li>
                <li className="flex gap-2 items-start p-3 bg-white rounded-lg border border-zinc-150">
                  <span className="font-mono text-xs font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">GET</span>
                  <div>
                    <span className="font-mono font-medium text-zinc-900">/v2/stocks/&#123;symbol&#125;/bars</span>
                    <p className="text-xs text-zinc-400 mt-0.5">Historical candle bars for equity backtesting.</p>
                  </div>
                </li>
                <li className="flex gap-2 items-start p-3 bg-white rounded-lg border border-zinc-150">
                  <span className="font-mono text-xs font-semibold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">POST</span>
                  <div>
                    <span className="font-mono font-medium text-zinc-900">/v2/orders</span>
                    <p className="text-xs text-zinc-400 mt-0.5">Place standard or composite bracket orders.</p>
                  </div>
                </li>
                <li className="flex gap-2 items-start p-3 bg-white rounded-lg border border-zinc-150">
                  <span className="font-mono text-xs font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">GET</span>
                  <div>
                    <span className="font-mono font-medium text-zinc-900">/v2/positions</span>
                    <p className="text-xs text-zinc-400 mt-0.5">Read current open shareholdings & unrealized profit.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div id="alpaca-bracket" className="scroll-mt-24 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-zinc-900">3.5 Example: placing a bracket order</h3>
                <button 
                  onClick={() => onJumpToPlayground('alpaca', 'Place Bracket Order')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition"
                >
                  <Terminal className="h-3.5 w-3.5" />
                  Try in Playground
                  <ChevronRight className="h-3 w-3" />
                </button>
              </div>
              <p className="text-sm">
                Alpaca natively supports bracket orders (entry plus linked take profit limit and stop loss). This ensures safety rules execute server-side even during network disruption.
              </p>
              <pre className="bg-zinc-900 text-zinc-200 p-4 rounded-lg text-xs font-mono overflow-x-auto">
{`POST /v2/orders
Content-Type: application/json
APCA-API-KEY-ID: <YOUR_KEY_ID>
APCA-API-SECRET-KEY: <YOUR_SECRET_KEY>

{
  "symbol": "NVDA",
  "qty": "5",
  "side": "buy",
  "type": "market",
  "time_in_force": "day",
  "order_class": "bracket",
  "take_profit": { "limit_price": "145.00" },
  "stop_loss": { "stop_price": "122.00" }
}`}
              </pre>
            </div>

            {/* Pattern Day Trader Info Block */}
            <div id="alpaca-pdt" className="scroll-mt-24 p-5 rounded-xl border border-rose-200 bg-rose-50/40 text-rose-900 space-y-3">
              <div className="flex items-center gap-2.5 font-semibold text-rose-800">
                <ShieldAlert className="h-5 w-5 text-rose-600 shrink-0" />
                <span>Pattern Day Trading (PDT) Rule Alert</span>
              </div>
              <p className="text-sm leading-relaxed text-rose-800/90">
                FINRA and SEC rules restrict accounts under <strong className="text-rose-900 font-bold">$25,000</strong> in equity from executing more than <strong className="text-rose-900 font-bold">three day trades</strong> (entering and exiting the same security on the same day) within five business days.
              </p>
              <div className="text-xs bg-rose-100/50 p-3 rounded-lg font-mono text-rose-900/80">
                <strong>Safety Policy:</strong> This regulation applies strictly to live accounts, not paper trading. The TradeMind local risk engine must actively monitor day-trade metrics retrieved via <code className="text-rose-900 bg-rose-200/40 px-1 py-0.5 rounded font-mono font-medium">GET /v2/account</code> (checking field <code className="text-rose-900 bg-rose-200/40 px-1 py-0.5 rounded font-mono font-medium">daytrade_count</code>) to prevent automated account locks.
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. Binance */}
      {isSectionActive('binance') && (
        <section id="binance" className="scroll-mt-24 space-y-8 animate-fade-in">
          <div className="border-b border-zinc-150 pb-5">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
              Broker 3 — Cryptocurrencies
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 mt-3 sm:text-3xl">
              4. Binance — Cryptocurrency
            </h2>
            <p className="mt-2 text-sm text-zinc-500">
              High-throughput access to major crypto pairs with server-timestamped HMAC signatures.
            </p>
          </div>

          <div className="prose prose-zinc max-w-none text-zinc-600 space-y-6">
            <div id="binance-setup" className="scroll-mt-24 space-y-3">
              <h3 className="text-base font-bold text-zinc-900">4.1 Account setup</h3>
              <p className="text-sm">
                Register on <a href="https://binance.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">binance.com</a> and complete KYC (Identity Verification). In "API Management", generate a new API key pair. 
                <strong className="text-zinc-900 font-medium block mt-2">Critical Security Configuration:</strong>
                Configure the API Key restrictions to permit only "Enable Reading" and "Enable Spot Trading". <span className="text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded font-mono font-semibold">DO NOT</span> enable withdrawals on any automated trading keys.
              </p>
            </div>

            <div id="binance-envs" className="scroll-mt-24 space-y-3">
              <h3 className="text-base font-bold text-zinc-900">4.2 Environments</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-zinc-50 border border-zinc-100">
                  <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider">Spot Testnet Host</div>
                  <div className="text-sm font-mono font-semibold text-zinc-900 mt-1">testnet.binance.vision</div>
                  <div className="text-[11px] font-mono text-zinc-400 mt-0.5">Stream: testnet.binance.vision/ws</div>
                </div>
                <div className="p-4 rounded-lg bg-zinc-950 text-white border border-zinc-900">
                  <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Live Spot Host</div>
                  <div className="text-sm font-mono font-semibold text-emerald-400 mt-1">api.binance.com</div>
                  <div className="text-[11px] font-mono text-zinc-500 mt-0.5">Stream: stream.binance.com:9443/ws</div>
                </div>
              </div>
            </div>

            <div id="binance-auth" className="scroll-mt-24 space-y-3">
              <h3 className="text-base font-bold text-zinc-900">4.3 Authentication</h3>
              <p className="text-sm">
                Binance requires standard request signing using an <strong className="text-zinc-900 font-semibold">HMAC-SHA256</strong> algorithm. Every signed call must include a <code className="bg-zinc-100 px-1 py-0.5 rounded font-mono text-xs text-zinc-800">timestamp</code> (milliseconds, within 5 seconds of the Binance server clock) and a signature computed over the full sorted query string using your secret API key.
              </p>
              <pre className="bg-zinc-900 text-zinc-200 p-4 rounded-lg text-xs font-mono overflow-x-auto">
{`Header: X-MBX-APIKEY: <YOUR_API_KEY>

// 1. Prepare base query string:
symbol=BTCUSDT&side=BUY&type=MARKET&quantity=0.01&timestamp=1719700000000

// 2. Hash string with your API secret using HMAC-SHA256:
signature = HMAC_SHA256(secretKey, queryString)

// 3. Append signature as final parameter:
https://api.binance.com/api/v3/order?symbol=BTCUSDT&...&signature=computed_hash`}
              </pre>
            </div>

            <div id="binance-endpoints" className="scroll-mt-24 space-y-3">
              <h3 className="text-base font-bold text-zinc-900">4.4 Core endpoints</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm list-none p-0">
                <li className="flex gap-2 items-start p-3 bg-white rounded-lg border border-zinc-150">
                  <span className="font-mono text-xs font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">GET</span>
                  <div>
                    <span className="font-mono font-medium text-zinc-900">/api/v3/account (Signed)</span>
                    <p className="text-xs text-zinc-400 mt-0.5">Fetches real balances across all tokens.</p>
                  </div>
                </li>
                <li className="flex gap-2 items-start p-3 bg-white rounded-lg border border-zinc-150">
                  <span className="font-mono text-xs font-semibold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">POST</span>
                  <div>
                    <span className="font-mono font-medium text-zinc-900">/api/v3/order (Signed)</span>
                    <p className="text-xs text-zinc-400 mt-0.5">Submit immediate spot market buy/sell order.</p>
                  </div>
                </li>
                <li className="flex gap-2 items-start p-3 bg-white rounded-lg border border-zinc-150">
                  <span className="font-mono text-xs font-semibold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">POST</span>
                  <div>
                    <span className="font-mono font-medium text-zinc-900">/api/v3/order/oco (Signed)</span>
                    <p className="text-xs text-zinc-400 mt-0.5">One-Cancels-the-Other take profit and stop loss.</p>
                  </div>
                </li>
                <li className="flex gap-2 items-start p-3 bg-white rounded-lg border border-zinc-150">
                  <span className="font-mono text-xs font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">GET</span>
                  <div>
                    <span className="font-mono font-medium text-zinc-900">/api/v3/klines</span>
                    <p className="text-xs text-zinc-400 mt-0.5">Historical cryptocurrency candlestick data.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div id="binance-order" className="scroll-mt-24 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-zinc-900">4.5 Example: Spot entry & OCO protections</h3>
                <button 
                  onClick={() => onJumpToPlayground('binance', 'Place Spot Market Order')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition"
                >
                  <Terminal className="h-3.5 w-3.5" />
                  Try in Playground
                  <ChevronRight className="h-3 w-3" />
                </button>
              </div>
              <p className="text-sm">
                Unlike OANDA and Alpaca, Binance spot orders <strong className="text-zinc-900 font-medium">do not natively support attached bracket parameters</strong> in a single call. To protect long entries on BTCUSDT, the TradeMind wrapper must execute a multi-phase flow:
              </p>
              <div className="p-4 rounded-lg bg-zinc-50 border border-zinc-150 space-y-3 text-xs leading-relaxed text-zinc-600">
                <div className="flex items-center gap-2 text-zinc-900 font-semibold text-sm">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-200 text-[10px]">1</span>
                  <span>Place Market Purchase Order</span>
                </div>
                <pre className="bg-zinc-900 text-zinc-200 p-3 rounded font-mono overflow-x-auto text-[11px]">
{`POST /api/v3/order
Body: symbol=BTCUSDT&side=BUY&type=MARKET&quantity=0.01&timestamp=1719700000000&signature=...`}
                </pre>

                <div className="flex items-center gap-2 text-zinc-900 font-semibold text-sm pt-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-200 text-[10px]">2</span>
                  <span>Place Protection OCO Order (Upon fill confirmation)</span>
                </div>
                <p>
                  Execute an OCO order setting a stop-loss trigger price along with a target sell limit price:
                </p>
                <pre className="bg-zinc-900 text-zinc-200 p-3 rounded font-mono overflow-x-auto text-[11px]">
{`POST /api/v3/order/oco
Body: symbol=BTCUSDT&side=SELL&quantity=0.01&price=62500&stopPrice=58500&stopLimitPrice=58200&timestamp=1719700005000&signature=...`}
                </pre>
              </div>
            </div>

            {/* Binance Weight Rate Limits */}
            <div id="binance-limits" className="scroll-mt-24 p-4 rounded-lg border border-amber-200 bg-amber-50/50 flex gap-3">
              <Info className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-sm text-amber-900 space-y-1">
                <strong className="font-semibold">Binance Weight-Based Rate Limits</strong>
                <p className="leading-relaxed text-amber-800">
                  Binance restricts requests based on a cumulative "weight" scoring index, rather than flat counts. Exceeding weights returns a severe <code className="bg-amber-100 px-1 py-0.5 rounded font-mono text-amber-900 font-medium">HTTP 429</code>. Monitor the response header <code className="bg-amber-100 px-1 py-0.5 rounded font-mono text-amber-900 font-medium">X-MBX-USED-WEIGHT-1M</code> to back off dynamically before an IP ban occurs.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. Unified Execution Layer */}
      {isSectionActive('unified') && (
        <section id="unified" className="scroll-mt-24 space-y-8 animate-fade-in">
          <div className="border-b border-zinc-150 pb-5">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full">
              System Abstraction Wrapper
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 mt-3 sm:text-3xl">
              5. Building a Unified Execution Layer
            </h2>
            <p className="mt-2 text-sm text-zinc-500">
              Wrapping all three brokers under a common adapter pattern to decouple order decisions.
            </p>
          </div>

          <div className="prose prose-zinc max-w-none text-zinc-600 space-y-6">
            <div id="adapter-interface" className="scroll-mt-24 space-y-3">
              <h3 className="text-base font-bold text-zinc-900">5.1 The BrokerAdapter Interface</h3>
              <p className="text-sm">
                To isolate signal generation (Claude-powered signals) from individual brokers, write a TypeScript adapter interface:
              </p>
              <pre className="bg-zinc-900 text-zinc-200 p-4 rounded-lg text-xs font-mono overflow-x-auto">
{`interface BrokerAdapter {
  getBalance(): Promise<{ cash: number, equity: number }>;
  getPositions(): Promise<Position[]>;
  placeOrder(order: TradeMindOrder): Promise<OrderResult>;
  closePosition(symbol: string): Promise<OrderResult>;
}`}
              </pre>
            </div>

            <div id="routing-logic" className="scroll-mt-24 space-y-3">
              <h3 className="text-base font-bold text-zinc-900">5.2 Symbol Routing and Translation</h3>
              <p className="text-sm">
                A simple central router analyzes the symbol ticker pattern and automatically delegates the order parameters to the appropriate adapter instance:
              </p>
              <pre className="bg-zinc-900 text-zinc-200 p-4 rounded-lg text-xs font-mono overflow-x-auto">
{`function getAdapter(symbol: string): BrokerAdapter {
  // 1. Forex cross detection (e.g. "EUR/USD" or "USD/ZAR")
  if (symbol.includes('/') && isForexPair(symbol)) {
    return oandaAdapter;
  }
  
  // 2. Cryptocurrency matching (e.g. "BTCUSDT", "ETHUSDT")
  if (symbol.match(/^(BTC|ETH|XRP|SOL)/)) {
    return binanceAdapter;
  }
  
  // 3. Commodity CFDs (OANDA handles XAU/WTICO)
  if (symbol.match(/^(XAU|WTI|WTICO)/)) {
    return oandaAdapter;
  }
  
  // 4. Default to US Equities (Alpaca)
  return alpacaAdapter;
}`}
              </pre>
            </div>

            <div id="sec-creds" className="scroll-mt-24 space-y-3">
              <h3 className="text-base font-bold text-zinc-900">5.3 Secure Server-Side Credential Storage</h3>
              <p className="text-sm">
                All keys must live strictly on the server-side environment. The front-end interface simply speaks to local routing controllers.
              </p>
              <div className="p-4 rounded-lg bg-zinc-900 text-zinc-300 font-mono text-xs space-y-2">
                <span className="text-rose-400 font-semibold">// CRITICAL SECURITY STANDARD</span>
                <p className="text-zinc-400">
                  Do not leak keys. Prefix variables properly in production environments and declare them securely:
                </p>
                <div>OANDA_API_KEY=“api_secret...”</div>
                <div>APCA_API_KEY_ID=“ak_public_id...”</div>
                <div>BINANCE_API_SECRET=“hmac_secret_hash...”</div>
              </div>
            </div>

            {/* Circuit Breakers and Risk Engine */}
            <div id="circuits" className="scroll-mt-24 p-5 rounded-xl border border-zinc-200 bg-zinc-50 space-y-3">
              <div className="flex items-center gap-2.5 font-semibold text-zinc-900">
                <Zap className="h-5 w-5 text-indigo-600 shrink-0" />
                <span>Pre-Live Validation & Simulated Circuit Breakers</span>
              </div>
              <p className="text-sm leading-relaxed text-zinc-600">
                Before activating live capital, run the TradeMind risk engine (drawdown limits, maximum correlation weightings, target leverage metrics) against simulated environments across all three broker adapters concurrently for <strong className="text-zinc-900">at least two consecutive weeks</strong>.
              </p>
              <div className="text-xs text-zinc-500 font-medium leading-relaxed">
                Confirm that if any single adapter triggers an emergency drawdown limit or local exchange control halt, the unified safety loop immediately suspends or liquidates exposure across <strong className="text-zinc-700">all active adapters</strong>, preventing unhedged tail-risk.
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 6. Quick Reference Matrix */}
      {isSectionActive('matrix') && (
        <section id="matrix" className="scroll-mt-24 space-y-8 animate-fade-in">
          <div className="border-b border-zinc-150 pb-5">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-500 bg-zinc-50 px-2.5 py-1 rounded-full">
              Reference Specifications
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 mt-3 sm:text-3xl">
              6. Quick Reference Matrix
            </h2>
            <p className="mt-2 text-sm text-zinc-500">
              Fast comparison of broker environments, restrictions, and parameters.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white shadow-xs">
            <table className="min-w-full divide-y divide-zinc-100 text-left text-sm">
              <thead className="bg-zinc-50 text-xs font-mono text-zinc-500 uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-4 font-semibold">Broker Spec</th>
                  <th className="px-5 py-4 font-semibold">OANDA</th>
                  <th className="px-5 py-4 font-semibold">Alpaca</th>
                  <th className="px-5 py-4 font-semibold">Binance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-zinc-600">
                <tr>
                  <td className="px-5 py-4 font-medium text-zinc-900 bg-zinc-50/50">Primary Assets</td>
                  <td className="px-5 py-4">Forex, Commodity CFDs</td>
                  <td className="px-5 py-4">US Equities (NYSE, NASDAQ)</td>
                  <td className="px-5 py-4">Cryptocurrency (Spot/Futures)</td>
                </tr>
                <tr>
                  <td className="px-5 py-4 font-medium text-zinc-900 bg-zinc-50/50">Authentication Method</td>
                  <td className="px-5 py-4 font-mono text-xs">Bearer Token</td>
                  <td className="px-5 py-4 font-mono text-xs">APCA-API-KEY-ID</td>
                  <td className="px-5 py-4 font-mono text-xs">HMAC-SHA256 Signature</td>
                </tr>
                <tr>
                  <td className="px-5 py-4 font-medium text-zinc-900 bg-zinc-50/50">Bracket Orders</td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                      Yes (Native)
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                      Yes (Native)
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                      No (Requires OCO)
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-4 font-medium text-zinc-900 bg-zinc-50/50">South African Residency</td>
                  <td className="px-5 py-4 text-emerald-700">Supported directly</td>
                  <td className="px-5 py-4 text-zinc-600">Supported (via Int'l KYC)</td>
                  <td className="px-5 py-4 text-zinc-600">Supported (standard verification)</td>
                </tr>
                <tr>
                  <td className="px-5 py-4 font-medium text-zinc-900 bg-zinc-50/50">Optimal For TradeMind</td>
                  <td className="px-5 py-4 font-mono text-xs">EUR_USD, USD_ZAR, XAU_USD</td>
                  <td className="px-5 py-4 font-mono text-xs">NVDA, AAPL, MSFT, ETFs</td>
                  <td className="px-5 py-4 font-mono text-xs">BTCUSDT, ETHUSDT</td>
                </tr>
                <tr>
                  <td className="px-5 py-4 font-medium text-zinc-900 bg-zinc-50/50">Primary Safety Block</td>
                  <td className="px-5 py-4 text-xs">120 REST requests / sec</td>
                  <td className="px-5 py-4 text-xs text-rose-600">PDT Limits if Balance &lt; $25k</td>
                  <td className="px-5 py-4 text-xs text-amber-600">Weight limits (1200 / min)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="text-xs text-zinc-400 leading-relaxed border-t border-zinc-150 pt-5">
            <strong>Disclaimer:</strong> This specification table serves as an internal reference for NeuroGrowth Labs development environments. API schemas, regulatory bounds, leverage metrics, and service availability are subject to periodic changes by execution brokers. Verify current compliance mandates with compliance teams before deploying real capital.
          </div>
        </section>
      )}
    </div>
  );
};
