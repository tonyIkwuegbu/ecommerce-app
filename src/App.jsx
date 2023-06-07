import { useState } from "react";
import "./App.css";
import Header from "./common/head/Header";
import { Routes, Route } from "react-router-dom";
import Pages from "./pages/Pages";
import Data from "./components/Data";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "./common/footer/Footer";

function App() {
	//Step 1 :
	const { productItems } = Data;
	//const { shopItems } = Sdata;

	//Step 2 :
	const [CartItem, setCartItem] = useState([]);

	//Step 4 :
	const addToCart = (product) => {
		const productExit = CartItem.find((item) => item.id === product.id);

		if (productExit) {
			setCartItem(
				CartItem.map((item) =>
					item.id === product.id
						? { ...productExit, qty: productExit.qty + 1 }
						: item,
				),
			);
		} else {
			setCartItem([...CartItem, { ...product, qty: 1 }]);
		}
	};

	return (
		<div>
			<Header />
			<Routes>
				<Route
					path="/"
					element={<Pages productItems={productItems} addToCart={addToCart} />}
				/>
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
