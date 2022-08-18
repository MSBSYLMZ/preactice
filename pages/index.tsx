import Button from "@components/basics/button";
import type { NextPage } from "next";
import Intro from "../components/intro";
import styles from "@styles/home.module.css";

const Home: NextPage = () => {
	return (
		<div>
			<Intro />
			<section className={`relative px-24 pt-16 bg-navy-blue ${styles.section2}`}>
				<h1 className="font-bold text-9xl relative -top-36 text-purple">practice anything</h1>
				<p className="text-white relative -top-24">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione quidem eos corrupti saepe laborum aliquam aspernatur quo vero,
					molestias tempore. Ducimus, similique! Vel voluptates error, fuga optio commodi corporis modi? Lorem ipsum, dolor sit amet
					consectetur adipisicing elit. Maiores, ratione dicta. Vitae deleniti, maiores perferendis dolore harum ullam quos inventore cumque
					ad incidunt, sint optio illo aut aliquam. Molestiae, corporis! Lorem ipsum dolor sit amet consectetur adipisicing elit. At dolore
					explicabo suscipit dolores doloremque qui dolorum illo, amet repellat non impedit incidunt aliquam sunt. 
					<br></br>
					<br></br>
					<br></br>
					Nobis, quidem aspernatur.
					Deserunt, itaque dignissimos! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem alias deserunt quasi cumque! Amet a
					esse, ducimus architecto, consequatur ex, vitae quaerat quis at dolor eaque quidem pariatur impedit maxime? Lorem ipsum dolor sit
					amet, consectetur adipisicing elit. Dicta, fugiat? Et, dolore placeat, soluta similique doloremque repellat provident, tenetur
					nobis dolorum quos error harum fugiat exercitationem sunt quaerat neque odit. Lorem ipsum dolor sit amet, consectetur adipisicing
					elit. Sapiente deleniti, est odio suscipit eum natus obcaecati, temporibus dicta possimus voluptate, nisi reiciendis praesentium
					in. Numquam fugit facere labore saepe molestiae.
				</p>
				<div className={styles.veriticalLine}></div>
				<div className={styles.horizontalLine}></div>
				<Button className="hover:bg-gray hover:text-white bg-white absolute right-14 bottom-4">Practice</Button>
			</section>
		</div>
	);
};

export default Home;
