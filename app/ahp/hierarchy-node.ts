import {GraphNode} from './graph-node';
export interface HierarchyNode<T> extends GraphNode<T> {
	level: number;
	adjacent: HierarchyNode<T>[];
}