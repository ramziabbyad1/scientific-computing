
export interface GraphNode<T> {
	data: T;
	adjacent: GraphNode<T>[];
}