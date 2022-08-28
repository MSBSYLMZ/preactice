import { useState } from "react";
import ChatBarItem from "./chat-bar-item";
import styles from "./chat-bar.module.css";

function ChatBar({ hideChatBar }: { hideChatBar: boolean }) {
	const [hideBar, setHideBar] = useState(true);
	const toggleChatBar = () => {
		setHideBar(preState => !preState);
	};

	return (
		<div
			className={`w-80 max-h-96 overflow-y-auto bg-white fixed right-5 rounded  z-10 ${styles.container} ${
				hideBar ? styles.hideChatBar : ""
			}`}>
			<div className="fixed w-80 bg-blue-900 h-14 text-center p-4  z-10" onClick={toggleChatBar}>
				Header
			</div>
			<div className={` ${styles.chatItemsWrapper}`}>
				<ChatBarItem message="Ne oldu pek bi keyfin yoook düşlediğin gibi olmadı mı" />
				<ChatBarItem message="Ne oldu pek bi keyfin yoook düşlediğin gibi olmadı mı" />
				<ChatBarItem message="Ne oldu pek bi keyfin yoook düşlediğin gibi olmadı mı" />
				<ChatBarItem message="Ne oldu pek bi keyfin yoook düşlediğin gibi olmadı mı" />
				<ChatBarItem message="Ne oldu pek bi keyfin yoook düşlediğin gibi olmadı mı" />
				<ChatBarItem message="Ne oldu pek bi keyfin yoook düşlediğin gibi olmadı mı" />
				<ChatBarItem message="Ne oldu pek bi keyfin yoook düşlediğin gibi olmadı mı" />
				<ChatBarItem message="Ne oldu pek bi keyfin yoook düşlediğin gibi olmadı mı" />
				<ChatBarItem message="Ne oldu pek bi keyfin yoook düşlediğin gibi olmadı mı" />
				<ChatBarItem message="Ne oldu pek bi keyfin yoook düşlediğin gibi olmadı mı" />
				<ChatBarItem message="Ne oldu pek bi keyfin yoook düşlediğin gibi olmadı mı" />
			</div>
		</div>
	);
}

export default ChatBar;
