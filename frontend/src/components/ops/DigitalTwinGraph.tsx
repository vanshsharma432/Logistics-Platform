import React, { useMemo, useState, useEffect } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
} from '@xyflow/react';
import { useLogistics } from '../../context/LogisticsContext';
import { createGraphData } from '../../lib/mockData';
import {
  GitFork,
  Package,
  Truck,
  User,
  Building,
  Info,
  Layers,
  ArrowRight,
  ShieldAlert,
  CheckCircle,
} from 'lucide-react';

export const DigitalTwinGraph: React.FC = () => {
  const {
    scenario,
    isResolved,
    selectedNodeId,
    setSelectedNodeId,
    setSubView,
  } = useLogistics();

  const initialData = useMemo(
    () => createGraphData(scenario, isResolved),
    [scenario, isResolved]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialData.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialData.edges);

  // Synchronize graph nodes and edges when scenario or resolved state changes
  useEffect(() => {
    const updated = createGraphData(scenario, isResolved);
    setNodes(updated.nodes);
    setEdges(updated.edges);
  }, [scenario, isResolved, setNodes, setEdges]);

  // Handle node selection & highlight downstream dependency chain
  const onNodeClick = (_: React.MouseEvent, node: Node) => {
    const targetId = node.id;
    setSelectedNodeId(targetId);

    // Dynamic downstream highlighting
    setNodes((prevNodes) =>
      prevNodes.map((n) => {
        const isTarget = n.id === targetId;
        const isConnectedEdge = edges.some(
          (e) => (e.source === targetId && e.target === n.id) || (e.target === targetId && e.source === n.id)
        );

        return {
          ...n,
          className: isTarget
            ? `${n.className} ring-2 ring-neutral-900 shadow-md`
            : isConnectedEdge
            ? `${n.className} ring-1 ring-neutral-500`
            : n.className,
        };
      })
    );
  };

  // Node details inspector
  const activeNode = useMemo(
    () => nodes.find((n) => n.id === selectedNodeId) || nodes.find((n) => n.id === 'truck-t12'),
    [nodes, selectedNodeId]
  );

  return (
    <div className="space-y-4">
      {/* Top Controls & Legend Header */}
      <div className="p-4 bg-white border border-neutral-200 rounded-[8px] flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-normal text-neutral-900 tracking-tight">
              Digital Twin Network Knowledge Graph (World Model)
            </h2>
            <span className="px-2 py-0.5 text-[10px] font-mono rounded-[4px] bg-neutral-100 text-neutral-600 border border-neutral-200">
              Pillar 1: Verified World Model (The Semantic Level)
            </span>
          </div>
          <p className="text-xs font-light text-neutral-500 mt-0.5">
            Operational Memory: Live, continuously updating digital graph of the physical network providing one unified source of truth
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center flex-wrap gap-2 text-[11px] font-light text-neutral-600">
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Normal / Loaded
          </span>
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-neutral-100 text-neutral-800 border border-neutral-200">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-500" />
            In-Transit
          </span>
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-red-50 text-red-800 border border-red-200">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            Anomaly / Stall
          </span>
        </div>
      </div>

      {/* Main Graph Grid: Canvas (strict h-[600px] overflow-hidden) + Drill-down Inspector */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
        {/* Canvas Container with Strict Constraints */}
        <div className="xl:col-span-3 h-[600px] bg-[#fbfcfd] border border-neutral-200 rounded-[8px] overflow-hidden relative shadow-sm">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            fitView
            fitViewOptions={{ padding: 0.25 }}
            minZoom={0.5}
            maxZoom={1.5}
            attributionPosition="bottom-left"
          >
            <Background color="#cbd5e1" gap={24} size={1} />
            <Controls showInteractive={false} position="top-right" />
            <MiniMap
              nodeStrokeColor="#94a3b8"
              nodeColor="#f1f5f9"
              className="bg-white border border-neutral-200 rounded-[6px]"
              maskColor="rgba(248, 250, 252, 0.7)"
            />
          </ReactFlow>

          {/* Quick Canvas Watermark Instructions */}
          <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs border border-neutral-200 rounded-[6px] px-3 py-1.5 text-[10px] font-mono text-neutral-500 pointer-events-none shadow-xs">
            Interactive: Click any entity to inspect downstream blast radius
          </div>
        </div>

        {/* Right 1 Col: Entity Downstream Blast Radius Inspector */}
        <div className="p-4 bg-white border border-neutral-200 rounded-[8px] flex flex-col justify-between h-[600px] overflow-y-auto">
          <div className="space-y-4">
            <div className="pb-3 border-b border-neutral-100 flex items-center justify-between">
              <span className="text-xs font-normal text-neutral-900 uppercase tracking-wider font-mono">
                Entity Blast Radius
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-600">
                {activeNode?.data?.category as string || 'Entity'}
              </span>
            </div>

            {activeNode && (
              <div className="space-y-3 text-xs font-light">
                <div>
                  <h3 className="text-sm font-normal text-neutral-900">
                    {activeNode.data.label as string}
                  </h3>
                  <p className="text-[11px] font-light text-neutral-500 mt-0.5">
                    {activeNode.data.sub as string}
                  </p>
                </div>

                <div className="p-2.5 bg-neutral-50 border border-neutral-200 rounded-[6px] space-y-1">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Payload / Duty:</span>
                    <span className="font-mono text-neutral-800 font-normal">
                      {activeNode.data.load as string}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Status Code:</span>
                    <span className="font-mono text-neutral-800 font-normal">
                      {(activeNode.data.status as string).toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Downstream Dependencies */}
                <div>
                  <h4 className="text-[11px] font-normal uppercase text-neutral-500 tracking-wider mb-2">
                    Downstream Dependency Cascade
                  </h4>
                  <div className="space-y-1.5">
                    <div className="p-2 border border-neutral-200 rounded-[4px] bg-white flex items-center justify-between">
                      <div>
                        <div className="text-xs font-normal text-neutral-800">
                          Parcel #87 (LifeSciences)
                        </div>
                        <div className="text-[10px] text-neutral-400">
                          IS_INSIDE • Cold Chain Critical
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-red-600 font-medium">
                        At Risk
                      </span>
                    </div>

                    <div className="p-2 border border-neutral-200 rounded-[4px] bg-white flex items-center justify-between">
                      <div>
                        <div className="text-xs font-normal text-neutral-800">
                          Driver D-41 (Rajesh K.)
                        </div>
                        <div className="text-[10px] text-neutral-400">
                          ASSIGNED_TO • Shift Limit (8.8h)
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-amber-600">
                        Near Limit
                      </span>
                    </div>

                    <div className="p-2 border border-neutral-200 rounded-[4px] bg-white flex items-center justify-between">
                      <div>
                        <div className="text-xs font-normal text-neutral-800">
                          Gurgaon Central Hub
                        </div>
                        <div className="text-[10px] text-neutral-400">
                          DESTINATION • Sort Window 16:30
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-neutral-600">
                        Congestion Risk
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Link to Incident Context */}
          <div className="pt-4 border-t border-neutral-100">
            <button
              onClick={() => setSubView('incident_context')}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-neutral-900 hover:bg-black text-white text-xs font-light rounded-[6px] transition-colors"
            >
              <span>Investigate Full Context (5Q)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
