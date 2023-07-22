import { useNavigate } from "react-router-dom";
import List, { ListProps } from "./list";

interface MoviesProps extends ListProps {
  search: string;
  onChangeSearch: (search: string) => void;
  count: number;
}

const Movies = ({ search, onChangeSearch, count, ...args }: MoviesProps) => {
  const navigate = useNavigate();

  return (
    <>
      <button className="btn btn-primary mb-3" onClick={() => navigate("new")}>
        New Movie
      </button>
      <p>
        Showing <b>{count}</b> movies in the database.
      </p>
      <input
        placeholder="Search..."
        className="form-control mb-3"
        value={search}
        onChange={(e) => onChangeSearch(e.target.value)}
      />
      <List {...args} />
    </>
  );
};

export default Movies;
