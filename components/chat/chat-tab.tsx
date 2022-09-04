import ExtendableTextarea from "@components/basics/extendable-textarea";
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
	const hell = messages.concat(messages, messages, messages, messages);
	const hll = hell.concat(hell, hell, hell);

	const messageElements = hll.map((item, index) => <ChatMessage message={item.message} />);
	return (
		<div className="relative h-96 w-80 ml-8 bg-sky-400 flex flex-col flex-grow-0 flex-shrink-0 basis-auto">
			<div className="h-12 bg-gray">
				<div onClick={close} className="cursor-pointer absolute right-2 top-2">
					{" "}
					&#10060;
				</div>
				<div>{user.name}</div>
			</div>
			<div className="w-full h-64 relative overflow-y-auto mb-auto max-h-80 h-64 flex flex-col-reverse flex-grow flex-shrink-0 basis-0">
				{messageElements}
			</div>
			<ExtendableTextarea className="relative max-h-24 resize-none flex  flex-grow-0 flex-shrink-0 basis-auto" />
		</div>
	);
}

export default ChatTab;
