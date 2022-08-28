import { ButtonHTMLAttributes, forwardRef, LegacyRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef((props: ButtonProps, ref: LegacyRef<HTMLButtonElement>) => {
	const { children, className, ...otherProps } = props;
	return (
		<button className={`rounded py-2 px-14 font-semibold text-xl ${className}`} ref={ref} {...otherProps}>
			{children}
		</button>
	);
});

Button.displayName = "Button";

export default Button;
