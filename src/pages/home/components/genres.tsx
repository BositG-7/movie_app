import cx from "classnames";
import { IEntity } from "types";

interface GenresProps {
	genreID: string;
	onSelect: (genreID: string) => void;
	genres: IEntity.Genre[];
}

const Genres = ({ genreID, onSelect, genres }: GenresProps) => (
	<div className="col-3">
		<ul className="list-group">
			{genres.map(({ _id, name }) => (
				<li
					key={_id}
					className={cx("list-group-item", _id === genreID && "active")}
					onClick={() => onSelect(_id)}
				>
					{name}
				</li>
			))}
		</ul>
	</div>
);

export default Genres;
