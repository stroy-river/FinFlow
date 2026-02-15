
import { GoogleGenAI } from "@google/genai";
import { Transaction, MonthlyMetric, Loan, Budget, Account } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const MODEL_NAME = 'gemini-3-pro-preview';
const THINKING_BUDGET = 32768;

/**
 * Core Intelligence Engine: Silicon Valley Logic
 * Optimized for complex multi-entity reasoning.
 */
export const analyzeFinances = async (
  metrics: MonthlyMetric[],
  transactions: Transaction[],
  loans: Loan[],
  budgets: Budget[],
  query: string,
  useThinking: boolean = true,
  accounts?: Account[]
): Promise<string> => {
  const dataContext = {
    holding: {
      entities: ["ООО ХАБТОРГСТРОЙ", "ООО ИНОВАЦИИ ДВ", "ООО РИВЕР СТРОЙ", "ООО НОВЫЕ ТЕХНОЛОГИИ", "ИП Яхно"],
      base_currency: "RUB",
      treasury: accounts,
    },
    history: metrics,
    recent_ledger: transactions.slice(0, 50),
    debts: loans,
    planned_budgets: budgets,
    timestamp: new Date().toISOString(),
    system_version: "26.5.0-quantum-thinker"
  };

  const systemInstruction = `
    You are the Sovereign Neural CFO of a 100k-scale financial platform. 
    You have been designed to handle massive complex data structures.

    OPERATIONAL PROTOCOLS:
    1. DEEP REASONING: Use your internal thinking budget to simulate 5-10 different financial outcomes before answering.
    2. INTER-COMPANY AUDIT: Always look for transactions between entities (Elimination) to find the 'True Net Profit'.
    3. ANOMALY DETECTION: Flag patterns that humans miss (e.g., incremental cost creeping, seasonal tax leakage).
    4. ACTIONABLE ADVICE: Do not just summarize; give 3 precise, high-leverage steps for the CEO.

    TONE: Direct, highly analytical, visionary.
    
    IMPORTANT: You have 32,768 tokens for thinking. Use them to verify every tax assumption and inter-company offset.
  `;

  // Note: maxOutputTokens is intentionally omitted as per requirements to prioritize thinking.
  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: { 
      parts: [{ text: `DATA_SNAPSHOT: ${JSON.stringify(dataContext)}\n\nUSER_COMMAND: ${query}` }] 
    },
    config: {
      systemInstruction: systemInstruction,
      thinkingConfig: { 
        thinkingBudget: useThinking ? THINKING_BUDGET : 0 
      }
    },
  });
  
  return response.text || "Neural core synchronization failed. Simulation aborted.";
};

/**
 * Advanced Matching Logic for Accountants.
 * Analyzes transaction description against historical data and bills.
 */
export const suggestMatching = async (
  transaction: Transaction,
  history: Transaction[]
): Promise<string> => {
  const query = `Analyze this raw transaction: "${transaction.description}" of ${transaction.amount} ${transaction.currency}. 
  Compare with historical patterns. Recommend the most likely category and project. 
  Explain your reasoning using internal logic tokens.`;
  
  return analyzeFinances([], history, [], [], query, true);
};

export const runScenarioSimulation = async (
  scenario: string,
  transactions: Transaction[],
  accounts: Account[]
): Promise<string> => {
  const query = `RUN COMPLEX SIMULATION: ${scenario}. 
  Calculate impact on Consolidated EBITDA, Runway, and Net Liquidity for all 5 entities. 
  Account for inter-company debt cancellation.`;
  return analyzeFinances([], transactions, [], [], query, true, accounts);
};

export const getDailyBriefing = async (
  metrics: MonthlyMetric[],
  accounts: Account[],
  transactions: Transaction[]
): Promise<string> => {
  const query = "Run autonomous global holding audit. Find the 'Invisible Problem' (the one thing that could crash the company in 6 months but isn't obvious now). Focus on capital velocity.";
  return analyzeFinances(metrics, transactions, [], [], query, true, accounts);
};

export const getDeepReportAudit = async (
  reportType: 'P&L' | 'DDS' | 'Balance',
  data: any,
  transactions: Transaction[]
): Promise<string> => {
  const query = `DEEP QUANTUM AUDIT ${reportType}. Identify accounting anomalies, inter-company inflation, and structural debt traps.`;
  return analyzeFinances([], transactions, [], [], query, true);
};

export const getCashFlowForecast = async (
  transactions: Transaction[],
  accounts: Account[]
): Promise<string> => {
  const query = "Generate a 180-day hyper-forecast. Identify the exact day of peak risk. Suggest tactical movements (e.g., move funds to USDT, delay specific payrolls, or accelerate contractor invoicing).";
  return analyzeFinances([], transactions, [], [], query, true, accounts);
};
