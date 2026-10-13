export interface NodeEntity {
  id: string;
  label: string;
  type: 'initiator' | 'mule' | 'shadow_wallet' | 'layering' | 'terminal_merchant' | 'clean_payroll' | 'verified_vendor';
  roleTitle: string;
  riskScore: number;
  riskStatus: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'CLEAN';
  bank: string;
  location: string;
  ipAddress: string;
  isVpn: boolean;
  kycStatus: 'Verified' | 'Unverified' | 'Forged/Proxy' | 'High-Risk Tier';
  coordinates: { x: number; y: number };
  inflow: string;
  outflow: string;
  flags: string[];
  isFrozen?: boolean;
}

export interface FlowEdge {
  id: string;
  from: string;
  to: string;
  amount: string;
  rawAmount: number;
  timestamp: string;
  label: string;
  type: 'suspicious' | 'clean';
  hopNumber?: number;
  protocol: string;
}

export interface TransactionRecord {
  id: string;
  sender: string;
  senderName: string;
  receiver: string;
  receiverName: string;
  amount: string;
  rawAmount: number;
  timestamp: string;
  rail: string;
  riskScore: number;
  status: 'Suspicious' | 'Flagged' | 'Under Review' | 'Cleared' | 'Frozen';
  ip: string;
  notes: string;
  chainId?: string;
}

export interface SuspiciousChain {
  id: string;
  originEntity: string;
  hops: number;
  aggregateTraced: string;
  riskIndex: number;
  primaryTypology: string;
  threatStatus: 'CRITICAL RISK' | 'HIGH RISK' | 'MEDIUM RISK' | 'LOW RISK';
  status: 'ACTIVE' | 'FROZEN' | 'UNDER_SURVEILLANCE';
  entities: string[];
}

export interface RiskFactor {
  title: string;
  score: number;
  description: string;
  category: string;
  impactLevel: 'CRITICAL IMPACT' | 'ELEVATED RISK' | 'HIGH VELOCITY' | 'ANOMALOUS ACTIVITY' | 'KNOWN THREAT NODE';
  triggerMeta: string;
  icon: string;
}

export interface TimelineHop {
  time: string;
  hopLabel: string;
  sender: string;
  receiver: string;
  amount: string;
  description: string;
  txnRef: string;
  hub: string;
  velocityLabel: string;
  velocityHighlight?: boolean;
}
