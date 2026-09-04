# Walkthrough: AI Logistics Truth Engine Frontend

The frontend for the **AI Logistics Truth Engine** (Decision Intelligence Platform & Incident Copilot) is fully implemented, verified, and operational on the local Vite dev server.

---

## 1. Design Aesthetic & Constraints Adherence

The UI strictly adheres to all specified visual principles inspired by the provided reference dashboards:
- **Color Scheme**: Minimal light mode with crisp neutral grays (`#ffffff`, `#f8f9fa`, `#f1f3f5`, `#111827`) and subtle alert indicators (emerald, amber, rose).
- **Typography & Font Weight**: Modern typography using *Plus Jakarta Sans* and *Inter* with light font weights (`font-extralight` 200, `font-light` 300, `font-normal` 400).
- **Strict Border Radius Limit**: Bounded to $\le 8\text{px}$ across all cards, badges, inputs, and buttons (`rounded-[6px]` and `rounded-[8px]`).
- **Collapsible Sidebar**: Left-hand navigation collapsible from 256px to 64px icon-only mode with smooth layout transitions and no canvas distortion.
- **Canvas Viewport Constraints**: The React Flow graph canvas is encapsulated inside a strict `h-[600px] overflow-hidden` wrapper.

---

## 2. Key Modules & Functional Architecture

```
frontend/src/
├── components/
│   ├── auth/
│   │   └── LoginModal.tsx           # Role-based auth gateway + 1-click quick demo buttons
│   ├── common/
│   │   ├── Header.tsx               # Scenario switcher, Reset Demo, Diagnostic toggle, role badge
│   │   ├── Sidebar.tsx              # Collapsible sidebar with 6 pillar subviews
│   │   └── StatusBadge.tsx          # Minimal status indicators
│   ├── customer/
│   │   ├── CustomerDashboard.tsx    # Customer Copilot container
│   │   ├── PlainLanguageStatus.tsx  # Proactive plain-language status + 'Why' Card
│   │   ├── ProgressTimeline.tsx     # State machine with dynamic active recalculation pulse
│   │   ├── PivotOptionPanel.tsx     # Self-service actions (Smart Locker, Neighbor, Reschedule)
│   │   └── ParcelInspector.tsx      # Cold-chain telemetry & tracking search
│   └── ops/
│       ├── OpsControlTower.tsx      # Master Ops container with subview router
│       ├── HealthHub.tsx            # Global Network Health Hub with SVG radial SLA gauge
│       ├── UleoStream.tsx           # Double-column live log feed (Legacy vs ULEO outputs)
│       ├── BlueprintDrawer.tsx      # Slide-over showing entities, relationships, guardrails
│       ├── DigitalTwinGraph.tsx     # React Flow canvas with interactive blast radius drill-down
│       ├── ValidationLogger.tsx     # Story Engine (Transition Checker & Cross-Entity Consistency)
│       ├── IncidentContext.tsx      # 5 Core Questions tab group + Operational Memory timeline
│       └── RecoverySimulator.tsx    # Decision Sandbox (Pathway cards, congestion chart, Approve & Execute)
├── context/
│   └── LogisticsContext.tsx         # Unified reactive state store
├── lib/
│   └── mockData.ts                  # Ground-truth datasets for all 3 scenarios
└── types/
    └── logistics.ts                 # Full TypeScript definitions
```

---

## 3. Features Implemented Mapped to the Hackathon Pillars

### 🔐 Authentication & Role Routing
- **Logic**: Any email ending with `@company.com` automatically logs in as **Operations Manager** into the `OpsControlTower`. All other emails log in as **Customer** into the `CustomerCopilot`.
- **Hackathon Quick Access**: Provided 1-click buttons on the login screen (`ops.director@company.com` and `dr.sunita@fortis.org`) for fast demo access.

---

### 📦 Customer Copilot (`CustomerDashboard.tsx`)
- **Proactive Plain-Language Status Bar**: Translates raw telematics into clear, reassuring English with a 98% confidence score.
- **The "Why" Card**: Empathetically explains: *"We detected an overheating hazard on our main fleet vehicle and diverted a backup truck to protect your temperature-sensitive cargo."*
- **Stakeholder Progress Timeline**: Displays verified state machine transitions (`Order Packed` $\rightarrow$ `Dispatched` $\rightarrow$ `In-Transit` $\rightarrow$ `Delivery Resolved`), featuring an animated **Active AI Recalculation** pulse proving upstream self-healing.
- **Contextual Self-Service Pivot Actions**: Customer can select:
  1. *Redirect shipment to nearest secure pickup parcel locker*
  2. *Authorize leaving with neighbor at No. 42*
  3. *Reschedule delivery slot for tomorrow morning*
  Selecting an option feeds back into the World Model and updates the field dispatch in real-time.

---

### 🎛️ Operations Control Tower (`OpsControlTower.tsx`)

#### 1. Global Network Health Hub (`HealthHub.tsx`)
- **Clustered Incident Counter**: Displays *"4 Active Crises"* clustered dynamically from 104 overnight alerts (96% alert noise reduction).
- **Radial SLA Danger Gauge**: SVG circular progress gauge displaying SLA health (drops to 62% during NH48 breakdown and recovers to 98.6% upon execution).
- **World Model Status**: Live counter showing *"1,450 Verified Nodes Online"* with physical network alignment.
- **Secondary KPI Bar**: Minimal cards for *Total active vehicles (8,234)*, *Daily deliveries (10,218)*, *Active docks (6/10)*, and *Dispatch ready (04)*.

#### 2. Semantic Translation Stream (`UleoStream.tsx` & `BlueprintDrawer.tsx`)
- **Double-Column Live Feed**:
  - **Left**: Raw, unformatted legacy strings (`"GOODS_ISSUE_POSTED 0089124"`, `"BARCODE_BEEP_OK"`, `"SPEED_DROPPED_0_KMH"`).
  - **Right**: Standardized ULEO outputs with green/red status tags (`FACILITY_DISPATCH_INITIATED`, `LOAD_CONFIRMED`, `TRANSIT_HAZARD_DETECTED`) with explicit pre/post-conditions.
- **Integration Blueprint Drawer**: Overlay showing Canonical Entities (`PARCEL`, `VEHICLE`, `DRIVER`, `FACILITY`), relational connectors (`IS_INSIDE`, `ASSIGNED_TO`, `LOCATED_AT`), and mathematical guardrails.

#### 3. Digital Twin Network Graph (`DigitalTwinGraph.tsx`)
- **React Flow Canvas**: Visualizes the Logistics Knowledge Graph (`Truck T12`, `Truck T08`, `Parcel #87`, `Parcel #109`, `Driver D-41`, `Gurgaon Central Hub`, `Dock #3`).
- **Color-Coded Statuses**: Green for Loaded/Staged, neutral for In-Transit, and pulsing red for anomalies.
- **Downstream Dependency Drill-Down**: Clicking `Truck T12` highlights its connected downstream blast radius on the canvas and loads the Entity Blast Radius panel on the right.

#### 4. Active Validation Logger (`ValidationLogger.tsx`)
- **Transition Checker**: Finite State Machine engine flags:
  `CRITICAL ERROR: Impossible Transition DELIVERED -> LOADED detected on Parcel #87. Scanner Bug / Duplicate ID flagged`.
- **Cross-Entity Consistency Monitor**: Compares parallel entity stories side-by-side:
  - *Parcel #109 Status: Loaded*
  - *Truck T12 Status: Idle*
  - *Prompt: Mismatched Story conflict flagged between loaded parcel and idle vehicle.*

#### 5. Incident Context Panel (`IncidentContext.tsx`)
- **5 Core Questions**:
  1. *What happened?* $\rightarrow$ Truck T12 breakdown & thermal hazard on NH48 KM 142.
  2. *Why did it happen?* $\rightarrow$ AI Diagnostic Agent identifies upstream inventory sorting delay that overloaded driver shift limits.
  3. *Who is affected?* $\rightarrow$ 132 parcels delayed, 2 cold-chain oncology medicine shipments at risk.
  4. *What if we do nothing?* $\rightarrow$ SLA collapse, medicine spoilage within 3h 45m.
  5. *What should I do first?* $\rightarrow$ Direct jump to Decision Sandbox.
- **Operational Memory Timeline**: Reconstructed 5-point verification chain pinpointing the divergence point at 14:05 PM.

#### 6. Recovery Simulator (`RecoverySimulator.tsx`)
- **Comparative Pathway Cards**:
  - *Option A*: Open Backup Warehouse Dock (+2.0h delay, ₹5,000 cost, 85% SLA)
  - *Option B (Recommended)*: Divert Standby Fleet Truck T08 (+35m delay, ₹12,000 cost, 98% SLA)
  - *Option C*: Take No Action (+6.5h delay, ₹0 cost, 40% SLA)
- **Simulate Future Visualizer**: Downstream sorting hub congestion prediction bars.
- **"Approve & Execute Pathway" Action**:
  - Updates global `isResolved` state to `true`.
  - Recovers SLA Danger Gauge from 62% to 98.6%.
  - Clears active crisis state.
  - Propagates resolution to Customer timeline (`Parcel #87` step becomes "Delivery Resolved via Diverted Fleet Truck T08").

---

### 🕹️ Hackathon Controls
- **Scenario Selector Dropdown**:
  1. *Scenario 1: Baseline* (Normal operations, 0 crises, 99.4% SLA).
  2. *Scenario 2: NH48 Truck Breakdown* (4 crises, pulsing red alert nodes, cold-chain danger).
  3. *Scenario 3: Impossible State Transition* (Scanner anomaly, cross-entity mismatch).
- **Reset Demo Button**: Resets all modified state back to initial default values instantly without reloading the browser.

---

## 4. Verification Results

1. **Production Bundle Verification**:
   - `npm run build` completed successfully (`dist/` generated with zero TypeScript or bundling errors).
2. **Local Dev Server Execution**:
   - Vite dev server running cleanly on `http://127.0.0.1:5173/`.
   - Verified HTTP 200 status and client runtime module delivery.
