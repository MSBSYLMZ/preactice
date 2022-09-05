import { useEffect, useState } from "react";
import Pusher from "pusher-js";

const PUSHER_API_URL = `http://localhost:3000/api/pusher`;

function usePusher() {
	const [chats, setChats] = useState([]);
	// const [messageToSend, se];

	async function sendMessage(message: string, sender: number) {
		const response = await fetch(PUSHER_API_URL, {
			method: "POST",
			body: JSON.stringify({
				message,
				sender,
			}),
		});
	}

	useEffect(() => {
		const pusher = new Pusher(process.env.NEXT_PUBLIC_KEY as string, {
			cluster: "eu",
		});

		const channel = pusher.subscribe("chat");
		//@ts-ignore
		channel.bind("chat-event", function (data) {
			//@ts-ignore
			setChats(prevState => [...prevState, { sender: data.sender, message: data.message }]);
		});

		return () => {
			pusher.unsubscribe("chat");
		};
	}, []);

	return {
		sendMessage,
		chats,
	};
}

export default usePusher