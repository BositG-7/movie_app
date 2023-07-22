import { Link, NavLink } from "react-router-dom";
import { IEntity } from "types";
import cx from "classnames";

interface NavbarProps {
	user: IEntity.User;
	onLogout: () => void;
}

const links = [
	{ label: "Login", pathname: "/login" },
	{ label: "Register", pathname: "/register" },
];

const Navbar = ({ user, onLogout }: NavbarProps) => (
	<nav className="navbar navbar-expand-sm navbar-light bg-light mb-4">
		<div className="container justify-content-start">
			<Link to="/" className="navbar-brand">
				Movies App
			</Link>
			{user ? (
				<ul className="navbar-nav">
					<li className="nav-item">
						<div className="nav-link">{user.name}</div>
					</li>
					<li className="nav-item">
						<div className="nav-link" onClick={onLogout}>
							Log out
						</div>
					</li>
				</ul>
			) : (
				<ul className="navbar-nav">
					{links.map(({ label, pathname }) => (
						<li key={pathname} className="nav-item">
							<NavLink
								to={pathname}
								className={({ isActive }) => cx("nav-link", isActive && "active")}
							>
								{label}
							</NavLink>
						</li>
					))}
				</ul>
			)}
		</div>
	</nav>
);

export default Navbar;
