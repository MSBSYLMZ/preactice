import { SvgIconComponent } from "@mui/icons-material";
import { ButtonHTMLAttributes } from "react";
import Button from "../basics/button";

interface IntroButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	icon?: JSX.Element;
}

function IntroButton(props: IntroButtonProps) {
	const { icon, children, ...otherProps } = props;
	return (
		<Button className="block w-full sm:w-96 hover:bg-blue my-5 flex justify-center text-center" {...otherProps}>
			<>
				{icon && icon}
				<p>{children}</p>
			</>
		</Button>
	);
}

export default IntroButton;
