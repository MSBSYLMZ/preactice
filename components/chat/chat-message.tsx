import { ComponentProps, FunctionComponent } from "react";

interface IChatMessage extends ComponentProps<FunctionComponent> {
	message: string;
}

function ChatMessage(props: IChatMessage) {
	const { message } = props;
	return <div className="m-4 bg-white p-2 rounded-lg">{message}</div>;
}

export default ChatMessage;
