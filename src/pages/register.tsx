import { Form } from "components";
import { toast } from "react-hot-toast";
import { NavigateFunction } from "react-router-dom";
import { Auth, AxiosError } from "services";
import { IApi } from "types";
import { object, string } from "yup";

interface RegisterState extends IApi.Auth.Register.Request {
	errors: Partial<IApi.Auth.Register.Request>;
}

interface RegisterProps {
	navigate: NavigateFunction;
}

export default class Register extends Form<RegisterProps, RegisterState> {
	state: RegisterState = { email: "", name: "", password: "", errors: {} };

	schema = object({
		email: string().email().label("Email").required(),
		password: string().min(5).label("Password").required(),
		name: string().min(3).label("Name").required(),
	});

	onSubmit = async (data: RegisterState) => {
		try {
			await Auth.Register(data);
			this.props.navigate("/login");
			toast.success("Successfully registered.");
		} catch (error: any) {
			if (error instanceof AxiosError && error.response) {
				toast.error(error.response.data);
			}
		}
	};

	render() {
		return (
			<main className="container">
				<h1>Register</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput("email", "Email", "email")}
					{this.renderInput("name", "Name")}
					{this.renderInput("password", "Password", "password")}
					{this.renderSubmit("Register")}
				</form>
			</main>
		);
	}
}
