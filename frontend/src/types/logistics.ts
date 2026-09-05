export type UserRole = 'OPERATIONS_MANAGER' | 'CUSTOMER';

export type DemoScenario = 'scenario-1' | 'scenario-2' | 'scenario-3';

export type SubView = 
  | 'health_hub' 
  | 'pillar_1'
  | 'pillar_2'
  | 'pillar_3'
  | 'pillar_4'
  | 'uleo_stream' 
  | 'digital_twin' 
  | 'validation_logger' 
  | 'incident_context' 
  | 'recovery_simulator';

export interface UleoEvent {
  id: string;
  timestamp: string;
  legacySystem: 'SAP-WMS' | 'Oracle-TMS' | 'Telematics-GPS' | 'Handheld-Scanner' | 'Shopify-Sync';
  legacyRawString: string;
  uleoEventName: string;
  entityId: string;
  entityType: 'PARCEL' | 'VEHICLE' | 'DRIVER' | 'FACILITY';
  preConditions: string;
  postConditions: string;
  status: 'VALIDATED' | 'ANOMALY_CAUGHT' | 'PENDING';
}

export interface NodeMetadata {
  id: string;
  name: string;
  category: 'parcel' | 'truck' | 'driver' | 'hub' | 'dock';
  status: 'packed' | 'loaded' | 'in_transit' | 'delayed' | 'anomaly' | 'idle';
  loadFactor?: string;
  eta?: string;
  driver?: string;
  temperature?: string;
  location?: string;
  subDescription?: string;
  downstreamIds: string[];
}

export interface TransitionCheckItem {
  id: string;
  timestamp: string;
  entityId: string;
  entityName: string;
  attemptedTransition: string;
  validLifecycles: string[];
  status: 'VALID' | 'CRITICAL_ERROR' | 'FLAGGED';
  details: string;
  detectedRule: string;
}

export interface ConsistencyComparison {
  id: string;
  title: string;
  entityA: { label: string; status: string; code: string };
  entityB: { label: string; status: string; code: string };
  conflictDescription: string;
  isConflict: boolean;
  resolutionHint: string;
}

export interface IncidentContextInfo {
  incidentId: string;
  title: string;
  severity: 'CRITICAL' | 'WARNING' | 'RESOLVED';
  timestamp: string;
  highwayLocation: string;
  vehicleId: string;
  q1WhatHappened: string;
  q2WhyDidItHappen: string;
  q3WhoIsAffected: {
    totalParcels: number;
    highPriorityItems: string[];
    affectedHubs: string[];
    downstreamCustomersCount: number;
  };
  q4WhatIfDoNothing: string;
  q5WhatShouldIDoFirst: string;
  reconstructedTimeline: {
    time: string;
    checkpoint: string;
    verifiedState: string;
    source: string;
    isDivergencePoint?: boolean;
  }[];
}

export interface RecoveryPathway {
  id: 'opt-a' | 'opt-b' | 'opt-c';
  title: string;
  subtitle: string;
  description: string;
  delayImpact: string;
  costImpact: string;
  slaProtection: number;
  isRecommended: boolean;
  simulatedHubCongestion: { hub: string; baseline: number; simulated: number }[];
}

export interface CustomerParcelInfo {
  parcelId: string;
  trackingNumber: string;
  recipientName: string;
  destination: string;
  origin: string;
  cargoCategory: string;
  isTemperatureSensitive: boolean;
  currentTemp?: string;
  targetTempRange?: string;
  plainStatusTitle: string;
  plainStatusBody: string;
  whyCardExplanation: string;
  currentEta: string;
  confidenceScore: number;
  currentStepIndex: number; // 0: Packed, 1: Dispatched, 2: In-Transit, 3: Active AI Recalculation, 4: Delivery Resolved
  isRecalculated: boolean;
  recalculatedReason?: string;
  selectedPivotOption?: string | null;
}
