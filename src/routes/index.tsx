import { Login, Home, Register, MovieForm } from "pages";
import { Navigate, Route, Routes as Switch, useNavigate } from "react-router-dom";
import { IEntity } from "types";

interface RoutesProps {
	onLogin: (user: IEntity.User) => void;
	user: IEntity.User;
}

const Routes = ({ onLogin, user }: RoutesProps) => {
	const navigate = useNavigate();

	return (
		<Switch>
			<Route path="movies">
				<Route index element={<Home />} />
				<Route path=":movieID" element={user ? <MovieForm /> : <Navigate to="/login" />} />
			</Route>
			<Route
				path="register"
				element={user ? <Navigate to="/movies" /> : <Register navigate={navigate} />}
			/>
			<Route path="login" element={user ? <Navigate to="/" /> : <Login onLogin={onLogin} />} />
			<Route path="*" element={<Navigate to="/movies" />} />
		</Switch>
	);
};

export default Routes;
