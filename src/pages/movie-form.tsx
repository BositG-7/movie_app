import { useNavigate, useParams } from "react-router-dom";
import CreateMovie from "./create-movie";

interface MovieFormProps {}

const MovieForm = (props: MovieFormProps) => {
	const { movieID = "new" } = useParams();
	const navigate = useNavigate();

	return <CreateMovie navigate={navigate} movieID={movieID} />;
};

export default MovieForm;
