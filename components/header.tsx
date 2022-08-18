import { MenuSharp } from "@mui/icons-material";
import Link from "next/link";
import SearchBar from "./search-bar";

function Header() {
	return (
		<div className="flex justify-between  h-16 p-4 md:px-10 bg-navy-blue fixed w-full  top-0 border-1 md:flex-row flex-row text-white">
			<Link href="/" >
				<div className="w-24 text-3xl font-bold cursor-pointer">preactice</div>
			</Link>
			<div className="w-3/5 hidden sm:block">
				<SearchBar />
			</div>
			<MenuSharp className="block md:hidden text-white text-3xl" />
			<button className="hidden md:block font-bold">Sign In</button>
		</div>
	);
}

export default Header;
