import MenuIcon from "@icons/menu.icon";
import Link from "next/link";
import SearchBar from "./search-bar";
import { useSession, signOut, signIn } from "next-auth/react";

function Header() {
	const { data: session, status } = useSession();

	return (
		<header className="flex justify-between  h-16 p-4 md:px-10 bg-navy-blue fixed z-50 w-full  top-0 border-1 md:flex-row flex-row text-white">
			<Link href="/">
				<div className="w-24 text-3xl font-bold cursor-pointer">preactice</div>
			</Link>
			<div className="w-3/5 hidden sm:block">
				<SearchBar />
			</div>
			<MenuIcon className="block md:hidden text-white text-3xl" />
			{session ? (
				<>
					<h4 className="text-white">{session?.user?.name}</h4>
					<button
						className="hidden md:block font-bold"
						onClick={() => {
							signOut();
						}}>
						Sign Out
					</button>
				</>
			) : (
				<button
					className="hidden md:block font-bold"
					onClick={() => {
						signIn();
					}}>
					Sign In
				</button>
			)}
		</header>
	);
}

export default Header;
