import { Groups } from "@mui/icons-material";
import PsychologyIcon from "@mui/icons-material/Psychology";
import IntroButton from "./intro-button";
import Link from "next/link";

const buttonInfos = [
	{
		href: "/practice",
		text: "Practice",
		icon: <PsychologyIcon className="text-3xl mr-3" />,
	},
	{
		href: "/multiplayer",
		text: "Multiplayer",
		icon: <Groups className="text-3xl mr-3" />,
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
		<section className="pb-64 flex flex-row sm:flex-column justify-between flex-wrap-reverse bg-[url('/static/home-background.svg')] bg-fixed bg-center bg-no-repeat bg-cover">
			<div className="text-center mt-10 sm:mt-44 min-w-max flex-1">
				<p className="text-4xl sm:text-6xl text-navy-blue mb-10 font-semibold italic">
					Because
					<span className="text-white font-bold"> Preactice </span>
				</p>
				<p className="text-4xl sm:text-6xl text-navy-blue font-semibold italic">
					Makes <span className="text-navy-blue font-bold"> Perfect </span>
				</p>
			</div>
			<div className=" text-center flex-1 flex justify-center">
				<div className="mt-14 sm:mt-40  text-center flex-row">{introButtons}</div>
			</div>
		</section>
	);
}

export default Intro;
