
import { Transaction, TransactionType, MonthlyMetric, Account, Organization, Partner, Loan, Budget, Contractor, AutomationRule, Invoice } from './types';

export const MOCK_ORGS: Organization[] = [
  { id: 'org_hab', name: 'ООО "ХАБТОРГСТРОЙ"', type: 'OOO', inn: '2724933904', color: '#0A84FF' },
  { id: 'org_ino', name: 'ООО "ИНОВАЦИИ ДВ"', type: 'OOO', inn: '2721253788', color: '#30D158' },
  { id: 'org_riv', name: 'ООО "РИВЕР СТРОЙ"', type: 'OOO', inn: '2720063470', color: '#FF9F0A' },
  { id: 'org_nt', name: 'ООО "НОВЫЕ ТЕХНОЛОГИИ"', type: 'OOO', inn: '2700008062', color: '#BF5AF2' },
  { id: 'org_pers', name: 'ИП Яхно (Личное)', type: 'IP', inn: '272385600753', color: '#FF453A' },
];

export const MOCK_ACCOUNTS: Account[] = [
  { id: 'acc_hab_ab', orgId: 'org_hab', name: 'ХАБТОРГСТРОЙ Альфа', balance: 1450200, currency: '₽', type: 'bank', ledger: 'white', integrationStatus: 'connected', lastSync: '3 мин. назад' },
  { id: 'acc_ino_sb', orgId: 'org_ino', name: 'ИНОВАЦИИ ДВ Сбер', balance: 8420000, currency: '₽', type: 'bank', ledger: 'white', integrationStatus: 'connected', lastSync: '12 мин. назад' },
  { id: 'acc_riv_sb', orgId: 'org_riv', name: 'РИВЕР СТРОЙ Сбер', balance: 19000000, currency: '₽', type: 'bank', ledger: 'white', integrationStatus: 'connected', lastSync: '1 час назад' },
  { id: 'acc_nt_sb', orgId: 'org_nt', name: 'НОВЫЕ ТЕХНОЛОГИИ Сбер', balance: 3500000, currency: '₽', type: 'bank', ledger: 'white', integrationStatus: 'connected' },
  { id: 'acc_vtb', orgId: 'org_pers', name: 'Яхно ВТБ Карта', balance: 750000, currency: '₽', type: 'card', ledger: 'black' },
  { id: 'acc_tbank', orgId: 'org_pers', name: 'ТБанк *0116', balance: 120000, currency: '₽', type: 'bank', ledger: 'white' },
];

export const MOCK_INVOICES: Invoice[] = [
  { id: 'inv_1', contractorId: 'c2', amount: 450000, currency: '₽', dueDate: '2026-05-25', status: 'unpaid', description: 'Поставка продуктов Q2 (ООО ОПТИМУМХОЛОД)' },
  { id: 'inv_2', contractorId: 'c1', amount: 125000, currency: '₽', dueDate: '2026-05-28', status: 'unpaid', description: 'Аренда спецтехники за май' },
  { id: 'inv_3', contractorId: 'c3', amount: 85000, currency: '₽', dueDate: '2026-05-20', status: 'paid', description: 'Услуги охраны' },
];

export const MOCK_PARTNERS: Partner[] = [
  { id: 'p1', name: 'Яхно С.В.', share: 100, capitalContributed: 25000000, withdrawableDividends: 4500000 },
];

export const CATEGORIES = [
  'Выручка эквайринг', 'Аренда земли', 'Заработная плата', 'Возврат займа', 'Оплата поставщику', 'Комиссия банка', 'Налоги', 'Проценты на остаток', 'Транспортные расходы'
];

export const MOCK_METRICS: MonthlyMetric[] = [
  { month: 'Окт 26', revenue: 18500000, expenses: 14200000, profit: 4300000, cashFlow: 1200000 },
  { month: 'Ноя 26', revenue: 19200000, expenses: 15100000, profit: 4100000, cashFlow: 850000 },
  { month: 'Дек 26', revenue: 24500000, expenses: 18400000, profit: 6100000, cashFlow: 2100000 },
  { month: 'Янв 27', revenue: 15400000, expenses: 12800000, profit: 2600000, cashFlow: -400000 },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 't1', date: '2026-12-19', amount: 7444.82, currency: '₽', type: TransactionType.EXPENSE, category: 'Аренда земли', description: 'Аренда земли с ДМС, договор 786 (Продсеть ТДА)', account: 'ХАБТОРГСТРОЙ АБ', orgId: 'org_hab', status: 'completed', activityType: 'operating' },
  { id: 't2', date: '2026-02-13', amount: 4192.90, currency: '₽', type: TransactionType.INCOME, category: 'Выручка эквайринг', description: 'Зачисление средств по операциям эквайринга. Ломоносова 20', account: 'ИНОВАЦИИ ДВ СБ', orgId: 'org_ino', status: 'completed', activityType: 'operating' },
  { id: 't3', date: '2026-02-13', amount: 19000000, currency: '₽', type: TransactionType.INCOME, category: 'Возврат займа', description: 'Возврат депозита по договору 9070794342.00', account: 'РИВЕР СТРОЙ СБ', orgId: 'org_riv', status: 'completed', activityType: 'financial' },
  { id: 't4', date: '2026-02-12', amount: 80000, currency: '₽', type: TransactionType.EXPENSE, category: 'Оплата поставщику', description: 'Оплата Южакову Я.А. за демонтаж плитки (Чита Казармы)', account: 'НОВЫЕ ТЕХНОЛОГИИ СБ', orgId: 'org_nt', status: 'completed', activityType: 'operating' },
  { id: 't5', date: '2026-02-11', amount: 13000000, currency: '₽', type: TransactionType.INCOME, category: 'Оплата покупателя', description: 'Труба стальная. Контракт № убп-18 (ФКУ ОСК ВВО)', account: 'РИВЕР СТРОЙ СБ', orgId: 'org_riv', status: 'completed', activityType: 'operating' },
  { id: 't6', date: '2026-02-10', amount: 8157.50, currency: '₽', type: TransactionType.EXPENSE, category: 'Заработная плата', description: 'Выплата зп за 2 пол. января (Сычева Л.В.)', account: 'ХАБТОРГСТРОЙ АБ', orgId: 'org_hab', status: 'completed', activityType: 'operating' },
];

export const MOCK_PROJECTS = [
  { id: 'p1', name: 'Школы (Питание)', client: 'Департамент Образования', status: 'active', revenue: 12000000, expenses: 8500000, deadline: '31.12.2026' },
  { id: 'p2', name: 'Чита Казармы (Ремонт)', client: 'ФКУ ОСК ВВО', status: 'active', revenue: 6200000, expenses: 4800000, deadline: '15.03.2026' },
  { id: 'p3', name: 'Киоски (Аренда)', client: 'Муниципальная собственность', status: 'active', revenue: 4500000, expenses: 1200000, deadline: '01.01.2027' },
];

export const MOCK_LOANS: Loan[] = [
  { id: 'l1', orgId: 'org_riv', name: 'Депозит / Займ', bankName: 'Сбербанк', totalAmount: 19000000, remainingAmount: 0, monthlyPayment: 0, interestRate: 16, endDate: '2026-02-13', status: 'closed' },
];

export const MOCK_BUDGET: Budget[] = [
  { id: 'b1', orgId: 'org_ino', category: 'Закупка продуктов', plannedAmount: 5000000, actualAmount: 5400000, period: '2026-02' },
  { id: 'b2', orgId: 'org_hab', category: 'Аренда земли', plannedAmount: 150000, actualAmount: 148500, period: '2026-02' },
];

export const MOCK_RULES: AutomationRule[] = [
  { id: 'r1', name: 'DMS Khabarovsk -> Аренда', condition: { textContains: 'ДМС' }, action: { category: 'Аренда земли' }, priority: 1, isActive: true, usageCount: 154 },
  { id: 'r2', name: 'Эквайринг -> Выручка', condition: { textContains: 'эквайринга' }, action: { category: 'Выручка эквайринг' }, priority: 2, isActive: true, usageCount: 890 },
];

export const MOCK_CONTRACTORS: Contractor[] = [
  { id: 'c1', name: 'УФК по Хабаровскому краю', totalVolume: 1250000 },
  { id: 'c2', name: 'ООО "ОПТИМУМХОЛОД"', totalVolume: 4500000 },
  { id: 'c3', name: 'МАОУ "АКАДЕМИЧЕСКИЙ ЛИЦЕЙ"', totalVolume: 850000 },
];

export const ADMIN_USERS = [
  { id: 'u1', companyName: 'Холдинг Яхно', email: 'director@holding.ru', plan: 'Sovereign', status: 'active', totalPaid: 1250000 },
];
