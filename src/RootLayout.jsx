import Footer from "./common/footer/Footer";
import Header from "./common/head/Header";
import { Provider } from "react-redux";
import store from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

let persistor = persistStore(store);

const RootLayout = ({ children }) => {
	return (
		<>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<Header />
					<main>
						<main>{children}</main>
					</main>
					<Footer />
				</PersistGate>
			</Provider>
		</>
	);
};
export default RootLayout;
