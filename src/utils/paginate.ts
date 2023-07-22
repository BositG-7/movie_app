export function paginate<T>(items: T[], pageSize: number, currentPage: number): T[] {
	const startIdx = pageSize * (currentPage - 1);
	const finishIdx = startIdx + pageSize;
	return items.slice(startIdx, finishIdx);
}
