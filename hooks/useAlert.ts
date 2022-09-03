import { useReactiveVar } from "@apollo/client";
import { alertVar } from "apollo-client/reactive-variables";
import { IAlertButton } from "interfaces";

function useAlert() {
	const { alertMessage, alertType, showAlert, alertButtons } = useReactiveVar(alertVar);

	function alert(alertMessage: string, alertType = "infor", alertButtons: IAlertButton[] = []) {
		alertVar({ showAlert: true, alertMessage, alertType, alertButtons });
	}

	function hideAlert() {
		alertVar({ alertButtons: [], showAlert: false, alertMessage: "", alertType: "info" });
	}

	return {
		alertMessage,
		alertType,
		showAlert,
		alertButtons,
		alert,
		hideAlert,
	};
}

export default useAlert;
