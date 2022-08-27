import { ButtonHTMLAttributes, forwardRef, FunctionComponent, ReactNode } from "react";
import Button from "../basics/button";

interface IntroButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	icon?: JSX.Element;
	children?: ReactNode;
}

const IntroButton: FunctionComponent<IntroButtonProps> = forwardRef((props: IntroButtonProps, ref = null) => {
	const { icon, children = null, ...otherProps } = props;
	return (
		<Button
			className="w-full sm:w-80 pt-4 px-6 h-16 relative hover:bg-gray hover:text-black bg-navy-blue text-white my-5 flex justify-center text-center"
			{...otherProps}>
			<>
				{icon && icon}
				{children}
			</>
		</Button>
	);
});
IntroButton.displayName = "Intro Button";

export default IntroButton;
