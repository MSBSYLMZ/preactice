import { ComponentProps, FunctionComponent } from "react";
import ChatMessage from "./chat-message";

interface IMessage {
	sender: number;
	message: string;
}

interface IChatTab extends ComponentProps<FunctionComponent> {
	messages: IMessage[];
	user: {
		name: string;
	};
	closeTab: Function;
	index: number;
}

function ChatTab(props: IChatTab) {
	const { user, messages, index, closeTab } = props;

	const close = () => {
		closeTab(index);
	};

	const messageElements = messages.map((item, index) => <ChatMessage message={item.message} />);
	return (
		<div className="relative h-96 w-80 ml-8 bg-sky-400">
			<div onClick={close}> &#10060;</div>
			<div>{user.name}</div>
			<div>{messageElements}</div>
		</div>
	);
}

export default ChatTab;
