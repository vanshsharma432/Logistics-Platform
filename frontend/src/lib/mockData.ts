import {
  UleoEvent,
  NodeMetadata,
  TransitionCheckItem,
  ConsistencyComparison,
  IncidentContextInfo,
  RecoveryPathway,
  CustomerParcelInfo,
} from '../types/logistics';
import { Edge, Node } from '@xyflow/react';

// ==========================================
// 1. ULEO SEMANTIC TRANSLATION MOCK DATA
// ==========================================
export const initialUleoEvents: UleoEvent[] = [
  {
    id: 'uleo-101',
    timestamp: '14:22:10',
    legacySystem: 'SAP-WMS',
    legacyRawString: 'GOODS_ISSUE_POSTED 0089124_BIN_B4 LOC_GURGAON_WH',
    uleoEventName: 'FACILITY_DISPATCH_INITIATED',
    entityId: 'PARCEL#87',
    entityType: 'PARCEL',
    preConditions: 'INV_ALLOCATED == TRUE && DOCK_ASSIGNED == TRUE',
    postConditions: 'PHYSICAL_STATE = STAGED_FOR_LOAD',
    status: 'VALIDATED',
  },
  {
    id: 'uleo-102',
    timestamp: '14:23:45',
    legacySystem: 'Handheld-Scanner',
    legacyRawString: 'BARCODE_BEEP_OK [T12_BAY03_PKT_87] OP_ID_41',
    uleoEventName: 'LOAD_CONFIRMED',
    entityId: 'TRUCK_T12',
    entityType: 'VEHICLE',
    preConditions: 'VEHICLE_STATUS == DOCKED && WEIGHT_UNDER_MAX == TRUE',
    postConditions: 'CONTAINMENT_GRAPH: PARCEL#87 -> IS_INSIDE -> TRUCK_T12',
    status: 'VALIDATED',
  },
  {
    id: 'uleo-103',
    timestamp: '14:25:02',
    legacySystem: 'Oracle-TMS',
    legacyRawString: 'DISP_OUTBOUND_MANIFEST_TRUCK_T12_ROUTE_NH48',
    uleoEventName: 'PARCEL_DISPATCHED',
    entityId: 'TRUCK_T12',
    entityType: 'VEHICLE',
    preConditions: 'DRIVER_SHIFT_VALID == TRUE && MANIFEST_SEALED == TRUE',
    postConditions: 'STATE = IN_TRANSIT && SPEED_EXPECTED > 0',
    status: 'VALIDATED',
  },
  {
    id: 'uleo-104',
    timestamp: '14:27:18',
    legacySystem: 'Telematics-GPS',
    legacyRawString: 'SPEED_DROPPED_0_KMH_LAT_28.324_LON_76.982_TEMP_ERR',
    uleoEventName: 'TRANSIT_HAZARD_DETECTED',
    entityId: 'TRUCK_T12',
    entityType: 'VEHICLE',
    preConditions: 'STATE == IN_TRANSIT',
    postConditions: 'FLAG_INCIDENT = T12_ANOMALY && TRIGGER_INCIDENT_GRAPH',
    status: 'ANOMALY_CAUGHT',
  },
  {
    id: 'uleo-105',
    timestamp: '14:28:05',
    legacySystem: 'Shopify-Sync',
    legacyRawString: 'ORDER_FULFILLED_HOOK_RCV_P109_SHIPMENT_GEN',
    uleoEventName: 'ORDER_MANIFEST_REGISTERED',
    entityId: 'PARCEL#109',
    entityType: 'PARCEL',
    preConditions: 'PAYMENT_CAPTURED == TRUE',
    postConditions: 'DIGITAL_TWIN_NODE_CREATED',
    status: 'VALIDATED',
  },
  {
    id: 'uleo-106',
    timestamp: '14:29:40',
    legacySystem: 'Handheld-Scanner',
    legacyRawString: 'SCANNER_MISFIRE: DUP_DELIVERY_CONFIRM_PKT_87',
    uleoEventName: 'INVALID_STATE_TRANSITION',
    entityId: 'PARCEL#87',
    entityType: 'PARCEL',
    preConditions: 'PARCEL_STATE == IN_TRANSIT',
    postConditions: 'REJECTED: CANNOT_TRANSITION(IN_TRANSIT -> DELIVERED_WHILE_ON_HIGHWAY)',
    status: 'ANOMALY_CAUGHT',
  },
];

export const ontologyBlueprintMapping = {
  version: 'ULEO-v2.4-TruthEngine',
  coreEntities: [
    { name: 'PARCEL', attrs: ['parcelId', 'isColdChain', 'currentTemp', 'weightKg', 'slaDeadline'] },
    { name: 'VEHICLE', attrs: ['vehicleId', 'capacityKg', 'telemetryHealth', 'currentCoords', 'engineTemp'] },
    { name: 'DRIVER', attrs: ['driverId', 'hoursLoggedToday', 'maxShiftAllowanceHours', 'complianceStatus'] },
    { name: 'FACILITY', attrs: ['hubId', 'activeDocks', 'throughputPerHour', 'currentCongestionPct'] },
  ],
  relationships: [
    { rel: 'IS_INSIDE', from: 'PARCEL', to: 'VEHICLE', rule: 'Physical containment with load sensor verification' },
    { rel: 'ASSIGNED_TO', from: 'DRIVER', to: 'VEHICLE', rule: 'Operational duty check and biometric lock verification' },
    { rel: 'LOCATED_AT', from: 'VEHICLE', to: 'FACILITY', rule: 'Geofence proximity check <= 100 meters' },
    { rel: 'BOUND_FOR', from: 'PARCEL', to: 'FACILITY', rule: 'Dynamic routing post-condition check' },
  ],
  guardrails: [
    'No parcel can transition to DELIVERED without an end-mile driver geofence proximity pulse.',
    'No vehicle can depart if driver duty hours exceed 9.5 hours within rolling 24-hour cycle.',
    'Cold chain parcels flag an anomaly if onboard ambient sensors exceed +6°C for > 15 consecutive minutes.',
  ],
};

// ==========================================
// 2. DIGITAL TWIN GRAPH NODES & EDGES (React Flow)
// ==========================================
export const createGraphData = (scenario: string, isResolved: boolean) => {
  const isBreakdown = scenario === 'scenario-2' && !isResolved;
  const isImpossibleState = scenario === 'scenario-3';

  const nodes: Node[] = [
    // Center Truck T12
    {
      id: 'truck-t12',
      type: 'default',
      position: { x: 380, y: 220 },
      data: {
        label: isBreakdown ? '⚠️ Truck T12 (NH48 Stall)' : isResolved ? '✓ Truck T12 (Repaired / Standby)' : 'Truck T12 (In-Transit)',
        category: 'truck',
        status: isBreakdown ? 'anomaly' : isResolved ? 'normal' : 'in_transit',
        sub: 'Heavy Hauler • NH-48 KM 142',
        load: '132 Parcels (94% Cap)',
      },
      className: isBreakdown 
        ? 'border-2 border-red-500 bg-red-50 text-red-950 font-medium shadow-sm animate-subtle-pulse' 
        : isResolved
        ? 'border border-emerald-500 bg-emerald-50 text-emerald-950 font-medium shadow-sm'
        : 'border border-neutral-300 bg-white text-neutral-800 shadow-sm font-normal',
      style: { borderRadius: '8px', padding: '12px 16px', minWidth: '180px' },
    },
    // Backup Truck T08
    {
      id: 'truck-t08',
      type: 'default',
      position: { x: 680, y: 120 },
      data: {
        label: isResolved ? '⚡ Truck T08 (Active Recovery)' : 'Truck T08 (Rapid Standby)',
        category: 'truck',
        status: isResolved ? 'in_transit' : 'idle',
        sub: 'Manesar Hub • 14km away',
        load: isResolved ? 'Carrying Parcel #87' : 'Empty (Standby)',
      },
      className: isResolved
        ? 'border-2 border-emerald-500 bg-emerald-50 text-emerald-900 font-medium shadow-sm'
        : 'border border-dashed border-neutral-300 bg-neutral-50 text-neutral-600',
      style: { borderRadius: '8px', padding: '12px 16px', minWidth: '170px' },
    },
    // Parcel #87 (Cold Chain Critical)
    {
      id: 'parcel-87',
      type: 'default',
      position: { x: 100, y: 150 },
      data: {
        label: isImpossibleState 
          ? '🚫 Parcel #87 (Scanner Error)' 
          : isBreakdown 
          ? '⚠️ Parcel #87 (Cold Chain Alert)' 
          : 'Parcel #87 (Medicine Cold-Chain)',
        category: 'parcel',
        status: isImpossibleState || isBreakdown ? 'anomaly' : 'loaded',
        sub: 'Critical Oncology Vials (4.2°C)',
        load: 'Target: < 6°C',
      },
      className: (isBreakdown || isImpossibleState)
        ? 'border-2 border-red-500 bg-red-50 text-red-950 font-medium shadow-sm'
        : 'border border-neutral-300 bg-white text-neutral-800 shadow-sm',
      style: { borderRadius: '8px', padding: '12px 16px', minWidth: '180px' },
    },
    // Parcel #109 (Standard Electronics)
    {
      id: 'parcel-109',
      type: 'default',
      position: { x: 100, y: 290 },
      data: {
        label: isImpossibleState ? '⚠️ Parcel #109 (Mismatched State)' : 'Parcel #109 (Electronics)',
        category: 'parcel',
        status: isImpossibleState ? 'delayed' : 'loaded',
        sub: 'Tablet Computer • Priority 2',
        load: 'Standard Freight',
      },
      className: isImpossibleState 
        ? 'border-2 border-amber-500 bg-amber-50 text-amber-950 font-normal shadow-sm'
        : 'border border-neutral-300 bg-white text-neutral-800 shadow-sm',
      style: { borderRadius: '8px', padding: '12px 16px', minWidth: '170px' },
    },
    // Driver D-41
    {
      id: 'driver-d41',
      type: 'default',
      position: { x: 380, y: 50 },
      data: {
        label: 'Driver D-41 (Rajesh K.)',
        category: 'driver',
        status: isBreakdown ? 'delayed' : 'in_transit',
        sub: isBreakdown ? 'Shift: 8.8h (Limit Exceeded)' : 'Shift: 4.2h (Valid)',
        load: 'Duty Cycle Active',
      },
      className: isBreakdown 
        ? 'border border-amber-400 bg-amber-50 text-amber-950 shadow-sm'
        : 'border border-neutral-300 bg-white text-neutral-800 shadow-sm',
      style: { borderRadius: '8px', padding: '12px 16px', minWidth: '170px' },
    },
    // Destination Hub (Gurgaon Central Hub)
    {
      id: 'hub-gurgaon',
      type: 'default',
      position: { x: 680, y: 320 },
      data: {
        label: isBreakdown ? '⚠️ Gurgaon Central Hub (SLA Risk)' : 'Gurgaon Central Hub',
        category: 'hub',
        status: isBreakdown ? 'delayed' : 'normal',
        sub: 'Sorting Gateway North',
        load: isBreakdown ? 'Dock Congestion: 88%' : 'Dock Congestion: 42%',
      },
      className: isBreakdown 
        ? 'border border-amber-500 bg-amber-50 text-amber-900 shadow-sm' 
        : 'border border-neutral-300 bg-white text-neutral-800 shadow-sm',
      style: { borderRadius: '8px', padding: '12px 16px', minWidth: '180px' },
    },
    // Dock #3
    {
      id: 'dock-3',
      type: 'default',
      position: { x: 920, y: 180 },
      data: {
        label: 'Dock Bay #03 (Rapid Intake)',
        category: 'dock',
        status: 'normal',
        sub: 'Automated Unloading Active',
        load: 'Ready for Re-route',
      },
      className: 'border border-neutral-300 bg-white text-neutral-800 shadow-sm',
      style: { borderRadius: '8px', padding: '12px 16px', minWidth: '170px' },
    },
  ];

  const edges: Edge[] = [
    {
      id: 'e-p87-t12',
      source: 'parcel-87',
      target: isResolved ? 'truck-t08' : 'truck-t12',
      label: isResolved ? 'TRANSFERRED_TO' : 'IS_INSIDE',
      animated: isBreakdown || isResolved,
      style: {
        stroke: isBreakdown ? '#ef4444' : isResolved ? '#10b981' : '#64748b',
        strokeWidth: 2,
      },
      labelStyle: { fill: '#111827', fontSize: 10, fontWeight: 500 },
      labelBgStyle: { fill: '#ffffff', fillOpacity: 0.9, rx: 4, ry: 4 },
    },
    {
      id: 'e-p109-t12',
      source: 'parcel-109',
      target: 'truck-t12',
      label: 'IS_INSIDE',
      animated: false,
      style: { stroke: isBreakdown ? '#f59e0b' : '#64748b', strokeWidth: 1.5 },
      labelStyle: { fill: '#111827', fontSize: 10, fontWeight: 500 },
      labelBgStyle: { fill: '#ffffff', fillOpacity: 0.9, rx: 4, ry: 4 },
    },
    {
      id: 'e-d41-t12',
      source: 'driver-d41',
      target: 'truck-t12',
      label: 'ASSIGNED_TO',
      style: { stroke: '#64748b', strokeWidth: 1.5 },
      labelStyle: { fill: '#111827', fontSize: 10, fontWeight: 500 },
      labelBgStyle: { fill: '#ffffff', fillOpacity: 0.9, rx: 4, ry: 4 },
    },
    {
      id: 'e-t12-hub',
      source: 'truck-t12',
      target: 'hub-gurgaon',
      label: isBreakdown ? 'DELAYED_DESTINATION' : 'DISPATCHED_TO',
      animated: isBreakdown,
      style: {
        stroke: isBreakdown ? '#ef4444' : '#64748b',
        strokeWidth: isBreakdown ? 2.5 : 1.5,
        strokeDasharray: isBreakdown ? '5,5' : undefined,
      },
      labelStyle: { fill: '#111827', fontSize: 10, fontWeight: 500 },
      labelBgStyle: { fill: '#ffffff', fillOpacity: 0.9, rx: 4, ry: 4 },
    },
    {
      id: 'e-t08-dock',
      source: 'truck-t08',
      target: 'dock-3',
      label: 'STAGED_AT',
      style: { stroke: '#cbd5e1', strokeWidth: 1 },
      labelStyle: { fill: '#64748b', fontSize: 10 },
      labelBgStyle: { fill: '#ffffff', fillOpacity: 0.9, rx: 4, ry: 4 },
    },
  ];

  if (isResolved) {
    edges.push({
      id: 'e-t08-hub',
      source: 'truck-t08',
      target: 'hub-gurgaon',
      label: 'FAST_TRACK_DISPATCH',
      animated: true,
      style: { stroke: '#10b981', strokeWidth: 2 },
      labelStyle: { fill: '#065f46', fontSize: 10, fontWeight: 600 },
      labelBgStyle: { fill: '#ecfdf5', rx: 4, ry: 4 },
    });
  }

  return { nodes, edges };
};

// ==========================================
// 3. ACTIVE VALIDATION LOGGER MOCK DATA
// ==========================================
export const transitionCheckItems: TransitionCheckItem[] = [
  {
    id: 'tc-1',
    timestamp: '14:31:02',
    entityId: 'PARCEL#87',
    entityName: 'Oncology Medicine Vials (Temp-Sensitive)',
    attemptedTransition: 'DELIVERED -> LOADED',
    validLifecycles: ['ORDER_PLACED -> PACKED', 'PACKED -> LOADED', 'LOADED -> IN_TRANSIT', 'IN_TRANSIT -> OUT_FOR_DELIVERY', 'OUT_FOR_DELIVERY -> DELIVERED'],
    status: 'CRITICAL_ERROR',
    details: 'Impossible Transition DELIVERED -> LOADED detected on Parcel #87. Handheld scanner bug or duplicate physical barcode reuse flagged.',
    detectedRule: 'Rule #SM-04: Non-reversible Delivery Terminal State Invariance',
  },
  {
    id: 'tc-2',
    timestamp: '14:28:15',
    entityId: 'TRUCK_T12',
    entityName: 'NH48 Long-Haul Fleet Vehicle',
    attemptedTransition: 'DOCKED -> IN_TRANSIT',
    validLifecycles: ['IDLE -> DOCKED', 'DOCKED -> LOAD_VERIFIED', 'LOAD_VERIFIED -> DISPATCHED', 'DISPATCHED -> IN_TRANSIT'],
    status: 'VALID',
    details: 'Pre-flight checks passed: Driver shift verified, tire pressure verified, manifest signed.',
    detectedRule: 'Rule #SM-01: Valid Dispatch Lifecycle State Transition',
  },
  {
    id: 'tc-3',
    timestamp: '14:25:40',
    entityId: 'PARCEL#109',
    entityName: 'Consumer Electronics Carton',
    attemptedTransition: 'PACKED -> LOADED',
    validLifecycles: ['ORDER_PLACED -> PACKED', 'PACKED -> LOADED', 'LOADED -> IN_TRANSIT'],
    status: 'FLAGGED',
    details: 'Parcel marked LOADED into Truck T12 Bay 2, but vehicle telematics reported IDLE engine for 75 mins.',
    detectedRule: 'Rule #CE-12: Cross-Entity Temporal Consistency Verification',
  },
];

export const consistencyComparisons: ConsistencyComparison[] = [
  {
    id: 'cc-1',
    title: 'Parcel vs Carrier Vehicle Story Alignment',
    entityA: { label: 'Parcel #109', status: 'Loaded', code: 'STATUS: LOADED (Container Bay 2)' },
    entityB: { label: 'Truck T12', status: 'Idle', code: 'STATUS: IDLE (Engine Off, Dock Staged)' },
    conflictDescription: 'Mismatched Story: Story conflict flagged between loaded parcel and idle vehicle. Parcel story claims movement readiness while vehicle state is uncrewed.',
    isConflict: true,
    resolutionHint: 'Verify dock loader handheld batch scan before vehicle departure clearance.',
  },
  {
    id: 'cc-2',
    title: 'Driver Hours vs Vehicle Schedule Alignment',
    entityA: { label: 'Driver D-41', status: 'Shift Limit Reached', code: 'HOURS_LOGGED: 8.8h / 9.0h MAX' },
    entityB: { label: 'Route Leg 2', status: '3.5h Required', code: 'ESTIMATED_RUN: 210 mins to Hub' },
    conflictDescription: 'Compliance Breach Imminent: Driver will cross regulatory 9-hour limit mid-transit on expressway.',
    isConflict: true,
    resolutionHint: 'Trigger secondary driver handoff at KM 120 Rest Area or reroute to Manesar relay depot.',
  },
  {
    id: 'cc-3',
    title: 'Cold Chain Sensor vs Manifest Spec',
    entityA: { label: 'Temp Sensor S-88', status: 'Active (4.2°C)', code: 'TELEMETRY: 4.2°C ± 0.3°C' },
    entityB: { label: 'Manifest Spec #87', status: 'Required (2°C - 6°C)', code: 'ENVELOPE: 2.0°C to 6.0°C' },
    conflictDescription: 'Within acceptable thermal envelope. Thermal integrity certified.',
    isConflict: false,
    resolutionHint: 'Continue 60-second polling intervals.',
  },
];

// ==========================================
// 4. INCIDENT CONTEXT PANEL (5 CORE QUESTIONS)
// ==========================================
export const defaultIncidentContext: IncidentContextInfo = {
  incidentId: 'INC-2026-NH48-T12',
  title: 'Mid-Transit Breakdown & Thermal Vulnerability on NH48',
  severity: 'CRITICAL',
  timestamp: '14:27:18 IST',
  highwayLocation: 'NH48 Highway • KM 142 (Near Bilaspur Junction)',
  vehicleId: 'Truck T12 (MH-04-AB-8291)',
  q1WhatHappened: 'Truck T12 suffered an unexpected auxiliary cooling failure and engine overheating stall mid-transit on NH48 Highway at KM 142. Vehicle is completely immobilized on the outer shoulder.',
  q2WhyDidItHappen: 'AI Diagnostic Agent isolated root cause: An upstream 90-minute inventory delay at Jaipur outbound dock forced driver D-41 to speed and run cooling pumps at maximum duty. This caused an auxiliary radiator pipe crack while pushing driver shift limit past safe compliance.',
  q3WhoIsAffected: {
    totalParcels: 132,
    highPriorityItems: [
      'Parcel #87: Critical Oncology Cold-Chain Medicine (Temp threshold < 6°C)',
      'Parcel #34: Surgical Instruments for Fortis Gurgaon',
    ],
    affectedHubs: ['Gurgaon Primary Hub', 'Delhi South Distribution Node'],
    downstreamCustomersCount: 128,
  },
  q4WhatIfDoNothing: 'SLA collapse across 132 shipments. Without active intervention, onboard insulation will breach 6.0°C in 3 hours 45 minutes, destroying ₹8,50,000 worth of temperature-sensitive oncology vials, triggering a ₹2,50,000 regulatory penalty and severe reputation damage.',
  q5WhatShouldIDoFirst: 'Execute LangGraph Recovery Pathway Option B immediately: Divert standby Fleet Truck T08 from Manesar (14km away) to perform rapid thermal transshipment of high-priority cargo.',
  reconstructedTimeline: [
    { time: '10:15 AM', checkpoint: 'Jaipur Dock #2 Outbound Stage', verifiedState: 'Goods Issue verified by WMS barcode gate', source: 'SAP WMS' },
    { time: '11:45 AM', checkpoint: 'Jaipur Departure Toll Plaza', verifiedState: 'Truck T12 departure timestamped (90 min delay)', source: 'FASTag RFID' },
    { time: '13:10 PM', checkpoint: 'Shahpura Expressway Check', verifiedState: 'Vehicle speed 84 km/h, telemetry normal', source: 'CAN-Bus GPS' },
    { time: '14:05 PM', checkpoint: 'Engine Coolant Telemetry Spike', verifiedState: 'Coolant temperature jumped 82°C -> 106°C', source: 'Onboard Telematics', isDivergencePoint: true },
    { time: '14:27 PM', checkpoint: 'Full Vehicle Immobilization', verifiedState: 'Vehicle stalled KM 142, speed 0 km/h, hazard alert', source: 'ULEO Truth Engine' },
  ],
};

// ==========================================
// 5. RECOVERY SIMULATOR (DECISION SANDBOX)
// ==========================================
export const recoveryPathways: RecoveryPathway[] = [
  {
    id: 'opt-a',
    title: 'Option A: Open Backup Warehouse Dock',
    subtitle: 'Reroute to Manesar Regional Auxiliary Warehouse',
    description: 'Instruct tow-truck to haul T12 into Manesar Auxiliary Dock Bay #4 for complete offload and re-manifest.',
    delayImpact: '+2.0 Hours',
    costImpact: '₹5,000',
    slaProtection: 85,
    isRecommended: false,
    simulatedHubCongestion: [
      { hub: 'Manesar Aux Dock', baseline: 35, simulated: 78 },
      { hub: 'Gurgaon Hub', baseline: 60, simulated: 64 },
    ],
  },
  {
    id: 'opt-b',
    title: 'Option B: Divert Standby Fleet Truck T08',
    subtitle: 'Rapid Transshipment via Proximity Relay (AI Pick)',
    description: 'Dispatch empty refrigerated backup Truck T08 from Manesar depot directly to KM 142. Transship Parcel #87 and Priority-1 medicines within 25 minutes.',
    delayImpact: '+35 Mins',
    costImpact: '₹12,000',
    slaProtection: 98,
    isRecommended: true,
    simulatedHubCongestion: [
      { hub: 'Manesar Aux Dock', baseline: 35, simulated: 36 },
      { hub: 'Gurgaon Hub', baseline: 60, simulated: 68 },
    ],
  },
  {
    id: 'opt-c',
    title: 'Option C: Take No Action (Wait for Field Mechanic)',
    subtitle: 'Passive Repair Approach',
    description: 'Wait for highway assistance contractor to arrive at KM 142, diagnose engine failure, and attempt roadside radiator patch.',
    delayImpact: '+6.5 Hours',
    costImpact: '₹0 upfront',
    slaProtection: 40,
    isRecommended: false,
    simulatedHubCongestion: [
      { hub: 'Manesar Aux Dock', baseline: 35, simulated: 35 },
      { hub: 'Gurgaon Hub', baseline: 60, simulated: 95 },
    ],
  },
];

// ==========================================
// 6. CUSTOMER COPILOT MOCK DATA
// ==========================================
export const mockCustomerParcels: Record<string, CustomerParcelInfo> = {
  'PARCEL#87': {
    parcelId: 'PARCEL#87',
    trackingNumber: 'TRK-MED-87094-IN',
    recipientName: 'Dr. Sunita Rao (Fortis Oncology)',
    destination: 'Fortis Memorial Research Institute, Sector 44, Gurgaon',
    origin: 'Bio-Logistics Hub, Jaipur Bio-Park',
    cargoCategory: 'Critical LifeSciences Medicine (Cold-Chain)',
    isTemperatureSensitive: true,
    currentTemp: '4.2°C',
    targetTempRange: '2.0°C – 6.0°C',
    plainStatusTitle: 'Route Recalculated to Protect Cold-Chain Integrity',
    plainStatusBody: 'Your delivery has been delayed due to emergency route adjustments. New ETA is 5:15 PM (with 98% confidence).',
    whyCardExplanation: 'We detected an overheating hazard on our main fleet vehicle and diverted a backup truck to protect your temperature-sensitive cargo from thermal drift.',
    currentEta: '5:15 PM Today',
    confidenceScore: 98,
    currentStepIndex: 3, // In active recalculation
    isRecalculated: true,
    recalculatedReason: 'Autonomous Fleet Re-dispatch by AI Logistics Brain',
    selectedPivotOption: null,
  },
  'PARCEL#109': {
    parcelId: 'PARCEL#109',
    trackingNumber: 'TRK-ELEC-10942-IN',
    recipientName: 'Aarav Mehta',
    destination: 'DLF Phase 5, Golf Course Road, Gurgaon',
    origin: 'Jaipur Tech Logistics Hub',
    cargoCategory: 'Consumer Tech / Tablet Device',
    isTemperatureSensitive: false,
    plainStatusTitle: 'In Transit — Operating on High-Confidence Schedule',
    plainStatusBody: 'Your parcel is in transit. Next sorting scan scheduled at Gurgaon Central Node.',
    whyCardExplanation: 'All telemetry metrics healthy. Package routed via primary carrier network.',
    currentEta: '4:45 PM Today',
    confidenceScore: 95,
    currentStepIndex: 2,
    isRecalculated: false,
    selectedPivotOption: null,
  },
  'PARCEL#204': {
    parcelId: 'PARCEL#204',
    trackingNumber: 'TRK-AUTO-20419-IN',
    recipientName: 'Maruti Suzuki Supply Center',
    destination: 'Sector 18 Industrial Area, Gurgaon',
    origin: 'Neemrana Automotive Hub',
    cargoCategory: 'Automotive Precision Sensors',
    isTemperatureSensitive: false,
    plainStatusTitle: 'Order Packed & Staged for Dispatch',
    plainStatusBody: 'Vehicle loading verified. Scheduled to depart on afternoon dispatch cycle.',
    whyCardExplanation: 'Pre-flight manifest checks verified. Assigned to Feeder Vehicle T24.',
    currentEta: '7:30 PM Today',
    confidenceScore: 99,
    currentStepIndex: 1,
    isRecalculated: false,
    selectedPivotOption: null,
  },
};
