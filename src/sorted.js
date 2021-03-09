import Heap from '@aureooms/js-pairing-heap';
import {EfficientlyInvertiblePairs as Pairs} from '@aureooms/js-pairs';

import subroutine from './subroutine.js';

/**
 * Sort the vertices topologically breaking ties according to a given function.
 *
 * @param {Iterable<any>} edges - The input graph as a list of edges.
 * @param {Function} breakTies - The function to break ties.
 * @returns {Iterable<any>} The vertices sorted in topological order.
 * @throws {Error} If the input graph contains a cycle.
 */
export default function* sorted(edges, breakTies = undefined) {
	const queue = breakTies ? new Heap(breakTies) : [];
	const graph = Pairs.from(edges);

	yield* subroutine(queue, graph);

	if (graph.size > 0) {
		throw new Error(
			'@aureooms/js-topological-sorting#sorted: input graph contains a cycle',
		);
	}
}
