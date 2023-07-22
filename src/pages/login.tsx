import { Form } from "components";
import { toast } from "react-hot-toast";
import { Auth, AxiosError } from "services";
import { IApi, IEntity } from "types";
import { setSession } from "utils";
import { object, string } from "yup";

interface LoginState extends IApi.Auth.Login.Request {
	errors: Partial<IApi.Auth.Login.Request>;
}

interface LoginProps {
	onLogin: (user: IEntity.User) => void;
}

export default class Login extends Form<LoginProps, LoginState> {
	state: LoginState = {
		email: "",
		password: "",
		errors: {},
	};

	schema = object().shape({
		email: string().email().label("Email").required(),
		password: string().min(5).label("Password").required(),
	});

	onSubmit = async ({ email, password }: LoginState) => {
		try {
			const { data } = await Auth.Login({ email, password });
			const accessToken = data.data;

			setSession(accessToken);
			const { data: user } = await Auth.GetMe();
			this.props.onLogin(user);
		} catch (error: any) {
			if (error instanceof AxiosError && error.response) {
				toast.error(error.response.data);
			}
		}
	};

	render() {
		return (
			<main className="container">
				<h1>Login</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput("email", "Email")}
					{this.renderInput("password", "Password", "password")}
					{this.renderSubmit("Login")}
				</form>
			</main>
		);
	}
}
