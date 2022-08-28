import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import Header from "../components/header";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "../lib/apollo";
import { SessionProvider } from "next-auth/react";
import ChatBar from "@components/message/chat-bar";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<SessionProvider session={session}>
			<ApolloProvider client={apolloClient}>
				<Header />
				<ChatBar hideChatBar={true} />
				<Component {...pageProps} />
			</ApolloProvider>
		</SessionProvider>
	);
}

export default MyApp;
