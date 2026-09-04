import React from 'react';
import { ontologyBlueprintMapping } from '../../lib/mockData';
import { X, Layers, ShieldCheck, ArrowRight, Code } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const BlueprintDrawer: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/20 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-xl h-full bg-white border-l border-neutral-200 shadow-xl flex flex-col justify-between overflow-y-auto">
        {/* Drawer Header */}
        <div className="p-5 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-neutral-900 text-white rounded-[4px]">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-normal text-neutral-900 tracking-tight">
                ULEO Integration Blueprint & Contract Engine
              </h2>
              <p className="text-[11px] font-mono text-neutral-400">
                Universal Logistics Event Ontology v2.4 • Zero Backend Hardcoding
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-[6px] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-6 flex-1 text-xs font-light text-neutral-700">
          {/* Explanation Banner */}
          <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-[6px] text-neutral-600 leading-relaxed">
            <strong className="font-normal text-neutral-900">The "HTTP of Logistics":</strong> ULEO standardizes multi-carrier and cross-ERP telemetry (SAP, Oracle, telematics, GPS, manual scanners) into an unambiguous mathematical state machine. Systems integrate instantly without custom translation pipelines.
          </div>

          {/* Core Ontology Entities */}
          <div>
            <h3 className="text-xs font-normal text-neutral-900 uppercase font-mono tracking-wider mb-2">
              1. Core Entities & Canonical Attributes
            </h3>
            <div className="grid grid-cols-2 gap-2.5">
              {ontologyBlueprintMapping.coreEntities.map((ent) => (
                <div key={ent.name} className="p-3 bg-white border border-neutral-200 rounded-[6px]">
                  <div className="text-xs font-mono font-medium text-neutral-900 mb-1.5">
                    {ent.name}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {ent.attrs.map((attr) => (
                      <span
                        key={attr}
                        className="px-1.5 py-0.5 text-[10px] font-mono bg-neutral-50 border border-neutral-200 rounded text-neutral-600"
                      >
                        {attr}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Semantic Relationships */}
          <div>
            <h3 className="text-xs font-normal text-neutral-900 uppercase font-mono tracking-wider mb-2">
              2. Verified Relational Graph Connectors
            </h3>
            <div className="space-y-2">
              {ontologyBlueprintMapping.relationships.map((rel) => (
                <div
                  key={rel.rel}
                  className="p-2.5 bg-neutral-50/60 border border-neutral-200 rounded-[6px] flex items-center justify-between"
                >
                  <div className="flex items-center gap-2 font-mono text-[11px]">
                    <span className="text-neutral-500">{rel.from}</span>
                    <ArrowRight className="w-3 h-3 text-neutral-400" />
                    <span className="font-normal text-neutral-900 bg-white px-1.5 py-0.5 border border-neutral-200 rounded">
                      {rel.rel}
                    </span>
                    <ArrowRight className="w-3 h-3 text-neutral-400" />
                    <span className="text-neutral-500">{rel.to}</span>
                  </div>
                  <span className="text-[10px] font-light text-neutral-500 text-right max-w-[200px]">
                    {rel.rule}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Operational Guardrails & Invariants */}
          <div>
            <h3 className="text-xs font-normal text-neutral-900 uppercase font-mono tracking-wider mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>3. Mathematical Pre/Post-Condition Guardrails</span>
            </h3>
            <ul className="space-y-1.5">
              {ontologyBlueprintMapping.guardrails.map((rule, idx) => (
                <li
                  key={idx}
                  className="p-2.5 bg-white border border-neutral-200 rounded-[6px] text-[11px] font-light text-neutral-600 flex items-start gap-2"
                >
                  <span className="font-mono text-neutral-400 shrink-0">0{idx + 1}.</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Zero Code Schema Sample */}
          <div>
            <h3 className="text-xs font-normal text-neutral-900 uppercase font-mono tracking-wider mb-2 flex items-center gap-1.5">
              <Code className="w-3.5 h-3.5 text-neutral-500" />
              <span>JSON-LD Live Interoperability Spec</span>
            </h3>
            <pre className="p-3 bg-neutral-950 text-neutral-300 font-mono text-[10px] rounded-[6px] overflow-x-auto leading-relaxed">
{`{
  "@context": "https://uleo.org/v2/context.jsonld",
  "@type": "UniversalLogisticsEvent",
  "eventType": "CONTAINMENT_TRANSITION",
  "subjectEntity": "urn:uleo:parcel:87",
  "predicate": "IS_INSIDE",
  "objectEntity": "urn:uleo:vehicle:T12",
  "preConditionsVerified": ["DOCK_SEAL_INTACT", "TEMP_BOUND_MET"],
  "postConditionsAsserted": ["MANIFEST_CHAIN_LOCKED"]
}`}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between">
          <span className="text-[11px] font-mono text-neutral-500">
            ULEO Spec Validator: Active
          </span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-xs font-light bg-neutral-900 hover:bg-black text-white rounded-[6px] transition-colors"
          >
            Close Blueprint
          </button>
        </div>
      </div>
    </div>
  );
};
