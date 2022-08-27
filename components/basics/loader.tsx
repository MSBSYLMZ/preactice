import styles from "./loader.module.css";

function Loader() {
	return (
		<div className={`${styles.container} absolute m-auto top-1/2`}>
			<div className={`${styles.outterCircle} absolute top-0 border-4 border-dashed rounded-full border-white`} />
			<div className={`${styles.middleCircle} border-t-8 border-l-8 border-b-8  border-r-1 top-0 rounded-full m-2  h-8 w-8`} />
			{/* <div className={`${styles.innerCircle} border-l-4 absolute top-0 rounded-full m-4 h-6 w-6`} /> */}
		</div>
	);
}

export default Loader;
