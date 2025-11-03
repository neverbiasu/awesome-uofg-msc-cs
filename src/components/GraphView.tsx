'use client';

import {
  lazy,
  type RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type {
  ForceGraphMethods,
  NodeObject,
} from 'react-force-graph-2d';
import { forceCollide, forceLink, forceManyBody } from 'd3-force';
import { useRouter } from 'fumadocs-core/framework';

// Type definitions for the graph data
export type Node = NodeObject & {
  url: string;
  text: string;
  description?: string;
  neighbors?: string[];
};

export interface Graph {
  links: Record<string, unknown>[];
  nodes: Node[];
}

export interface GraphViewProps {
  graph: Graph;
}

// Lazy load the graph component to avoid SSR issues
const ForceGraph2D = lazy(
  () => import('react-force-graph-2d'),
) as typeof import('react-force-graph-2d').default;

// Main component wrapper
export function GraphView(props: GraphViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  return (
    <div ref={ref} className="w-full h-[600px] relative border rounded-lg">
      {mount && <ClientOnly {...props} containerRef={ref} />}
    </div>
  );
}

// The actual client-side graph implementation
function ClientOnly({
  containerRef,
  graph,
}: GraphViewProps & { containerRef: RefObject<HTMLDivElement | null> }) {
  const fgRef = useRef<ForceGraphMethods<Node, Record<string, unknown>> | undefined>(undefined);
  const hoveredRef = useRef<Node | null>(null);
  const readyRef = useRef(false);
  const router = useRouter();
  const [tooltip, setTooltip] = useState<{ x: number; y: number; content: string } | null>(null);

  useEffect(() => {
    const fg = fgRef.current;
    if (!fg || readyRef.current) return;

    fg.d3Force('link', forceLink().distance(120));
    fg.d3Force('charge', forceManyBody().strength(-100));
    fg.d3Force('collision', forceCollide(60));
    readyRef.current = true;
  }, []);

  const handleNodeHover = (node: NodeObject | null) => {
    const graph = fgRef.current;
    const typedNode = node as Node | null;
    if (!graph) return;

    hoveredRef.current = typedNode;
    if (typedNode) {
      const coords = graph.graph2ScreenCoords(typedNode.x ?? 0, typedNode.y ?? 0);
      setTooltip({
        x: coords.x + 8,
        y: coords.y + 8,
        content: typedNode.description ?? typedNode.text,
      });
    } else {
      setTooltip(null);
    }
  };

  const nodeCanvasObject = (node: NodeObject, ctx: CanvasRenderingContext2D) => {
    const typedNode = node as Node;
    const container = containerRef.current;
    if (!container) return;

    const color = getComputedStyle(container).getPropertyValue('color');
    const fontSize = 14;
    const radius = 6;

    ctx.beginPath();
    ctx.arc(typedNode.x ?? 0, typedNode.y ?? 0, radius, 0, 2 * Math.PI, false);

    const hoverNode = hoveredRef.current;
    const isActive = hoverNode?.id === typedNode.id || hoverNode?.neighbors?.includes(typedNode.id as string);

    ctx.fillStyle = isActive
      ? 'var(--color-fd-primary)'
      : '#7287fd';
    ctx.fill();

    ctx.font = `${fontSize}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillStyle = color;
    ctx.fillText(typedNode.text, typedNode.x ?? 0, (typedNode.y ?? 0) + radius + 4);
  };

  const linkColor = (link: Record<string, unknown>) => {
    const container = containerRef.current;
    if (!container) return '#999';

    const hoverNode = hoveredRef.current;

    if (
      hoverNode &&
      typeof link.source === 'object' &&
      link.source !== null &&
      'id' in link.source &&
      typeof link.target === 'object' &&
      link.target !== null &&
      'id' in link.target &&
      (hoverNode.id === link.source.id || hoverNode.id === link.target.id)
    ) {
      return 'var(--color-fd-primary)';
    }
    return '#99999980'; // Use a safe, semi-transparent gray
  };

  const enrichedGraph = useMemo<Graph>(() => {
    const nodeMap = new Map(graph.nodes.map(n => [n.id, n]));
    const validLinks = graph.links
      .filter(
        link => nodeMap.has(link.source as string) && nodeMap.has(link.target as string)
      )
      .map(link => ({
        ...link,
        source: nodeMap.get(link.source as string) || link.source,
        target: nodeMap.get(link.target as string) || link.target,
      }));

    const nodesWithNeighbors = graph.nodes.map((node) => ({
      ...node,
      neighbors: validLinks
        .flatMap((link) => {
          if (link.source === node || (typeof link.source === 'object' && link.source !== null && 'id' in link.source && link.source.id === node.id)) {
            return [typeof link.target === 'object' && link.target !== null && 'id' in link.target ? (link.target.id as string) : (link.target as string)];
          }
          if (link.target === node || (typeof link.target === 'object' && link.target !== null && 'id' in link.target && link.target.id === node.id)) {
            return [typeof link.source === 'object' && link.source !== null && 'id' in link.source ? (link.source.id as string) : (link.source as string)];
          }
          return [];
        })
    }));
    return { nodes: nodesWithNeighbors, links: validLinks };
  }, [graph]);

  return (
    <>
      <ForceGraph2D<Node, Record<string, unknown>>
        ref={fgRef}
        graphData={enrichedGraph}
        nodeCanvasObject={nodeCanvasObject}
        linkColor={linkColor}
        onNodeHover={handleNodeHover}
        onNodeClick={(node) => {
          const typedNode = node as Node;
          if (typedNode.url) router.push(typedNode.url);
        }}
        linkWidth={1}
        enableNodeDrag={true}
        enableZoomInteraction={true}
      />
      {tooltip && (
        <div
          className="absolute p-2 rounded-md bg-black/80 text-white text-sm pointer-events-none"
          style={{ transform: `translate(${tooltip.x}px, ${tooltip.y}px)` }}
        >
          {tooltip.content}
        </div>
      )}
    </>
  );
}
