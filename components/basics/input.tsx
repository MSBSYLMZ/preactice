import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

function Input(props: InputProps) {
	const { className, ...otherPorps } = props;

	return <input className={`p-1 px-4 rounded outline-none w-full m-0 text-black ${className} `} autoComplete="off" {...otherPorps}></input>;
}

export default Input;
