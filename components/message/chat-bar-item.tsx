import ProfileThumbnail from "@components/basics/profile-thumbnail";
import styles from "./chat-bar-item.module.css";

function ChatBarItem({ message }: { message: string }) {
	return (
		<div className="flex relative border-b-2 border-gray">
			<ProfileThumbnail />
			<div>
				<p className="font-bold mt-2">Some User With Name</p>
				<p className={`${styles.messagePreview} text-sm`}>{message.length > 30 ? message.substring(0, 30) + "..." : message}</p>
				<p className="text-xs absolute right-5 bottom-0">date</p>
			</div>
		</div>
	);
}

export default ChatBarItem;
