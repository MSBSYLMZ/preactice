import IntroButton from "./intro-button";
import MenuIcon from "@icons/menu.icon";
import Link from "next/link";
import styles from "./intro.module.css";
import WorldIcon from "@icons/world.icon";
import UsersIcon from "@icons/users.icon";

const buttonInfos = [
	{
		href: "/practice",
		text: "Practice",
		icon: <WorldIcon className="mr-4" />,
	},
	{
		href: "/multiplayer",
		text: "Multiplayer",
		icon: <UsersIcon className="mr-4" />,
	},
	{
		href: "/custom-practice",
		text: "Custom Practice",
	},
	{
		href: "/add-question",
		text: "Add Question",
	},
	{
		href: "/add-photo",
		text: "Add Photo",
	},
];

function Intro() {
	const introButtons = buttonInfos.map((button, index) => (
		<Link key={index} href={button.href}>
			<IntroButton icon={button.icon}>{button.text}</IntroButton>
		</Link>
	));
	return (
		<section
			className={`${styles.container} pb-48 px-10 flex flex-row sm:flex-column justify-around flex-wrap-reverse bg-[url('/static/home-background.svg')] bg-fixed bg-no-repeat bg-cover`}>
			<div className="text-center mt-10 sm:mt-44 ">
				<p className="text-4xl sm:text-6xl text-gray mb-10 font-semibold font-['Rubik_Glitch']">
					because
					<span className="text-purple font-extrabold font-['Rubik']"> preactice </span>
				</p>
				<p className="text-4xl sm:text-6xl text-gray font-extrabold">makes perfect</p>
			</div>
			<div className=" text-center flex justify-center">
				<div className="mt-14 sm:mt-32 xl:mr-44  lg:mr-0 text-center flex-row">{introButtons}</div>
			</div>
		</section>
	);
}

export default Intro;
