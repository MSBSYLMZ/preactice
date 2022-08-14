import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

function Button(props: ButtonProps) {
	const { children, className, ...otherProps } = props;
	return (
		<button className={`rounded bg-white py-2 px-14 font-semibold text-xl ${className}`} {...otherProps}>
			{children}
		</button>
	);
}

export default Button;
