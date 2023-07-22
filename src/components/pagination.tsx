import cx from "classnames";
interface PaginationProps {
	currentPage: number;
	count: number;
	pageSize: number;
	onPageChange: (page: number) => void;
}

const Pagination = ({ count, pageSize, currentPage, onPageChange }: PaginationProps) => {
	const size = Math.ceil(count / pageSize);
	if (size <= 1) return null;

	const pages = new Array(size).fill(null).map((p, idx) => idx + 1);

	return (
		<nav aria-label="Page navigation example">
			<ul className="pagination">
				{pages.map((page) => (
					<li key={page} className={cx("page-item", page === currentPage && "active")}>
						<button className="page-link" onClick={() => onPageChange(page)}>
							{page}
						</button>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Pagination;
