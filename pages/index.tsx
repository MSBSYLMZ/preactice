import type { NextPage } from "next";
import Button from "../components/basics/button";

const Home: NextPage = () => {
	return (
		<div className="-mt-100">
			<section className="min-h-screen flex justify-between bg-[url('/static/home-background.svg')] bg-fixed bg-center bg-no-repeat bg-cover">
				<div className="text-center mt-44 flex-1">
					<p className="text-6xl text-yellow mb-10 font-semibold italic">
						Because
						<span className="text-white font-bold"> Preactice </span>
					</p>
					<p className="text-6xl text-yellow font-semibold italic">
						Makes <span className="text-white font-bold"> Perfect </span>
					</p>
				</div>
				<div className="text-center flex-1 flex justify-center">
					<div className="mt-40 text-center flex-row">
						<Button className="block w-96 hover:bg-blue my-5">Practice</Button>
						<Button className="block w-96 my-5 hover:bg-blue my-5">Multiplayer</Button>
						<Button className="block w-96 my-5 hover:bg-blue my-5">Custom Practice</Button>
					</div>
				</div>
			</section>
			<section className="min-h-screen"></section>
		</div>
	);
};

export default Home;
