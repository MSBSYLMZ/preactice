import { ComponentProps, FunctionComponent } from "react";

interface IChatMessage extends ComponentProps<FunctionComponent> {
	message: string;
}

function ChatMessage(props: IChatMessage) {
	const { message } = props;
	return <div>{message}</div>;
}

export default ChatMessage;
