import { Component } from "react";
import { Loader, Navbar } from "components";
import Routes from "routes";
import { IEntity } from "types";
import { Auth } from "services";
import { toast } from "react-hot-toast";
import { clearSession, getSession } from "utils";

interface AppState {
	user: IEntity.User;
	isLoading: boolean;
}

export default class App extends Component<{}, AppState> {
	state: AppState = {
		user: null,
		isLoading: true,
	};

	handleLogin = (user: IEntity.User) => {
		this.setState({ user });
	};

	handleLogout = () => {
		this.setState({ user: null });
		clearSession();
	};

	async componentDidMount() {
		const { accessToken } = getSession();
		try {
			if (accessToken) {
				const { data: user } = await Auth.GetMe();
				this.setState({ user });
			}
		} catch (err: any) {
			toast.error("Something went wrong");
			clearSession();
		} finally {
			this.setState({ isLoading: false });
		}
	}

	render() {
		const { user, isLoading } = this.state;

		if (isLoading) return <Loader />;

		return (
			<>
				<Navbar onLogout={this.handleLogout} user={user} />
				<Routes user={user} onLogin={this.handleLogin} />
			</>
		);
	}
}
