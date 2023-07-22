import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { IEntity } from "types";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { Link } from "react-router-dom";
export interface ListProps {
	movies: IEntity.Movie[];
	onToggleLike: (movieID: string) => void;
	onDelete: (movieID: string) => void;
	onSort: (path: keyof IEntity.Movie) => void;
	columnSort: IEntity.Sort;
}

const List = ({ movies, onToggleLike, onDelete, onSort, columnSort }: ListProps) => {
	const sortIcon = (path: keyof IEntity.Movie) => {
		if (columnSort.path !== path) return null;
		return columnSort.order === "asc" ? <IoMdArrowDropup /> : <IoMdArrowDropdown />;
	};
	return (
		<table className="table">
			<thead>
				<tr>
					<th onClick={() => onSort("title")}>Title {sortIcon("title")}</th>
					{/* @ts-ignore */}
					<th onClick={() => onSort("genre.name")}>Genre {sortIcon("genre.name")}</th>
					<th onClick={() => onSort("username")}>Owner {sortIcon("username")}</th>
					<th onClick={() => onSort("numberInStock")}>Stock {sortIcon("numberInStock")}</th>
					<th onClick={() => onSort("dailyRentalRate")}>Rate {sortIcon("dailyRentalRate")}</th>
					<th></th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{movies.map(({ _id, title, genre, username, numberInStock, dailyRentalRate, isLiked }) => (
					<tr key={_id}>
						<td>
							<Link to={_id}>{title}</Link> {/* /movies/123 */}
						</td>
						<td>{genre.name}</td>
						<td>{username}</td>
						<td>{numberInStock}</td>
						<td>{dailyRentalRate}</td>
						<td>
							{isLiked ? (
								<AiFillHeart onClick={() => onToggleLike(_id)} />
							) : (
								<AiOutlineHeart onClick={() => onToggleLike(_id)} />
							)}
						</td>
						<td>
							<button onClick={() => onDelete(_id)} className="btn btn-danger">
								Delete
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default List;
