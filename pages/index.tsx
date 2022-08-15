import type { NextPage } from "next";
import Intro from "../components/intro";

const Home: NextPage = () => {
	return (
		<div>
			<Intro />
			<section className="min-h-screen"></section>
		</div>
	);
};

export default Home;
