import { DetailedHTMLProps, InputHTMLAttributes } from "react";

interface InputProps
	extends Pick<
		DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
		"value" | "name" | "type" | "onChange" | "min" | "max" | "required"
	> {
	error?: string;
	label: string;
	placeholder?:string
}

const Input = ({ label, error,placeholder, ...args }: InputProps) => (
	<div className="form-group">
		<label htmlFor={args.name}>{label}</label>
		<input placeholder={placeholder} className="form-control" id={args.name} {...args} />
		{error && <div className="invalid-feedback d-block">{error}</div>}
	</div>
);

export default Input;
