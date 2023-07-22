import React from "react";

interface StateProps {}

function init() {
	const value = JSON.parse(localStorage.getItem("age") || "");
	console.log("value = ", value);
	return value;
}
const State = (props: StateProps) => {
	const [count, setCount] = React.useState<number>(init);

	const increment = () => {
		setCount((c) => c + 1);
	};

	return (
		<button className="m-4 btn btn-outline-primary" onClick={increment}>
			{count}
		</button>
	);
};

export default State;
