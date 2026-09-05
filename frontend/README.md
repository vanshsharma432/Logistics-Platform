# AI Logistics Brain (Logistics Truth Engine)

> **"Today's logistics software tells you where things are. Our system tells you what the network is becoming."**
> We are not building another parcel tracker. We are building the continuous intelligence layer that explains, predicts, and prevents failures across the logistics network.

The **AI Logistics Brain** is a continuous, closed-loop decision intelligence platform that orchestrates specialized AI agents over a verified World Model. By shifting operations from blind event logging to active state validation, it resolves system fragmentation, eliminates the manual "checking epidemic", and turns network disruptions into automated, simulated recovery actions with a single click.

---

## 🏗️ Core Architectural Pillars

Our platform transforms legacy logistics networks through four foundational layers of intelligence:

### 1. Language & System Fragmentation (The Semantic Level)
*   **The Problem:** Logistics data is deeply fractured across disconnected legacy software platforms (WMS, TMS, ERPs, CRMs, and Carrier GPS telematics). Automated systems cannot reason coherently because every partner speaks a different digital dialect (e.g., one system logs `"Goods Issue"`, another logs `"Loaded"`, and a third logs `"Dispatch"`). NOC teams waste hours manually checking details via spreadsheets, WhatsApp, and phone calls.
*   **The Solution:**
    *   **Universal Logistics Event Ontology (ULEO):** Acting as the "HTTP of logistics", ULEO translates messy, heterogeneous legacy events into a single standardized semantic stream. It maps Entities, Relationships, States, and Pre/Post-conditions so new systems can integrate instantly without custom hard-coded rules.
    *   **Verified World Model:** Standardized events are aggregated into a live, continuously updating Logistics Knowledge Graph representing the absolute operational truth of the entire physical network (e.g., tracking that `Parcel P109 -> IS_INSIDE -> Truck T12 -> LOCATED_AT -> Gurgaon Hub`).

### 2. Blind Event Logging vs. Active State Validation (The Verification Level)
*   **The Problem:** Traditional systems record logs blindly without checking if they are logically sound. They miss scanner bugs, duplicate IDs, and impossible transitions (e.g., a parcel scanned as `"Delivered"` and then `"Loaded"` two minutes later), only detecting routing errors after a vehicle has already arrived at the incorrect destination.
*   **The Solution:**
    *   **Logistics State Machines:** Mathematically defined lifecycles for every physical entity (Parcels, Trucks, Drivers, Hubs).
    *   **Logistics Story Engine:** Rather than storing static databases, this engine continuously verifies that each object's story is logically complete and follows expected timelines.
    *   **Cross-Entity Consistency Checks:** Dynamically matches stories across separate entities. It flags conflicts in real time—such as a package marked as `"Loaded"` while its assigned vehicle's telematics register as `"Idle"`—to catch mismatches before vehicles depart.

### 3. Disconnected Context & Dependency Blindness (The Diagnostic Level)
*   **The Problem:** Legacy software treats network anomalies as isolated incidents (reporting a raw `"Truck T12 Broken"` or `"GPS Offline"` alarm). Because systems are blind to resource dependencies (how a parcel depends on a truck, which depends on a driver, who depends on an on-time warehouse shift), they cannot calculate the cascading domino effects of a failure, leading to wrong root-cause attribution.
*   **The Solution:**
    *   **Resource Dependency Mapping:** Shifts the focus of monitoring from individual tracking IDs to the health of the entire physical dependency chain (shared sorting docks, fleets, shifts, and hubs).
    *   **AI Context Builder:** When an anomaly occurs, the system automatically reconstructs the affected operational timeline in under 15 seconds, answering the **5 Core Questions**:
        1.  *What happened?* (Truck T12 breakdown mid-transit on highway NH48)
        2.  *Why did it happen?* (An upstream inventory delay overloaded driver shift limits)
        3.  *Who is affected?* (132 parcels delayed, including 2 temperature-controlled medicine shipments)
        4.  *What happens if we do nothing?* (4-hour delay baseline, SLA breach, cold-chain compromise)
        5.  *What should I do first?* (Model and trigger simulated recovery pathways)

### 4. Alert Fatigue vs. Simulated Recovery (The Actionable Level)
*   **The Problem:** Managers start their morning shifts met with a wall of 100+ raw overnight alerts. Traditional platforms merely report what happened, leaving human operators to spend hours manually investigating, prioritizing, and firefighting.
*   **The Solution:**
    *   **Incident Clustering:** Groups hundreds of noisy, raw event logs into their actual root-cause incidents (reducing a 4-hour manual investigation down to a 5-minute review).
    *   **Orchestrated LangGraph Agents:** LLM reasoning is decoupled from raw telemetry. Multi-agent workflows orchestrated via LangGraph evaluate the verified knowledge graph to isolate true root causes, model network cascades, and predict SLA breaches.
    *   **Digital Twin Simulation Sandbox:** The platform spins up an in-memory simulation copy of the current network state to test "what-if" recovery pathways, scoring and ranking options by cost, delay, and SLA protection (e.g., *Option A: Divert Backup Truck [₹12,000 cost, +35 min delay, 98% SLA protected]* vs. *Option B: Open Emergency Warehouse Dock [₹5,000 cost, +2 hr delay, 85% SLA protected]*).

---

## 💻 Multilateral Interface Flow (Fully Connected Frontend)

The system exposes **two highly synchronized frontend views** powered by the same underlying intelligence layer, connected via live API endpoints:

```
                      [ Legacy Telemetry Sources ]
                                  |
                                  v
                      [ ULEO Standardization ]
                                  |
                                  v
                     [ Verified World Model Graph ]
                                  |
                                  v
                     [ AI Decision & Story Engine ]
                    /                              \
                   /                                \
  [ Dashboard 1: Operations Control Tower ]    [ Dashboard 2: Customer Copilot ]
   - NOC Incident Clustered Feed                - Empathetic Plain-Language Status
   - Interactive Copilot Panels & Logs          - Reassuring Progress Timelines
   - Decision Sandbox (Pathway Selection)       - Contextual Self-Service Pivot Panels
```

### 1. Operations Control Tower (Internal NOC Workspace)
*   **Active Incident Feed:** Displays clustered, prioritized operational crises with color-coded severity badges.
*   **Story & Story Diagnostics:** A dynamic canvas displaying impossible state machine transitions and cross-entity conflicts.
*   **Copilot Sandbox Drawer:** Slides open upon clicking an incident card to display the **5 Core Questions**, the reconstructed historical timeline, and interactive, cost-scored simulation cards. Selecting "Approve & Execute" automatically updates drivers' manifests and logs the recovery pathway in the World Model.

### 2. Customer Copilot (End-User Experience)
*   **Proactive Status Alerts:** Completely bypasses confusing legacy tags (like `DEVIATION_DETECTION_SH12`), displaying simple, reassuring plain-language explanations (*"Your delivery has been delayed due to emergency route adjustments. New ETA is 5:15 PM (with 98% confidence)."*).
*   **Self-Service Pivot Panel:** When the platform predicts an SLA breach, the customer is instantly presented with proactive, context-aware recovery options:
    *   *Redirect to Gurgaon Hub secure temperature-controlled parcel locker.*
    *   *Authorize leaving package with front desk receptionist.*
    *   *Reschedule delivery slot for tomorrow morning.*
*   Choosing an option dynamically loops back into the manager's World Model, instantly re-routing drivers' tasks.

---

## 🛠️ Technology Stack & Connection Overview

The application features a fully unified, connected architecture:

*   **Frontend Interface:** React 18 (Vite, React Flow for Knowledge Graph rendering, Tailwind CSS for real-time dashboard layout, Lucide React Icons).
*   **Backend Intelligence:** Python 3.12 (LangGraph for multi-agent workflows, FastAPI for real-time WebSockets and REST API endpoints, NetworkX/Neo4j for the Live World Model Graph, State Machines for Entity Story Validation).
*   **Data Synchronization:** Real-time state updates are broadcast over WebSockets, ensuring that when an operator approves a recovery pathway in the Control Tower, the Customer Copilot interface and the physical database synchronize in under 100ms.

---

## 🚀 Quick Start (Local Run)

### Backend Setup (FastAPI + LangGraph)
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install the pre-vetted package ecosystem:
   ```bash
   pip install -r requirements.txt
   ```
3. Start the continuous intelligence stream:
   ```bash
   uvicorn main:app --reload --port 8000
   ```

### Frontend Setup (React + Tailwind CSS)
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Boot the Control Tower and Customer Copilot interfaces:
   ```bash
   npm run dev
   ```
4. Access the Operations Dashboard at `http://localhost:5173/control-tower` and the client app at `http://localhost:5173/copilot`.

---

## 📊 Live Demo Script for Hackathon Judges
To demonstrate the full power of the AI Logistics Brain to technical judges, run the **NH48 Highway Disruption Simulation**:

1.  **Ingest Mismatched Legacy Logs:** Click "Simulate Incoming Logs" to show raw inputs (`Goods Issue`, `Loaded`, `Scan Confirmed`) being instantly standardized into clean ontological event terms via the **ULEO Translator**.
2.  **Highlight Active Verification:** Insert a duplicate scan or a mismatched truck/parcel state on screen. Watch the **Story Engine** flag an orange "Cross-Entity Story Conflict" warning before departure.
3.  **Simulate the NH48 Highway Breakdown:** Trigger the Truck T12 breakdown. Show the **Context Builder** reconstruct the entire crisis map in under 15 seconds, detailing that two delayed items contain high-priority, temperature-sensitive medicine.
4.  **Execute simulated recovery:** Open the **Decision Sandbox** in the Copilot Panel. Review the three simulated future options with distinct cost/delay deltas. Click "Approve & Execute" on Option B—watch the status instantly resolve to "Rerouted", and watch the **Customer Copilot** app instantly update with the proactive notification and self-service locker selection!
