import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { CartProvider } from "./utils/CartUtils.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<CartProvider>
				<Router>
					<App />
				</Router>
			</CartProvider>
		</Provider>
	</React.StrictMode>,
);
