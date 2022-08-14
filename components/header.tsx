import { MenuSharp } from "@mui/icons-material";
import SearchBar from "./search-bar";

function Header() {
	return (
		<div className="flex justify-between  h-16 p-4 md:px-10 bg-black bg-opacity-70 fixed w-full  top-0 border-1 flex-row text-white">
			<MenuSharp className="block md:hidden text-white" />
			<div className="w-24 text-xl font-bold">Preactice</div>
			<div className="w-3/5">
				<SearchBar />
			</div>
			<button className="hidden md:block font-bold">Sign In</button>
		</div>
	);
}

export default Header;
