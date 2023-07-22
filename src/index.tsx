import ReactDOM from "react-dom/client";
import App from "./app";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "assets/styles/main.scss";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<Router>
		<App />
		<Toaster />
	</Router>
);
