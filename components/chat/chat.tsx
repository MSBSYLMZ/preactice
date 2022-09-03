import { useState } from "react";
import ChatBar from "./chat-bar";
import ChatTab from "./chat-tab";

const chatTabsMock = [
	{
		user: {
			name: "First",
		},
		messages: [
			{
				sender: 1,
				message: "Message",
			},
		],
	},
	{
		user: {
			name: "Second",
		},
		messages: [
			{
				sender: 1,
				message: "Message",
			},
		],
	},
	{
		user: {
			name: "Last",
		},
		messages: [
			{
				sender: 1,
				message: "Message",
			},
		],
	},
];

function Chat() {
	const [tabs, setTabs] = useState(chatTabsMock);

	const closeTab = (index: number) => {
		const newTabs = [...tabs];
		newTabs.splice(index, 1);
		setTabs(newTabs);
	};

	const chatTabs = tabs.map((item, index) => <ChatTab key={index} index={index} closeTab={closeTab} messages={item.messages} user={item.user} />);
	return (
		<div>
			<ChatBar hideChatBar={true} />
			<div className="fixed flex justify-end flex-row-reverse right-96 bottom-0  z-50">{chatTabs}</div>
		</div>
	);
}

export default Chat;
