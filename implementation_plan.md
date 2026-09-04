# Implementation Plan - AI Logistics Truth Engine (Decision Intelligence & Incident Copilot)

Build a clean, high-performance, light-mode frontend for the **AI Logistics Truth Engine** hackathon project. The platform functions as a "Flight Control System" and continuous network-level intelligence layer, orchestrating AI agents over a verified World Model.

## User Review Required

> [!IMPORTANT]
> - **Design Aesthetic**: Light mode, minimal, non-futuristic, crisp black and white / neutral gray aesthetic inspired by the provided reference dashboards. Low font weight (200-400), cards and buttons border-radius $\le$ 8px (`rounded-[8px]`), collapsible sidebar, and responsive layout.
> - **Zero Backend / Mocked Data**: All state (ULEO event streams, digital twin graph nodes, incident context, decision simulator, and customer tracking) is managed in a reactive mock store with scenario switching and instant reset.
> - **Graph Canvas**: Built with `@xyflow/react` (React Flow) inside strict `h-[600px] overflow-hidden` viewports to guarantee rock-solid layout geometry across sidebar expansions.

## Proposed Architecture & Structure

```
frontend/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── types/
│   │   └── logistics.ts              # Type definitions for nodes, events, incidents, recovery options
│   ├── context/
│   │   └── LogisticsContext.tsx      # Global state: active scenario, current role, resolved state, selected node, search query
│   ├── lib/
│   │   └── mockData.ts               # Mock datasets for Scenarios 1, 2, 3, ULEO streams, graph nodes/edges, 5-question context
│   └── components/
│       ├── common/
│       │   ├── Header.tsx            # Global top bar: Branding, Scenario Selector, Reset Demo, Role badge, Logout
│       │   ├── Sidebar.tsx           # Collapsible minimal sidebar with smooth icon/label transitions
│       │   └── StatusBadge.tsx       # Standardized minimal status badges (<= 8px radius)
│       ├── auth/
│       │   └── LoginModal.tsx        # Minimal login screen with @company.com role routing & 1-click demo buttons
│       ├── customer/
│       │   ├── CustomerDashboard.tsx # Customer Copilot main container
│       │   ├── PlainLanguageStatus.tsx# Empathetic status bar & "Why" card
│       │   ├── ProgressTimeline.tsx  # Validated state machine timeline with "active recalculation" icon
│       │   ├── PivotOptionPanel.tsx  # Self-service redirection/reschedule actions
│       │   └── ParcelInspector.tsx   # Live telemetry (temperature, route, cargo type)
│       └── ops/
│           ├── OpsControlTower.tsx   # Operations Control Tower main container
│           ├── HealthHub.tsx         # Global Network Health Hub (Incident counter, SLA radial gauge, World Model counter)
│           ├── UleoStream.tsx        # Semantic Translation Stream (Legacy vs ULEO outputs) + Integration Blueprint Drawer
│           ├── DigitalTwinGraph.tsx  # React Flow canvas (IS_INSIDE, LOCATED_AT, node states, downstream chain highlight)
│           ├── ValidationLogger.tsx  # Active Validation Logger (Transition checker, cross-entity consistency monitor)
│           ├── IncidentContext.tsx   # Incident Context Builder (5 Core Questions tab group + operational memory timeline)
│           └── RecoverySimulator.tsx # Decision Sandbox (Pathway cards, future congestion visualizer, Approve & Execute)
```

---

## Proposed Changes

### 1. Project Initialization & Dependencies
- Scaffold Vite + React + TypeScript in `./frontend`.
- Install dependencies:
  - `tailwindcss`, `postcss`, `autoprefixer`
  - `lucide-react` (clean minimal icon pack)
  - `@xyflow/react` (React Flow for Digital Twin Graph)
  - `clsx`, `tailwind-merge` (for robust utility styling)
- Configure `tailwind.config.js` with light-mode neutral palette (`#0f172a`, `#64748b`, `#f8fafc`, `#ffffff`, `#e2e8f0`, subtle emerald `#10b981`, amber `#f59e0b`, rose `#ef4444`).
- Configure `index.css` with Google Fonts (Inter / Plus Jakarta Sans) and text weights (200-400) and strict border radius constraints ($\le$ 8px).

### 2. State Management & Mock Data (`/src/lib/mockData.ts`, `/src/context/LogisticsContext.tsx`)
- **Scenarios**:
  - `Scenario 1 (Baseline)`: Normal network status, 0 critical alerts, 99.2% SLA gauge, green graph nodes.
  - `Scenario 2 (NH48 Truck Breakdown)`: 4 active crises, Truck T12 breakdown mid-transit, 62% SLA danger, Parcel #87 temperature risk, flashing alert nodes.
  - `Scenario 3 (Impossible State Transition)`: Scanner anomaly error `DELIVERED -> LOADED` on Parcel #87, cross-entity mismatch (Parcel Loaded vs Truck Idle).
- **Interactive Actions**:
  - `approveAndExecute(optionId)`: sets `isResolved = true`, updates SLA gauge from 62% to 98%, appends resolution step to Customer timeline, updates status badges to "Stabilized".
  - `selectCustomerPivot(option)`: registers self-service change (locker / neighbor / reschedule) and dispatches update notification to Ops World Model.
  - `resetDemo()`: resets all state back to pristine default without reloading.
  - `selectGraphNode(nodeId)`: highlights downstream dependency chain and focuses Incident Context.

### 3. Customer Copilot (`CustomerDashboard.tsx`)
- **Plain-Language Status Bar & "Why" Card**:
  - Clear human-friendly status explaining the exact context in plain English.
  - Active dynamic recalculation notification.
- **Stakeholder Progress Timeline**:
  - Checkpoints: `Order Packed` $\rightarrow$ `Dispatched` $\rightarrow$ `In-Transit` $\rightarrow$ `[Active AI Recalculation]` $\rightarrow$ `Delivery Resolved`.
  - Reflects real-time resolution when Ops executes recovery.
- **Contextual Self-Service Actions (The Pivot Option Panel)**:
  - 3 actionable choices: Redirect to parcel locker, leave with neighbor, reschedule delivery slot.
  - Immediate interactive feedback.
- **Parcel Search Bar**:
  - Pre-filled with Parcel #87 (high priority temperature-sensitive cargo), with switchable parcel selection.

### 4. Operations Control Tower (`OpsControlTower.tsx`)
- **Global Network Health Hub**:
  - Clustered Incident Counter (e.g. "4 Active Crises").
  - SLA Danger Radial Gauge (interactive SVG radial gauge).
  - World Model Graph Status counter ("1,450 Verified Nodes Online").
  - Diagnostic Mode Toggle ("Standard View" vs "Dependency / Story Verification Mode").
  - Top metric cards matching the reference image layout.
- **Semantic Translation Stream (ULEO Panel)**:
  - Double-column live feed: Raw legacy inputs on left, standardized ULEO events on right with live simulated stream.
  - Integration Blueprint Drawer: Slide-over detailing entity mapping, pre/post-conditions, and zero-code legacy integration.
- **Digital Twin Network Graph (`reactflow` Canvas)**:
  - Custom styled nodes for Parcels, Trucks, Drivers, Hubs, and Docks.
  - Edges labeled with semantic relationships: `IS_INSIDE`, `LOCATED_AT`, `ASSIGNED_TO`.
  - Color-coded states: Loaded/Normal (green), In-Transit (amber), Delayed/Critical (red pulsing).
  - Interactive drill-down: Clicking any node highlights its connected downstream blast radius and filters the context panel.
  - Strict height wrapper `h-[600px] overflow-hidden`.
- **Active Validation Logger (Story Engine Panel)**:
  - Transition Checker: Real-time validation feed catching impossible lifecycle transitions (e.g. DELIVERED $\rightarrow$ LOADED).
  - Cross-Entity Consistency Monitor: Side-by-side comparison between Parcel #109 (`Loaded`) and Truck T12 (`Idle`) with conflict warning.
- **Incident Context Panel (Context Builder)**:
  - 5 Core Questions interactive tab group:
    1. What happened? (Truck T12 breakdown on NH48)
    2. Why did it happen? (Driver shift limit overrun due to upstream delay)
    3. Who is affected? (132 parcels, 2 cold-chain medicine shipments)
    4. What happens if we do nothing? (SLA collapse, cold-chain spoilage within 4h)
    5. What should I do first? (Direct call-to-action button to Decision Sandbox)
  - Operational Memory Timeline: Step-by-step reconstructed chain of events highlighting exact divergence point.
- **Recovery Simulator (Decision Sandbox)**:
  - LangGraph modeled recovery pathways: Option A (Backup Dock), Option B (Divert Fleet Truck - Recommended), Option C (Wait).
  - Comparative metrics: Delay impact, Cost in ₹, SLA Protection %.
  - Downstream hub congestion simulation graph.
  - Prominent "Approve & Execute" button triggering real-time state resolution across Ops and Customer views.

### 5. Navigation & Collapsible Sidebar
- Collapsible sidebar with clean icons, switching between all 6 subviews or unified overview mode.
- Fluid responsive layout with zero horizontal overflow or broken canvas geometry.

---

## Verification Plan

### Automated Build & Syntax Checks
- Run `npm run build` in `frontend/` to verify TypeScript types, imports, and bundling pass with zero errors.
- Validate Tailwind CSS compiles cleanly.

### Interactive Functional Verification via Browser Subagent
- Launch `npm run dev` and navigate to `http://localhost:5173`.
- Test Login Flow:
  - Enter `ops@company.com` $\rightarrow$ loads Operations Control Tower.
  - Enter `user@example.com` $\rightarrow$ loads Customer Copilot.
  - Quick role switch in navbar.
- Test Customer Copilot:
  - Verify Parcel #87 plain-language explanation and "Why" card.
  - Test Pivot Option Panel (click "Redirect to locker" $\rightarrow$ verify confirmation).
- Test Operations Control Tower:
  - Verify Health Hub SLA gauge and metrics.
  - Check ULEO semantic translation feed and Blueprint Drawer.
  - Test Digital Twin React Flow Graph: pan, zoom, click Truck T12 to highlight downstream blast radius.
  - Test Active Validation Logger: observe impossible transition error and cross-entity mismatch.
  - Test Incident Context 5-question tabs and Operational Memory timeline.
  - Test Recovery Simulator: click "Approve & Execute" on Option B $\rightarrow$ verify SLA gauge jumps to 98%, crisis resolves, and customer timeline receives "Resolved" event.
- Test Scenario Selector:
  - Switch between Scenario 1, Scenario 2, Scenario 3.
  - Click "Reset Demo" and confirm all states reset.
- Test Sidebar Collapse/Expand:
  - Toggle sidebar collapse and ensure graph and card geometries adapt smoothly.
