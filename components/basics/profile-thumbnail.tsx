import Image from "next/image";

function ProfileThumbnail({ size = 50, src = null }) {
	return (
		<div className="mt-2 ml-2 mr-2" style={{ minHeight: `${size}px`, minWidth: `${size}px` }}>
			<Image
				className="rounded-full"
				height={size}
				width={size}
				src={`${src ? src : "/static/no-profile-pic.jpg"}`}
				objectFit="cover"
				layout="fixed"
				alt="profile-photo"></Image>
		</div>
	);
}

export default ProfileThumbnail;
