import Footer from "./common/footer/Footer";
import Header from "./common/head/Header";
import { Provider } from "react-redux";
import store from "./store/store";

const RootLayout = ({ children }) => {
	return (
		<>
			<Provider store={store}>
				<Header />
				<main>
					<main>{children}</main>
				</main>
				<Footer />
			</Provider>
		</>
	);
};
export default RootLayout;
