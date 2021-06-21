import dotPath from './main.dot'
import {parseDOTNetwork} from 'vis-network/standalone'

export declare interface Node {
  id: number,
  label: string,
}

export declare interface Edge {
  from: number,
  to: number,
}

export declare interface GraphData {
  nodes: Node[],
  edges: Edge[],
}

let network: Promise<GraphData> | null = null;
export async function getGraphData(): Promise<GraphData> {
  if (!network) {
    network = new Promise(async (resolve, reject) => {
      const dot = await (await fetch(dotPath)).text()
      resolve(parseDOTNetwork(dot))
    })
  }
  return network
}

export function subjectLength(subject: number | string): number {
  const s = typeof(subject) === 'string' ? parseInt(subject) : subject
  return [3, 11, 16, 20, 23, 30].includes(s) ? 2 : 1
}
