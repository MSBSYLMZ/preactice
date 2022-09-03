import useAlert from "@hooks/useAlert";
import { IAlertButton } from "interfaces";
import { useRef, MouseEvent, ComponentProps, PropsWithChildren, FC } from "react";
import Button from "./basics/button";

function Alert() {
	const { alertMessage, alertType, hideAlert, showAlert, alertButtons } = useAlert();
	const alertRef = useRef<HTMLDivElement>(null);

	const handleClick = (e: MouseEvent<HTMLDivElement>) => {
		if (alertRef.current && !alertRef.current.contains(e.target as Node)) {
			hideAlert();
		}
	};
	if (!showAlert) return null;

	const buttons = alertButtons.map((item: IAlertButton, index: number) => (
		<Button key={index} className={item.className} onClick={item.onClick}>
			{item.text}
		</Button>
	));
	return (
		<div
			className="h-screen w-full top-0 left-0 fixed flex justify-center items-center  z-50"
			onClick={handleClick}
			style={{ backgroundColor: "rgba(172,172,172,.7)" }}>
			<div
				className={`w-96 h-72  rounded p-4 text-center relative ${
					alertType === "success" ? "bg-green-500" : alertType === "fail" ? "bg-red" : "bg-white"
				}`}
				ref={alertRef}>
				<div className="absolute right-3 top-3 cursor-pointer" onClick={hideAlert}>
					&#10060;
				</div>
				<h6 className="text-3xl font-bold">Preactice Message</h6>
				<p className="text-xl mt-4 font-semibold">{alertMessage}</p>
				{buttons}
			</div>
		</div>
	);
}

export default Alert;
