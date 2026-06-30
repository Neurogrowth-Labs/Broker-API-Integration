export type BrokerName = 'oanda' | 'alpaca' | 'binance';

export type CodeLanguage = 'typescript' | 'python' | 'curl';

export type OperationType = 'balance' | 'positions' | 'order' | 'stream';

export interface Section {
  id: string;
  title: string;
  subtitle?: string;
  subsections?: { id: string; title: string }[];
}

export interface ParameterConfig {
  name: string;
  label: string;
  type: 'string' | 'number' | 'select' | 'boolean';
  default: string | number | boolean;
  options?: string[];
  description: string;
}

export interface EndpointInfo {
  name: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  description: string;
  parameters: ParameterConfig[];
}

export interface RouterSimInput {
  symbol: string;
  quantity: number;
  orderType: 'MARKET' | 'LIMIT' | 'STOP' | 'BRACKET';
  side: 'BUY' | 'SELL';
  price?: number;
  stopLoss?: number;
  takeProfit?: number;
}

export interface LogEntry {
  timestamp: string;
  type: 'info' | 'success' | 'warn' | 'error';
  message: string;
}
