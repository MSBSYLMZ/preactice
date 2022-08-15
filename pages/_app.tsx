import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/header";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "../lib/apollo";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ApolloProvider client={apolloClient}>
			<Header></Header>
			<Component {...pageProps} />
		</ApolloProvider>
	);
}

export default MyApp;
